import React, { Component } from 'react';
import { AppRegistry, ListView,ScrollView, Text, View,StyleSheet ,Image,TouchableHighlight} from 'react-native';

class first extends Component {
  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    //var request = new XMLHttpRequest();
    //var arr = new Array();
    //arr[2]="343434"
    var out;
    var test = 'wwe';
    

  /*request.onreadystatechange=function() {
    
    if (request.status === 200) {
       var arr = JSON.parse(this.responseText).data;
       
       test = 'ahoooooooo';
        for( i=0;i<10;i++){
            out += arr[i].introtext_without_html_tags;
        }
   }
  }
     
request.open('GET', 'http://www.actionpal.org.uk/ar/mobile_webservice/content.php?catid=15&row=10');
request.send();*/

//_onPressButtonGET() {
      fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
       this.setState.out = responseJson.movies[0].title;
        //var out2=out;
        
        //this.state = {out};
       //return out;
      })
      .catch((error) => {
        console.error(error);
      });
    //}
     //alert(out);
    var list_view = new Array();
    for (var i = 0; i < 3; i++){
        list_view[i] = new Array(3);
    }

    list_view[0][0]='http://img.youm7.com/large/201608260325352535.jpg'
    list_view[0][1]='el5abar el2awel '
    list_view[0][2]='Tfasel el 5aber el2awel  '
    list_view[1][0]='http://img.youm7.com/large/S6201028152346.jpg'
    list_view[1][1]=' el5abar el tany  '
    list_view[1][2]='Tfasel el 5abar el tany ';
    
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      ds:[[ list_view[0][0], list_view[0][1] ,this.setState.out],[list_view[1][0], this.setState.out,list_view[1][2]]],
      dataSource:ds,
    }
  }

   
  
  componentDidMount(){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(this.state.ds),
    })

  }
  
  pressRow(rowData){   
     alert(rowData);
  }

  
  getData(response){
    
  }
  
  renderRow(rowData){
    return (
       
      <TouchableHighlight
        onPress={()=> this.pressRow(rowData[2])}
        underlayColor = '#ddd'
        >
        <View style = {styles.rowContainer}>
          <Image
            style={styles.thumb}
            source={{uri: rowData[0]}}/>
          <View style = {styles.textContainer1}>
            <Text  style={styles.textContainer}>{rowData[1]}</Text>
            <Text  style={styles.textContainer}>{rowData[2]}</Text>           
          </View>
         </View>
                        
      </TouchableHighlight>

    )
  }
  
  render(){
    return (
      <ListView
        dataSource = {this.state.dataSource}
        renderRow = {this.renderRow.bind(this)}>
      </ListView>
    );
  }
}

class API extends Component{
  
}

var styles = StyleSheet.create({
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
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
    flex: 1,
    paddingTop: 22,
    alignItems: 'center',
    backgroundColor: 'powderblue'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});// App registration and rendering
AppRegistry.registerComponent('first', () => first);