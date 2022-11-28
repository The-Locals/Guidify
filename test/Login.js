import React from "react";
import {View, StyleSheet, Text, Image, ScrollView, Button} from 'react-native';
import axios from 'axios';
import Inputs from "./Inputs";
import Submit from "./Submit";
import Account from "./Account";

async function login() {
    console.log("Login");
}

const Login = props => {
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
         <View style={styles.container}>
            <Image
                source={require('./login.png')}
                resizeMode={'cover'}          
                style={styles.image} />
            <Text style={styles.textTitle}>Welcome back</Text>
            <Text style={styles.textBody}>Login into your existant account</Text>
            <View style={{marginTop: 20}}/>
            <Inputs name="Email" icon="user"/>
            <Inputs name="Password" icon="lock" pass={true}/>
            <View style={{width: '90%'}}>
                <Text style={[styles.textBody, {alignSelf: 'flex-end'}]}>Forgot Password?</Text>
            </View>
            <Submit title="LOG IN" color="#0148a4"/>
            <Text style={styles.textBody}>Or login using</Text>
            <View style={{flexDirection: 'row'}} onPress={()=>{console.log("HI")}}>
                <Account color="#ec482f" icon="google" title="Google"/>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
                <Text style={styles.textBody}>Don't have an account</Text>
                <Text style={[styles.textBody, {color: 'blue'}]} onPress={() => props.navigation.navigate('SignUp')}> Sign Up</Text>
            </View>
        </View>   
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
    image: {
        width: 400,
        height: 250,
        marginVertical: 10
    },
    textTitle: {
        fontFamily: 'Foundation',
        fontSize: 40,
        marginVertical: 10,
        color: "black",
        fontWeight: "bold"
    },
    textBody: {
        fontFamily: 'Foundation',
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default Login;