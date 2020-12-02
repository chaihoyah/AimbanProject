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
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

export default function SettingsScreen ({route, navigation}){
    //category: 제품 or 원단 or 부자재, Kinds: 헤드레스트, 자동차용품 ...
    const [productCategory, setproductCategory] = React.useState('');
    const [productKinds, setproductKinds] = React.useState('');

    function go_back(){
        navigation.goBack();
    };

    function go_myInfo(){
        navigation.navigate('SettingsMyinfo', {username:route.params.username, userteam:route.params.userteam, userid:route.params.userid});
    };

    function go_Admin(){
        navigation.navigate('AdminStack');
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
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>설정</Text>
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
                    style={styles.button_small}
                    onPress={(x)=>{go_myInfo()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/setting/info_button.png')}
                        />
                </TouchableOpacity>
            </View>
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button_small}
                    onPress={(x)=>{go_Admin()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../images/setting/adminpage_button.png')}
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
        marginBottom: '20%',
    },
    buttonArea: {
        width: '100%',
        height: '18%',
        alignItems: 'center',
        marginBottom: '3%',
    },
    button_small:{
        width: '45%',
        height: '100%',
        alignItems: 'center',
    },
})