import React, {Component} from 'react';
import {Image, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StackActions} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import {nijulogo} from '../assets';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const validasiSession = async () => {
      const isLogin = await AsyncStorage.getItem('session_id')
      if(isLogin){
        setTimeout(() => {
          this.props.navigation.dispatch(StackActions.replace('Home'));
        }, 1500);
      } else {
        setTimeout(() => {
          this.props.navigation.dispatch(StackActions.replace('Login'));
        }, 3000);
      }
    }    
    validasiSession(); 
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
            <Text style={{fontFamily:'RedHatDisplay-Regular', fontWeight:'bold', fontSize:normalize(24), color:'white', textAlign:'center'}}>NIJU {"\n"} SHEARING METAL PLATE</Text>
          </View>
        </View>
      </View>
    );
  }
}
