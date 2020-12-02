/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, headerBackButton} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
//Login scenes
import LoginScreen from './src/screens/LoginScreen';
import MakeIDScreen from './src/screens/LoginScreen/MakeIDScreen';
import PickTeamLoginScreen from './src/screens/LoginScreen/MakeIDScreen/PickTeamLogin';
import PickTeamLoginDetailScreen from './src/screens/LoginScreen/MakeIDScreen/PickTeamLogin/PickTeamLoginDetail';

// Main scene
import MainScreen from './src/screens/MainScreen';
//Stock change scenes
import CheckStockScreen from './src/screens/MainScreen/CheckStockScreen';
import CheckStockPickOneScreen from './src/screens/MainScreen/CheckStockScreen/CheckStockPickOneScreen';
import CheckInoutFinalScreen from './src/screens/MainScreen/CheckStockScreen/CheckStockPickOneScreen/CheckInoutFinalScreen';
import CheckStockPickTwoScreen from './src/screens/MainScreen/CheckStockScreen/CheckStockPickOneScreen/CheckStockPickTwoScreen';
import CheckStockFinalScreen from './src/screens/MainScreen/CheckStockScreen/CheckStockPickOneScreen/CheckStockPickTwoScreen/CheckStockFinalScreen';
import StockChangeScreen from './src/screens/MainScreen/StockChangeScreen';
import PutProductScreen from './src/screens/MainScreen/PutProductScreen';
import PutProductPickColorScreen from './src/screens/MainScreen/PutProductScreen/PutProductPickColorScreen';
import SettingsScreen from './src/screens/MainScreen/SettingsScreen';
import SettingsMyinfoScreen from './src/screens/MainScreen/SettingsScreen/SettingsMyinfoScreen';
import PickTeamScreen from './src/screens/MainScreen/StockChangeScreen/PickTeamScreen';
import PickTeamDetailScreen from './src/screens/MainScreen/StockChangeScreen/PickTeamScreen/PickTeamDetailScreen';
import PickProductScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen';
import PickCategoryScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickCategoryScreen';
import PickColorScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickColorScreen';
import PickFabTypeScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickColorScreen/PickFabTypeScreen';
import PickProductFinalScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickProductFinalScreen';
import PickKindsScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickCategoryScreen/PickKindsScreen';
import PickCategoryFinalScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickCategoryScreen/PickKindsScreen/PickCategoryFinalScreen';

//Admin scenes
import AdminScreen from './src/screens/AdminScreen';
import InoutHistoryScreen from './src/screens/AdminScreen/InoutHistoryScreen';
import ApprovalRequestScreen from './src/screens/AdminScreen/ApprovalRequestScreen';

//config.Json
import config_data from "./config.json";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const RootStack = createStackNavigator();
const Stack_login = createStackNavigator();
const Stack_main = createStackNavigator();
const Stack_admin = createStackNavigator();
const Stack_Inadmin = createMaterialTopTabNavigator();

function LoginStack({navigation}){
    return(
    <Stack_login.Navigator initialRouteName = "Login" screenOptions={{headerShown:false}}>
        <Stack_login.Screen name = "Login" component = {LoginScreen}/>
        <Stack_login.Screen name = "MakeID" component = {MakeIDScreen}/>
        <Stack_login.Screen name = "PickTeamLogin" component = {PickTeamLoginScreen}/>
        <Stack_login.Screen name = "PickTeamLoginDetail" component = {PickTeamLoginDetailScreen}/>
    </Stack_login.Navigator>
    );
}

function getHeaderTitle_main(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Main';

    switch (routeName){
        case 'Main':
            return '메인화면';
        case 'StockChange':
            //입, 출, 조정 나누기
            return '입고 정보';
        case 'PickTeam':
            return '부서 선택';
        case 'PickTeamDetail':
            return '팀 선택';
        case 'PickProduct':
            return '제품 선택';
        case 'PickCategory':
            return '종류 선택';
        case 'PickKinds':
            return '카테고리 선택';
        case 'PickCategoryFinal':
            return '제품 선택';
        case 'CheckStock':
            return '재고 확인';
        case 'PutProduct':
            return '제품 등록';
        case 'Settings':
            return '설정';
    }
}

function MainStack({navigation, route}){
    const [userName, setuserName] = React.useState(route.params.username);
    const [userTeam, setuserTeam] = React.useState(route.params.userteam);
    const [userID, setuserID] = React.useState(route.params.userid);
    React.useLayoutEffect(() => {
        navigation.setOptions({
        headerTitle: getHeaderTitle_main(route),
        headerStyle: { backgroundColor: '#621FF7'},
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold'},
        headerLeft: () => (
            <Button
                onPress={() => navigation.goBack()}
                title= 'Back'
                //color = '#fff'
            />
        ),
        headerRight: () => (
            <Button
                onPress={() => alert('Logout Button!')}
                title= 'Logout'
                //color = '#fff'
            />
        ),
/*        header: ({goBack}) => ({
            left: <headerBackButton onPress/>
        }),*/

        });
    }, [navigation, route]);
//StockChangeScreen initalparam에 user 팀 넣기
    return(
        <Stack_main.Navigator initialRouteName = "Main" screenOptions={{headerShown: false}}>
            <Stack_main.Screen name = "Main" component = {MainScreen} initialParams = {{username:userName, userteam:userTeam, userid: userID}}/>

            <Stack_main.Screen name = "CheckStock" component = {CheckStockScreen}/>
            <Stack_main.Screen name = "CheckStockPickOne" component = {CheckStockPickOneScreen}/>
            <Stack_main.Screen name = "CheckInoutFinal" component = {CheckInoutFinalScreen}/>
            <Stack_main.Screen name = "CheckStockPickTwo" component = {CheckStockPickTwoScreen}/>
            <Stack_main.Screen name = "CheckStockFinal" component = {CheckStockFinalScreen}/>
            <Stack_main.Screen name = "PutProduct" component = {PutProductScreen}/>
            <Stack_main.Screen name = "PutProductPickColor" component = {PutProductPickColorScreen}/>
            <Stack_main.Screen name = "Settings" component = {SettingsScreen}/>
            <Stack_main.Screen name = "SettingsMyinfo" component = {SettingsMyinfoScreen}/>
            <Stack_main.Screen name = "StockChange" component = {StockChangeScreen}/>
            <Stack_main.Screen name = "PickTeam" component = {PickTeamScreen}/>
            <Stack_main.Screen name = "PickTeamDetail" component = {PickTeamDetailScreen}/>
            <Stack_main.Screen name = "PickProduct" component = {PickProductScreen}/>
            <Stack_main.Screen name = "PickCategory" component = {PickCategoryScreen}/>
            <Stack_main.Screen name = "PickColor" component = {PickColorScreen}/>
            <Stack_main.Screen name = "PickFabType" component = {PickFabTypeScreen}/>
            <Stack_main.Screen name = "PickProductFinal" component = {PickProductFinalScreen}/>
            <Stack_main.Screen name = "PickKinds" component = {PickKindsScreen}/>
            <Stack_main.Screen name = "PickCategoryFinal" component = {PickCategoryFinalScreen}/>

        </Stack_main.Navigator>

    );
}

function AdminStack({navigation, route}){

    return(
    <Stack_admin.Navigator initialRouteName = "Admin" screenOptions={{headerShown:false}}>
        <Stack_admin.Screen name = "Admin" component = {AdminScreen}/>
    </Stack_admin.Navigator>

    );
}

function InAdminStack({navigation, route}){
    const [inout_obj, setInout_obj] = React.useState(route.params.inoutjson);
    const [signupJson, setsignupJson] = React.useState(route.params.signupjson);
    const [proJson, setproJson] = React.useState(route.params.projson);
    const [fabJson, setfabJson] = React.useState(route.params.fabjson);
    const [subJson, setsubJson] = React.useState(route.params.subjson);
    const [updateJson, setupdateJson] = React.useState(route.params.updatejson);
    return(
        <Stack_Inadmin.Navigator tabBarPosition ='bottom' initialRouteName = "InoutHistory" screenOptions={{headerShown:false}}>
            <Stack_Inadmin.Screen name = "InoutHistory" component = {InoutHistoryScreen} initialParams={{inoutjson: inout_obj}}/>
            <Stack_Inadmin.Screen name = "ApprovalRequest" component = {ApprovalRequestScreen} initialParams={{signupjson:signupJson, projson:proJson, fabjson:fabJson, subjson:subJson, updatejson:updateJson}}/>
        </Stack_Inadmin.Navigator>
    );
}

class App extends Component{
    static navigationOptions = {header:null};
    constructor(props) {
        super(props);

        this.state = {
            address: '',
            isLoading: false,
        }
    }

    writeAddress = () => {
        this.setState({
            address : '경기도 안양시'
        })
    }

    render(){
          if (this.state.isLoading){
            return '<SplashScreen />';
          }
          return (

            <NavigationContainer>
                <RootStack.Navigator initialRouteName="LoginStack"  screenOptions={{headerShown: false}}>
                    <RootStack.Screen name = "LoginStack" component = {LoginStack} />
                    <RootStack.Screen name = "MainStack" component = {MainStack}/>
                    <RootStack.Screen name = "AdminStack" component = {AdminStack}/>
                    <RootStack.Screen name = "InAdminStack" component = {InAdminStack}/>
                </RootStack.Navigator>
            </NavigationContainer>
          );
    }
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : 'silver',
  },
  main_view: {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },

  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
