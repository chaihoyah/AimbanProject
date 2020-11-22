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
    Image,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

export default function CheckStockScreen ({route, navigation}){
    const [productName, setproductName] = React.useState('');
    const [productCode, setproductCode] = React.useState(0);
    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품
    const [productCat, setproductCat] = React.useState('');
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);

    function go_back(){
        navigation.goBack();
    };

    function go_StockChange(){
        navigation.navigate('Main');
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
            <View style={styles.headerArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{width:'10%',height:'40%', marginRight:'2%'}}
                    onPress={(x)=>{go_back()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../../images/checkstock/back_button.jpg')}
                    />
                </TouchableOpacity>
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>재고 확인</Text>
                <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image
                        style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                        source={require('../../../images/checkstock/userinfo_icon.png')}
                    />
                    <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                        <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>홍길동</Text>
                        <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>재단팀</Text>
                    </View>
                </View>
            </View>
            <View style={styles.buttontitle_area}>
                <Text style={{height:'100%',width:'50%', color:'black',fontSize:RFPercentage('3.3')}}>제품명 검색</Text>
            </View>
            <View style={styles.productSearchArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/checkstock/findprod_background.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"제품명 검색"}
                        onChangeText = {find_product}/>
            </View>
            <View style={styles.buttontitle_area}>
                <Text style={{height:'100%',width:'50%', color:'black',fontSize:RFPercentage('3.3')}}>카테고리 검색</Text>
            </View>
            <View style={styles.productSearchArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x)=>{go_pickCategory()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/checkstock/category_button.png')}
                        />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_StockChange()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/checkstock/check_button.png')}
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
        paddingTop: '2%',
        paddingBottom: '5%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    headerArea:{
        width: '100%',
        height: '9%',
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: '8%',
    },
    formArea: {
        width: '100%',
        justifyContent: 'center',
    },
    buttonArea: {
        width: '80%',
        height: '10%',
        alignItems: 'center',
        alignSelf: 'center',
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },
    button_small:{
        width: '40%',
        height: '100%',
        alignSelf: 'flex-end',
    },
    buttontitle_area: {
        width:'70%',
        height: '4%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    productSearchArea: {
        width: '80%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '7%',
    },
    textForm: {
        width: '60%',
        height: '53%',
        marginLeft: '6%',
        //textAlign:'left',
    },
})