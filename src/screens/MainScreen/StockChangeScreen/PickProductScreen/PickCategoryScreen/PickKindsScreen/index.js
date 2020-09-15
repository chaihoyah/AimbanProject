import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function PickKindsScreen({route, navigation}){

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품
    function go_pickCategoryFinalorCheckStock(category){
        if (route.params.whereFrom === 0) navigation.navigate('PickCategoryFinal', {category: category});
        else if (route.params.whereFrom === 1) navigation.navigate('CheckStock', {category: category});
        else if(route.params.whereFrom === 2) navigation.navigate('PutProduct', {category:category});
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:20,color:'black'}}>카테고리를 선택하세요</Text>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(10)}}>
                    <Text style={styles.buttonTitle}>헤드레스트</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(11)}}>
                    <Text style={styles.buttonTitle}>자동차 용품</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(12)}}>
                    <Text style={styles.buttonTitle}>가죽 용품</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(13)}}>
                    <Text style={styles.buttonTitle}>세차 용품</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
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
        width: '100%',
        height: hp('10%'),
        alignItems: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    button: {
        flexDirection: 'row',
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    buttonTitle: {
        color: 'white',
    },
    textArea:{
        width: '100%',
        height: hp('10%'),
        justifyContent: 'center',
    },
})