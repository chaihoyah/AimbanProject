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
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {DataTable} from 'react-native-paper';
import config_data from "../../../../config.json";

export default function InoutHistoryScreen ({route, navigation}){
    const [inout_obj, setInout_obj] = React.useState(route.params.inoutjson);
    const [inout_arr, setInout_arr] = React.useState([]);

    React.useEffect(() => {
        var k = 0;
        for(var i in inout_obj){
            let date = inout_obj[i].time.slice(0,10);
            let nm = (' '+inout_obj[i].value).slice(1).slice(8,12);
            let amt = inout_obj[i].value.slice(22,23);
            console.log(typeof(amt));
            if(inout_obj[i].type === 1) setInout_arr(inout_arr.concat({key:k, team:inout_obj[i].team, time:date, type:"입고", name:nm, amount:amt, user:inout_obj[i].who}));
            k++;
        }
    },[navigation]);

    function fetchError(){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
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
                        data = {inout_arr}
                        renderItem={({item}) =>
                            <DataTable style={{backgroundColor:'silver', borderRadius: 10}}>
                                <DataTable.Header>
                                    <DataTable.Title >요청 종류</DataTable.Title>
                                    <DataTable.Title>이름</DataTable.Title>
                                    <DataTable.Title>제품 이름</DataTable.Title>
                                    <DataTable.Title>수량</DataTable.Title>
                                    <DataTable.Title>팀</DataTable.Title>
                                    <DataTable.Title>날짜</DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row>
                                    <DataTable.Cell>{item.type}</DataTable.Cell>
                                    <DataTable.Cell>{item.user}</DataTable.Cell>
                                    <DataTable.Cell>{String(item.name)}</DataTable.Cell>
                                    <DataTable.Cell>{String(item.amount)}</DataTable.Cell>
                                    <DataTable.Cell>{item.team}</DataTable.Cell>
                                    <DataTable.Cell>{item.time}</DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>}
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