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
import config_data from "../../../../config.json";

export default function MakeIDScreen ({route, navigation}){

    const [userID, setuserID] = React.useState("");
    const [userPassword, setuserPassword] = React.useState("");
    const [userName, setuserName] = React.useState("");
    //Group0:
    const [userGroup, setuserGroup] = React.useState(0);
    const [userTeam, setuserTeam] = React.useState(0);
    //let group_array = [{label: 0 , value: "생산 1부"}, {label: 1, value: "생산 2부"}, {label: 2, value: "생산 3부"}];
    //let team1_array = [{label: 0, value: "미싱 1팀"}, {label: 1, value: "미싱 2팀"}, {label: 2, value: "재단팀"}];
    //let team2_array = [{label: 0, value: "미싱팀"}, {label: 1, value: "생산지원팀"}];
    //let team3_array = [{label: 0, value: "헤드레스트팀"}, {label: 1, value: "용품팀"}];

    function doMakeID(){
        // 서버에 데이터 보내기
        if(userID == ""){
            Alert.alert(
              "오류",
              "아이디를 입력해주세요!"
            );
        }
        else if(userPassword == ""){
            Alert.alert(
              "오류",
              "비밀번호를 입력해주세요!"
            );
        }
        else if(userName == ""){
            Alert.alert(
              "오류",
              "이름을 입력해주세요!"
            );
        }
        else if(route.params?.groupVal == null || route.params?.teamVal == null)
        {
            Alert.alert(
              "오류",
              "팀을 선택해주세요!"
            );
        }
        else{
            Alert.alert(
              "정보 확인",
              "아이디: ".concat(userID, "\n", "비밀번호: ", userPassword, "\n", "이름: ",userName, "\n", "부서: ",get_grouptext(), "\n", "팀: ", get_teamtext()),
              [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                { text: "OK", onPress: () => {finish_makeid()} }
              ],
              { cancelable: false }
            );
        }
    };

    function finish_makeid()
    {
        //서버에 보내기
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.user_signup),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({id:userID, team:get_teamtext(), name:userName})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") navigation.goBack(); else signupError();})
        .catch((error)=>{console.error(error); signupError();});
    };

    function signupError(){
        Alert.alert(
          "회원가입 오류",
          "잠시후 다시 시도해주세요!"
        );
    };

    function go_pickteam(){
        navigation.navigate('PickTeamLogin');
    };

    function get_grouptext(){
        if(route.params?.groupVal == 0){
            return "생산 1부";
        }
        else if(route.params?.groupVal == 1){
            return "생산 2부";
        }
        else if(route.params?.groupVal == 2){
            return "생산 3부";
        }
        else return null;
    };
    function get_teamtext(){
        if(route.params?.groupVal == 0){
            if(route.params?.teamVal == 0)
            {
                return "미싱 1팀";
            }
            else if(route.params?.teamVal == 1)
            {
                return "미싱 2팀";
            }
            else if(route.params?.teamVal == 2)
            {
                return "재단팀";
            }
            else return null;
        }
        else if(route.params?.groupVal == 1){
            if(route.params?.teamVal == 0)
            {
                return "미싱팀";
            }
            else if(route.params?.teamVal == 1)
            {
                return "생산지원팀";
            }
            else return null;
        }
        else if(route.params?.groupVal == 2){
            if(route.params?.teamVal == 0)
            {
                return "헤드레스트팀";
            }
            else if(route.params?.teamVal == 1)
            {
                return "용품팀";
            }
            else return null;
        }
        else return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>회원가입</Text>
            </View>
            <View style={{flexDirection:'row',width:'100%', height:hp('6%'),justifyContent:'center',marginBottom:hp('4%')}}>
                <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{position:'absolute', width: '100%',height:hp('6%'),resizeMode:'contain'}}
                        source={require('../../../images/makeid/id_image.png')}
                    />
                </View>
                <View style={styles.formArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: hp('6%'),resizeMode:'contain'}}
                        source={require('../../../images/makeid/1-1box.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"사용할 아이디 입력"}
                        onChangeText = {ID => setuserID(ID)}/>
                </View>
            </View>
            <View style={{flexDirection:'row',width:'100%', height:hp('6%'),justifyContent:'center',marginBottom:hp('4%')}}>
                <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{position:'absolute', width: '100%',height:hp('6%'),resizeMode:'contain'}}
                        source={require('../../../images/makeid/password_image.png')}
                    />
                </View>
                <View style={styles.formArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: hp('6%'),resizeMode:'contain'}}
                        source={require('../../../images/makeid/1-1box.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"사용할 비밀번호 입력"}
                        secureTextEntry={true}
                        onChangeText = {Password => setuserPassword(Password)}/>
                </View>
            </View>
            <View style={{flexDirection:'row',width:'100%', height:hp('6%'),justifyContent:'center',marginBottom:hp('3%')}}>
                <View style={{width:'10%',alignItems:'center',justifyContent:'center'}}>
                    <Image
                        style={{position:'absolute', width: '100%',height:hp('6%'),resizeMode:'contain'}}
                        source={require('../../../images/makeid/username_image.png')}
                    />
                </View>
                <View style={styles.formArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: hp('6%'),resizeMode:'contain'}}
                        source={require('../../../images/makeid/1-1box.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"이름"}
                        onChangeText = {Name => setuserName(Name)}/>
                </View>
            </View>
            <View style={styles.bigbuttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={() => {go_pickteam()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/changestock/selectteam_button.png')}
                        />
                    <Text style={styles.buttonTitle}>{get_grouptext()} - {get_teamtext()}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                 <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {doMakeID()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../../images/makeid/approvalrequest_button.png')}
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
    bigbuttonArea: {
        width: '80%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '2%',
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        marginLeft: '20%',
        color: 'black',
    },
})