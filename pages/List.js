import React from "react";
import { StyleSheet,
    Text,
    View, 
    ScrollView,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

//import {Excerpt, Menu, Search} from "../components";
import {tp} from "../com/app.js";

export default class List extends React.Component {

    constructor(props){
        console.log("생성자 호출입니다");
        super(props);
        this.scrollEnd = this.scrollEnd.bind(this);
        this.state = {
            posts: [],
            loading: false
        }
        global.view.list = this;
        
    }
    
    async getPosts({idx, cnt, context}) {
        this.setState({loading : true});
        let search = "";
        let uuid = "alsrn1234"
        let response = await fetch(
            "https://anony-212509.appspot.com/api/posts/get/" + context + "/" + idx + "/" + cnt,
            {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify({uuid: uuid, search}),
            }
        );
        let posts = await response.json();
        this.setState({loading : false});
        return posts;
    }

    async componentDidMount(){
        let res = await this.getPosts({idx: 0, cnt: 30, context: "min1001"});

        this.setState({posts : res.posts})
    }

    async scrollEnd(){
        let res = await this.getPosts({idx: this.state.posts.length, cnt: 10, context: "min1001"});
        this.setState({posts : this.state.posts.concat(res.posts)})
    }

    onPressTitle(e){
        global.view.app.setState({page : "post", postKey: ""});
    }

    componentWillUnmount(){
        global.state.posts = this.state.posts;

    }


    render(){
        console.log("List 렌더링..");

        return (
            <View style={styles.container}>
            <Text>헬로 월드 </Text>
                {/* <ScrollView style={styles.scrollView}
                            contentContainerStyle={styles.contentContainer}
                            onMomentumScrollEnd={this.scrollEnd}>
                    {this.state.posts.map(post => {
                        return (
                        <TouchableHighlight onPress={this.onPressTitle} underlayColor="white">
                            <View key={post.key} style={styles.excerpt} >
                                <Text style={styles.title}>{post.title}</Text>
                                <Text style={styles.writer}>{post.writer} - {Date(post.date).substr(0,21)}</Text>
                            </View>
                        </TouchableHighlight>
                        )
                    })}
                </ScrollView>
                {this.state.loading &&
                    <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />} */}
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
    excerpt : {
        margin: 10,
    },
    title:{
        fontSize: 18,
        marginBottom: 5
    },
    writer: {
        color: "#aaa",
        fontSize: 14
    },
    scrollView: {
        width: "100%",
        backgroundColor: '#eee',
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
  