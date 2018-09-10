import React from "react";
import { StyleSheet, Text, View } from 'react-native';

//import {Excerpt, Menu, Search} from "../components";
import {tp} from "../com/app.js";

export default class List extends React.Component {

    constructor(props){
        console.log("생성자 호출입니다");
        super(props);
        this.state = {
            posts: []
        }
        console.log("111");
        console.log(JSON.stringify(this.state.posts, null, 2));
        
    }
    
    async getPosts({idx, cnt, context}) {
        let search = "";
        let uuid = "alsrn1234"
        let response = await fetch(
            "https://anony-212509.appspot.com/api/posts/get/" + (context || "root") + "/" + idx + "/" + cnt,
            {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({uuid: uuid, search}),
            }
        );
        let posts = await response.json();
        //console.log("@@@@");
        //console.log(JSON.stringify(posts, null, 2));

        return posts;
    }

    componentDidMount(){
        let posts = this.getPosts({idx: 0, cnt: 10, context: "min1001"});

        posts.then(json => {
            this.setState({posts: json})
            console.log("6666");
            console.log(JSON.stringify(this.state.posts, null, 2));
        });
    }


    render(){
        console.log("List 렌더링..");

        return (
            <View style={styles.container}>
                <Text>목록 화면 무궁화꼬치 피었습니다..</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
                <Text>목록 화면</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 13,
      backgroundColor: '#ddd',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  });
  