import React, {Component} from 'react';
import {View, StatusBar, StyleSheet, Platform} from 'react-native';

export default class StatusBarBackground extends Component{
  render(){
    return(
      <View style={[styles.statusBarBackground, this.props.style || {}]}> //This part is just so you can change the color of the status bar from the parents by passing it as a prop
           <StatusBar
            hidden={false}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: "blue",
  }

})