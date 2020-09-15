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

export default class LoginScreen extends Component{

    doLogin(){
        this.props.navigation.replace('MainStack');
        //replace로 바꾸기
    }

    doMakeID(){
        this.props.navigation.navigate('MakeID');
    }

    render(){
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>로그인</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"ID"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={this.doLogin.bind(this)}>
                        <Text style={styles.buttonTitle}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                     <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={this.doMakeID.bind(this)}>
                        <Text style={styles.buttonTitle}>회원가입</Text>
                     </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'flex-start',
    },
    titleArea: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('5%'),
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
        marginBottom: wp('3%'),
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "30%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
})