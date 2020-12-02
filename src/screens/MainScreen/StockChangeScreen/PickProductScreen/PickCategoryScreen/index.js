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

export default function PickCategoryScreen({route, navigation}){
    const [isSewingteam, setisSewingteam] = React.useState(false);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);

    React.useEffect(() =>{
        if(route.params.userteam === "개발팀"){setisSewingteam(true)};
    }, []);

    function go_back(){
        navigation.goBack();
    };

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록
    function go_pickCategoryFinalorCheckStock(category){
        if(route.params.whereFrom === 2){
            if(category === 0) navigation.navigate('PickKinds', {category:category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else if(category === 1) navigation.navigate('PutProduct', {category:category});
            else if(category === 2) navigation.navigate('PutProduct', {category:category});
        }
        else{
            if(category === 0) navigation.navigate('PickKinds', {category:category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else if(category === 1) navigation.navigate('PickColor', {category:category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
            else if(category === 2) navigation.navigate('PickProductFinal', {category:category, whereFrom:route.params.whereFrom, configdata:userConfigdata});
        }
    };

    function get_bujajaeImage(){
        //isSewingTeam일때 바꾸기
        if(isSewingteam) return require('../../../../../images/pickcategory/bujajae.jpg');
        else return require('../../../../../images/pickcategory/bujajae_two.png');
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
                        source={require('../../../../../images/checkstock/back_button.jpg')}
                    />
                </TouchableOpacity>
                <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>종류 선택</Text>
                <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Image
                        style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                        source={require('../../../../../images/checkstock/userinfo_icon.png')}
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
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(0)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../../images/pickcategory/jaepum.png')}
                        />
                </TouchableOpacity>
            </View>
            {isSewingteam &&
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_pickCategoryFinalorCheckStock(1)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../../images/pickcategory/wondan.jpg')}
                            />
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={(x) => {go_pickCategoryFinalorCheckStock(2)}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={get_bujajaeImage()}
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
    buttonArea: {
        width: '80%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
    textArea:{
        width: '100%',
        height: hp('10%'),
        justifyContent: 'center',
    },
})