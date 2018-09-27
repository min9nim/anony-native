import React from "react";
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';
import {Button, Text} from 'native-base';
import { Font } from "expo";
//import Markdown from 'react-native-simple-markdown';
//import Markdown from 'react-native-markdown-renderer';
import { MarkdownView } from 'react-native-markdown-view';



//import {Excerpt, Menu, Search} from "../components";
import {tp} from "../com/app.js";

export default class Post extends React.Component {

    constructor(props){
        console.log("Post 생성자 호출입니다");
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Courier : require("native-base/Fonts/Courier.ttf")
        });
        this.setState({ loading: false });
    }    

    goList(){
        tp.view.app.setState({page : "list"});
    }

    render(){
        console.log("Post 렌더링..");
        if (this.state.loading) {
            return (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            );
        }        

        return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>{this.props.post.title}</Text>
                <Text style={styles.writer}>{this.props.post.writer} - {Date(this.props.post.date).substr(0,21)}</Text>
                {
                    this.props.post.isMarkdown
                    ?
                    <MarkdownView>{this.props.post.content}</MarkdownView>
                    :
                    <Text style={styles.content}>{this.props.post.content}</Text>
                }
                <View style={styles.btnWrapper}>
                    <Button success small style={styles.btn} onPress={this.goList}><Text> List </Text></Button><Button success small style={styles.btn}><Text> Write </Text></Button>
                </View>
            </ScrollView>
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
        backgroundColor: '#fff',
    },    
    title:{
        fontSize: 30,
        marginBottom: 5,
        textAlign: "right"
    },
    writer: {
        color: "#aaa",
        fontSize: 14,
        marginBottom: 10
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
    },
    btnWrapper: {
        marginTop: 10,
        flexDirection: "row",
    },
    btn: {
        marginRight: 5,
    }

  });
  

  const markdownStyles = {
    heading1: {
      fontSize: 24,
      color: 'purple',
    },
    link: {
      color: 'pink',
    },
    mailTo: {
      color: 'orange',
    },
    text: {
      color: '#555555',
    },
  }