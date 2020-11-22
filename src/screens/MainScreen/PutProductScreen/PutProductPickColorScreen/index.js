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
    Alert,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

export default function PutProductPickColorScreen({route, navigation}){
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [colorArray, setcolorArray] = React.useState([]);
    const [colorName, setcolorName] = React.useState();

    React.useEffect(() => {
        setcolorArray(get_colorArray());
    },[]);

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(color){
        navigation.navigate('PutProduct', {prodcolor:color});
    };

    function set_newcolor(){
        if(colorName) navigation.navigate('PutProduct', {prodcolor:colorName});
        else{
            Alert.alert(
              "색상 입력 오류",
              "색상을 입력하거나 선택해주세요!"
            );
        }
    };

    function get_colorArray(){
        var name_arr = [];
        var name_tmp = [];
        for(var i in userConfigdata.fab){
            name_tmp.push(userConfigdata.fab[i].name);
        };
        for(var i in userConfigdata.pro){
            name_tmp.push(userConfigdata.pro[i].color);
        };

        var tmp = Array.from(new Set(name_tmp));
        for(var i in tmp){
            name_arr.push({key:tmp[i]})
        }
        return name_arr;
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textArea}>
                <Text style={{fontSize:RFPercentage('4.5'),color:'black',alignSelf:'center'}}>색상 선택</Text>
            </View>
            <View style={styles.productSearchArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../images/putproduct/putname_button.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"새로운 색상 추가시 작성"}
                        onChangeText = {(text) => setcolorName(text)}/>
            </View>
            <View style={{backgroundColor:'silver', width:'75%', height: hp('50%'),alignSelf:'center', borderRadius: 20}}>
                <View style = {styles.scroll}>
                    <FlatList
                        data = {colorArray}
                        renderItem={({item}) =>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x) => {go_pickCategoryFinalorCheckStock(item.key)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/checkstock/1box.jpg')}
                                />
                            <Text style={styles.buttonTitle}>{item.key}</Text>
                        </TouchableOpacity>
                    </View>
                   }/>
                </View>
            </View>
            <View style={styles.productSearchArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={()=>{set_newcolor()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../images/checkstock/check_button.png')}
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
        paddingTop: hp('3%'),
        paddingBottom: hp('3%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    productSearchArea: {
        width: wp('65%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('3%'),
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
        paddingTop: '2%',
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent:'center',
    },
    button_small:{
        width: '40%',
        height: '100%',
        alignSelf: 'flex-end',
    },
    buttonTitle: {
        color: 'black',
        fontSize: RFPercentage('3'),
    },
    textForm: {
        width: '60%',
        height: '53%',
        marginLeft: '6%',
        //textAlign:'left',
    },
})