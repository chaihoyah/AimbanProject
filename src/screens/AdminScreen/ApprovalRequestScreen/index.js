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
    Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {DataTable} from 'react-native-paper';
import config_data from "../../../../config.json";
import {Table, Row} from 'react-native-table-component';

export default function ApprovalRequestScreen ({route, navigation}){
    const [buttonText, setbuttonText] = React.useState('선택');
    const [check, setCheck] = React.useState();
    const [allCheck, setallCheck] = React.useState(false);
    const [isSelectChecked, setSelectChecked] = React.useState(false);
    const [usersignupList, setusersignupList] = React.useState();
    const [userobj, setUserobj] = React.useState();
    const [signupJson, setsignupJson] = React.useState(route.params.signupjson);
    const [proJson, setproJson] = React.useState(route.params.projson);
    const [fabJson, setfabJson] = React.useState(route.params.fabjson);
    const [subJson, setsubJson] = React.useState(route.params.subjson);
    const [updateJson, setupdateJson] = React.useState(route.params.updatejson);
    const [deleteJson, setdeleteJson] = React.useState(route.params.deletejson);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [allJson, setallJson] = React.useState();
    React.useEffect(() => {
        console.log(signupJson);
        get_allarr();
    },[navigation,deleteJson]);

    function fetchError(json){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
        console.log(json);
    };

    function fetchNew(){
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_signup_list),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setsignupJson(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});

            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_pro_list),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setproJson(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});

            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_fab_list),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setfabJson(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});

            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_sub_list),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setsubJson(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});

            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_update_list),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setupdateJson(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});

            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_delete_list),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setdeleteJson(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});
    }

    function select(acceptOrdeny){
        let err_check = false;
        if(!isSelectChecked) setbuttonText('승인');
        else {
            let checked_tmp = [];
            for(var i in check){
                if(check[i]) checked_tmp.push(i);
            }
            if(checked_tmp.length>0) {
                if(acceptOrdeny) accept_recursive(checked_tmp,false);
                else deny_recursive(checked_tmp,false);
            }
            setbuttonText('선택');
        }
        setSelectChecked(!isSelectChecked);
    };

    function accept_recursive(checked_arr, err){
        if(checked_arr.length>0){
            let current = checked_arr.pop();
            if(allJson[current].cat ===0)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_signup),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({id:allJson[current].key, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else accept_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===1)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_pro),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({name:allJson[current].name, color:allJson[current].color, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else accept_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===2)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_fab),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({name:allJson[current].key, color:allJson[current].code, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else accept_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===3)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_sub),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({name:allJson[current].key, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else accept_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===4)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_update),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({idx:allJson[current].key, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else {accept_recursive(checked_arr, true);}})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===5)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_delete_code),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({code:allJson[current].key, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else {console.log(json);accept_recursive(checked_arr, true);}})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===6)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_delete_user),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({id:allJson[current].key, isAccept:true})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {accept_recursive(checked_arr, err);} else {accept_recursive(checked_arr, true);}})
                .catch((error)=>{console.error(error);});
            }
        }
        else{
            if(err){
                Alert.alert(
                  "서버 연결 실패",
                  "네트워크 연결상태를 확인해주세요!"
                );
            }
            else{
                fetchNew();
                Alert.alert(
                  "완료",
                  "요청이 완료되었습니다!",
                );
            }
        }
    };

    function deny_recursive(checked_arr, err){
        if(checked_arr.length>0){
            let current = checked_arr.pop();
            if(allJson[current].cat ===0)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_signup),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({id:allJson[current].key, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else deny_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===1)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_pro),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({name:allJson[current].name, color:allJson[current].color, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else deny_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===2)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_fab),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({name:allJson[current].key, color:allJson[current].code, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else deny_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===3)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_register_sub),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({name:allJson[current].key, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else deny_recursive(checked_arr, true);})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===4)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_update),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({idx:allJson[current].key, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else {console.log(json);deny_recursive(checked_arr, true);}})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===5)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_delete_code),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({code:allJson[current].key, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else {deny_recursive(checked_arr, true);}})
                .catch((error)=>{console.error(error);});
            }
            else if(allJson[current].cat ===6)
            {
                fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_delete_user),
                {method:'POST',
                headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                body: JSON.stringify({id:allJson[current].key, isAccept:false})})
                .then((response)=> {return response.json();})
                .then((json)=> {if(json.Code == "0") {deny_recursive(checked_arr, err);} else {deny_recursive(checked_arr, true);}})
                .catch((error)=>{console.error(error);});
            }
        }
        else{
            if(err){
                Alert.alert(
                  "서버 연결 실패",
                  "네트워크 연결상태를 확인해주세요!"
                );
            }
            else{
                fetchNew();
                Alert.alert(
                  "완료",
                  "요청이 완료되었습니다!",
                );
            }
        }
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
        var fab = userConfigdata.fab;
        var pro = userConfigdata.pro;
        var sub = userConfigdata.sub;
        for(var i in signupJson){
            all_arr.push({key:signupJson[i].id, name:signupJson[i].name, team:signupJson[i].team, category: "회원가입", cat:0});
            check_arr.push(false);
        }
        for(var i in proJson){
            all_arr.push({key:proJson[i].name.concat(String(i)), name:proJson[i].name, color:proJson[i].color, prodcat:proJson[i].category, category: "제품 등록", cat:1});
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
            let update_code = updateJson[i].code;
            let nm;
            if(update_code<2000){
                let nm_filtered = pro.filter((element) => element.code === update_code);
                nm = nm_filtered[0].name.concat('-',nm_filtered[0].color);
            }
            else if(update_code<3000){
                let nm_filtered = fab.filter((element) => element.code === update_code);
                nm = nm_filtered[0].name.concat('-',nm_filtered[0].color, "(원단)");
            }
            else if(update_code<4000){
                let nm_filtered = sub.filter((element) => element.code === update_code);
                nm = nm_filtered[0].name.concat('-', "부자재");
            }
            all_arr.push({key:updateJson[i].idx, name:nm, before: updateJson[i].before, after: updateJson[i].after, id:updateJson[i].id, team:updateJson[i].team, category: "재고 조정", cat:4});
            check_arr.push(false);
        }
        for(let i=0;i<deleteJson.code.length;i++){
            let delete_code = deleteJson.code[i].code;
            let nm;
            if(deleteJson.code[i].code<2000){
                let nm_filtered = pro.filter((element) => element.code === delete_code);
                nm = nm_filtered[0].name.concat('-',nm_filtered[0].color);
            }
            else if(deleteJson.code[i].code<3000){
                let nm_filtered = fab.filter((element) => element.code === delete_code);
                nm = nm_filtered[0].name.concat('-',nm_filtered[0].color, "(원단)");
            }
            else if(deleteJson.code[i].code<4000){
                let nm_filtered = sub.filter((element) => element.code === delete_code);
                nm = nm_filtered[0].name.concat('-', "부자재");
            }
            all_arr.push({key:delete_code, name:nm, category: "제품 삭제", cat:5});
            check_arr.push(false);
        }
        for(let i=0;i<deleteJson.user.length;i++){
            all_arr.push({key:deleteJson.user[i].id,category: "유저 삭제", cat:6});
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

    function set_allcheck(){
        let check_arr = [];
        if(!allCheck){
            for(var i in check){
                check_arr.push(true);
            }
        }
        else{
            for(var i in check){
                check_arr.push(false);
            }
        }
        setCheck(check_arr);
        setallCheck(!allCheck);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{color:'black', fontSize:RFPercentage(4.5)}}>승인요청 페이지</Text>
            </View>
            <View style={styles.subtitleArea}>
                <Text style={{color:'black', fontSize:RFPercentage(2.4)}}>Approval request page</Text>
            </View>
            <View style={{backgroundColor:'white', width:'100%', height: hp('65%'), borderRadius: 20, paddingTop:'4%'}}>
                <View style={{width:'100%', flexDirection: 'row'}}>
                    <View style={{width:'60%', justifyContent:'center',alignItems:'flex-end'}}>
                        <Text style={{fontSize:RFPercentage(3), marginBottom:'5%'}}>승인 목록</Text>
                    </View>
                    {isSelectChecked &&
                    <View style={{width:'38%', justifyContent:'center',alignItems:'flex-end'}}>
                        <CheckBox
                            disabled={false}
                            value={allCheck}
                            onValueChange={() => {set_allcheck()}}
                        />
                    </View>
                    }
                </View>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {allJson}
                        renderItem={({item, index}) =>
                        <View style = {{flexDirection:'row', justifyContent:'center', marginBottom:'3%'}}>
                            <View style = {{width:'90%'}}>
                                {item.cat===0 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                        <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#DBEBF0'}}>
                                            <Row data={['요청 종류', '이름', 'ID', '부서', '팀']} widthArr={[wp('12%'),wp('20%'),wp('20%'),wp('17%'),wp('20%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                            <Row data={[item.category, item.name, item.key, get_group(item.team) , item.team]} widthArr={[wp('12%'),wp('20%'),wp('20%'),wp('17%'),wp('20%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                        </Table>
                                    </ScrollView>
                                }
                                {item.cat===1 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                        <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#D9DEF0'}}>
                                            <Row data={['요청 종류', '제품 이름', '색상', '카테고리']} widthArr={[wp('12%'),wp('29%'),wp('29%'),wp('19%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                            <Row data={[item.category, item.name, item.color,item.prodcat]} widthArr={[wp('12%'),wp('29%'),wp('29%'),wp('19%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                        </Table>
                                    </ScrollView>
                                }
                                {item.cat===2 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                        <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#D9DEF0'}}>
                                            <Row data={['요청 종류', '색상', '컬러코드']} widthArr={[wp('12%'),wp('39%'),wp('38%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                            <Row data={[item.category, item.key, String(item.code)]} widthArr={[wp('12%'),wp('39%'),wp('38%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                        </Table>
                                    </ScrollView>
                                }
                                {item.cat===3 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                        <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#D9DEF0'}}>
                                            <Row data={['요청 종류', '이름']} widthArr={[wp('12%'),wp('77%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                            <Row data={[item.category, item.key]} widthArr={[wp('12%'),wp('77%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                        </Table>
                                    </ScrollView>
                                }
                                {item.cat===4 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                        <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#DBEBF0'}}>
                                            <Row data={['요청 종류', '제품 이름', '전', '후','팀', '요청 ID']} widthArr={[wp('12%'),wp('35%'),wp('5%'),wp('5%'),wp('17%'),wp('15%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                            <Row data={[item.category, item.name, String(item.before), String(item.after), item.team, item.id]} widthArr={[wp('12%'),wp('35%'),wp('5%'),wp('5%'),wp('17%'),wp('15%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                        </Table>
                                    </ScrollView>
                                }
                                {item.cat===5 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                        <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#FF687A'}}>
                                            <Row data={['요청 종류', '제품 이름']} widthArr={[wp('12%'),wp('77%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                            <Row data={[item.category, item.name]} widthArr={[wp('12%'),wp('77%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                        </Table>
                                    </ScrollView>
                                }
                                {item.cat===6 &&
                                    <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                           <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#FF687A'}}>
                                               <Row data={['요청 종류', '유저 ID']} widthArr={[wp('12%'),wp('77%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.7)}}/>
                                               <Row data={[item.category, item.key]} widthArr={[wp('12%'),wp('77%')]} style={{height:80}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.5)}}/>
                                           </Table>
                                    </ScrollView>
                                }
                            </View>
                            <View style = {{alignSelf:'center'}}>
                                {isSelectChecked && <CheckBox
                                   disabled={false}
                                    value={check[index]}
                                    onValueChange={() => {set_check(index)}}
                                />}
                            </View>
                        </View>}
                        keyExtractor = {(item) => item.key.toString()}
                        />
                </View>
                <View style={{alignSelf:'center',width:'60%', height:hp('10%'), flexDirection:'row',marginTop:'10%',justifyContent:'center'}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x)=>{select(true)}}>
                            <Text style={[styles.buttonTitle, {fontSize:RFPercentage(2.6)}]}>{buttonText}</Text>
                        </TouchableOpacity>
                        {isSelectChecked &&
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={[styles.button,{marginLeft:'10%'}]}
                                onPress={(x)=>{select(false)}}>
                                <Text style={[styles.buttonTitle, {fontSize:RFPercentage(2.6)}]}>거절</Text>
                            </TouchableOpacity>
                        }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'silver',
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
        alignItems: 'center',
    },
    subtitleArea: {
        width: '100%',
        height: hp('3%'),
        marginBottom: hp('5%'),
        alignItems: 'center',
    },
})