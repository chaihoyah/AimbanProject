import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
    Alert,
    BackHandler,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import moment from 'moment';
import {DataTable, Provider as PaperProvider} from 'react-native-paper';
import config_data from "../../../../../../../config.json";

export default function CheckStockFinalScreen({route, navigation}){
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [prodName, setprodName] = React.useState("");
    const [groupval, setGroupval] = React.useState(route.params.groupVal);
    const [teamval, setTeamval] = React.useState(route.params.teamVal);
    const [teamName, setteamName] = React.useState("");
    const [prodArray, setprodArray] = React.useState();
    const [stockArray, setstockArray] = React.useState([]);
    var res = [];

    React.useLayoutEffect(() => {
       let team_txt = get_teamtext();
       setprodName(userConfigdata[0].name);

       setteamName(team_txt);
       const backAction = () => {
            navigation.goBack();
           return true;
       };

       const backHandler = BackHandler.addEventListener(
           "hardwareBackPress",
           backAction
       );

       var date = moment().subtract(1,"days").utcOffset('+09:00').format('YYYY-MM-DD');
       fetch_data(0,date, []);
       get_prodArray(team_txt);
       return () => backHandler.remove();
    },[]);

    function fetch_data(num, date,json_arr){
        if(userConfigdata.length>0){
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.stock_get),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({code:userConfigdata[num].code, date:date, team:"개발팀"})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") {
                if(num == userConfigdata.length-1) setstockArray(json_arr.concat(json.Data.stock));
                else fetch_data(num+1, date, json_arr.concat(json.Data.stock));
                } else fetchError(json);})
            .catch((error)=>{console.error(error);});
        }
        else{
        console.log("no data");
        }
    };

    function putStock(json){
        res.push(json.stock);
    };

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(name, code){
        //Get Product Code
        if(prodCat === 2){
            if (route.params.whereFrom === 0 ) navigation.navigate('StockChange', {category:prodCat, prodname:name, prodcode:code});
            else if (route.params.whereFrom === 1) navigation.navigate('CheckStockPickOne', {configdata:objArray});
        }
        else{
            if (route.params.whereFrom === 0) navigation.navigate('PickColor', {category:prodCat, prodname:name, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else if (route.params.whereFrom === 1) navigation.navigate('checkStockPickOne', {configdata:objArray});
        }
    };

    function get_prodArray(team_txt){
        let prodArr = [];
        console.log(res);
        for(var i in userConfigdata){
            prodArr.push({key:userConfigdata[i].code, name:userConfigdata[i].name, color:userConfigdata[i].color});
        }
        console.log(prodArr);
        setprodArray(prodArr);
    };

    function fetchError(json){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
        console.log(json);
    };

    function get_teamtext(){
        if(groupval == 0){
            if(teamval == 0)
            {
                return "미싱 1팀";
            }
            else if(teamval == 1)
            {
                return "미싱 2팀";
            }
            else if(teamval == 2)
            {
                return "재단팀";
            }
            else return null;
        }
        else if(groupval == 1){
            if(teamval == 0)
            {
                return "미싱팀";
            }
            else if(teamval == 1)
            {
                return "생산지원팀";
            }
            else return null;
        }
        else if(groupval == 2){
            if(teamval == 0)
            {
                return "헤드레스트팀";
            }
            else if(teamval == 1)
            {
                return "용품팀";
            }
            else return null;
        }
        else return null;
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>{teamName} - {prodName}</Text>
            </View>
            <View style={{backgroundColor:'gray', width:'100%', height: hp('65%'), borderRadius: 20}}>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {prodArray}
                        renderItem={({item,index}) =>
                    <View style={styles.buttonArea}>
                        <DataTable style={{backgroundColor:'white',borderRadius: 20}}>
                            <DataTable.Header>
                                <DataTable.Title >제품 이름</DataTable.Title>
                                <DataTable.Title>색상</DataTable.Title>
                                <DataTable.Title>재고</DataTable.Title>
                            </DataTable.Header>
                            <DataTable.Row>
                                <DataTable.Cell>{item.name}</DataTable.Cell>
                                <DataTable.Cell>{item.color}</DataTable.Cell>
                                <DataTable.Cell>{String(stockArray[index])}</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </View>
                   }/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    buttonArea: {
        width: '70%',
        height: hp('15%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '4%',
    },
    scroll:{
        width: '100%',
        height: '100%',
        backgroundColor: 'silver',
        borderRadius: 20,
        paddingTop: '5%',
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonTitle: {
        color: 'black',
        fontSize: RFPercentage('3'),
    },
    textArea:{
        width: '100%',
        height: hp('10%'),
        justifyContent: 'center',
        marginBottom: hp('2%'),
    },
})