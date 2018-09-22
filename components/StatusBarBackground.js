import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, Platform} from 'react-native';

export default class StatusBarBackground extends Component {
  render(){
    return(
      <View style={[styles.statusBarBackground, this.props.style || {}]}> 
           <StatusBar hidden={false} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
      statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : 24, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: "blue",
      }
})