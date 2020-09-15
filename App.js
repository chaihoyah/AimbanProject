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
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
//Login scenes
import LoginScreen from './src/screens/LoginScreen';
import MakeIDScreen from './src/screens/LoginScreen/MakeIDScreen';
// Main scene
import MainScreen from './src/screens/MainScreen';
//Stock change scenes
import CheckStockScreen from './src/screens/MainScreen/CheckStockScreen';
import StockChangeScreen from './src/screens/MainScreen/StockChangeScreen';
import PutProductScreen from './src/screens/MainScreen/PutProductScreen';
import SettingsScreen from './src/screens/MainScreen/SettingsScreen';
import PickTeamScreen from './src/screens/MainScreen/StockChangeScreen/PickTeamScreen';
import PickProductScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen';
import PickCategoryScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickCategoryScreen';
import PickKindsScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickCategoryScreen/PickKindsScreen';
import PickCategoryFinalScreen from './src/screens/MainScreen/StockChangeScreen/PickProductScreen/PickCategoryScreen/PickKindsScreen/PickCategoryFinalScreen';

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

/**class IU extends Component{
    render () {
        let xxxImg = '';
        if (this.props.type === 'one'){
            //xxxImg = require('./assets/xxx.jpg');
        }
        else if (this.props.type === 'two'){
            //xxxImg = require('./assets/xxx.jpg');
        }
        return (
            <View>
                //<Image source = {require('./assets/xxx.jpg')} style = {{width: 100, height: 100}}/>
            </View>

        )
    //이미지 다 넣어놓고 props.type으로 불러오기
    }
}**/

function Login_Screen({navigation}){
    return(
        <View style = {{flex:1}}>
            <Text> Home Screen 입니다.</Text>
            <Button title = '회원가입' onPress={() => navigation.navigate('MakeID')} />
        </View>
    )
}

function MakeID_Screen({navigation}){
    return(
        <View style = {{flex:1}}>
            <Text> Home Screen 입니다.</Text>
            <Button title = '뒤로가기' onPress={() => navigation.goBack()} />
        </View>
    )
}

function LoginStack({navigation}){
    return(
    <Stack_login.Navigator initialRouteName = "Login">
        <Stack_login.Screen name = "Login" component = {LoginScreen} options={{title:'AIMBAN'}}/>
        <Stack_login.Screen name = "MakeID" component = {MakeIDScreen} options={{title:'회원가입'}} />
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
        <Stack_main.Navigator>
            <Stack_main.Screen name = "Main" component = {MainScreen}/>

            <Stack_main.Screen name = "CheckStock" component = {CheckStockScreen}/>
            <Stack_main.Screen name = "PutProduct" component = {PutProductScreen}/>
            <Stack_main.Screen name = "Settings" component = {SettingsScreen}/>
            <Stack_main.Screen name = "StockChange" component = {StockChangeScreen} initialParams={{teamName:"재단팀", productName:"", productCode:0}}/>
            <Stack_main.Screen name = "PickTeam" component = {PickTeamScreen}/>
            <Stack_main.Screen name = "PickProduct" component = {PickProductScreen}/>
            <Stack_main.Screen name = "PickCategory" component = {PickCategoryScreen}/>
            <Stack_main.Screen name = "PickKinds" component = {PickKindsScreen}/>
            <Stack_main.Screen name = "PickCategoryFinal" component = {PickCategoryFinalScreen}/>

        </Stack_main.Navigator>

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
/*            <NavigationContainer>
                <SafeAreaView style = {styles.container}>
                    <View style = {styles.main_view}>

                    <Text> {this.state.address} </Text>
                    <Button title = {'주소 출력'} onPress = {this.writeAddress} />
                    </View>
                </SafeAreaView>
            </NavigationContainer>*/

            <NavigationContainer>
                <RootStack.Navigator initialRouteName="Login">
                    <RootStack.Screen name = "LoginStack" component = {LoginStack} options={{title:'AIMBAN'}}/>
                    <RootStack.Screen name = "MainStack" component = {MainStack}/>
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
