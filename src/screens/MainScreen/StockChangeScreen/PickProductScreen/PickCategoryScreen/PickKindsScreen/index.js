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

export default function PickKindsScreen({route, navigation}){
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(category){
        if(route.params.whereFrom === 2){
            if(category == 11)
                navigation.navigate('PickCategoryFinal', {category: category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else
                navigation.navigate('PutProduct', {category: category});
        }
        else{
            if(category == 11)
                navigation.navigate('PickCategoryFinal', {category: category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else
                navigation.navigate('PickProductFinal', {category: category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
        }

    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>카테고리 선택</Text>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(10)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>헤드레스트</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(11)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>자동차 용품</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(12)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>가죽 용품</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(13)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../../images/checkstock/1box.jpg')}
                        />
                    <Text style={styles.buttonTitle}>세차 용품</Text>
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