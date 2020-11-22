import React, {Component} from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize"

export default function AdminScreen ({navigation}){
    const [adminID, setadminID] = React.useState('');
    const [adminpassword, setadminpassword] = React.useState('');

    function doLogin(){
        navigation.replace('InAdminStack');
        //replace로 바꾸기
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleArea}>
                <Text style={styles.title}>관리자 로그인</Text>
            </View>
            <View style={styles.subtitleArea}>
                <Text style={styles.subtitle}> Administrator Log-in</Text>
            </View>
            <View style={styles.productSearchArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../images/adminlogin/adminloginid_image.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"관리자 ID"}
                        onChangeText = {ID => setadminID(ID)}/>
            </View>
            <View style={styles.productSearchArea}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../images/adminlogin/adminloginpassword_image.png')}
                        />
                    <TextInput
                        style={styles.textForm}
                        placeholder={"관리자 비밀번호"}
                        onChangeText = {ID => setadminID(ID)}/>
            </View>
            <View style={styles.buttonArea}>
                 <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {doLogin()}}>
                    <Image
                        style={{width:'100%',height:'100%',resizeMode:'contain'}}
                        source={require('../../images/login/login_button.png')}
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
        paddingLeft: '15%',
        paddingRight: '15%',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f7ff',
    },
    titleArea: {
        width: '100%',
        height: hp('7%'),
        marginTop: hp('10%'),
        alignItems: 'flex-start',
    },
    title: {
        fontSize: RFPercentage(6),
    },
    productSearchArea: {
        width: '80%',
        height: '8%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '3%',
    },
    subtitleArea: {
        width: '100%',
        marginBottom: hp('10%'),
        alignItems: 'flex-start',
    },
    subtitle: {
        fontSize: RFPercentage(2.5),
    },
    textForm: {
        width: '80%',
        height: '100%',
        marginLeft: '8%',
    },
    buttonArea: {
        width: '95%',
        height: '9%',
        marginTop: '3%',
        alignItems: 'flex-end',
    },
    button: {
        width: "34%",
        height: "100%",
    },
})