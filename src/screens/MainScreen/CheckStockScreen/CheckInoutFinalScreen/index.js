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
import {DataTable} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import config_data from "../../../../../config.json";

export default function CheckInoutFinalScreen({route, navigation}){
    const [userdata, setUserdata] = React.useState(route.params.userdata);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [groupval, setGroupval] = React.useState(route.params.groupVal);
    const [teamval, setTeamval] = React.useState(route.params.teamVal);
    const [teamName, setteamName] = React.useState("");
    const [userArr, setuserArr] = React.useState([]);
    const [userDateArr, setuserDateArr] = React.useState([]);
    const [pickerUser, setpickerUser] = React.useState(["팀 전체"]);
    const [currentUser, setcurrentUser] = React.useState("팀 전체");
    const [pickerDate, setpickerDate] = React.useState(get_sevendays);
    const [currentDate, setcurrentDate] = React.useState(0);

    var res = [];

    React.useLayoutEffect(() => {
       const backAction = () => {
           navigation.navigate('Main');
           return true;
       };

       const backHandler = BackHandler.addEventListener(
           "hardwareBackPress",
           backAction
       );

       let team_txt = get_teamtext();
       setteamName(team_txt);
       set_teamusers(team_txt);
       //fetch team data
       let finishdate = moment().utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
       let startdate = moment().subtract(7,'days').utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
       fetch(config_data.server.host.concat(":",config_data.server.port,"/stock/details/team"),
       {method:'POST',
       headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
       body: JSON.stringify({sdt:startdate, edt:finishdate, team: team_txt})})
       .then((response)=> {return response.json();})
       .then((json)=> {if(json.Code == "0") firstfetch_getdata(json.Data, finishdate); else fetchError(json);})
       .catch((error)=>{console.error(error);});
    },[]);

    function firstfetch_getdata(json, date){
        let tmp = [];
        let current_date = date.slice(0,10);
        var fab = userConfigdata.fab;
        var pro = userConfigdata.pro;
        var sub = userConfigdata.sub;
        for(var i in json){
            if(json[i].amount >0){
                let date = json[i].time.slice(0,10);
                let prod_code = json[i].code;
                let real_nm;
                if(prod_code<2000){
                    let nm_filtered = pro.filter((element) => element.code === prod_code);
                    real_nm = "".concat(nm_filtered[0].name,' - ',nm_filtered[0].color);
                }
                else if(prod_code<3000){
                    let nm_filtered = fab.filter((element) => element.code === prod_code);
                    let fab_type;
                    if(nm_filtered[0].type === "3") fab_type = "10T";
                    else if(nm_filtered[0].type === "2") fab_type = "3T";
                    else if(nm_filtered[0].type === "1") fab_type = "생지";
                    real_nm = '원단'.concat(' - ',nm_filtered[0].name, '-', fab_type);
                }
                else{
                    let nm_filtered = sub.filter((element) => element.code === prod_code);
                    real_nm = '부자재'.concat('-',nm_filtered[0].name);
                }
                tmp.push({key:i, type:"입고", name:real_nm, amount:json[i].amount, team:json[i].team, time: date, user:json[i].who});
            }
            else{
                let date = json[i].time.slice(0,10);
                let prod_code = json[i].code;
                let real_nm;
                if(prod_code<2000){
                    let nm_filtered = pro.filter((element) => element.code === prod_code);
                    real_nm = "".concat(nm_filtered[0].name,' - ',nm_filtered[0].color);
                }
                else if(prod_code<3000){
                    let nm_filtered = fab.filter((element) => element.code === prod_code);
                    let fab_type;
                    if(nm_filtered[0].type === "3") fab_type = "10T";
                    else if(nm_filtered[0].type === "2") fab_type = "3T";
                    else if(nm_filtered[0].type === "1") fab_type = "생지";
                    real_nm = '원단'.concat(' - ',nm_filtered[0].name, '-', fab_type);
                }
                else{
                    let nm_filtered = sub.filter((element) => element.code === prod_code);
                    real_nm = '부자재'.concat('-',nm_filtered[0].name);
                }
                tmp.push({key:i, type:"출고", name:real_nm, amount:json[i].amount, team:json[i].team, time: date, user:json[i].who});
            }
        }
        setuserArr(tmp);
        let tmp_date = [];
        for(var i in tmp){
            if(tmp[i].time === current_date) tmp_date.push(tmp[i]);
        }
        setuserDateArr(tmp_date, tmp);
    };


    function fetchAll(team_txt){
        //team: team_txt로 바꾸기
       let finishdate = moment().utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
       let startdate = moment().subtract(7,'days').utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
       fetch(config_data.server.host.concat(":",config_data.server.port,"/stock/details/team"),
       {method:'POST',
       headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
       body: JSON.stringify({sdt:startdate, edt:finishdate, team: team_txt})})
       .then((response)=> {return response.json();})
       .then((json)=> {if(json.Code == "0") get_userArr(json.Data); else fetchError(json);})
       .catch((error)=>{console.error(error);});
    };

    function fetchError(json){
        if(json.Code === 999){
            if(json.Message === "there is no data to get"){
                setuserDateArr([]);
                Alert.alert(
                  "내역 없음",
                  ""
                );
            }
        }
        else{
            Alert.alert(
              "서버 연결 실패",
              "네트워크 연결상태를 확인해주세요!"
            );
        }
        console.log(json);
    };

    function set_teamusers(team_txt){
        let user_tmparr = ["팀 전체"];
        for(var i in userdata){
            if(userdata[i].team === team_txt){
                user_tmparr.push(userdata[i].name);
            }
        }
        setpickerUser(user_tmparr);
    };

    function get_userArr(json){
        let tmp = [];
        var fab = userConfigdata.fab;
        var pro = userConfigdata.pro;
        var sub = userConfigdata.sub;
        for(var i in json){
            if(json[i].amount >0){
                let date = json[i].time.slice(0,10);
                let prod_code = json[i].code;
                let real_nm;
                if(prod_code<2000){
                    let nm_filtered = pro.filter((element) => element.code === prod_code);
                    real_nm = "".concat(nm_filtered[0].name,' - ',nm_filtered[0].color);
                }
                else if(prod_code<3000){
                    let nm_filtered = fab.filter((element) => element.code === prod_code);
                    let fab_type;
                    if(nm_filtered[0].type === "3") fab_type = "10T";
                    else if(nm_filtered[0].type === "2") fab_type = "3T";
                    else if(nm_filtered[0].type === "1") fab_type = "생지";
                    real_nm = '원단'.concat(' - ',nm_filtered[0].name, '-', fab_type);
                }
                else{
                    let nm_filtered = sub.filter((element) => element.code === prod_code);
                    real_nm = '부자재'.concat('-',nm_filtered[0].name);
                }
                tmp.push({key:i, type:"입고", name:real_nm, amount:json[i].amount, team:json[i].team, time: date, user:json[i].who});
            }
            else{
                let date = json[i].time.slice(0,10);
                let prod_code = json[i].code;
                let real_nm;
                if(prod_code<2000){
                    let nm_filtered = pro.filter((element) => element.code === prod_code);
                    real_nm = "".concat(nm_filtered[0].name,' - ',nm_filtered[0].color);
                }
                else if(prod_code<3000){
                    let nm_filtered = fab.filter((element) => element.code === prod_code);
                    let fab_type;
                    if(nm_filtered[0].type === "3") fab_type = "10T";
                    else if(nm_filtered[0].type === "2") fab_type = "3T";
                    else if(nm_filtered[0].type === "1") fab_type = "생지";
                    real_nm = '원단'.concat(' - ',nm_filtered[0].name, '-', fab_type);
                }
                else{
                    let nm_filtered = sub.filter((element) => element.code === prod_code);
                    real_nm = '부자재'.concat('-',nm_filtered[0].name);
                }
                tmp.push({key:i, type:"출고", name:json[i].code, amount:json[i].amount, team:json[i].team, time: date, user:json[i].who});
            }
        }
        setuserArr(tmp);
        get_datedata(currentDate, tmp);
    };

    function get_teamtext(){
        if(groupval === 0){
            if(teamval === 0)
            {
                return "미싱 1팀";
            }
            else if(teamval === 1)
            {
                return "미싱 2팀";
            }
            else if(teamval === 2)
            {
                return "재단팀";
            }
            else return null;
        }
        else if(groupval === 1){
            if(teamval === 0)
            {
                return "미싱팀";
            }
            else if(teamval === 1)
            {
                return "생산지원팀";
            }
            else return null;
        }
        else if(groupval === 2){
            if(teamval === 0)
            {
                return "헤드레스트팀";
            }
            else if(teamval === 1)
            {
                return "용품팀";
            }
            else return null;
        }
        else return null;
    };

    function get_sevendays(){
        let days = [];
        for(let step =0; step<7;step++){
            days.push(moment().subtract(step,'days').utcOffset('+09:00').format('YYYY-MM-DD'));
        }
        return days;
    };

    function get_datedata(itemIndex, userArr_tmp){
        let tmp = [];
        for(var i in userArr_tmp){
            if(userArr_tmp[i].time === pickerDate[itemIndex]) tmp.push(userArr_tmp[i]);
        }
        setuserDateArr(tmp);
        setcurrentDate(itemIndex);
    };

    function get_userdata(itemIndex){
       if(itemIndex === 0){
             fetchAll(teamName);
             setcurrentUser(itemIndex);
       }
       else{
            let finishdate = moment().utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
            let startdate = moment().subtract(7,'days').utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
            fetch(config_data.server.host.concat(":",config_data.server.port,"/stock/details/who"),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({sdt:startdate, edt:finishdate, who:pickerUser[itemIndex]})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") {get_userArr(json.Data);} else fetchError(json);})
            .catch((error)=>{console.error(error);});
             setcurrentUser(itemIndex);
       }
    };

    function go_main(){
        navigation.navigate('Main');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width:'10%',height:'40%', marginRight:'5%'}}
                    onPress={(x)=>{go_main()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../../../images/checkstock/X.png')}
                    />
                </TouchableOpacity>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>{teamName} - 입출고내역</Text>
            </View>
            <View style={styles.pickerArea}>
                <View style = {{height:'70%',width:'40%',borderWidth: 1,borderColor:'black', borderRadius:10}}>
                    <Picker
                      selectedValue={currentUser}
                      style={{height: '100%', width: '100%', color: 'blue'}}
                      onValueChange={(itemValue, itemIndex) =>
                        {get_userdata(itemIndex);}
                      }>
                      {pickerUser.map((item, index) => {
                          return (<Picker.Item label={item} value={index} key={index}/>)
                      })}
                    </Picker>
                </View>
                <View style = {{height:'70%',width:'40%',borderWidth: 1,borderColor:'black', borderRadius:10}}>
                    <Picker
                      selectedValue={currentDate}
                      style={{height: '100%', width: '100%', color: 'blue'}}
                      itemStyle = {{color:'blue'}}
                      onValueChange={(itemValue, itemIndex) =>
                        {get_datedata(itemIndex, userArr)}
                      }>
                      {pickerDate.map((item, index) => {
                          return (<Picker.Item label={item} value={index} key={index}/>)
                      })}
                    </Picker>
                </View>
            </View>
            <View style={{backgroundColor:'silver', width:'100%', height: hp('65%'), borderRadius: 20, alignItems:'center'}}>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {userDateArr}
                        renderItem={({item}) =>
                            <DataTable style={[(item.amount > 0) ? {backgroundColor:'#DBEBF0', borderRadius: 10, marginBottom:'3%'}: {backgroundColor:'#D9DEF0', borderRadius: 10, marginBottom:'3%'}]}>
                                <DataTable.Header>
                                    <DataTable.Title style={{flex:1.3}}>종류</DataTable.Title>
                                    <DataTable.Title style={{flex:2}}>이름</DataTable.Title>
                                    <DataTable.Title style={{flex:6.5}}>제품 이름</DataTable.Title>
                                    <DataTable.Title style={{flex:1.3}}>수량</DataTable.Title>
                                    <DataTable.Title style={{flex:3}}>팀</DataTable.Title>
                                    <DataTable.Title style={{flex:3}}>날짜</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell style = {{flex:1.3}}>{item.type}</DataTable.Cell>
                                    <DataTable.Cell style = {{flex:2}}>{item.user}</DataTable.Cell>
                                    <DataTable.Cell style = {{flex:6.5}}>{item.name}</DataTable.Cell>
                                    <DataTable.Cell style = {{flex:1.3}}>{String(item.amount)}</DataTable.Cell>
                                    <DataTable.Cell style = {{flex:3}}>{item.team}</DataTable.Cell>
                                    <DataTable.Cell style = {{flex:3}}>{item.time}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>}
                            keyExtractor = {(item) => item.key.toString()}
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
        width: '95%',
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
        alignItems: 'center',
        marginBottom: hp('5%'),
        flexDirection: 'row',
    },
    pickerArea:{
        width: '100%',
        height: hp('5%'),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
})