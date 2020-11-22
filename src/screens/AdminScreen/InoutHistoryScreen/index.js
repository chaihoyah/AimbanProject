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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize"

export default function InoutHistoryScreen ({route, navigation}){

    function go_pickCategory(){
        navigation.navigate('PickCategory', {whereFrom: 1});
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{fontSize:RFPercentage(4.5)}}>입출고 내역</Text>
            </View>
            <View style={styles.subtitleArea}>
                <Text style={{fontSize:RFPercentage(2.4)}}>In/out history</Text>
            </View>
            <View style={{backgroundColor:'white', width:'100%', height: hp('65%'), borderRadius: 20, paddingTop:'8%'}}>
                <Text style={{fontSize:RFPercentage(3), alignSelf:'center', marginBottom:'3%'}}>입/출고</Text>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {[
                            {key: 'S 타입'},
                            {key: 'S 타입 프리미엄'},
                            {key: 'etc1'},
                            {key: 'etc2'},
                            {key: 'etc3'},
                            {key: 'etc4'},
                            {key: 'etc5'},
                        ]}
                        renderItem={({item}) =>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.scrollview_button}
                            onPress={(x)=>{go_pickCategory()}}>
                            <Text style={[styles.buttonTitle, {fontSize:18,backgroundColor:'black'}]}>{item.key}</Text>
                            <Text style={[styles.buttonTitle, {fontSize:18}]}>{item.key}</Text>
                        </TouchableOpacity>}
                        />
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
        flexDirection: 'row',
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "50%",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: "8%",
        paddingRight: "8%",
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
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
        height: hp('50%'),
        backgroundColor: 'white',
        borderRadius: 20
    },
    scrollview_button: {
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