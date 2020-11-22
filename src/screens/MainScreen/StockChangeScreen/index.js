import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    KeyboardAvoidingView,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import moment from 'moment';
import config_data from "../../../../config.json";


export default function StockChangeScreen ({route, navigation}){
    const [team, setTeam] = React.useState("");
    const [amount, setAmount] = React.useState();
    const [productName, setProductName] = React.useState(route.params?.prodname);
    const [productCode, setProductCode] = React.useState(route.params?.prodcode);
    const [productType, setProductType] = React.useState("");
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [prodCat, setProdCat] = React.useState(route.params?.category);


    //route parameters: teamName(Char), productName(Char), productCode(unsigned int), doWhat(0:in, 1:out, 2:change)
    //amount -> 수량 나타냄
    React.useEffect(() =>{
        setProductName(route.params?.prodname);
        setProductCode(route.params?.prodcode);
        setProdCat(route.params?.category);
        setTeam(get_teamtext());
        if(prodCat===1) setProductType(route.params?.prodtype);
        else if(prodCat !== 2) setProductType(route.params?.prodcolor);
        console.log(userConfigdata);
    }, [route.params?.teamVal,route.params?.prodname]);

    function go_back(){
        navigation.goBack();
    };

    function go_pickteam(){
        navigation.navigate('PickTeam');
    };

    function go_pickproduct(){
        navigation.navigate('PickProduct', {whereFrom: 0, username:route.params.username,userteam:route.params.userteam, configdata:userConfigdata});
    };
    function do_putin(){
        //입출조정 정보 서버에 넘기기
        try{
            let final_amount = parseInt(amount);
        }catch(error){
            Alert.alert(
              "수량입력 오류",
              "수량을 제대로 입력해주세요!"
            );
        }
        if(!productName){
            Alert.alert(
              "제품 선택 오류",
              "제품을 선택해주세요!"
            );
        }
        else if(!amount){
            Alert.alert(
              "수량 입력 오류",
              "수량을 입력해주세요!"
            );
        }
        else{
            if(prodCat !== 2){
                Alert.alert(
                  "정보 확인",
                  "사용자 이름: ".concat(route.params.username, "\n", "팀: ", route.params.userteam, "\n", "제품: ", productName.concat('-', productType), "\n", "수량: ",amount),
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => {finish_makeid()} }
                  ],
                  { cancelable: false }
                );
            }
            else {
                Alert.alert(
                  "정보 확인",
                  "사용자 이름: ".concat(route.params.username, "\n", "팀: ", route.params.userteam, "\n", "제품: ", productName, "\n", "수량: ",amount),
                  [
                    {
                      text: "Cancel",
                      style: "cancel"
                    },
                    { text: "OK", onPress: () => {finish_stockchange()} }
                  ],
                  { cancelable: false }
                );
            }
        }
    };

    function finish_stockchange(){
        /**
        if (route.params.doWhat === 2 ){
            //입고
            var date = moment().utcOffset('+09:00').format('YYYY-MM-DD');
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.stock_update),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({code:productCode, date:date, after:final_amount, id:route.params.userid})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") console.log("success"); else fetchError();})
            .catch((error)=>{console.error(error);});
        }
        else if (route.params.doWhat === 1){
            //출고
            final_amount *= -1;
            var date = moment().utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.stock_set),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({time:date, code:productCode, team: route.params.userteam, amount: final_amount})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") console.log("success"); else fetchError();})
            .catch((error)=>{console.error(error);});
        }
        else{
            //입고
            var date = moment().utcOffset('+09:00').format('YYYY-MM-DD HH:mm:ss');
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.stock_set),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({time:date, code:productCode, team: route.params.userteam, amount: final_amount})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") console.log("success"); else fetchError();})
            .catch((error)=>{console.error(error);});
        }**/
        //navigation.navigate('Main');
        console.log("finished");
    }

    function fetchError(){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
    };

    function get_headertext(){
        if(route.params.doWhat === 2){
            return "조정";
        }
        else if(route.params.doWhat === 1){
            return "출고";
        }
        else{
            return "입고";
        }
    }
    function get_buttontext(){
        if(route.params.doWhat === 2){
            return require('../../../images/changestock/approvalrequest_image.png');
        }
        else if(route.params.doWhat === 1){
            return require('../../../images/changestock/putoutproduct_image.png');
        }
        else{
            return require('../../../images/changestock/putproduct_image.jpg');
        }
    };

    function get_teamtext(){
        if(route.params?.teamVal == null) return route.params.userteam;
        if(route.params?.groupVal == 0){
            if(route.params?.teamVal == 0)
            {
                return "미싱 1팀";
            }
            else if(route.params?.teamVal == 1)
            {
                return "미싱 2팀";
            }
            else if(route.params?.teamVal == 2)
            {
                return "재단팀";
            }
            else return null;
        }
        else if(route.params?.groupVal == 1){
            if(route.params?.teamVal == 0)
            {
                return "미싱팀";
            }
            else if(route.params?.teamVal == 1)
            {
                return "생산지원팀";
            }
            else return null;
        }
        else if(route.params?.groupVal == 2){
            if(route.params?.teamVal == 0)
            {
                return "헤드레스트팀";
            }
            else if(route.params?.teamVal == 1)
            {
                return "용품팀";
            }
            else return null;
        }
        else return null;
    };

    function get_prodname(){
        if(prodCat){
            if(prodCat === 1) return productName.concat(route.params?.prodtype);
            else if(prodCat === 2) return '부자재 - '.concat(productName);
            else return productName.concat(route.params?.prodcolor);
        }
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
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>{get_headertext()}</Text>
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
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickteam()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/changestock/selectteam_button.png')}
                        />
                    <Text style={styles.buttonTitle}>{team}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickproduct()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/changestock/selectproduct_button.png')}
                        />
                    <Text style={styles.buttonTitle}>{productName}</Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView  style={styles.textInputArea} behavior="padding">
                <Image
                    style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                    source={require('../../../images/changestock/inputnum_button.png')}
                    />
                <TextInput
                    style={styles.textForm}
                    onChangeText={(amount) => setAmount(amount)}
                    />
            </KeyboardAvoidingView>
            <View style={styles.small_buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x) => {do_putin()}}>
                <Image
                    style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                    source={get_buttontext()}
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
    headerArea:{
        width: '100%',
        height: '9%',
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: '4%',
    },
    buttonArea: {
        width: wp('60%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('2%'),
    },
    small_buttonArea: {
        width: '80%',
        height: '10%',
        alignItems: 'center',
        marginTop: '3%',
        alignSelf: 'center',
    },
    button_small:{
        width: '40%',
        height: '100%',
        alignSelf: 'flex-end',
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        backgroundColor:'silver',
        marginLeft: '30%',
        color: 'black',
    },
    textInputArea:{
        width: wp('60%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('3%'),
        alignSelf: 'center',
    },
    textForm: {
        alignSelf:'flex-end',
        width: wp('50%'),
        height: hp('6%'),
        marginRight: '15%',
        textAlign:'right',
    },
})