import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import moment from 'moment';
import config_data from "../../../config.json";
import {JSHash, JSHmac, CONSTANTS} from "react-native-hash";

export default function AdminScreen ({navigation, route}){
    const [adminID, setadminID] = React.useState('');
    const [adminpassword, setadminpassword] = React.useState('');
    const [inout_obj, setInout_obj] = React.useState();
    const [signupJson, setsignupJson] = React.useState();
    const [proJson, setproJson] = React.useState();
    const [fabJson, setfabJson] = React.useState();
    const [subJson, setsubJson] = React.useState();
    const [updateJson, setupdateJson] = React.useState();
    const [deleteJson, setdeleteJson] = React.useState();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', ()=>{
            let date = moment().utcOffset('+09:00').format('YYYY-MM-DD');
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_timeline),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({today:date})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setInout_obj(json.Data); else fetchError(json);})
            .catch((error)=>{console.error(error);});

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
        });
    },[navigation]);

    function hash_pwd(){
        JSHash(adminpassword, CONSTANTS.HashAlgorithms.sha256)
            .then(hash => doLogin(hash))
            .catch(err => console.log(err))
    };

    function doLogin(hash){
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.admin_login),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({id:adminID, passwd:hash})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") loggedin(json); else loginError();})
        .catch((error)=>{console.error(error);});
        //replace로 바꾸기
    };

    function fetchError(json){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
    };

    function loggedin(json){
        navigation.replace('InAdminStack', {inoutjson:inout_obj, signupjson:signupJson, projson:proJson, fabjson:fabJson, subjson:subJson, updatejson:updateJson, deletejson:deleteJson, configdata:route.params.configdata});
    };

    function loginError(){
        Alert.alert(
          "로그인 실패",
          "아이디나 비밀번호를 확인해주세요!"
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>관리자 로그인</Text>
            </View>
            <View style={styles.subtitleArea}>
                <Text style={styles.subtitle}> Administrator Log-in</Text>
            </View>
            <KeyboardAvoidingView style={styles.productSearchArea} behavior = 'padding'>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../images/adminlogin/adminloginid_image.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"관리자 ID"}
                        onChangeText = {(ID) => {setadminID(ID)}}/>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.productSearchArea} behavior = 'padding'>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../images/adminlogin/adminloginpassword_image.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"관리자 비밀번호"}
                        secureTextEntry={true}
                        onChangeText = {(pwd) => {setadminpassword(pwd)}}/>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView style={styles.buttonArea} behavior= 'padding'>
                 <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {hash_pwd()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../images/login/login_button.png')}
                    />
                 </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: '15%',
        paddingRight: '15%',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f7ff',
    },
    titleArea: {
        width: '100%',
        height: hp('7%'),
        marginTop: hp('5%'),
        alignItems: 'flex-start',
    },
    title: {
        fontSize: RFPercentage(6),
    },
    productSearchArea: {
        width: '80%',
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '3%',
    },
    subtitleArea: {
        width: '100%',
        marginBottom: hp('5%'),
        alignItems: 'flex-start',
    },
    subtitle: {
        fontSize: RFPercentage(2.5),
    },
    textForm: {
        width: '80%',
        height: '100%',
        marginLeft: '8%',
    },
    buttonArea: {
        width: '95%',
        height: hp('9%'),
        marginTop: '3%',
        alignItems: 'flex-end',
    },
    button: {
        width: "34%",
        height: "100%",
    },
})