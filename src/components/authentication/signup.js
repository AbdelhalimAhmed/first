import React, { Component, } from 'react';
var React1 = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    TextInput
} = React1;

var Button = require('../common/button');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            username:'',
            password:'',
            passwordConfirmation:'',
            errorMassage:''

        }
    },

    render: function() {
        return (
            <View style={styles.container}>
                <Text>Sign Up </Text>

                <Text style = {styles.label}>Username:</Text>
                <TextInput
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
                style={styles.input}/>

                <Text style = {styles.label}>Password:</Text>
                <TextInput
                secureTextEntry = {true}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
                style={styles.input}/>

                <Text style = {styles.label}>Confirm Password:</Text>
                <TextInput
                secureTextEntry = {true}
                value={this.state.passwordConfirmation}
                onChangeText={(text) => this.setState({passwordConfirmation: text})}
                style={styles.input}/>

                <Text style={styles.label}>{this.state.errorMassage}</Text>
                <Button text={'Sign Up'} onPress={this.onSignUpPress}/>
                <Button text={'I have an account...'} onPress={this.onSigninPress}/>

            </View>

        );
    },

    onSignUpPress: function() {
        if(this.state.password !== this.state.passwordConfirmation){
            return this.setState({errorMassage: 'your passwords do not match'});
        }
        else{
            return this.setState({errorMassage: ''});
        }
    },

    onSigninPress: function() {
        this.props.navigator.pop(); 
    }

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    input:{
    	padding: 2,
    	height: 40,
    	borderColor: 'red',
    	borderWidth: 1,
    	borderRadius: 5,
    	margin: 5,
    	width: 200,
    	alignSelf:'center'
    },
    label: {
    	fontSize: 18
    }
});