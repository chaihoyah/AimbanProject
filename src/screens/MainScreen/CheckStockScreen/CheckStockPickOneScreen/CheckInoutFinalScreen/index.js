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
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import moment from 'moment';
import {DataTable} from 'react-native-paper';
import config_data from "../../../../../../config.json";

export default function CheckInoutFinalScreen({route, navigation}){
    const [userdata, setUserdata] = React.useState(route.params.userdata);
    const [groupval, setGroupval] = React.useState(route.params.groupVal);
    const [teamval, setTeamval] = React.useState(route.params.teamVal);
    const [teamName, setteamName] = React.useState("");
    const [userArr, setuserArr] = React.useState([]);

    var res = [];

    React.useLayoutEffect(() => {
       let team_txt = get_teamtext();
       var tmp_arr = [];
       setteamName(team_txt);
       console.log(userdata);
       for(var i in userdata){
           if(userdata[i].team === "개발팀"){
                var finishdate = moment().utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
                var startdate = moment().subtract(1,'days').utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
                fetch(config_data.server.host.concat(":",config_data.server.port,"/stock/details/who"),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({sdt:startdate, edt:finishdate, who:userdata[i].name})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") get_userArr(json.Data); else fetchError(json);})
                .catch((error)=>{console.error(error);});
           }
       }
    },[]);

    function fetchError(json){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
        console.log(json);
    };

    function get_userArr(json){
        let tmp = [];
        for(var i in json){
            if(json[i].amount >0){
                let date = json[i].time.slice(0,10);
                tmp.push({key:i, type:"입고", name:json[i].code, amount:json[i].amount, team:json[i].team, time: date, user:json[i].who});
            }
            else{
                let date = json[i].time.slice(0,10);
                tmp.push({key:i, type:"출고", name:json[i].code, amount:json[i].amount, team:json[i].team, time: date, user:json[i].who});
            }
        }
        setuserArr(tmp);
    };

    function log(){
        console.log(userArr);
    }

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
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>{teamName} - 입출고내역</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => {log()}}>
                <Image
                    style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                    source={require('../../../../../images/makeid/group2_0.png')}
                    />
            </TouchableOpacity>
            <View style={{backgroundColor:'silver', width:'100%', height: hp('65%'), borderRadius: 20, alignItems:'center'}}>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {userArr}
                        renderItem={({item}) =>
                            <DataTable style={{backgroundColor:'white', borderRadius: 10, marginBottom:'3%'}}>
                                <DataTable.Header>
                                    <DataTable.Title >요청 종류</DataTable.Title>
                                    <DataTable.Title>이름</DataTable.Title>
                                    <DataTable.Title>제품 이름</DataTable.Title>
                                    <DataTable.Title>수량</DataTable.Title>
                                    <DataTable.Title>팀</DataTable.Title>
                                    <DataTable.Title>날짜</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>{item.type}</DataTable.Cell>
                                    <DataTable.Cell>{item.user}</DataTable.Cell>
                                    <DataTable.Cell>{String(item.name)}</DataTable.Cell>
                                    <DataTable.Cell>{String(item.amount)}</DataTable.Cell>
                                    <DataTable.Cell>{item.team}</DataTable.Cell>
                                    <DataTable.Cell>{item.time}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>}
                    />
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
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '4%',
    },
    scroll:{
        width: '80%',
        height: '100%',
        borderRadius: 20,
        paddingTop: '5%',
    },
    button: {
        width: "100%",
        height: "10%",
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