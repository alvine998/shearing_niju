import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import {StackActions} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import {nijulogo} from '../assets';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('Login'));
    }, 3000);
  }

  render() {
    return (
      <View>
        <View style={{backgroundColor: '#73A3EC', height: '100%'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: normalize(180),
            }}>
            <Image
              source={nijulogo}
              style={{width: normalize(150), height: normalize(150)}}
            />
            <Text>NIJU - SHEARING METAL PLATE</Text>
          </View>
        </View>
      </View>
    );
  }
}
