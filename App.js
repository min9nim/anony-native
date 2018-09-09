import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {List} from "./pages";
import {StatusBarBackground} from "./components";



export default class App extends React.Component {
  
  state = {
    page : "list",
    context : "",
  }


  render() {

    let page;
    switch(this.state.page){
      case "list":
        page = <List />;
        break;

      default :
        page = <Text>page is not defined</Text>;;
        break;
    }


    return (
        <View style={styles.container}>
          <StatusBarBackground style={{backgroundColor:'midnightblue'}}/>
          <View style={styles.header}>
            <Text>여기는 헤더입니다</Text>
          </View>
          {page}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  header:{
    flex:1,
    backgroundColor: "red",
  }
});
