import React, {Component, useEffect} from 'react';
import {
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    FlatList,
    TouchableWithoutFeedback,
    Alert,
    BackHandler,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import config_data from "../../../../../config.json";

export default function PickProductScreen ({route, navigation}){
    const [productName, setproductName] = React.useState("");
    const [productObj, setproductObj] = React.useState({});
    const [productCode, setproductCode] = React.useState(0);
    const [userConfigdata, setuserConfigdata] = React.useState(route.params.configdata);
    const [prodCat, setprodCat] = React.useState();
    //get_prodnamearray로 바꾸기
    const [nameArray, setnameArray] = React.useState(get_prodnameArray());
    const [filterednameArray, setfiltednameArray] = React.useState([]);
    const [isShowingResults, setisShowingResults] = React.useState(false);
    // 0 제품선택, 1 카테고리 선택, 2 제품_카테고리 선택, 3 자동차 용품_카테고리 선택, 4 제품 최종 나열, 5 컬러 선택, 6 팀_그룹 선택, 7 팀_팀 선택, 8 원단_타입 선택
    const [whereAt, setwhereAt] = React.useState(route.params.whereAt);
    const [showAll, setshowAll] = React.useState(false);

    //PickCategory Const 들
    const [isSewingteam, setisSewingteam] = React.useState(false);
    const [isProdDelete, setisProdDelete] = React.useState(route.params.isproddelete);

    //PickProductFinal Const 들
    const [prodArray, setprodArray] = React.useState([]);
    const [objArray, setobjArray] = React.useState([]);

    //PickColor Const 들
    const [colorArray, setcolorArray] = React.useState([]);

    //PickTeam Const 들
    const [groupVal, setgroupVal] = React.useState();
    const [teamVal, setteamVal] = React.useState();

    const [path, setPath] = React.useState([]);

    //1 원단, 2 부자재, 10 헤드레스트, 11 자동차용품, 12 가죽용품, 13 세차용품,
    //자동차용푸 - 20콘솔쿠션, 21 허리쿠션+방석, 22 핸들커버, 23 시트백커버, 24 방향제, 25 스마트폰 충전기&거치대, 26 etc
    //whereFrom 0: 입출조정 1: 재고확인 2: 제품등록 3: 재고확인-입출고내역확인

    React.useEffect(() =>{
        if(route.params.userteam === "재단팀"){setisSewingteam(true)};

        const backAction = () => {
            if(path.length>1){
                let current = path.pop();
                setwhereAt(path[path.length-1]);
            }
            else if(path.length === 1){
                let current = path.pop();
                if(current === 7) setwhereAt(6);
                else if(current === 2 || current === 4) setwhereAt(1);
                else setwhereAt(0);

                setshowAll(false);
            }
            else{
                navigation.goBack();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [whereAt]);

    function go_Categoryinside(){
        setPath(path.concat(1));

        setwhereAt(1);
    };

    function go_showAll(){
        setPath(path.concat(6));
        setshowAll(true);
        setwhereAt(6);
    };

    //PickCategory 함수들 (제품,원단,부자재 선택)

    function go_afterCategory_inside(category){
        if(route.params.whereFrom === 2){
            if(category === 0) {
                setPath(path.concat(2));
                setwhereAt(2);
                setprodCat(category)
            }
            else if(!isProdDelete){
                if(category === 1) navigation.navigate('PutProduct', {category:category});
                else if(category === 2) navigation.navigate('PutProduct', {category:category});
            }
            else{
                if(category === 1) {
                    setPath(path.concat(5));
                    setprodCat(category);
                    setcolorArray(get_colorArray(category, "fab"));
                    setwhereAt(5);
                }
                else if(category === 2) {
                    setPath(path.concat(4));
                    setprodCat(category);
                    setprodArray(get_prodArray(category));
                    setwhereAt(4);
                }
            }
        }
        else{
            if(category === 0) {
                setPath(path.concat(2));
                setwhereAt(2);
                setprodCat(category);
            }
            else if(category === 1) {
                setPath(path.concat(5));
                setprodCat(category);
                setcolorArray(get_colorArray(category, "fab"));
                setwhereAt(5);
            }
            else if(category === 2) {
                setPath(path.concat(4));
                setprodCat(category);
                setprodArray(get_prodArray(category));
                setwhereAt(4);
            }
        }
    };

    function get_bujajaeImage(){
        //isSewingTeam일때 바꾸기
        if(isSewingteam) return require('../../../../images/pickcategory/bujajae.jpg');
        else return require('../../../../images/pickcategory/bujajae_two.png');
    };

    //PickKinds 함수들 (제품 카테고리 선택)
    function go_afterKinds_inside(category){
        if(route.params.whereFrom === 2){
            if(category === 11)
             {
                 setPath(path.concat(3));
                 setwhereAt(3);
                 setprodCat(category);
             }
            else{
                if(!isProdDelete) navigation.navigate('PutProduct', {category: category});
                else{
                    setPath(path.concat(4));
                    setprodCat(category);
                    setprodArray(get_prodArray(category));
                    setwhereAt(4);
                }
            }
        }
        else{
            if(category === 11) {
                setPath(path.concat(3));
                setwhereAt(3);
                setprodCat(category);
            }
            else{
                setPath(path.concat(4));
                setprodCat(category);
                setprodArray(get_prodArray(category));
                setwhereAt(4);
            }
        }
    };

    //PickCategoryFinal 함수들 (자동차용품 카테고리 선택)

    function go_afterPickCatFinal_inside(category){
        if(route.params.whereFrom === 2){
            if(!isProdDelete) navigation.navigate('PutProduct', {category: category});
            else{
                setPath(path.concat(4));
                setprodCat(category);
                setprodArray(get_prodArray(category));
                setwhereAt(4);
            }
        }
        else{
            setPath(path.concat(4));
            setprodCat(category);
            setprodArray(get_prodArray(category));
            setwhereAt(4);
        }
    };

    //PickProductFinal 함수들 (제품 나열 후 선택)

    function go_afterPickProFinal(name, code){
        if(prodCat === 2){
            //부자재일때
            if (route.params.whereFrom === 0 ) navigation.navigate('StockChange', {category:prodCat, prodname:name, prodcode:code});
            else if (route.params.whereFrom === 1) {
                //objArray 넘겨줬음
                setPath(path.concat(6));
                setwhereAt(6);
            }
            else if(route.params.whereFrom === 2){
                if(isProdDelete){
                    Alert.alert(
                      "정말 해당 상품 삭제 요청을 보내시겠습니까?",
                      "제품명: ".concat(name),
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => {finish_Delete(code)} }
                      ],
                      { cancelable: false }
                    );
                }
            }
        }
        else{
            //제품일때
            if (route.params.whereFrom === 0) {
                setPath(path.concat(5));
                setproductName(name);
                setcolorArray(get_colorArray(prodCat, name));
                setwhereAt(5);
            }
            else if (route.params.whereFrom === 1) {
                setproductName(name);
                setPath(path.concat(6));
                setwhereAt(6);
            }
            else if(route.params.whereFrom === 2){
                if(isProdDelete){
                    setPath(path.concat(5));
                    setproductName(name);
                    setcolorArray(get_colorArray(prodCat, name));
                    setwhereAt(5);
                }
            }
        }
    };

    function get_prodArray(category){
        var name_arr = [];
        var name_tmp = [];
        var obj_arr = [];
        if(category === 2)
        {
            for(var i in userConfigdata.sub){
                name_arr.push({key:userConfigdata.sub[i].name, code:userConfigdata.sub[i].code});
                obj_arr.push(userConfigdata.sub[i]);
            }
            if(route.params.whereFrom === 1) setobjArray(obj_arr);
            return Array.from(new Set(name_arr));
        }
        else if(category === 10){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "헤드레스트") {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 11){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "자동차용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 12){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "가죽용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 13){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "세차용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 13){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "세차용품")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 20){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "콘솔쿠션")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 21){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "허리쿠션+방석")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 22){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "핸들커버")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 23){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "시트백커버")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 24){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "방향제")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 25){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "스마트폰 충전기&거치대")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        else if(category === 26){
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].category === "etc")  {
                    name_tmp.push(userConfigdata.pro[i].name);
                    obj_arr.push(userConfigdata.pro[i]);
                }
            }
        }
        var tmp = Array.from(new Set(name_tmp));
        for(var i in tmp){
            name_arr.push({key:tmp[i], code: -2})
        }
        if(route.params.whereFrom === 1) setobjArray(obj_arr);
        return name_arr;
    };

    //PickColor 함수들 (컬러 선택)
    function go_afterPickCol(name, code){
        if(prodCat === 1){
            //원단일때
            if(route.params.whereFrom === 1){
                setPath(path.concat(6));
                setwhereAt(6);
            }
            else if(route.params.whereFrom === 0){
                setproductName(name)
                setproductCode(code)
                setPath(path.concat(8));
                setwhereAt(8);
            }
            else if(route.params.whereFrom === 2){
                if(isProdDelete){
                    Alert.alert(
                      "정말 해당 상품 삭제 요청을 보내시겠습니까?",
                      "제품명: ".concat("원단 - ", name),
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => {finish_Delete(code)} }
                      ],
                      { cancelable: false }
                    );
                }
            }
        }
        else{
            //제품일때
            if (route.params.whereFrom === 0 ) navigation.navigate('StockChange', {category:prodCat, prodname:productName, prodcode:code, prodcolor:name});
            else if(route.params.whereFrom === 2){
                if(isProdDelete){
                    Alert.alert(
                      "정말 해당 상품 삭제 요청을 보내시겠습니까?",
                      "제품명: ".concat(productName, " - ", name),
                      [
                        {
                          text: "Cancel",
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => {finish_Delete(code)} }
                      ],
                      { cancelable: false }
                    );
                }
            }
        }
    };

    //PickFab 함수들 (Fab 선택)
    function go_afterPickFab(type){
        navigation.navigate('StockChange', {category: prodCat, prodname: productName, prodcode: productCode+(type-1), prodtype: type});
    };

    function get_colorArray(category, name){
        var name_arr = [];
        if(category === 1)
        {
            for(var i=0; i<userConfigdata.fab.length; i+=3){
                name_arr.push({key:userConfigdata.fab[i].name, code:userConfigdata.fab[i].code, color:userConfigdata.fab[i].color});
            };
        }
        else
        {
            for(var i in userConfigdata.pro){
                if(userConfigdata.pro[i].name === name) name_arr.push({key:userConfigdata.pro[i].color, code:userConfigdata.pro[i].code});
            };
        }
        return Array.from(new Set(name_arr));
    };

    //PickTeam 함수들 (팀 선택)
    function go_afterPickTeam(groupname){
        setgroupVal(groupname);
        setPath(path.concat(7));
        setwhereAt(7);
    };

    function go_afterPickTeamDetail(teamname){
        setteamVal(teamname);
        if(route.params.whereFrom === 1){
            if(!showAll){
                var prod = get_validdata();
                if(prod.length>0){
                    navigation.navigate('CheckStockFinal', {groupVal: groupVal, teamVal: teamname, configdata:prod});
                }
                else{
                    if(prodCat === 1) {
                        navigation.navigate('CheckStockFinal', {groupVal: groupVal, teamVal: teamname, configdata:colorArray});
                    }
                    else {
                        navigation.navigate('CheckStockFinal', {groupVal: groupVal, teamVal: teamname, configdata:objArray});
                    }
                }
            }
            else{
                navigation.navigate('CheckStockFinal', {groupVal: groupVal, teamVal: teamname, showallconfigdata:userConfigdata});
            }
        }
        else if(route.params.whereFrom === 0){
            navigation.navigate('StockChange', {groupVal: groupVal, teamVal: teamname});
        }
        else if (route.params.whereFrom === 3){
            navigation.navigate('CheckInoutFinal', {groupVal: groupVal, teamVal: teamname, userdata:userConfigdata.user, configdata:userConfigdata});
        }
    };

    function find_product(){
        if(route.params.whereFrom === 0)
        {
            var prod = valid_name_check();
            if(prod){
                if(prod.category === 1) {
                    setproductName(prod.name)
                    setproductCode(prod.code)
                    setPath(path.concat(8));
                    setwhereAt(8);
                    //지우기 navigation.navigate('PickFabType', {category: 1, prodname:prod.name, prodcode:prod.code, whereFrom:route.params.whereFrom, prodcolor: prod.color});
                }
                else if(prod.category === 2) {
                    navigation.navigate('StockChange', {category:2, prodname:prod.name, prodcode:prod.code});
                }
                else {
                navigation.navigate('StockChange', {category:prod.category, prodname:prod.name, prodcode:prod.code, prodcolor:prod.color});
                //navigation.navigate('PickColor', {prodname:prod.name, category:30, configdata:userConfigdata,whereFrom:route.params.whereFrom});
                }
            }
            else {
            Alert.alert(
              "검색 실패",
              "제품명을 확인해주세요!"
            );
            }
        }
        else{
            var prod = get_validdata();
            if(prod.length > 0){
                setPath(path.concat(6));
                setwhereAt(6);
            }
            else{
                Alert.alert(
                  "검색 실패",
                  "제품명을 확인해주세요!"
                );
            }
        }
    };

    function valid_name_check(){
        ///얘 확인
        for(var i in nameArray){
            if(nameArray[i].key === productName) {
            return nameArray[i];
            }
        }
    };

    function get_validdata()
    {
        var res = [];
        for(var i in userConfigdata.fab){
            if(userConfigdata.fab[i].name === productName){
                res.push(userConfigdata.fab[i]);
            }
        };
        if(res.length>0) return res;
        for(var i in userConfigdata.pro){
            if(userConfigdata.pro[i].name === productName){
                res.push(userConfigdata.pro[i]);
            }
        };
        if(res.length>0) return res;
        for(var i in userConfigdata.sub){
            if(userConfigdata.sub[i].name === productName){
                res.push(userConfigdata.sub[i]);
            }
        };
        return res;
    };

    function go_back(){
        if(path.length>1){
            let current = path.pop();
            setwhereAt(path[path.length-1]);
        }
        else if(path.length === 1){
            let current = path.pop();
            if(current === 7) setwhereAt(6);
            else if(current === 2) setwhereAt(1);
            else setwhereAt(0);
            setshowAll(false);
        }
        else{
            navigation.goBack();
        }
    };

    function get_prodnameArray(){
        var name_arr = [];
        var name_tmp = [];
        if(route.params.whereFrom === 0)
        {
            for(var i in userConfigdata.fab){
                name_arr.push({key:'원단 - '.concat(userConfigdata.fab[i].name), code:userConfigdata.fab[i].code, name:userConfigdata.fab[i].name, category:1});
            };
            for(var i in userConfigdata.pro){
                name_arr.push({key:userConfigdata.pro[i].name.concat(' - ',userConfigdata.pro[i].color), color:userConfigdata.pro[i].color,name:userConfigdata.pro[i].name, code:userConfigdata.pro[i].code, category:30});
            };
            for(var i in userConfigdata.sub){
                name_arr.push({key:'부자재 - '.concat(userConfigdata.sub[i].name),code:userConfigdata.sub[i].code, name:userConfigdata.sub[i].name, category:2});
            };
            return Array.from(new Set(name_arr));
        }
        else{
            for(var i in userConfigdata.fab){
                name_tmp.push(userConfigdata.fab[i].name);
            };
            for(var i in userConfigdata.pro){
                name_tmp.push(userConfigdata.pro[i].name);
            };
            for(var i in userConfigdata.sub){
                name_tmp.push(userConfigdata.sub[i].name);
            };
            var tmp = Array.from(new Set(name_tmp));
            for(var i in tmp){
                name_arr.push({key:tmp[i]})
            }
            return name_arr;
        }
    };

    const getProd = (query) =>{
    if (query){
        setfiltednameArray([]);
        const regex = new RegExp(query, 'i');
        setfiltednameArray(
            nameArray.filter((name)=>name.key.search(regex)>=0)
        );
        setisShowingResults(true);
    }
    else {
        setfiltednameArray([]);
        setisShowingResults(false);
    }
     setproductName(query);
    };

    function finish_Delete(code){
            fetch(config_data.server.host.concat(":",config_data.server.port,config_data.server.delete_code),
            {method:'POST',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({code:code})})
            .then((response)=> {return response.json();})
            .then((json)=> {if(json.Code == "0") {navigation.navigate('Main');} else fetchError(json);})
            .catch((error)=>{console.error(error);});
    };

    function fetchError(json){
        Alert.alert(
          "서버 연결 실패",
          "네트워크 연결상태를 확인해주세요!"
        );
        console.log(json);
    };

    return (
        <SafeAreaView style={styles.container}>
            {whereAt === 0 &&
            <View>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>제품 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
                        />
                        <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                            <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                            <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttontitle_area}>
                    <Text style={{height:'100%',width:'100%', color:'black',fontSize:RFPercentage('3.3')}}>제품명으로 검색</Text>
                </View>
                <KeyboardAvoidingView style={styles.textInputArea} behavior="padding">
                        <Image
                            style={{position:'absolute',width: wp('65%'), height: hp('12%'),resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/findprod_background.png')}
                            />
                        <TextInput
                            style={styles.textForm}
                            onChangeText = {(text) => getProd(text)}
                            value = {productName}
                            placeholder={"제품명 검색"}/>
                        {isShowingResults &&
                                <FlatList
                                    data={filterednameArray}
                                    style={{width:wp('42%'), height:'100%',alignSelf:'center',marginLeft:'10%'}}
                                    renderItem={({item, index}) => {
                                        return(
                                        <TouchableOpacity
                                            style = {{width:'100%', height:hp('4%'), borderBottomColor:'black', borderBottomWidth:1,justifyContent:'center'}}
                                            onPress={() => {setproductName(item.key); setproductObj(item); setisShowingResults(false)}}>
                                        <Text style={{fontSize:RFPercentage(2)}}>
                                        {item.key}
                                        </Text>
                                        </TouchableOpacity>
                                        );
                                    }}
                                />
                        }
                </KeyboardAvoidingView>
                <View style={styles.buttontitle_area}>
                    <Text style={{height:'100%',width:'100%', color:'black',fontSize:RFPercentage('3.3')}}>카테고리로 검색</Text>
                </View>
                <View style={styles.productSearchArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x)=>{go_Categoryinside()}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/category_button.png')}
                            />
                    </TouchableOpacity>
                </View>
                {route.params.whereFrom === 1 &&
                    <View style={styles.buttontitle_area}>
                        <Text style={{height:'100%',width:'100%', color:'black',fontSize:RFPercentage('3.3')}}>팀별 모든 재고 보기</Text>
                    </View>
                }
                {route.params.whereFrom === 1 &&
                    <View style={styles.productSearchArea}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x)=>{go_showAll()}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/checkstock/checkstockteam_button.png')}
                                />
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.small_buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button_small}
                        onPress={(x) => {find_product()}}>
                    <Image
                        style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                        source={require('../../../../images/checkstock/check_button.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            }
            {whereAt === 1 &&
            <View style = {{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>종류 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
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
                        onPress={(x) => {go_afterCategory_inside(0)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/pickcategory/jaepum.png')}
                            />
                    </TouchableOpacity>
                </View>
                {(isSewingteam || route.params.whereFrom === 1) &&
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(x) => {go_afterCategory_inside(1)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/pickcategory/wondan.jpg')}
                                />
                        </TouchableOpacity>
                    </View>
                }
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterCategory_inside(2)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={get_bujajaeImage()}
                            />
                    </TouchableOpacity>
                </View>
            </View>
            }
            {whereAt === 2 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>카테고리 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
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
                        onPress={(x) => {go_afterKinds_inside(10)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>헤드레스트</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterKinds_inside(11)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>자동차 용품</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterKinds_inside(12)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>가죽 용품</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterKinds_inside(13)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>세차 용품</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {whereAt === 3 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>카테고리 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
                        />
                        <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                            <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                            <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(20)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>콘솔쿠션</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(21)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>허리쿠션+방석</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(22)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>핸들커버</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(23)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>시트백커버</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(24)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>방향제</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(25)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>스마트폰 충전기&거치대</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea_PickCategoryFinal}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickCatFinal_inside(26)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>etc</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
            {whereAt === 4 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>제품 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
                        />
                        <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                            <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                            <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:'gray', width:'100%', height: hp('65%'), borderRadius: 20}}>
                    <View style = {styles.scroll}>
                        <FlatList
                            data = {prodArray}
                            renderItem={({item}) =>
                        <View style={styles.buttonArea_PickProductFinal}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.button}
                                onPress={(x) => {go_afterPickProFinal(item.key, item.code)}}>
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
            </View>
            }
            {whereAt === 5 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>색상 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
                        />
                        <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                            <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                            <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor:'gray', width:'100%', height: hp('65%'), borderRadius: 20}}>
                    <View style = {styles.scroll}>
                        <FlatList
                            data = {colorArray}
                            renderItem={({item}) =>
                        <View style={styles.buttonArea_PickProductFinal}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.button}
                                onPress={(x) => {go_afterPickCol(item.key, item.code)}}>
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
            </View>
            }
            {whereAt === 6 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>부서 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
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
                        onPress={(name) => {go_afterPickTeam(0)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/makeid/group0.png')}
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_afterPickTeam(1)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/makeid/group1.png')}
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(name) => {go_afterPickTeam(2)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/makeid/group2.png')}
                            />
                    </TouchableOpacity>
                </View>
            </View>
            }
            {whereAt === 7 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4.5')}}>팀 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
                        />
                        <View style={{flexDirection:'column', alignItems:'flex-end'}}>
                            <Text style={{height:'30%',width:'100%', color:'black',fontSize:RFPercentage('2'),alignSelf:'flex-end'}}>{route.params.username}</Text>
                            <Text style={{height:'30%',width:'87%', color:'black',fontSize:RFPercentage('1.6'),alignSelf:'flex-end'}}>{route.params.userteam}</Text>
                        </View>
                    </View>
                </View>
                {groupVal == 0 &&
                    <View style={[styles.buttonArea,{marginTop:'15%'}]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(0)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group0_0.png')}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(1)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group0_1.png')}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(2)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group0_2.png')}
                                />
                        </TouchableOpacity>
                    </View>
                }
                {groupVal == 1 &&
                    <View style={[styles.buttonArea,{marginTop:'7%'}]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(0)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group1_0.png')}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(1)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group1_1.png')}
                                />
                        </TouchableOpacity>
                    </View>
                }
                {groupVal == 2 &&
                    <View style={[styles.buttonArea,{marginTop:'7%'}]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(0)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group2_0.png')}
                                />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.button}
                            onPress={(name) => {go_afterPickTeamDetail(1)}}>
                            <Image
                                style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                                source={require('../../../../images/makeid/group2_1.png')}
                                />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            }
            {whereAt === 8 &&
            <View style={{width:'100%', height:'100%'}}>
                <View style={styles.headerArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{width:'10%',height:'40%', marginRight:'2%'}}
                        onPress={(x)=>{go_back()}}>
                        <Image
                            style={{width:'100%',height:'100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/back_button.jpg')}
                        />
                    </TouchableOpacity>
                    <Text style={{height:'70%',width:'60%', color:'black',fontSize:RFPercentage('4')}}>원단 종류 선택</Text>
                    <View style={{width:'15%', height:'100%', flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                        <Image
                            style={{width:'50%',height:'50%',resizeMode:'contain',marginRight:'1%'}}
                            source={require('../../../../images/checkstock/userinfo_icon.png')}
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
                        onPress={(x) => {go_afterPickFab(3)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>10T</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickFab(2)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>3T</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={(x) => {go_afterPickFab(1)}}>
                        <Image
                            style={{position:'absolute', width: '100%', height: '100%',resizeMode:'contain'}}
                            source={require('../../../../images/checkstock/1box.jpg')}
                            />
                        <Text style={styles.buttonTitle}>생지</Text>
                    </TouchableOpacity>
                </View>
            </View>
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: hp('2%'),
        paddingBottom: hp('5%'),
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
    },
    headerArea:{
        width: '100%',
        height: hp('9%'),
        alignItems: 'center',
        flexDirection:'row',
        marginBottom: hp('2%'),
    },
    buttonArea: {
        width: '80%',
        height: '13%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '5%',
    },
    scroll:{
        width: '100%',
        height: '100%',
        backgroundColor: 'silver',
        borderRadius: 20,
    },
    buttonArea_PickCategoryFinal:{
        width: '65%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '3%',
    },
    buttonArea_PickProductFinal:{
        width: '70%',
        height: hp('10%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: '4%',
    },
    button: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        color: 'black',
        fontSize: RFPercentage('3'),
    },
    button_small:{
        backgroundColor: "#46c3ad",
        width: '30%',
        height: '20%',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: '3%',
    },
    buttontitle_area: {
        width:wp('56%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignSelf: 'center',
    },
    small_buttonArea: {
        width: wp('66%'),
        height: hp('10%'),
        alignItems: 'center',
        justifyContent:'center',
        alignSelf: 'center',
    },
    button_small:{
        width: wp('27%'),
        height: hp('10%'),
        alignSelf: 'flex-end',
    },
    textInputArea:{
        width: wp('65%'),
        height: hp('30%'),
        alignItems: 'center',
        //justifyContent: 'center',
        alignSelf: 'center',
    },
    productSearchArea: {
        width: wp('65%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: hp('2%'),
    },
    textForm: {
        width: wp('42%'),
        height: hp('6%'),
        marginLeft: wp('6%'),
        marginTop: hp('3%'),
        //textAlign:'left',
    },
})