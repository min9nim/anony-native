import React from "react";
import { StyleSheet,
    Text,
    View, 
    ScrollView,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import {tp} from "../com/app.js";

export default class List extends React.Component {

    constructor(props){
        console.log("List 생성자 호출입니다!!");
        super(props);
        this.scrollEnd = this.scrollEnd.bind(this);
        this.state = {
            posts: [],
            comments: [],
            loading: false
        }

        const data = tp.store.getState().data;
        if(data.posts.length > 0){
            this.state.posts = data.posts;
            this.state.comments = data.comments;
        }
        

        tp.view.list = this;

        // 이후 App 가 스토어 상태를 구독하도록 설정
        this.unsubscribe = tp.store.subscribe(() => {
            console.log("List가 store 상태 변경 노티 받음")
            this.setState(tp.store.getState().data);
        });
        
    }
    
    async getPosts({idx, cnt, context}) {
        console.log("idx : cnt = " + idx + " :" + cnt);
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
        let res = await response.json();
        
        this.setState({loading : false});
        return res.posts;
    }

    async componentDidMount(){
        console.log("List componentDidMount called..");
        if(tp.store.getState().data.posts.length === 0){
            console.log("## getPosts called");

            let posts = await this.getPosts({idx: 0, cnt: 30, context: "min1001"});
            tp.store.dispatch(tp.action.setPosts(posts));    
        }
    }

    async scrollEnd(){
        console.log("스크롤 엔드 이벤트 발생 ~~ ");
        let res = await this.getPosts({idx: this.state.posts.length, cnt: 10, context: "min1001"});
        //this.setState({posts : this.state.posts.concat(res.posts)})
        tp.store.dispatch(tp.action.scrollEnd(res));
        
    }

    onPressTitle(postKey){
        tp.view.app.setState({page : "post", postKey});
    }

    componentWillUnmount(){
        console.log("# List unsubscribe store..");
        this.unsubscribe();
    }

    render(){
        console.log("List 렌더링");

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}
                            contentContainerStyle={styles.contentContainer}
                            //onMomentumScrollEnd={this.scrollEnd}
                            onScroll={(e) => {
                                let paddingToBottom = 1;
                                paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                                //var str = Math.floor(e.nativeEvent.layoutMeasurement.height) + "-" + Math.floor(e.nativeEvent.contentOffset.y) + "-" + Math.floor(e.nativeEvent.contentSize.height);
                                //console.log(str);
                                if(e.nativeEvent.contentOffset.y + paddingToBottom >= e.nativeEvent.contentSize.height ) {
                                    this.scrollEnd();
                                }
                              }}
                            
                            >
                    {
                        this.state.posts.map(post => {
                        return (
                        <TouchableHighlight key={post.key} onPress={(e)=>{this.onPressTitle(post.key)}} underlayColor="white">
                            <View style={styles.excerpt} >
                                <Text style={styles.title}>{post.title}</Text>
                                <Text style={styles.writer}>{post.writer} - {Date(post.date).substr(0,21)}</Text>
                            </View>
                        </TouchableHighlight>
                        )
                    })}
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
  