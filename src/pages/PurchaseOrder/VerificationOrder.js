import { Body, Button, Left } from "native-base";
import React, { Component } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { box_add, waitings } from "../../assets";

export default class VerificationOrder extends Component{
    constructor(props){
        super(props);
        this.state={

        };
    }

    render(){
        return(
            <View style={{height:'100%', backgroundColor:'#73A3EC'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                            <Image source={box_add} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Waiting Verification</Text>
                    </View>
                </View>
                <ScrollView>

                    <View  style={{alignItems:'center', justifyContent:'center', paddingBottom:normalize(20)}}>
                        <Image source={waitings} style={{width:normalize(338), height:normalize(338)}} />
                        <View>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(22),color:'white', paddingLeft:normalize(10), textAlign:'center'}}>
                                Form PO Kamu Lagi di Verifikasi
                                Mohon Ditunggu Ya
                            </Text>
                        </View>
                        <View style={{paddingTop:normalize(20)}}>
                                <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.navigate('Home')}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                                </Button>
                            </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}