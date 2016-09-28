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
       this.fetchData(this.props.data3);
    },

    fetchData: function (postIdNavigator) {
        //rowApi = rowApi +10; 
        //alert(postIdNavigator);
        var API_URL = 'http://jsonplaceholder.typicode.com/comments?postId='+postIdNavigator;
        fetch(API_URL).then((response) => response.json()).then((responseData) => {
            var organizations = responseData,
                //alert(organizations[0].name);
                 length = organizations.length,
                 dataBlob = [],
                // sectionIDs = [],
                 name,
                 body,
                // url,
                // apiAll,
                 j;

                for (var i = 0; i < length ;  i++) {
                    //sectionIDs[i] = organizations[i].userId;
                    //rows[i] = organizations[i].userId;
                    dataBlob[i] = organizations[i];
                 
                 }
                    this.setState({
                        dataSource : this.state.dataSource.cloneWithRows(dataBlob),
                        loaded     : true
                    });
                
                //alert(dataBlob[0]);
        }).done(); 
              
    },
    // renderListView: function () {
    //     return (
            

    //     );///
    // },
     renderRow: function(rowData) {
        return (
            <TouchableOpacity >
                    <View style = {styles.rowContainer1}>
                        <Text  style={styles.section}>{rowData.name}</Text>
                        <Text  style={styles.textContainer}>{rowData.body}</Text>
                     </View>
                </TouchableOpacity>
        ); /////
                       
    },

    render: function() {
        //alert(this.props.data3);
        return (
            
            <View style = {styles.container}>
                <View style={styles.section}>
                    <Text >{this.props.data}</Text>
                </View>
                <Text style = {styles.textContainer} >{this.props.data1}</Text>
                <Text style = {styles.textContainer1}>{this.props.data2}</Text>
                 
                <Button text={'the comments>'}/>
            <View style={styles.container}>
                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}              
                />
                
            </View>
            <Button text={'Back To ListNews...'} onPress = {this.onPopPress}/> 
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