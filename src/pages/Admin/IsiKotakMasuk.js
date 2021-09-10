import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { mailing } from "../../assets";

export default class IsiKotakMasuk extends Component{
    constructor(props){
        super(props);
        this.state={

        }
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
                    <View style={{padding:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:normalize(450), width:'100%', backgroundColor:'#fff', borderRadius:20, padding:normalize(20)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', textAlign:'center', fontSize:normalize(20), paddingBottom:normalize(10)}} >Request Shearing</Text>
                            <Text style={{fontFamily:'RedHatDisplay-Regular'}} >1. Order Id :</Text>
                            <Text style={{fontFamily:'RedHatDisplay-Regular'}} >2. Nama :</Text>
                            <Text style={{fontFamily:'RedHatDisplay-Regular'}} >3. Nama Perusahaan :</Text>
                            <Text style={{fontFamily:'RedHatDisplay-Regular'}} >4. Alamat Perusahaan : {"\n"}</Text>
                            <Text style={{fontFamily:'RedHatDisplay-Regular'}} >5. Kebutuhan Perusahaan :{"\n"}{"\n"}</Text>
                            <Text style={{fontFamily:'RedHatDisplay-Regular'}} >6. Detail Order :{"\n"}{"\n"}{"\n"}{"\n"}</Text>

                            <Button onPress={() => this.props.navigation.navigate('KotakMasuk')} full style={{backgroundColor:'#73A3EC', height:normalize(40), borderRadius:10}} >
                                <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Terima</Text>
                            </Button>
                            <View style={{paddingTop:normalize(10)}} />
                            <Button onPress={() => this.props.navigation.navigate('KotakMasuk')}  full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10}} >
                                <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Tolak</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}