import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {List, Post, Test} from "./pages";
import {StatusBarBackground} from "./components";



export default class App extends React.Component {

  constructor(props){
    console.log("App 생성자 호출입니다");
    super(props);
    this.state = {
      page : "list",
      context : "",
      postKey : ""
    }

    global.view = {};

    global.view.app = this;


  }
  


  render() {
console.log("App 렌더링");
    let page;
    switch(this.state.page){
      case "post":
        page = <Post post={global.view.list.state.posts.find(p => p.key === this.state.postKey)}/>;
        break;

      case "list":
        page = <List />;
        break;

      case "test":
        page = <Test />;
        break;

      default :
        page = <Text>page is not defined</Text>;;
        break;
    }


    return (
        <View style={styles.container}>
          <StatusBarBackground style={{backgroundColor:'midnightblue'}}/>
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
