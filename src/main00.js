import React, { Component, } from 'react';
var React1 = require('react-native');
var {
    StyleSheet,
    Navigator
} = React1;

var Signin = require('./components/authentication/signin');
var Signup = require('./components/authentication/signup');
//var News = require('./components/authentication/listNews');
var Posts = require('./components/authentication/posts');
var Details = require('./components/authentication/details');

var ROUTES = {
    signin: Signin,
    signup: Signup,
    posts: Posts,
    details: Details
}


module.exports = React.createClass({

    renderScene: function(route, navigator){
       // var Component = ROUTES[route.component];
        //return <Component route = {route} navigator={navigator} data = {route.data}/>;
    _navigator = navigator;
    switch (route.component) {
        case 'posts':
            return (<Posts navigator={navigator} data = {route.data} data1 = {route.data1} data2 = {route.data2} data3 = {route.data3}/>);
        case 'signin':
            return (<Signin navigator={navigator} data = {route.data} data1 = {route.data1} data2 = {route.data2} data3 = {route.data3}/>);
        case 'details':
            return (<Details navigator={navigator} data = {route.data} data1 = {route.data1} data2 = {route.data2} data3 = {route.data3}/>);
    }
    },
    render: function() {
        return (
            <Navigator
            style = {styles.container}
            initialRoute={{component: 'signin'}}
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