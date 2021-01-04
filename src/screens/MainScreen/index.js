import React, {Component} from 'react';
import {useIsFocused,useFocusEffect} from '@react-navigation/native';
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
import moment from 'moment';
import AsyncStorage from "@react-native-community/async-storage";
import config_data from "../../../config.json";

export default function MainScreen ({route, navigation}){
    const [userName, setuserName] = React.useState(route.params.username);
    const [userTeam, setuserTeam] = React.useState(route.params.userteam);
    const [userID, setuserID] = React.useState(route.params.userid);
    const [userConfigdata, setuserConfigdata] = React.useState({});

    React.useEffect(() => {
        /**
        AsyncStorage.getItem('user_name', (err, result)=>{
            setuserName(result);
        });
        AsyncStorage.getItem('user_team', (err, result)=>{
            setuserTeam(result);
        });
        AsyncStorage.getItem('user_id', (err, result)=>{
            setuserID(result);
        });**/
       var date = moment().utcOffset('+09:00').format('YYYY-MM-DD');
        const unsubscribe = navigation.addListener('focus', ()=>{
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.user_config),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({id:userID, date:date})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") setuserConfigdata(json.Data); else fetchError();})
            .catch((error)=>{console.error(error);});
        });
    },[navigation]);

    function fetchError(){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
    };

    function go_checkStock(){
        navigation.navigate('CheckStock',{username:userName, userteam:userTeam, configdata:userConfigdata});
    };
    function go_stockChange(doWhat_main){
        //get user team name and set team name
        navigation.navigate('StockChange',{doWhat: doWhat_main,username:userName, userteam:userTeam, userid:userID, configdata:userConfigdata});
    };
    function go_putProduct(){
        navigation.navigate('PutProduct',{username:userName, userteam:userTeam, configdata:userConfigdata});
    };
    function go_settings(){
        navigation.navigate('Settings',{username:userName, userteam:userTeam, userid: userID, configdata:userConfigdata});
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerArea}>
                    <Image
                        style={{width:'20%',height:'100%',resizeMode:'contain',marginLeft:'4.5%'}}
                        source={require('../../images/main/logoupper_image.png')}
                    />
                <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginLeft:'55%'}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain',marginRight:'1%'}}
                        source={require('../../images/main/userinfo_icon.png')}
                    />
                    <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                        <Text style={{height:'40%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end' }}>{userName}</Text>
                        <Text style={{height:'40%',width:'100%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{userTeam}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttonArea_CheckStock}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_checkStock()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../images/main/checkstock_button.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonArea_inoutregister}>
                 <View style={{flexDirection: 'column', height: '100%', width: '50%'}}>
                    <View style={styles.buttonArea_changestock}>
                        <TouchableOpacity
                           activeOpacity={0.8}
                           style={[styles.button]}
                           onPress={(x) => {go_stockChange(0)}}>
                            <Image
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source={require('../../images/main/instock_button.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style= {styles.buttonArea_changestock}>
                        <TouchableOpacity
                           activeOpacity={0.8}
                           style={[styles.button]}
                           onPress={(x) => {go_stockChange(1)}}>
                            <Image
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source={require('../../images/main/outstock_button.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style= {styles.buttonArea_changestock}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[styles.button]}
                               onPress={(x) => {go_stockChange(2)}}>
                            <Image
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source={require('../../images/main/changestock_button.png')}
                            />
                        </TouchableOpacity>
                    </View>
                 </View>
                 <View style={{ height: '100%', width: '50%', flexDirection:'column'}}>
                    <View style={styles.buttonArea_putproduct}>
                        <TouchableOpacity
                           activeOpacity={0.8}
                           style={styles.button}
                           onPress={(x) => {go_putProduct()}}>
                            <Image
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source={require('../../images/main/putproduct_button.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonArea_changesetting}>
                       <TouchableOpacity
                           activeOpacity={0.8}
                           style={[styles.button]}
                           onPress={(x) => {go_settings()}}>
                            <Image
                                style={{width:'100%',height:'100%',resizeMode:'contain'}}
                                source={require('../../images/main/settings_button.png')}
                            />
                       </TouchableOpacity>
                    </View>
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
    button: {
        //backgroundColor: "#46c3ad",
        width: '100%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerArea:{
        width: '77%',
        height: '6%',
        alignItems: 'center',
        alignSelf:'center',
        flexDirection:'row',
    },
    logouserArea:{
        width: wp('70%'),
        height: hp('3%'),
        marginBottom:hp('1%'),
        alignSelf:'center',
        flexDirection:'row',
    },
    buttonArea_CheckStock: {
        width: '77%',
        height: '41%',
        marginBottom: hp('2%'),
        alignSelf: 'center',
    },
    buttonArea_inoutregister: {
        flexDirection: 'row',
        width: wp('70%'),
        height: hp('40%'),
        alignSelf: 'center',
    },
    buttonArea_changestock: {
        width: '90%',
        height: '30%',
        marginBottom: hp('1%'),
    },
    buttonArea_putproduct: {
        width: '85%',
        height: '50%',
        marginTop: '15%',
        alignSelf: 'flex-end',
    },
    buttonArea_changesetting: {
        width: '85%',
        height: '40%',
        marginTop: '8%',
        alignSelf: 'flex-end',
    },
})