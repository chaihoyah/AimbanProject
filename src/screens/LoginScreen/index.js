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
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-community/async-storage";
import config_data from "../../../config.json";


export default function LoginScreen ({navigation}){
    const [prod_obj, setProd_obj] = React.useState("");
    const [text_id, setId] = React.useState("");
    const [text_pwd, setPwd] = React.useState("");

    const [userName, setuserName] = React.useState("");
    const [userGroup, setuserGroup] = React.useState("");
    const [userTeam, setuserTeam] = React.useState("");

    React.useEffect(()=>{
        AsyncStorage.getItem('user_loginauto', (err, result)=>{
        if(JSON.parse(result) == true) loggedin();
        });
    },[]);

    function doLogin(){
    //Body에 PWD 넣기
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.user_login),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({id:text_id, passwd:text_pwd})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") loggedin(json); else loginError();})
        .catch((error)=>{console.error(error);});

    };

    function loggedin(json){
    //AutoLogin 넣기, name, team 서버 요청 받아서 넣기
        //
        AsyncStorage.setItem('user_loginauto', JSON.stringify(false), ()=>{console.log("false set")});
        AsyncStorage.setItem('user_id', text_id, ()=>{});
        AsyncStorage.setItem('user_pwd', text_pwd, ()=>{});
        AsyncStorage.setItem('user_name', json.Data.name, ()=>{});
        AsyncStorage.setItem('user_team', json.Data.team, ()=>{});
        navigation.replace('MainStack', {username:json.Data.name, userteam:json.Data.team, userid:text_id});
    };

    function loginError(){
        Alert.alert(
          "로그인 실패",
          "아이디나 비밀번호를 확인해주세요!"
        );
    };


    function doMakeID(){
        navigation.navigate('MakeID');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>로그인</Text>
            </View>
            <View style={{flexDirection:'row',width:'100%', height:hp('6%'),justifyContent:'center',marginBottom:'5%'}}>
                <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{position:'absolute', width: '100%',height:hp('6%'),resizeMode:'contain'}}
                        source={require('../../images/login/id_image.png')}
                    />
                </View>
                <View style={styles.formArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: hp('6%'),resizeMode:'contain'}}
                        source={require('../../images/login/1-1box.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        onChangeText = {(text) => {setId(text)}}
                        placeholder={"아이디를 입력해 주세요"}/>
                </View>
            </View>
            <View style={{flexDirection:'row',width:'100%', height:hp('6%'),justifyContent:'center',marginBottom:hp('10%')}}>
                <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{position:'absolute', width: '100%',height:hp('6%'),resizeMode:'contain'}}
                        source={require('../../images/makeid/password_image.png')}
                    />
                </View>
                <View style={styles.formArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: hp('6%'),resizeMode:'contain'}}
                        source={require('../../images/login/1-1box.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        onChangeText = {(text) => {setPwd(text)}}
                        placeholder={"비밀번호를 입력해 주세요"}/>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => {doLogin()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../images/login/login_button.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                 <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => {doMakeID()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../images/login/makeid_button.png')}
                    />
                 </TouchableOpacity>
            </View>
        </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'flex-start',
    },
    titleArea: {
        width: '100%',
        height: hp('7%'),
        marginTop: hp('8%'),
        marginBottom: hp('8%'),
        marginLeft: '10%',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: RFPercentage(5.6),
    },
    formArea: {
        width: '70%',
        justifyContent: 'center',
    },
    textForm: {
        marginLeft: '3%',
        width: '90%',
    },
    buttonArea: {
        width: '40%',
        height: hp('10%'),
        marginRight: wp('4%'),
        alignSelf: 'flex-end',
    },
    button: {
        width: "100%",
        height: "100%",
    },
})