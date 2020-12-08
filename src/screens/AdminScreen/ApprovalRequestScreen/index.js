import React, {Component, useEffect} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList,
    Button,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {DataTable} from 'react-native-paper';
import config_data from "../../../../config.json";

export default function ApprovalRequestScreen ({route, navigation}){
    const [buttonText, setbuttonText] = React.useState('선택');
    const [check, setCheck] = React.useState();
    const [isSelectChecked, setSelectChecked] = React.useState(false);
    const [usersignupList, setusersignupList] = React.useState();
    const [userobj, setUserobj] = React.useState();
    const [signupJson, setsignupJson] = React.useState(route.params.signupjson);
    const [proJson, setproJson] = React.useState(route.params.projson);
    const [fabJson, setfabJson] = React.useState(route.params.fabjson);
    const [subJson, setsubJson] = React.useState(route.params.subjson);
    const [updateJson, setupdateJson] = React.useState(route.params.updatejson);
    const [allJson, setallJson] = React.useState();
    React.useEffect(() => {
        get_allarr();
    },[navigation]);

    function fetchError(json){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
        console.log(json);
    };

    function select(){
        let err_check = false;
        if(!isSelectChecked) setbuttonText('승인');
        else {
            for(var i in check){
                if(check[i]){
                    if(allJson[i].cat ===0)
                    {
                        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_signup),
                        {method:'POST',
                        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify({id:allJson[i].key, isAccept:true})})
                        .then((response)=> {return response.json();})
                        .then((json)=> {if(json.Code == "0") console.log(json.Data); else err_check=true;})
                        .catch((error)=>{console.error(error);});
                    }
                    else if(allJson[i].cat ===1)
                    {
                        console.log("in cat");
                        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_pro),
                        {method:'POST',
                        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify({name:allJson[i].key, color:allJson[i].color, isAccept:true})})
                        .then((response)=> {return response.json();})
                        .then((json)=> {if(json.Code == "0") console.log(json.Data); else err_check=true;})
                        .catch((error)=>{console.error(error);});
                    }
                    else if(allJson[i].cat ===2)
                    {
                        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_fab),
                        {method:'POST',
                        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify({name:allJson[i].key, color:allJson[i].code, isAccept:true})})
                        .then((response)=> {return response.json();})
                        .then((json)=> {if(json.Code == "0") console.log(json.Data); else err_check=true;})
                        .catch((error)=>{console.error(error);});
                    }
                    else if(allJson[i].cat ===3)
                    {
                        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_sub),
                        {method:'POST',
                        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify({name:allJson[i].key, isAccept:true})})
                        .then((response)=> {return response.json();})
                        .then((json)=> {if(json.Code == "0") console.log(json.Data); else err_check=true;})
                        .catch((error)=>{console.error(error);});
                    }
                    else
                    {
                        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_update),
                        {method:'POST',
                        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                        body: JSON.stringify({idx:allJson[i].key, isAccept: true})})
                        .then((response)=> {return response.json();})
                        .then((json)=> {if(json.Code == "0") console.log(json.Data); else err_check=true;})
                        .catch((error)=>{console.error(error);});
                    }
                }
            }
        if(err_check){
            Alert.alert(
              "서버 연결 실패",
              "네트워크 연결상태를 확인해주세요!"
            );
        }
        setbuttonText('선택');
        }
        setSelectChecked(!isSelectChecked);
    };

    function get_group(team){
        if(team === "미싱 1팀" || team === "미싱 2팀" || team == "재단팀") return "생산 1부";
        else if(team === "미싱팀" || team === "생산지원팀") return "생산 2부";
        else if(team === "헤드레스트팀" || team === "용품팀") return "생산 3부";
    };

    function get_userList(json){
        let user_arr = [];
        let check_arr = [];
        let k=0;
        for(var i in json){
            user_arr.push({key:json[i].id, name:json[i].name, team:json[i].team, category: "회원가입",setcheck: false});
        }
        setUserobj(user_arr);
        for(var i in user_arr){
            check_arr.push(false);
        }
        setCheck(check_arr);
    };

    function get_allarr(){
        let all_arr = [];
        let check_arr = [];
        for(var i in signupJson){
            all_arr.push({key:signupJson[i].id, name:signupJson[i].name, team:signupJson[i].team, category: "회원가입", cat:0});
            check_arr.push(false);
        }
        for(var i in proJson){
            all_arr.push({key:proJson[i].name, color:proJson[i].color, prodcat:proJson[i].category, category: "제품 등록", cat:1});
            check_arr.push(false);
        }
        for(var i in fabJson){
            all_arr.push({key:fabJson[i].name, code:fabJson[i].color, category: "원단 등록", cat:2});
            check_arr.push(false);
        }
        for(var i in subJson){
            all_arr.push({key:subJson[i].name, category: "부자재 등록", cat:3});
            check_arr.push(false);
        }
        for(var i in updateJson){
            all_arr.push({key:updateJson[i].idx, name:updateJson[i].code, before: updateJson[i].before, after: updateJson[i].after, id:updateJson[i].id, team:updateJson[i].team, category: "재고 조정", cat:4});
            check_arr.push(false);
        }
        setallJson(all_arr);
        setCheck(check_arr);
    }

    function set_check(index){
        let check_arr = [];
        for(var i in check){
            if(i == index) {
            check_arr.push(!check[i]);
            }
            else check_arr.push(check[i]);
        }
        setCheck(check_arr);
    };
//
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{color:'black', fontSize:RFPercentage(4.5)}}>승인요청 페이지</Text>
            </View>
            <View style={styles.subtitleArea}>
                <Text style={{color:'black', fontSize:RFPercentage(2.4)}}>Approval request page</Text>
            </View>
            <View style={{backgroundColor:'white', width:'100%', height: hp('65%'), borderRadius: 20, paddingTop:'8%'}}>
                <Text style={{fontSize:RFPercentage(3), alignSelf:'center', marginBottom:'3%'}}>승인 목록</Text>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {allJson}
                        renderItem={({item, index}) =>
                        <View style = {{flexDirection:'row', justifyContent:'center', marginBottom:'3%'}}>
                            <View style = {{width:'70%'}}>
                                {item.cat===0 && <DataTable style={{backgroundColor:'silver', borderRadius: 10}}>
                                    <DataTable.Header>
                                        <DataTable.Title >요청 종류</DataTable.Title>
                                        <DataTable.Title>이름</DataTable.Title>
                                        <DataTable.Title>ID</DataTable.Title>
                                        <DataTable.Title>부서</DataTable.Title>
                                        <DataTable.Title>팀</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.category}</DataTable.Cell>
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        <DataTable.Cell>{item.key}</DataTable.Cell>
                                        <DataTable.Cell>{get_group(item.team)}</DataTable.Cell>
                                        <DataTable.Cell>{item.team}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>}
                                {item.cat===1 && <DataTable style={{backgroundColor:'silver', borderRadius: 10}}>
                                    <DataTable.Header>
                                        <DataTable.Title >요청 종류</DataTable.Title>
                                        <DataTable.Title>이름</DataTable.Title>
                                        <DataTable.Title>색상</DataTable.Title>
                                        <DataTable.Title>카테고리</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.category}</DataTable.Cell>
                                        <DataTable.Cell>{item.key}</DataTable.Cell>
                                        <DataTable.Cell>{item.color}</DataTable.Cell>
                                        <DataTable.Cell>{item.prodcat}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>}
                                {item.cat===2 && <DataTable style={{backgroundColor:'silver', borderRadius: 10}}>
                                    <DataTable.Header>
                                        <DataTable.Title >요청 종류</DataTable.Title>
                                        <DataTable.Title>색상</DataTable.Title>
                                        <DataTable.Title>컬러코드</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.category}</DataTable.Cell>
                                        <DataTable.Cell>{item.key}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.code)}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>}
                                {item.cat===3 && <DataTable style={{backgroundColor:'silver', borderRadius: 10}}>
                                    <DataTable.Header>
                                        <DataTable.Title >요청 종류</DataTable.Title>
                                        <DataTable.Title>이름</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.category}</DataTable.Cell>
                                        <DataTable.Cell>{item.key}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>}
                                {item.cat===4 && <DataTable style={{backgroundColor:'silver', borderRadius: 10}}>
                                    <DataTable.Header>
                                        <DataTable.Title >요청 종류</DataTable.Title>
                                        <DataTable.Title>제품 이름</DataTable.Title>
                                        <DataTable.Title>변경 전</DataTable.Title>
                                        <DataTable.Title>변경 후</DataTable.Title>
                                        <DataTable.Title>팀</DataTable.Title>
                                        <DataTable.Title>요청 ID</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.category}</DataTable.Cell>
                                        <DataTable.Cell>{"S타입"}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.before)}</DataTable.Cell>
                                        <DataTable.Cell>{String(item.after)}</DataTable.Cell>
                                        <DataTable.Cell>{item.team}</DataTable.Cell>
                                        <DataTable.Cell>{item.id}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>}
                            </View>
                            <View style = {{alignSelf:'center'}}>
                                {isSelectChecked && <CheckBox
                                   disabled={false}
                                    value={check[index]}
                                    onValueChange={() => {set_check(index)}}
                                />}
                            </View>
                        </View>}
                        />
                </View>
                <View style={{alignSelf:'center',width:'60%', height:hp('10%'), flexDirection:'row',marginTop:'10%',justifyContent:'space-between',}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x)=>{select()}}>
                            <Text style={[styles.buttonTitle, {fontSize:RFPercentage(2.6)}]}>{buttonText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x)=>{get_allarr()}}>
                            <Text style={[styles.buttonTitle, {fontSize:RFPercentage(2.6)}]}>모두 승인</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'silver',
        paddingLeft: wp('12%'),
        paddingRight: wp('12%'),
        justifyContent: 'flex-start',
        backgroundColor: '#f7f7ff',
    },
    categoryArea: {
        width: '100%',
        height: hp('20%'),
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    buttonArea: {
        width: '100%',
        height: hp('30%'),
        alignItems: 'center',
        marginTop: hp('3%'),
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "45%",
        height: "65%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    buttonTitle: {
        color: 'white',
    },
    productSearchArea: {
        width: '100%',
        height: hp('15%'),
        alignItems: 'center',
    },
    textForm: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        width: '100%',
        height: '40%',
        //textAlign:'left',
    },
    scroll:{
        width: '100%',
        height: hp('37%'),
        backgroundColor: 'white',
        borderRadius: 20,
    },
    scrollview_button: {
        width: '70%',
        padding:'5%',
        margin: '2%',
        flexDirection: 'row',
        backgroundColor: "#46c3ad",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
    },
    titleArea: {
        width: '100%',
        height: hp('5%'),
        marginTop: hp('5%'),
        alignItems: 'flex-start',
    },
    subtitleArea: {
        width: '100%',
        height: hp('3%'),
        marginBottom: hp('5%'),
        alignItems: 'flex-start',
    },
})