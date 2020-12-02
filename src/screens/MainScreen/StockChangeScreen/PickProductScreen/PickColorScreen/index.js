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

export default function PickColorScreen({route, navigation}){
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [colorArray, setcolorArray] = React.useState([]);
    const [prodName, setprodName] = React.useState(route.params.prodname);
    const [prodCat, setprodCat] = React.useState(route.params.category);

    React.useEffect(() => {
        setcolorArray(get_colorArray());
        console.log(colorArray);
    },[]);

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(name, code){
        //Get Product Code
        if(prodCat === 1){
            //원단일때
            navigation.navigate('PickFabType', {category:prodCat, prodname:name, prodcode:code, whereFrom:route.params.whereFrom})
        }
        else{
            //제품일때
            if (route.params.whereFrom === 0 ) navigation.navigate('StockChange', {category:prodCat, prodname:prodName, prodcode:code, prodcolor:name});
            else if (route.params.whereFrom === 1) navigation.navigate('CheckStock', {category:prodCat, prodname:prodName, prodcode:code, prodcolor:name});
            else if(route.params.whereFrom === 2) navigation.navigate('PutProduct', {category:prodCat, prodname:prodName, prodcode:code, prodcolor:name});
        }
    };

    function get_colorArray(){
        var name_arr = [];
        if(prodCat === 1)
        {
            for(var i in userConfigdata.fab){
                name_arr.push({key:userConfigdata.fab[i].name, code:userConfigdata.fab[i].code});
            };
        }
        else
        {
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].name === prodName) name_arr.push({key:userConfigdata.pro[i].color, code:userConfigdata.pro[i].code});
            };
        }

        console.log(Array.from(new Set(name_arr)));
        return Array.from(new Set(name_arr));
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>색상 선택</Text>
            </View>
            <View style={{backgroundColor:'gray', width:'100%', height: hp('65%'), borderRadius: 20}}>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {colorArray}
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