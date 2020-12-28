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
import {Table, Row} from 'react-native-table-component';

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
        console.log(inout_obj);
        for(let i=0;i<inout_obj.length;i++){
            let date = inout_obj[i].time.slice(0,10);
            let nm = Number((' '+inout_obj[i].value).slice(1).slice(8,12));
            let par = JSON.parse(inout_obj[i].value);
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

                tmp.push({key:k, team:inout_obj[i].team, time:date, type:"입고", name:real_nm, amount:par.amount, user:inout_obj[i].who, typenum:1});
            }
            else if(inout_obj[i].type === 2) {

                tmp.push({key:k, team:inout_obj[i].team, time:date, type:"출고", name:real_nm, amount:par.amount, user:inout_obj[i].who, typenum:2});
            }
            else if(inout_obj[i].type === 3){

                tmp.push({key:k, team:inout_obj[i].team, time:date, type:"조정", name:real_nm, bef:par.before, aft:par.after, typenum:3});
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
                                <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                    <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={[(item.typenum === 1) ? {backgroundColor:'#DBEBF0'}: {backgroundColor:'#D9DEF0'}]}>
                                        <Row data={['요청 종류', '수량', '제품 이름', '이름', '팀', '날짜']} widthArr={[wp('12%'),wp('5%'),wp('26%'),wp('12%'),wp('16%'),wp('18%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(2)}}/>
                                        <Row data={[item.type, String(item.amount), String(item.name), item.user, item.team, item.time]} widthArr={[wp('12%'),wp('5%'),wp('26%'),wp('12%'),wp('16%'),wp('18%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.8)}}/>
                                    </Table>
                                </ScrollView>
                                }
                            {item.typenum === 3 &&
                                <ScrollView style={{marginTop: '2%', width: '100%', alignSelf:'center'}} horizontal={true}>
                                    <Table borderStyle = {{borderRadius: 20, borderWidth: 0.7, borderColor: 'black'}} style ={{backgroundColor:'#EBD9F0'}}>
                                        <Row data={['요청 종류', '전', '후','제품 이름',  '팀', '날짜']} widthArr={[wp('12%'),wp('5%'),wp('5%'),wp('36%'),wp('13%'),wp('18%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(2)}}/>
                                        <Row data={[item.type, String(item.bef), String(item.aft),String(item.name),item.team, item.time]} widthArr={[wp('12%'),wp('5%'),wp('5%'),wp('36%'),wp('13%'),wp('18%')]} style={{height:50}} textStyle={{textAlign: 'center', fontWeight: '100', fontSize:RFPercentage(1.8)}}/>
                                    </Table>
                                </ScrollView>
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