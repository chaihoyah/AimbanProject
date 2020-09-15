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
import { useFocusEffect } from '@react-navigation/native';


export default function StockChangeScreen ({route, navigation}){
/*    const [team, setTeam] = React.useState('');
    const [productName, setProductName] = React.useState('');
    const [productCode, setProductCode] = React.useState('');*/
    const [amount, setAmount] = React.useState(0);

    //route parameters: teamName(Char), productName(Char), productCode(unsigned int), doWhat(0:in, 1:out, 2:change)
    //amount -> 수량 나타냄
/*    React.useEffect(() =>{
        if(route.params?.teamName){
        setTeam(route.params?.teamName);
        console.log(team);
        }
        if(route.params?.productName){
        setProductName(route.params?.productName);
        console.log(productName);
        }
        if(route.params?.productCode){
        setProductCode(route.params?.productCode);
        console.log(productCode);
        }
    })*/
    useFocusEffect(
    React.useCallback(() => {
      //setTeam(route.params?.teamName);
      //console.log(team);
      //나갈때
/*      const unsubscribe = () =>{
        console.log('LL');
      }
      return () => unsubscribe();*/
    }, [])
  );

    function go_pickteam(){
        navigation.navigate('PickTeam');
    };

    function go_pickproduct(){
        navigation.navigate('PickProduct');
    };
    function do_putin(){
        //입출조정 정보 서버에 넘기기
        let final_amount = parseInt(amount);
        if (route.params.doWhat === 2 ){
        //조정
        }
        else if (route.params.doWhat === 1){
        //출고
        final_amount *= -1;
        }
        else{
        //입고
        }
        //finalamount 넘기기
        navigation.navigate('Main');
    };
    function get_buttontext(){
        if(route.params.doWhat === 2){
            return "승인 요청";
        }
        else if(route.params.doWhat === 1){
            return "출고";
        }
        else{
            return "입고";
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickteam()}}>
                    <Text style={styles.buttonTitle}>팀 선택</Text>
                    <Text style={styles.buttonTitle}>{route.params?.teamName}</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickproduct()}}>
                    <Text style={styles.buttonTitle}>제품 선택</Text>
                    <Text style={styles.buttonTitle}>{route.params?.productName}</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <View style={[styles.button, {flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-start'} ]}>
                    <Text style={styles.buttonTitle}>수량 입력</Text>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"(개)"}
                        onChangeText={(amount) => setAmount(amount)}
                        />
                </View>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{backgroundColor: "#46c3ad", width: "30%", height: "100%",justifyContent: 'center',alignItems:'center', alignSelf:'flex-end', borderRadius: 20, marginTop: hp('3%'), marginBottom: hp('3%'),}}
                    onPress={(x) => {do_putin()}}>
                    <Text style={styles.buttonTitle}>{get_buttontext()}</Text>
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
        marginTop: hp('3%'),
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
        marginTop: hp('3%'),
        marginBottom: hp('3%'),
    },
    buttonTitle: {
        color: 'white',
    },
    textForm: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        width: '60%',
        height: '70%',
        marginLeft: '15%',
        textAlign:'right',
    },
})