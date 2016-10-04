import React, { Component, } from 'react';
var React1 = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    ToolbarAndroid,
    TouchableHighlight
} = React1;

module.exports = React.createClass({
    onMyPostesPress: function(userId){
      this.props.navigator.push({
            component: 'MyPosts',
            data: userId,
        });   
    },
    onMyAlbumesPress: function(userId){
        this.props.navigator.push({
            component: 'MyAlbumes',
            data: userId,
        });
    },
    onMyTodoPress: function(userId){
        alert(userId);
    },
    render: function() {
        return (
           <View style={{flex: 1, backgroundColor: '#fff'}}>
              <Text style={{margin: 10, fontSize: 18, textAlign: 'left',backgroundColor: '#2196F3'}}>Welcome {this.props.data1}</Text>
              <Button text={'My Posts'} onPress={ () => this.onMyPostesPress(this.props.data2)}/>
              <Button text={'My Albums'} onPress={() => this.onMyAlbumesPress(this.props.data2)}/> 
              <Button text={'My Todo'} onPress={() => this.onMyTodoPress(this.props.data2)}/>                                                                    
            </View>
        )
    },
    
});

var styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: 'black',
        flexDirection: 'column',
        paddingTop: 15
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white'
    },
});