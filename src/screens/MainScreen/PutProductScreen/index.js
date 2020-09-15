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

export default function PutProductScreen ({route, navigation}){
    //category: 제품 or 원단 or 부자재, Kinds: 헤드레스트, 자동차용품 ...
    const [productCategory, setproductCategory] = React.useState('');
    const [productKinds, setproductKinds] = React.useState('');
    const [productColor, setproductColor] = React.useState('');
    const [productName, setproductName] = React.useState('');
    const [productCat, setproductCat] = React.useState('');

    function go_Main(){
        navigation.navigate('Main');
    };

    function go_pickCategory(){
        navigation.navigate('PickCategory', {whereFrom: 2});
    };

    function find_product(){
        //category 받은걸로 kinds, category 정하기
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
            <View style={styles.putImageArea}>
                 <Text style={{height:'25%',width:'50%', alignSelf:'flex-start', color:'black',fontSize:18,marginBottom:'3%',}}>사진</Text>
            </View>
            <View style={styles.productSearchArea}>
                <Text style={{height:'25%',width:'50%', alignSelf:'flex-start', color:'black',fontSize:18,marginBottom:'3%',}}>제품명</Text>
                <TextInput
                    style={styles.textForm}
                    placeholder={"제품명"}
                    onChangeText = {find_product}
                    />
            </View>
            <View style={styles.categoryArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x)=>{go_pickCategory()}}>
                    <Text style={[styles.buttonTitle, {fontSize:18}]}>카테고리</Text>
                    <Text style={styles.buttonTitle}>{productCat}</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_Main()}}>
                    <Text style={styles.buttonTitle}>승인 요청</Text>
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
    putImageArea: {
        width: '100%',
        height: hp('40%'),
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    categoryArea: {
        width: '100%',
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: hp('3%'),
    },
    buttonArea: {
        width: '100%',
        height: hp('7%'),
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: "8%",
        paddingRight: "8%",
    },
    button_small:{
        backgroundColor: "#46c3ad",
        width: '30%',
        height: '100%',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
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
})