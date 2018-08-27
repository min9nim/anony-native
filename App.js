import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {List} from "./pages";


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
});
