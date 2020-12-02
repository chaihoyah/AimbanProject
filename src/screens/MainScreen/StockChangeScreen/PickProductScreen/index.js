import React, {Component, useEffect} from 'react';
import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export default function PickProductScreen ({route, navigation}){
    const [productName, setproductName] = React.useState("");
    const [productObj, setproductObj] = React.useState({});
    const [productCode, setproductCode] = React.useState(0);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    //get_prodnamearray로 바꾸기
    const [nameArray, setnameArray] = React.useState(get_prodnameArray());
    const [filterednameArray, setfiltednameArray] = React.useState([]);
    const [isShowingResults, setisShowingResults] = React.useState(false);

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록

    function go_pickCategory(){
        navigation.navigate('PickCategory', {whereFrom:route.params.whereFrom, username:route.params.username, userteam:route.params.userteam, configdata:userConfigdata});
    };

    function find_product(){
        if(route.params.whereFrom === 0)
        {
            var prod = valid_name_check();
            if(prod){
                if(prod.category === 1) navigation.navigate('PickFabType', {category: 1, prodname:prod.name, prodcode:prod.code, whereFrom:route.params.whereFrom,prodcolor: prod.name});
                else if(prod.category === 2) {
                    navigation.navigate('StockChange', {category:2, prodname:prod.name, prodcode:prod.code});
                }
                else {
                console.log(prod);
                navigation.navigate('StockChange', {category:prod.category, prodname:prod.name, prodcode:prod.code, prodcolor:prod.color});
                //navigation.navigate('PickColor', {prodname:prod.name, category:30, configdata:userConfigdata,whereFrom:route.params.whereFrom});
                }
            }
            else {
            Alert.alert(
              "검색 실패",
              "제품명을 확인해주세요!"
            );
            }
        }
        else{
            var prod = get_validdata();
            if(prod.length > 0){
                navigation.navigate('CheckStockPickOne', {configdata:prod});
            }
            else{
                Alert.alert(
                  "검색 실패",
                  "제품명을 확인해주세요!"
                );
            }
        }
    };

    function valid_name_check(){
        ///얘 확인
        for(var i in nameArray){
            if(nameArray[i].key === productName) {
            return nameArray[i];
            }
        }
    };

    function get_validdata()
    {
        var res = [];
        for(var i in userConfigdata.fab){
            if(userConfigdata.fab[i].name === productName){
                res.push(userConfigdata.fab[i]);
            }
        };
        if(res.length>0) return res;
        for(var i in userConfigdata.pro){
            if(userConfigdata.pro[i].name === productName){
                res.push(userConfigdata.pro[i]);
            }
        };
        if(res.length>0) return res;
        for(var i in userConfigdata.sub){
            if(userConfigdata.sub[i].name === productName){
                res.push(userConfigdata.sub[i]);
            }
        };
        return res;
    };

    function go_back(){
        navigation.goBack();
    };

    function get_prodnameArray(){
        var name_arr = [];
        var name_tmp = [];
        if(route.params.whereFrom === 0)
        {
            for(var i in userConfigdata.fab){
                name_arr.push({key:'원단 - '.concat(userConfigdata.fab[i].name), code:userConfigdata.fab[i].code, name:userConfigdata.fab[i].name, category:1});
            };
            for(var i in userConfigdata.pro){
                name_arr.push({key:userConfigdata.pro[i].name.concat(' - ',userConfigdata.pro[i].color), color:userConfigdata.pro[i].color,name:userConfigdata.pro[i].name, code:userConfigdata.pro[i].code, category:30});
            };
            for(var i in userConfigdata.sub){
                name_arr.push({key:'부자재 - '.concat(userConfigdata.sub[i].name),code:userConfigdata.sub[i].code, name:userConfigdata.sub[i].name, category:2});
            };
            console.log(Array.from(new Set(name_arr)));
            return Array.from(new Set(name_arr));
        }
        else{
            for(var i in userConfigdata.fab){
                name_tmp.push(userConfigdata.fab[i].name);
            };
            for(var i in userConfigdata.pro){
                name_tmp.push(userConfigdata.pro[i].name);
            };
            for(var i in userConfigdata.sub){
                name_tmp.push(userConfigdata.sub[i].name);
            };
            var tmp = Array.from(new Set(name_tmp));
            for(var i in tmp){
                name_arr.push({key:tmp[i]})
            }
            return name_arr;
        }
    };

    const getProd = (query) =>{
    if (query){
        const regex = new RegExp(query, 'i');
        setfiltednameArray(
            nameArray.filter((name)=>name.key.search(regex)>=0)
        );
        setisShowingResults(true);
    }
    else {
        setfiltednameArray([]);
        setisShowingResults(false);
    }
     setproductName(query);
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
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>제품 선택</Text>
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
            <View style={styles.buttontitle_area}>
                <Text style={{height:'100%',width:'100%', color:'black',fontSize:RFPercentage('3.3')}}>제품명으로 검색</Text>
            </View>
            <KeyboardAvoidingView style={styles.textInputArea} behavior="padding">
                    <Image
                        style={{position:'absolute',width: wp('65%'), height: hp('12%'),resizeMode:'contain'}}
                        source={require('../../../../images/checkstock/findprod_background.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        onChangeText = {(text) => getProd(text)}
                        value = {productName}
                        placeholder={"제품명 검색"}/>
                    {isShowingResults &&
                            <FlatList
                                data={filterednameArray}
                                style={{width:wp('42%'), height:'100%',alignSelf:'center',marginLeft:'10%'}}
                                renderItem={({item, index}) => {
                                    return(
                                    <TouchableOpacity
                                        style = {{width:'100%', height:hp('4%'), borderBottomColor:'black', borderBottomWidth:1,justifyContent:'center'}}
                                        onPress={() => {setproductName(item.key); setproductObj(item); setisShowingResults(false)}}>
                                    <Text style={{fontSize:RFPercentage(2)}}>
                                    {item.key}
                                    </Text>
                                    </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item) => item.name}
                            />
                    }
            </KeyboardAvoidingView>
            <View style={styles.buttontitle_area}>
                <Text style={{height:'100%',width:'100%', color:'black',fontSize:RFPercentage('3.3')}}>카테고리로 검색</Text>
            </View>
            <View style={styles.productSearchArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x)=>{go_pickCategory()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../images/checkstock/category_button.png')}
                        />
                </TouchableOpacity>
            </View>
            <View style={styles.small_buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x) => {find_product()}}>
                <Image
                    style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                    source={require('../../../../images/checkstock/check_button.png')}
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
        paddingTop: hp('2%'),
        paddingBottom: hp('5%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    headerArea:{
        width: '100%',
        height: hp('9%'),
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: hp('5%'),
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },
    button_small:{
        backgroundColor: "#46c3ad",
        width: '30%',
        height: '20%',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: '3%',
    },
    buttontitle_area: {
        width:wp('56%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    small_buttonArea: {
        width: wp('66%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
        marginTop: hp('2%'),
    },
    button_small:{
        width: wp('27%'),
        height: hp('10%'),
        alignSelf: 'flex-end',
    },
    textInputArea:{
        width: wp('65%'),
        height: hp('30%'),
        alignItems: 'center',
        //justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('3%'),
    },
    productSearchArea: {
        width: wp('65%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('3%'),
    },
    textForm: {
        width: wp('42%'),
        height: hp('6%'),
        marginLeft: wp('6%'),
        marginTop: hp('3%'),
        //textAlign:'left',
    },
})