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

export default function PickFabTypeScreen({route, navigation}){
    const [prodName, setprodName] = React.useState(route.params.prodname);
    const [prodCode, setprodCode] = React.useState(route.params.prodcode);
    const [prodCat, setprodCat] = React.useState(route.params.category);


    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(type){
        if(route.params.whereFrom === 0) navigation.navigate('StockChange', {category: prodCat, prodname: prodName, prodcode: prodCode, prodtype: type});
        else if (route.params.whereFrom === 1) navigation.navigate('CheckStock', {category: prodCat, prodname: prodName, prodcode: prodCode, prodtype: type});
        else if(route.params.whereFrom === 2) navigation.navigate('PutProduct', {category: prodCat, prodname: prodName, prodcode: prodCode, prodtype: type});
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>원단 종류 선택</Text>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(3)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>10T</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(2)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>3T</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(1)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>생지</Text>
                </TouchableOpacity>
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
        width: '80%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '3%',
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