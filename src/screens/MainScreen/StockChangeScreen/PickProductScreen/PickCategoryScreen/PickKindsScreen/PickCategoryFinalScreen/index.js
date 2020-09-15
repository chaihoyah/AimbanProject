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

export default function PickCategoryFinalScreen ({route, navigation}){
    const category = route.params.category

    function go_StockChange(){
        navigation.navigate('StockChange', {productName:"pro", productCode:100});
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:20,color:'black'}}>종류를 선택하세요</Text>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_StockChange()}}>
                    <Text style={styles.buttonTitle}>제품</Text>
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