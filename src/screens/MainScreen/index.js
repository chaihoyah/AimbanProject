import React, {Component} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function MainScreen ({route, navigation}){

    function go_checkStock(){
        navigation.navigate('CheckStock');
    };
    function go_stockChange(doWhat_main){
        //get user team name and set team name
        navigation.navigate('StockChange',{doWhat: doWhat_main});
    };
    function go_putProduct(){
        navigation.navigate('PutProduct');
    };
    function go_settings(){
        navigation.navigate('Settings');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonArea_CheckStock}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_checkStock()}}>
                    <Text style= {styles.buttonImage}> 그림1</Text>
                    <Text style={styles.buttonTitle}>재고 확인</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea_inoutregister}>
                 <View style={{flexDirection: 'column', height: '43%', width: '42%', marginRight:'1%', justifyContent:'center'}}>
                    <TouchableOpacity
                       activeOpacity={0.8}
                       style={[styles.button, {marginBottom:'2%'}]}
                       onPress={(x) => {go_stockChange(0)}}>
                       <Text style={styles.buttonTitle}>입고하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                       activeOpacity={0.8}
                       style={[styles.button, {marginTop:'2%'}]}
                       onPress={(x) => {go_stockChange(1)}}>
                       <Text style={styles.buttonTitle}>출고하기</Text>
                    </TouchableOpacity>
                 </View>
                 <View style={{ height: '90%', width: '56%', marginLeft: '1%'}}>
                    <TouchableOpacity
                       activeOpacity={0.8}
                       style={styles.button}
                       onPress={(x) => {go_putProduct()}}>
                       <Text style={styles.buttonTitle}>제품 등록</Text>
                    </TouchableOpacity>
                 </View>
            </View>
            <View style={styles.buttonArea_changesetting}>
                <View style={{width:'68%'}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, {marginRight:'5%'}]}
                       onPress={(x) => {go_stockChange(2)}}>
                    <Text style={styles.buttonTitle}>조정하기</Text>
                </TouchableOpacity>
                </View>
                <View style={{width:'30%'}}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, {marginLeft:'5%'}]}
                    onPress={(x) => {go_settings()}}>
                    <Text style={styles.buttonTitle}>설정</Text>
                </TouchableOpacity>
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
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage: {
        width: "95%",
        height: "80%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: hp('2%'),
        //resizeMode:'contain',
    },
    buttonTitle: {
        color: 'white',
    },
    buttonArea_CheckStock: {
        width: wp('80%'),
        height: hp('35%'),
        alignItems: 'center',
    },
    buttonArea_inoutregister: {
        flexDirection: 'row',
        width: wp('80%'),
        height: hp('30%'),
        alignItems: 'center'
    },
    buttonArea_changesetting: {
        flexDirection: 'row',
        width: wp('80%'),
        height: hp('15%'),
    },
})