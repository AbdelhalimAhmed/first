import React, { Component, } from 'react';
import GridView from "react-native-easy-grid-view";
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
            dataSource : new GridView.DataSource({
                getSectionData          : getSectionData,
                rowHasChanged           : (r1, r2) => r1 !== r2
            }),
        }
    },
    componentDidMount: function () {
       this.fetchData(this.props.data);
    },

    fetchData: function (albumIdNavigator) {
        var API_URL = 'http://jsonplaceholder.typicode.com/photos?albumId='+albumIdNavigator;
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
                        dataSource : this.state.dataSource.cloneWithCells(dataBlob,3),
                        loaded     : true
                    });
                
        }).done(); 
              
    },

// 
    renderRow: function(rowData) {
        return (
    
        <View >
          <View style={styles.row}>
            <Image
                style={styles.thumb}
                source={{uri: rowData.url}}/>
          </View>
        </View>
    
                     
                
        ); /////
                       
    },

    render: function() {
        const Header = () => (
            //alert(this.props.data3);
            <View  >
                    <Button text={'Your photos'}/>
            </View>
        )

         const Main = () => (
             <ScrollView>
                <GridView 
                    dataSource = {this.state.dataSource}
                    spacing={1}
                    style={{padding:5}}
                    renderCell  = {this.renderRow}  

                    />
            </ScrollView>
         )
        return (

            <View style={styles.container}>
                <Header/>
                
                <Main/>  

                <View>
                    <Button text={'Back To AlbumPosts...'} onPress = {this.onPopPress}/> 
                </View>
            </View>
    
        );
      ///
    },

    onPopPress: function() {
    
        this.props.navigator.pop();

    },

});

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },

  section: { 
        backgroundColor: '#2196F3',
    },
    thumb: {
    width: 100,
    height: 100,
    padding:5,
    alignItems: 'center'
  },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        flexDirection: 'column',
        paddingTop: 15
    },

    text: {
        color: 'white',
        paddingHorizontal: 8,
        fontSize: 16
    },
    
    
});