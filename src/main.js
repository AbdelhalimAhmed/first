import React, { Component, } from 'react';
var React1 = require('react-native');
var {
    StyleSheet,
    Navigator
} = React1;

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup')


var ROUTES = {
    signin: Signin,
    signup: Signup
}

module.exports = React.createClass({

    renderScene: function(route, navigator){
        var Component = ROUTES[route.name];
        return <Component route = {route} navigator={navigator}/>;
    },
    render: function() {
        return (
            <Navigator
            style = {styles.container}
            initialRoute={{name: 'signin'}}
            renderScene={this.renderScene}
            configureScene={() => {return Navigator.SceneConfigs.FloatFromRight}}

            />
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});