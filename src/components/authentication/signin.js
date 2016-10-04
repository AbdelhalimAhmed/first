import React, { Component, } from 'react';
import DrawerLayout from 'react-native-drawer-layout';

var DrawerLayoutAndroid = require('react-native-drawer-layout');
var React1 = require('react-native');
var {
    View,
    Text,
    StyleSheet,
    TextInput,
    ToolbarAndroid
} = React1;

var Button = require('../common/button'),
    user,
    ids;

    var organizations ;
    var namesIds = [];
    
module.exports = React.createClass({
	getInitialState: function() {
        var getNameIds = (data, row,colum) =>
        {
            return data[row][colum];
        }
        
		return{
			username1: '',
			password: '',
            errorMassage:'',
            check :'',
            users:'',
            nameIds: getNameIds
		};
	},
  
    render: function() {
        
        
        return (  

            <View style = {styles.container1}>            
                <View style = {styles.container}>
                    <Text>  Sign In </Text>
                    <Text style = {styles.label}>Username:</Text>
                    <TextInput 
                        style = {styles.input}
                        value = {this.state.username1}
                        onChangeText={(text) => this.setState({username1: text})}
                    />
                    
                    <Text style = {styles.label}>Password:</Text>
                    <TextInput 
                    secureTextEntry = {true} 
                    style = {styles.input}
                    value1 = {this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    />
                    <Text style={styles.label}>{this.state.errorMassage}</Text>
                    <Button text={'Sign In'} onPress = { () => this.onSignupPress(this.state.username1,this.state.password)}/>
                    <Button text={'I need an account...'} onPress={this.onPress}/>
                </View>
                
                  
                
            </View>
            
        );
        ////sdasd<Button text={'Sign In'} onPress = { () => {this.onSignupPress(this.state.username1,this.state.password),this.onDataPress(this.state.username1)}}/>            
    },


    onSignupPress: function(value,value1) {
        var API_URL = 'http://jsonplaceholder.typicode.com/users?username='+value+'&id='+value1;
        //check = 0;
        fetch(API_URL).then((response) => response.json()).then((responseData) => {
            organizations = responseData;
                
                if(organizations != ''){
                    this.setState({check:'1'});
                    this.onCheck (this.state.check,organizations[0].name,organizations[0].id);
                    //alert('bla la bla');
                }else{
                    this.setState({check:'0'});
                    this.onCheck (this.state.check);
                    //alert('laaaaaaaaaaaaaaaaaaaaaaaaaaa');
                }

        }).done();


    },

    onCheck : function(lol,myName,myId){ 
        //alert(myName);
    	if(lol == '1'){
            //alert(this.state.nameIds[4]);
            var API_URL1 = 'http://jsonplaceholder.typicode.com/users';
            fetch(API_URL1).then((response) => response.json()).then((responseData) => {
                var organizations1 = responseData,
                //alert(organizations1[1].name);
                length = organizations1.length;
                
                for (var s = 0; s < length; s++){
                    namesIds[s] = new Array(2);
                }

                for (var j = 0; j < length; j++) {
                    namesIds[j][0] = organizations1[j].name;
                }

                for (var j = 0; j < length; j++) {
                    namesIds[j][1] = organizations1[j].id;
                }
            this.props.navigator.push({
                    component: 'posts',
                    data: namesIds,
                    data1: myName,
                    data2: myId
            });
            }).done();
        }else{
            return this.setState({errorMassage: 'UserName or Password is Not valid\n                      Try Again.'});
        }
        },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container1: {
        flex: 1,
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
    	fontSize: 18,
    	marginTop: 8
    },
    header: {
        height: 50,
        alignItems: 'flex-end',
        backgroundColor: 'black',
        flexDirection: 'column',
        paddingTop: 15
    },
});