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

export default function PickTeamScreen ({route, navigation}){

    function pickteam(name){
        navigation.navigate('StockChange',{teamName: name});
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {pickteam("재단팀")}}>
                    <Text style={styles.buttonTitle}>재단팀</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {pickteam("미싱팀")}}>
                    <Text style={styles.buttonTitle}>미싱팀</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {pickteam("미싱팀 - 차산리")}}>
                    <Text style={styles.buttonTitle}>미싱팀 - 차산리</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {pickteam("헤드팀")}}>
                    <Text style={styles.buttonTitle}>헤드팀</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {pickteam("용품팀")}}>
                    <Text style={styles.buttonTitle}>용품팀</Text>
                    <Text style={[styles.buttonTitle]}> 버튼 이미지 </Text>
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
        marginTop: hp('2%'),
        marginBottom: hp('2%'),
    },
    button: {
        flexDirection: 'row',
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 40,
        paddingLeft: "5%",
        paddingRight: "5%",
    },
    buttonTitle: {
        color: 'white',
    },
})