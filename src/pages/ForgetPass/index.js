import { Button } from 'native-base';
import React, { Component } from 'react'
import { Image, Text, TextInput, View } from 'react-native';
import normalize from 'react-native-normalize';
import { forgetpass } from '../../assets';

export default class ForgetPass extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{padding:normalize(20), paddingTop:normalize(80)}}>
                    <Image source={forgetpass} style={{width:normalize(350), height:normalize(200), paddingBottom:normalize(20)}} />
                    <Text style={{color:'white', fontWeight:'bold', textAlign:'center', fontSize:normalize(24)}}>Masukkan Alamat Email</Text>
                    <View style={{paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                        <View>
                            <TextInput
                                placeholder="Email"
                            />
                        </View>
                        <Button full success style={{backgroundColor:'#56FF1B', height:normalize(40)}}>
                            <Text style={{color:'black', fontWeight:'bold', fontSize:normalize(24), fontFamily:'RedHatDisplay-Regular'}}>Kirim</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}