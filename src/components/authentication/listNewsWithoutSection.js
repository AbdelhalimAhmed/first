import React, { Component } from 'react';
var React1 = require('react-native');
var { 
  AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AlertIndicator,
    ActivityIndicator,
    TouchableHighlight,
    Alert,
    Image,
} = React1;



var Button = require('../common/button');
var Details = require('../authentication/details');

var rowApi =10;

module.exports = React.createClass({ 
    getInitialState: function () {
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }


        return {
            loaded : false,
            dataSource : new ListView.DataSource({
                getSectionData          : getSectionData,
                rowHasChanged           : (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged : (s1, s2) => s1 !== s2
            })
        }
    },
    componentDidMount: function () {
        this.fetchData();
    },
    
    fetchData: function () {
        rowApi = rowApi +10; 
        var API_URL = 'http://www.actionpal.org.uk/ar/mobile_webservice/content.php?catid=15&row='+rowApi;
        fetch(API_URL).then((response) => response.json()).then((responseData) => {
            var organizations = responseData.data,

                length = organizations.length,
                dataBlob = {},
                sectionIDs ,
                rowIDs = [],
                title,
                introtext_without_html_tags,
                url,
                apiAll,
                i,
                j;

                 sectionIDs = organizations.id;
                 dataBlob[organizations.id] = organizations;
                 

            this.setState({
                dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs),
                loaded     : true
            });

        }).done();        
    },



    renderLoadingView: function () {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>NEWSAPP</Text>
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={!this.state.loaded}
                        style={[styles.activityIndicator, {height: 80}]}
                        size="large"
                    />
                </View>
            </View>
        );
    },

    renderListView: function () {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>News List</Text>
                </View>
                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}
                    
                />
                
                <Button text={'Loading more...'}  onPress = {() => this.loadMore()}/>
            </View>

        );///
    },

    renderRow: function(rowData, sectionID) {
        return (
            <TouchableOpacity >
                    <View style = {styles.rowContainer}>
                      <Image
                        style={styles.thumb}
                        source={{uri: rowData.img_src}}/>
                      <View style = {styles.textContainer1}>
                        <Text  style={styles.textContainer}>{rowData.title}</Text>
                        <Button text={'more...'} onPress = {() => this.onSignPress(rowData.title, rowData.introtext_without_html_tags, rowData.img_src)}/> 
                        </View>
                     </View>
                </TouchableOpacity>
        ); ///
    },

    loadMore: function(){
        this.fetchData();

    },   


    onSignPress: function(rowData,rowData1,rowData2) {
        this.props.navigator.push({
            component: 'details',
            data: rowData,
            data1: rowData1,
            data2: rowData2
        }); 
        

    },


    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        else {
        return this.renderListView();
        }
    },

    
});



var styles = StyleSheet.create({
    container: {
        flex: 1
    },
     rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
    thumb: {
    width: 80,
    height: 80,
    padding:5,
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    padding:5,
    fontSize:15,
  },
  textContainer1: {
    flex: 1,
    alignItems: 'center',
    padding:5,
    flexDirection: 'column',
    justifyContent: 'space-between'
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
    subText: {
        fontSize: 14,
        color: '#757575'
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#2196F3'
    }
});
