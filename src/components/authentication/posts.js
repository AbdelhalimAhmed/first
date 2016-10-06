import React, { Component } from 'react';
import DrawerLayout from 'react-native-drawer-layout';

var DrawerLayoutAndroid = require('react-native-drawer-layout');
var React1 = require('react-native');

var { 
  AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    AlertIndicator,
    DrawerLayoutAndroid,
    ActivityIndicator,
    TouchableHighlight,
    ToolbarAndroid,
    Alert,
    Image,
} = React1;



var Button = require('../common/button');
var DrawerView = require('../common/DrawerView');
var Details = require('../authentication/details');
var ToolBar = require('../authentication/ToolBar');

var test =-1;
var rows = [];

module.exports = React.createClass({ 

    getInitialState: function () {
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }

        var getNameView = (data, index) =>
        {
            return data[index];
        }

        return {
            loaded : false,
            dataSource : new ListView.DataSource({
                getSectionData          : getSectionData,
                rowHasChanged           : (r1, r2) => r1 !== r2
            }),
            nameView: getNameView
        }
    },
    componentDidMount: function () {
        this.fetchData();
    },
    
    fetchData: function () {
        //rowApi = rowApi +10; 
        //alert(this.props.data[1]);
        var API_URL = 'http://jsonplaceholder.typicode.com/posts';
        fetch(API_URL).then((response) => response.json()).then((responseData) => {
            var organizations = responseData,

                length = organizations.length,
                dataBlob = [],
                sectionIDs = [],
                title,
                introtext_without_html_tags,
                url,
                apiAll,
                j;

                for (var i = 0; i < length ;  i++) {
                    //sectionIDs[i] = organizations[i].userId;
                    rows[i] = organizations[i].userId;
                    dataBlob[i] = organizations[i];
                 
                 }

                 this.Show(rows);
                    this.setState({
                        dataSource : this.state.dataSource.cloneWithRows(dataBlob),
                        loaded     : true
                    });
                
                //alert(dataBlob[organizations[0].id]);
        }).done(); 
              
    },


    Show: function(rows){
        var x = [];
        //alert(this.props.data[0][0]);
        //alert(this.props.data.length);
        for (var q = 0; q < rows.length; q++) {
            for (var w = 0; w <this.props.data.length ;w++) {
                if(this.props.data[w][1] == rows[q]){
                    x.push(this.props.data[w][0]);
                } 
            }
        }  
        this.setState({
            nameView : x
        });


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
    
    onActionSelected: function() {
       this.refs['DRAWER_REF'].openDrawer();
  
    },

    renderListView: function () {
       
        const Header = () => (
            
            <ToolBar onPress = {() => this.onActionSelected()}/>    
           
        )
        return (
            <DrawerLayoutAndroid
                  drawerWidth={300}
                  drawerLockMode = {'unlocked'}
                  drawerPosition={DrawerLayoutAndroid.positions.Right}
                  renderNavigationView={() => this.NavigationView(this.props.data1, this.props.data2) }
                  onDrawerOpen = {this.onOpen}
                  ref={'DRAWER_REF'}>


            <View style={styles.container}>
                 <Header/>
                <ListView
                    dataSource = {this.state.dataSource}
                    style      = {styles.listview}
                    renderRow  = {this.renderRow}              
                />
                
            </View>
            </DrawerLayoutAndroid>
        );///
    },

    NavigationView: function(myName, myId){
       return (<DrawerView text={'Welcome ' + myName} Name={myName} id={myId} navigator={this.props.navigator}/>);
    },///

    onOpen: function(){
        //alert('bla la bla')
    },

    
    
    renderRow: function(rowData) {
        test +=1;
        var names = this.state.nameView[test];
       //   alert(names); 
        return (
            
                    <View style = {styles.rowContainer1}>
                        <View style={styles.section}>
                            <Text >{this.state.nameView[test]}</Text>
                        </View>
                        
                        <Text  style={styles.textContainer}>{rowData.title}</Text>
                        <Button text={'Comments'} onPress = {() => this.onSignPress(names, rowData.title, rowData.body, rowData.id, this.props.data1, this.props.data2)}/>
                        <Text style = {styles.rowLine}>{ '_____________________________________________'} </Text>
                     </View>
                
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
    rowLine:{
        padding: 2,
        borderWidth: 1,
        alignSelf:'center'   
    },
     rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  rowContainer1: {
    flexDirection: 'column',
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
    alignSelf: 'flex-start'
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
        padding: 5, 
        backgroundColor: '#2196F3',
        alignSelf: 'flex-start',
    },
});
