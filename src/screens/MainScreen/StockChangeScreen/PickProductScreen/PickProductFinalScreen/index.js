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
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

export default function PickProductFinalScreen({route, navigation}){
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [prodArray, setprodArray] = React.useState([]);
    const [prodCat, setprodCat] = React.useState(route.params.category);
    const [objArray, setobjArray] = React.useState([]);

    React.useEffect(() => {
        setprodArray(get_prodArray());
        console.log(prodArray);
    },[]);

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(name, code){
        //Get Product Code
        if(prodCat === 2){
            if (route.params.whereFrom === 0 ) navigation.navigate('StockChange', {category:prodCat, prodname:name, prodcode:code});
            else if (route.params.whereFrom === 1) navigation.navigate('CheckStockPickOne', {configdata:objArray});
        }
        else{
            if (route.params.whereFrom === 0) navigation.navigate('PickColor', {category:prodCat, prodname:name, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else if (route.params.whereFrom === 1) navigation.navigate('CheckStockPickOne', {configdata:objArray});
        }
    };

    function get_prodArray(){
        var name_arr = [];
        var name_tmp = [];
        var obj_arr = [];
        if(prodCat === 2)
        {
            for(var i in userConfigdata.sub){
                name_arr.push({key:userConfigdata.sub[i].name, code:userConfigdata.sub[i].code});
                obj_arr.push(userConfigdata.sub[i]);
            }
            return Array.from(new Set(name_arr));
        }
        else if(prodCat === 10){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "헤드레스트") {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 11){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "자동차용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 12){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "가죽용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 13){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "세차용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 13){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "세차용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 20){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "콘솔쿠션")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 21){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "허리쿠션+방석")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 22){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "핸들커버")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 23){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "시트백커버")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 24){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "방향제")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 25){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "스마트폰 충전기&거치대")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(prodCat === 26){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "etc")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        var tmp = Array.from(new Set(name_tmp));
        console.log(tmp);
        for(var i in tmp){
            name_arr.push({key:tmp[i], code: -2})
        }
        if(route.params.whereFrom === 1) setobjArray(obj_arr);
        return name_arr;
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>제품 선택</Text>
            </View>
            <View style={{backgroundColor:'gray', width:'100%', height: hp('65%'), borderRadius: 20}}>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {prodArray}
                        renderItem={({item}) =>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x) => {go_pickCategoryFinalorCheckStock(item.key, item.code)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../../images/checkstock/1box.jpg')}
                                />
                            <Text style={styles.buttonTitle}>{item.key}</Text>
                        </TouchableOpacity>
                    </View>
                   }/>
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
    },
    buttonArea: {
        width: '70%',
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '4%',
    },
    scroll:{
        width: '100%',
        height: '100%',
        backgroundColor: 'silver',
        borderRadius: 20,
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
    textArea:{
        width: '100%',
        height: hp('10%'),
        justifyContent: 'center',
        marginBottom: hp('2%'),
    },
})