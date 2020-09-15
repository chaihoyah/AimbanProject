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

export default function SettingsScreen ({route, navigation}){
    //category: 제품 or 원단 or 부자재, Kinds: 헤드레스트, 자동차용품 ...
    const [productCategory, setproductCategory] = React.useState('');
    const [productKinds, setproductKinds] = React.useState('');

    function go_myInfo(){
        navigation.navigate('Main');
        console.log(productName);
    };

    function go_Admin(){
        navigation.navigate('Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_myInfo()}}>
                    <Text style={styles.buttonTitle}>내 정보</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_Admin()}}>
                    <Text style={styles.buttonTitle}>관리자 페이지</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonArea: {
        width: '100%',
        height: hp('10%'),
        alignItems: 'center',
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
    },
    button_small:{
        backgroundColor: "#46c3ad",
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 18,
    },
})