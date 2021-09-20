import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { mailing } from "../../assets";

export default class IsiKotakMasuk extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionOrder:[],
            collectionCustomer:[],
            id:''
        }
    }

    getItem = async () => {
        await AsyncStorage.getItem('orderkey')
        .then(
            collectionCustomer => {
                console.log(collectionCustomer);
                this.setState({id: collectionCustomer});
                axios.get(`http://10.0.2.2:3000/orders/${collectionCustomer._id}`)
                .then(res => {
                    const collectionOrder = res.data;
                    console.log("data obj",collectionOrder)
                    this.setState({collectionOrder})
                })
            }
        )
    }

    componentDidMount(){
        this.getItem();
    }

    render(){
        const {collectionOrder} = this.state;
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
                            

                            <Button onPress={() => this.props.navigation.navigate('KotakMasuk')} full style={{backgroundColor:'#73A3EC', height:normalize(40), borderRadius:10}} >
                                <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Terima</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}