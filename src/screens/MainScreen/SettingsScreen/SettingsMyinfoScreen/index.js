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
import config_data from "../../../../../config.json";

export default function SettingsMyinfoScreen({route, navigation}){

    function go_back(){
        navigation.goBack();
    };

    function get_group(){
        var team = route.params.userteam;
        if(team === "미싱 1팀" || team === "미싱 2팀" || team === "재단팀") return "생산 1부";
        else if (team === "미싱팀" || team === "생산지원팀") return "생산 2부";
        else if (team === "헤드레스트팀" || team === "용품팀") return "생산 3부";
        else if (team === "개발팀") return "개발1부";
    };

    function ask_deleteID(){
        Alert.alert(
          "정말 아이디 삭제를 요청하시겠습니까?",
          "",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => {go_deleteID()} }
          ],
          { cancelable: false }
        );
    };

    function go_deleteID(){
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.delete_user),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({id:route.params.userid})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") navigation.goBack(); else fetchError();})
        .catch((error)=>{console.error(error);});
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width:'10%',height:'40%', marginRight:'2%'}}
                    onPress={(x)=>{go_back()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../../../images/checkstock/back_button.jpg')}
                    />
                </TouchableOpacity>
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>내 정보</Text>
                <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image
                        style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                        source={require('../../../../images/checkstock/userinfo_icon.png')}
                    />
                    <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                        <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                        <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                    </View>
                </View>
            </View>
            <View style={{alignSelf:'center',width:'60%', height: hp('50%'), borderRadius: 20}}>
                <View style = {styles.scroll}>
                    <Text style={{height:'10%', color:'black',fontSize:RFPercentage('4'),marginBottom:'5%'}}>이름: {route.params.username}</Text>
                    <Text style={{height:'10%', color:'black',fontSize:RFPercentage('4'),marginBottom:'5%'}}>아이디: {route.params.userid}</Text>
                    <Text style={{height:'10%', color:'black',fontSize:RFPercentage('4'),marginBottom:'5%'}}>부서: {get_group()}</Text>
                    <Text style={{height:'10%', color:'black',fontSize:RFPercentage('4'),marginBottom:'5%'}}>팀: {route.params.userteam}</Text>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{ask_deleteID()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../images/setting/deleteid_button.png')}
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
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
    },
    headerArea:{
        width: wp('80%'),
        height: '9%',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection:'row',
        marginBottom: '5%',
    },
    buttonArea: {
        width: '100%',
        height: hp('10%'),
        alignItems: 'center',
        alignSelf: 'center',
    },
    scroll:{
        width: '100%',
        height: '100%',
        backgroundColor: 'silver',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
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
    button_small:{
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        borderRadius: 20,
    },
    textArea:{
        width: '100%',
        height: hp('10%'),
        justifyContent: 'center',
        marginBottom: hp('2%'),
    },
})