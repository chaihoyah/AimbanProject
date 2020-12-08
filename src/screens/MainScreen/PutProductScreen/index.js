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
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import config_data from "../../../../config.json";

export default function PutProductScreen ({route, navigation}){
    const [productColor, setproductColor] = React.useState('');
    const [productName, setproductName] = React.useState();
    const [colorName, setcolorName] = React.useState();
    const [prodCat, setProdCat] = React.useState(route.params?.category);
    const [prodCol, setProdCol] = React.useState(route.params?.prodcolor);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    React.useEffect(() =>{
        setProdCat(route.params?.category);
        setProdCol(route.params?.prodcolor);
    },[route.params?.category, route.params?.prodcolor]);

    function go_back(){
        navigation.goBack();
    }

    function go_Main(){
        if(!productName){
            Alert.alert(
              "제품명 입력 오류",
              "제품명을 입력해주세요!"
            );

        }
        else if (prodCat === 1){
                if(!colorName){
                    Alert.alert(
                      "컬러코드 입력 오류",
                      "컬러코드를 입력해주세요!"
                    );
                }
                else{
                    Alert.alert(
                      "등록 정보 확인",
                      "제품명: ".concat(productName, "\n", "카테고리: 원단", "\n", "컬러코드:", colorName),
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => {finish_fab()} }
                      ],
                      { cancelable: false }
                    );
                }
        }
        else if (prodCat === 2){
                Alert.alert(
                  "등록 정보 확인",
                  "제품명: ".concat(productName, "\n", "카테고리: 부자재"),
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => {finish_sub()} }
                  ],
                  { cancelable: false }
                );
        }
        else{
            if(prodCat){
                if(prodCol){
                    catname = check_category();
                    Alert.alert(
                      "등록 정보 확인",
                      "제품명: ".concat(productName, "\n", "카테고리: ", catname, "\n", "색상: ", prodCol),
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => {finish_pro(catname)} }
                      ],
                      { cancelable: false }
                    );
                }
                else{
                    Alert.alert(
                      "색상 선택 오류",
                      "색상을 골라주세요!"
                    );
                }
            }
            else{
                Alert.alert(
                  "카테고리 선택 오류",
                  "카테고리를 골라주세요!"
                );
            }
        }
    };

    function navigate_main(){
        navigation.navigate('Main');
    }

    function finish_fab(){
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.register_fab),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({name:productName, color:colorName})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") navigate_main(); else fetchError();})
        .catch((error)=>{console.error(error);});
    };

    function finish_sub(){
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.register_sub),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({name:productName})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") navigate_main(); else fetchError();})
        .catch((error)=>{console.error(error);});
    };

    function finish_pro(catname){
        fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.register_pro),
        {method:'POST',
        headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({name:productName, color:prodCol, category:catname})})
        .then((response)=> {return response.json();})
        .then((json)=> {if(json.Code == "0") navigate_main(); else fetchError();})
        .catch((error)=>{console.error(error);});
    };

    function fetchError(){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
    };

    function go_pickCategory(){
        navigation.navigate('PickProduct', {whereFrom: 2, username:route.params.username, userteam:route.params.userteam, configdata:userConfigdata, whereAt:1});
    };

    function go_pickColor(){
        navigation.navigate('PutProductPickColor', {username:route.params.username, userteam:route.params.userteam, configdata:userConfigdata});
    };

    function check_category(){
        switch(prodCat){
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
            case 20:
                return '콘솔쿠션';
            case 21:
                return '허리쿠션+방석';
            case 22:
                return '핸들커버';
            case 23:
                return '시트백커버';
            case 24:
                return '방향제';
            case 25:
                return '스마트폰 충전기&거치대';
            case 26:
                return 'etc';
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
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>제품 등록</Text>
                <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image
                        style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                        source={require('../../../images/checkstock/userinfo_icon.png')}
                    />
                    <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                        <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                        <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.productSearchArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/putproduct/putname_button.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"제품명 작성"}
                        onChangeText = {(text) => setproductName(text)}/>
            </View>
            <View style={styles.productSearchArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x)=>{go_pickCategory()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/putproduct/pickcategory_button.png')}
                        />
                    <Text style={styles.buttonTitle}>{check_category()}</Text>
                </TouchableOpacity>
            </View>
            {prodCat!== 1 && prodCat !== 2 && prodCat &&
                <View style={styles.productSearchArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x)=>{go_pickColor()}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../images/putproduct/pickcolor_button.png')}
                            />
                        <Text style={styles.buttonTitle}>{prodCol}</Text>
                    </TouchableOpacity>
                </View>
            }
            {prodCat && prodCat === 1 &&
                <View style={styles.productSearchArea}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../images/putproduct/putname_button.png')}
                            />
                        <TextInput
                            style={styles.textForm}
                            placeholder={"컬러코드 작성"}
                            onChangeText = {(text) => setcolorName(text)}/>
                </View>
            }
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_Main()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/putproduct/requestapproval_button.png')}
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
        paddingTop: hp('5%'),
        paddingBottom: hp('5%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    headerArea:{
        width: wp('80%'),
        height: hp('8%'),
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: '4%',
    },
    putImageArea: {
        width: '80%',
        height: '26%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        alignSelf:'center',
        marginBottom: '5%',
    },
    categoryArea: {
        width: '100%',
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: hp('3%'),
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
        justifyContent: 'center',
    },
    button_small:{
        width: '40%',
        height: '100%',
        alignSelf: 'flex-end',
    },
    buttonTitle:{
        backgroundColor:'silver',
        marginLeft: '30%',
        color: 'black',
    },
    productSearchArea: {
        width: wp('65%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('3%'),
    },
    textForm: {
        width: '60%',
        height: '53%',
        marginLeft: '6%',
        //textAlign:'left',
    },
})