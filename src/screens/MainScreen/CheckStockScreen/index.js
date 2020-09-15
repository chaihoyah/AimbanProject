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

export default function CheckStockScreen ({route, navigation}){
    const [productName, setproductName] = React.useState('');
    const [productCode, setproductCode] = React.useState(0);
    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품
    const [productCat, setproductCat] = React.useState('');

    function go_StockChange(){
        navigation.navigate('StockChange');
        console.log(productName);
    };

    function go_pickCategory(){
        navigation.navigate('PickCategory', {whereFrom: 1});
    };

    function find_product(){
        //스크롤바 띄우기???
        //
        setproductCode(123);
        setproductName('name');
    };
    React.useEffect(() =>{
        if(route.params?.category){
          setproductCat(check_category());
            console.log(productCat);
        }
    });

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
            <View style={styles.productSearchArea}>
                <Text style={{height:'25%',width:'50%', alignSelf:'flex-start', color:'black',fontSize:18,marginBottom:'3%',}}>제품명 검색</Text>
                <TextInput
                    style={styles.textForm}
                    placeholder={"제품명"}
                    onChangeText = {find_product}
                    />
            </View>
            <View style={styles.categoryArea}>
                <Text style={{height:'15%',width:'50%', alignSelf:'flex-start', color:'black',fontSize:18}}>카테고리로 선택</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x)=>{go_pickCategory()}}>
                    <Text style={[styles.buttonTitle, {fontSize:18}]}>카테고리</Text>
                    <Text style={styles.buttonTitle}>{productCat}</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
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
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.scrollview_button}
                        onPress={(x)=>{go_pickCategory()}}>
                        <Text style={[styles.buttonTitle, {fontSize:18,backgroundColor:'black'}]}>{item.key}</Text>
                        <Text style={[styles.buttonTitle, {fontSize:18}]}>{item.key}</Text>
                    </TouchableOpacity>}
                    />
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_StockChange()}}>
                    <Text style={styles.buttonTitle}>찾기</Text>
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
        height: hp('35%'),
        backgroundColor: 'gray',
        borderRadius: 20
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
})