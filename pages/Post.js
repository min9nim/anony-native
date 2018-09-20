import React from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

//import {Excerpt, Menu, Search} from "../components";
import {tp} from "../com/app.js";

export default class List extends React.Component {

    constructor(props){
        console.log("Post 생성자 호출입니다");
        super(props);
        this.state = {
            loading: false
        }
    }
    

    render(){
        console.log("Post 렌더링..");

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}
                            contentContainerStyle={styles.contentContainer}
                            onMomentumScrollEnd={this.scrollEnd}>
                    <Text>{this.props.post.title}</Text>
                    <Text>{this.props.post.writer} - {Date(this.props.post.date).substr(0,21)}</Text>
                    <Text>{this.props.post.content}</Text>
                </ScrollView>
                {this.state.loading &&
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: "100%"
    },

    scrollView: {
        width: "100%",
        backgroundColor: '#eee',
    },    
    title:{
        fontSize: 18,
        marginBottom: 5
    },
    writer: {
        color: "#aaa",
        fontSize: 14
    },
    contentContainer: {
        paddingVertical: 20,
        backgroundColor: 'white',
        padding: 20
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
      }
  });
  