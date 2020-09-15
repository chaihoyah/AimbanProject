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
import {Dropdown} from "react-native-material-dropdown";

export default class MakeIDScreen extends Component{

    doMakeID(){
        // 서버에 데이터 보내기
        this.props.navigation.goBack();
    };

/*    state = {
    teamSelectedValue: 1
    };*/

    constructor(props) {
        super(props);

        this.state = {
            teamSelectedValue: 1
        }
    };
    setSelectedStateValue = (teamstateValue) => {
        this.setState({
        teamSelectedValue: teamstateValue
        });
    };

    render(){
        let team_array = [{label: "재단팀", value: 1}, {label: "미싱팀", value: 2}, {label: "미싱팀-차산리", value: 3}, {label: "헤드팀", value: 4}, {label: "용품팀", value: 5}];

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>회원가입</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"ID"}/>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"Name"}/>
                </View>
                <View style={styles.formArea}>
                    <Dropdown data={team_array}
                    value={this.state.teamSelectedValue}
                    label="팀 선택"
                    itemColor={'blue'}
                    useNativeDriver = {false}
                    onChangeText={(value,index,data)=>this.setSelectedStateValue(value)} />
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