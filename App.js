import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {List, Post, Test} from "./pages";
import {StatusBarBackground} from "./components";
import {createStore} from "redux";
import {reducer} from "./redux/reducer";
import {tp} from "./com/app.js";




export default class App extends React.Component {

  constructor(props){
    console.log("App 생성자 호출입니다");
    super(props);
    this.state = {
      page : "list",
      context : "",
      postKey : ""
    }

    

    tp.view.app = this;


    // 스토어 최초 한번 생성
    tp.store = createStore(reducer, {
        view: {
          search: "",
          uuid: "",
        },
        data: {
          posts: [],        // 전체 글
          comments: []     // 전체 댓글
        }
    });    

  }
  


  render() {
    console.log("App 렌더링");

    let page;
    switch(this.state.page){
      case "post":
        page = <Post post={tp.view.list.state.posts.find(p => p.key === this.state.postKey)}/>;
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
