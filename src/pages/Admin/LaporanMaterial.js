import React, { Component } from 'react'
import { Image, ScrollView, Text, View } from 'react-native';
import normalize from 'react-native-normalize';

export default class LaporanMaterial extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                            <Image source={mailing} style={{width:normalize(50), height:normalize(40)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Kotak Masuk</Text>
                    </View>
                </View>
                <ScrollView>

                </ScrollView>
            </View>
        )
    }
}