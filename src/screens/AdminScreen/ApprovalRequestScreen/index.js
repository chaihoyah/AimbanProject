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
import CheckBox from '@react-native-community/checkbox';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize"

export default function ApprovalRequestScreen ({route, navigation}){
    const [buttonText, setbuttonText] = React.useState('선택');
    const [check, setCheck] = React.useState(false);
    const [isSelectChecked, setSelectChecked] = React.useState(false);

    function go_StockChange(){
        navigation.navigate('StockChange');
        console.log(productName);
    };

    function go_pickCategory(){
        navigation.navigate('PickCategory', {whereFrom: 1});
    };

    function select(){

        if(!isSelectChecked) setbuttonText('승인');
        else setbuttonText('선택');
        setSelectChecked(!isSelectChecked);
    };

    function check_category(){
        setproductCat(route.params?.category);
        switch(route.params?.category){
            case 1:
                return '원단';
            case 2:
                return '부자재';
            case 10:
                return '헤드레스트';
            case 11:
                return '자동차용품';
            case 12:
                return '가죽용품';
            case 13:
                return '세차용품';
        };
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={{color:'black', fontSize:RFPercentage(4.5)}}>승인요청 페이지</Text>
            </View>
            <View style={styles.subtitleArea}>
                <Text style={{color:'black', fontSize:RFPercentage(2.4)}}>Approval request page</Text>
            </View>
            <View style={{backgroundColor:'white', width:'100%', height: hp('65%'), borderRadius: 20, paddingTop:'8%'}}>
                <Text style={{fontSize:RFPercentage(3), alignSelf:'center', marginBottom:'3%'}}>승인 목록</Text>
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
                        <View style = {{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.scrollview_button}
                                onPress={(x)=>{go_pickCategory()}}>
                                <Text style={[styles.buttonTitle, {fontSize:18,backgroundColor:'black'}]}>{item.key}</Text>
                                <Text style={[styles.buttonTitle, {fontSize:18}]}>{item.key}</Text>
                            </TouchableOpacity>
                            <View style = {{alignSelf:'center'}}>
                                {isSelectChecked && <CheckBox
                                   disabled={false}
                                    value={check}
                                    onValueChange={value => setCheck(value)}
                                />}
                            </View>
                        </View>}
                        />
                </View>
                <View style={{alignSelf:'center',width:'60%', height:hp('10%'), flexDirection:'row',marginTop:'10%',justifyContent:'space-between',}}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x)=>{select()}}>
                            <Text style={[styles.buttonTitle, {fontSize:RFPercentage(2.6)}]}>{buttonText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x)=>{go_pickCategory()}}>
                            <Text style={[styles.buttonTitle, {fontSize:RFPercentage(2.6)}]}>모두 승인</Text>
                        </TouchableOpacity>
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
        backgroundColor: "#46c3ad",
        width: "45%",
        height: "65%",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
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
        height: hp('37%'),
        backgroundColor: 'white',
        borderRadius: 20,
    },
    scrollview_button: {
        width: '70%',
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