import React, {Component, useEffect} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function PickProductScreen ({route, navigation}){
    const [productName, setproductName] = React.useState('');
    const [productCode, setproductCode] = React.useState(0);

    function go_StockChange(){
        navigation.navigate('StockChange');
        console.log(productName);
    };

    function go_pickCategory(){
        navigation.navigate('PickCategory', {whereFrom:0});
    };

    function find_product(){
        //스크롤바 띄우기???
        //
        setproductCode(123);
        setproductName('name');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.productSearchArea}>
                <Text style={{height:'20%',width:'50%', alignSelf:'flex-start', color:'black',fontSize:20}}>제품명 검색</Text>
                <TextInput
                    style={styles.textForm}
                    placeholder={"제품명"}
                    onChangeText = {find_product}
                    />
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_StockChange()}}>
                    <Text style={styles.buttonTitle}>찾기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categoryArea}>
                <Text style={{height:'20%',width:'50%', alignSelf:'flex-start', color:'black',fontSize:20}}>카테고리로 선택</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x)=>{go_pickCategory()}}>
                    <Text style={[styles.buttonTitle, {fontSize:18}]}>카테고리</Text>
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
        paddingTop: hp('5%'),
        paddingBottom: hp('5%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    categoryArea: {
        width: '100%',
        height: hp('30%'),
        alignItems: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    button: {
        flexDirection: 'row',
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "30%",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 40,
        paddingLeft: "8%",
        paddingRight: "8%",
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
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
    buttonTitle: {
        color: 'white',
    },
    productSearchArea: {
        width: '100%',
        height: hp('30%'),
        alignItems: 'center',
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    textForm: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        width: '100%',
        height: '20%',
        //textAlign:'left',
    },
})