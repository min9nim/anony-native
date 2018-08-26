import React from "react";
import { StyleSheet, Text, View } from 'react-native';

//import {Excerpt, Menu, Search} from "../components";
//import {tp} from "../com/app.js";

export default class List extends React.Component {
   
    state = {
        posts: []
    }


    render(){
        console.log("List 렌더링..");

        return (
            <View style={styles.container}>
                <Text>목록 화면</Text>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  