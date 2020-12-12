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
    const [inout_obj, setInout_obj] = React.useState(route.params.inoutjson.reverse());
    const [inout_arr, setInout_arr] = React.useState([]);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);

    React.useEffect(() => {
        var zz = 0;
        var k = 0;
        let tmp = [];
        var fab = userConfigdata.fab;
        var pro = userConfigdata.pro;
        var sub = userConfigdata.sub;
        for(let i=0;i<inout_obj.length;i++){
            let date = inout_obj[i].time.slice(0,10);
            let nm = Number((' '+inout_obj[i].value).slice(1).slice(8,12));
            let amt = inout_obj[i].value.slice(22,23);
            var real_nm;
            if(nm<2000){
                let nm_filtered = pro.filter((element) => element.code === nm);
                real_nm = "".concat(nm_filtered[0].name,' - ',nm_filtered[0].color);
            }
            else if(nm<3000){
                let nm_filtered = fab.filter((element) => element.code === nm);
                let fab_type;
                if(nm_filtered[0].type === "3") fab_type = "10T";
                else if(nm_filtered[0].type === "2") fab_type = "3T";
                else if(nm_filtered[0].type === "1") fab_type = "생지";
                real_nm = '원단'.concat(' - ',nm_filtered[0].name, "-",fab_type);
            }
            else{
                let nm_filtered = sub.filter((element) => element.code === nm);
                real_nm = '부자재'.concat('-',nm_filtered[0].name);
            }
            if(inout_obj[i].type === 1) {
                let amt = inout_obj[i].value.slice(22,23);
                tmp.push({key:k, team:inout_obj[i].team, time:date, type:"입고", name:real_nm, amount:amt, user:inout_obj[i].who, typenum:1});
            }
            else if(inout_obj[i].type === 2) {
                let amt = inout_obj[i].value.slice(23,24);
                tmp.push({key:k, team:inout_obj[i].team, time:date, type:"출고", name:real_nm, amount:amt, user:inout_obj[i].who, typenum:2});
            }
            else if(inout_obj[i].type === 3){
                let amt = inout_obj[i].value.slice(22,24).concat("->", inout_obj[i].value.slice(33,35))
                tmp.push({key:k, team:inout_obj[i].team, time:date, type:"조정", name:real_nm, bef:inout_obj[i].value.slice(22,24), aft:inout_obj[i].value.slice(33,35),typenum:3});
            }
            k++;
        }
        setInout_arr(tmp);
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
            <View style={{backgroundColor:'white', width:'100%', height: hp('65%'), borderRadius: 20, paddingTop:'4%',alignItems:'center'}}>
                <Text style={{fontSize:RFPercentage(3), marginBottom:'4%'}}>입/출고</Text>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {inout_arr}
                        renderItem={({item, index}) =>
                            <View style = {{width:'90%', alignSelf:'center'}}>
                            {item.typenum !== 3 &&
                                <DataTable style={[(item.typenum === 1) ? {backgroundColor:'#DBEBF0', borderRadius: 10, marginBottom:'3%'}: {backgroundColor:'#D9DEF0', borderRadius: 10, marginBottom:'3%'}]}>
                                    <DataTable.Header>
                                        <DataTable.Title style ={{flex:1.3}}>종류</DataTable.Title>
                                        <DataTable.Title style ={{flex:3.5}}>이름</DataTable.Title>
                                        <DataTable.Title style ={{flex:5}}>제품 이름</DataTable.Title>
                                        <DataTable.Title style ={{flex:1}}>수량</DataTable.Title>
                                        <DataTable.Title style ={{flex:3}}>팀</DataTable.Title>
                                        <DataTable.Title style ={{flex:4}}>날짜</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell style ={{flex:1.3}}>{item.type}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:3.5}}>{item.user}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:5}}>{String(item.name)}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:1}}>{String(item.amount)}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:3}}>{item.team}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:4}}>{item.time}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                                }
                            {item.typenum === 3 &&
                                <DataTable style={{backgroundColor:'silver', borderRadius: 10, marginBottom:'3%'}}>
                                    <DataTable.Header>
                                        <DataTable.Title style ={{flex:1.3}}>종류</DataTable.Title>
                                        <DataTable.Title style ={{flex:5}}>제품 이름</DataTable.Title>
                                        <DataTable.Title style ={{flex:1.3}}>변경 전</DataTable.Title>
                                        <DataTable.Title style ={{flex:1.3}}>변경 후</DataTable.Title>
                                        <DataTable.Title style ={{flex:3}}>팀</DataTable.Title>
                                        <DataTable.Title style ={{flex:4}}>날짜</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell style ={{flex:1.3, fontSize:RFPercentage(1)}}>{item.type}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:5}}>{String(item.name)}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:1.3}}>{String(item.bef)}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:1.3}}>{String(item.aft)}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:3}}>{item.team}</DataTable.Cell>
                                        <DataTable.Cell style ={{flex:4}}>{item.time}</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                                }
                            </View>
                        }
                        keyExtractor = {(item) => item.key.toString()}
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
        borderRadius: 20,
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
        alignItems: 'center',
    },
    subtitleArea: {
        width: '100%',
        height: hp('3%'),
        marginBottom: hp('5%'),
        alignItems: 'center',
    },
})