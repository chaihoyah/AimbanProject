import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

export default function PickTeamDetailScreen ({route, navigation}){

    function go_stockchange(teamname){
        if(route.params.whereFrom === 0) navigation.navigate('StockChange', {groupVal: route.params.groupVal, teamVal: teamname});
        else if (route.params.whereFrom === 1) navigation.navigate('CheckInoutFinal', {groupVal: route.params.groupVal, teamVal: teamname, userdata:route.params.userdata});
    };

    function go_back(){
        navigation.goBack();
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
                        source={require('../../../../../images/checkstock/back_button.jpg')}
                    />
                </TouchableOpacity>
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>팀 선택</Text>
            </View>
            {route.params.groupVal == 0 &&
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(0)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group0_0.png')}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(1)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group0_1.png')}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(2)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group0_2.png')}
                            />
                    </TouchableOpacity>
                </View>
            }
            {route.params.groupVal == 1 &&
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(0)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group1_0.png')}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(1)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group1_1.png')}
                            />
                    </TouchableOpacity>
                </View>
            }
            {route.params.groupVal == 2 &&
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(0)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group2_0.png')}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_stockchange(1)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/makeid/group2_1.png')}
                            />
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    headerArea:{
        width: '100%',
        height: '9%',
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: '3%',
    },
    buttonArea: {
        width: '80%',
        height: '60%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: '2%',
    },
    button: {
        width: "100%",
        height: "23%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '3%',
    },
    buttonTitle: {
        color: 'white',
    },
})