import React, { Component, } from 'react';
var React1 = require('react-native');
var {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    ListView,
    TouchableOpacity,
    
} = React1;

var Button = require('../common/button');



module.exports = React.createClass({
    getInitialState: function () {
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }

        return {
            loaded : false,
            dataSource : new ListView.DataSource({
                getSectionData          : getSectionData,
                rowHasChanged           : (r1, r2) => r1 !== r2
            }),
        }
    },
    componentDidMount: function () {
       this.fetchData(this.props.data);
    },

    fetchData: function (userIdNavigator) {
        var API_URL = 'http://jsonplaceholder.typicode.com/posts?userId='+userIdNavigator;
        fetch(API_URL).then((response) => response.json()).then((responseData) => {
            var organizations = responseData,
                 length = organizations.length,
                 dataBlob = [],
                 name,
                 body,
                 j;

                for (var i = 0; i < length ;  i++) {
                    dataBlob[i] = organizations[i];
                 
                 }
                    this.setState({
                        dataSource : this.state.dataSource.cloneWithRows(dataBlob),
                        loaded     : true
                    });
                
        }).done(); 
              
    },
     renderRow: function(rowData) {

        return (

            <TouchableOpacity >
                    <View style = {styles.rowContainer1}>
                        <Text  style={styles.section}>{rowData.title}</Text>
                        <Text  style={styles.textContainer}>{rowData.body}</Text>
                        <Button text={'Comments'} onPress = {() => this.onSignPress(this.props.data1, rowData.title, rowData.body, rowData.id, this.props.data1, this.props.data)}/>
                        <Text style = {styles.rowLine}>{ '_____________________________________________'} </Text>
                     </View>
                </TouchableOpacity>
        ); /////
                       
    },
     onSignPress: function(rowData,rowData1,rowData2,rowData3,myName,myId) {
        this.props.navigator.push({
            component: 'details',
            data: rowData,
            data1: rowData1,
            data2: rowData2,
            data3: rowData3,
            data4: myName,
            data5: myId
        }); 
        

    },

    render: function() {
        return (
            
            <View style = {styles.container}>
                <Text style = {styles.textContainer1} >{'Your Posts...'}</Text>
            <View style={styles.container}>
                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}              
                />
                
            </View>
            <Button text={'Back To ListPosts...'} onPress = {this.onPopPress}/> 
             </View>
           

        );
        ////
    },

    onPopPress: function() {
    
        this.props.navigator.pop();

    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
     textContainer1: {
    padding:5,
    fontSize:20,
    marginBottom:10,
    color: '#2196F3'
  },
    rowContainer1: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8
  },
  section: { 
        backgroundColor: '#2196F3',
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
    },
     rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
    thumb: {
    width: 80,
    height: 80,
    padding:5,
    alignItems: 'center'
  },
  textContainer: {
    padding:5,
    fontSize:15,
  },
  textContainer1: {
    padding:5,
    fontSize:15,
    marginBottom:10
  },
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'column',
        paddingTop: 15
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white'
    },
    text: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 16
    },
    rowStyle: {
        paddingVertical: 20,
        paddingLeft: 16,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderWidth: 1
    },
    rowText: {
        color: '#212121',
        fontSize: 16
    },
    
    
});