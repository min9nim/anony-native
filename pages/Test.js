import React, { Component } from 'react';
//import {Text} from 'react-native';
import { Root, Container, Header, Content, Button, Text} from 'native-base';
import { Font, AppLoading } from "expo";

export default class ButtonExample extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({ loading: false });
    }


    render() {
        if (this.state.loading) {
            return (
              <Root>
                  <Text>Loading..</Text>
                <AppLoading />
              </Root>
            );
        }
          
          
        return (
            <Container>
                <Header />
                <Content>
                    <Button light><Text> Light </Text></Button>
                    <Button primary><Text> Primary </Text></Button>
                    <Button success><Text> Success </Text></Button>
                    <Button info><Text> Info </Text></Button>
                    <Button warning><Text> Warning </Text></Button>
                    <Button danger><Text> Danger </Text></Button>
                    <Button dark><Text> Dark </Text></Button>
                </Content>
            </Container>    
        );
    }
}