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
        }
    }

    componentDidMount(){
        axios.get(`http://10.0.2.2:3000/orders/`)
        .then(res => {
            const collectionOrder = res.data;
            console.log("data obj",collectionOrder)
            this.setState({collectionOrder})
        })
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
                            {collectionOrder.map(item => {
                                return(
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}} >1. Order Id : {item._id}</Text>
                                )
                                })}
                            {collectionOrder.map(item => {
                                return(
                                    <Text style={{fontFamily:'RedHatDisplay-Regular'}} >2. Nama : {item.custid}</Text>
                                )
                            })}
                            {collectionOrder.map(item => {
                                return(
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}} >3. Nama Perusahaan : {item.namapt}</Text>
                                )
                            })}
                            {collectionOrder.map(item => {
                                return(
                                    <Text style={{fontFamily:'RedHatDisplay-Regular'}} >4. Alamat Perusahaan : {item.alamatpt}</Text>
                                )
                            })}
                            {collectionOrder.map(item => {
                                return(
                                    <Text style={{fontFamily:'RedHatDisplay-Regular'}} >5. Nomor Dihubungi :</Text>
                                )
                            })}
                            {collectionOrder.map(item => {
                                return(
                                    <Text style={{fontFamily:'RedHatDisplay-Regular'}} >6. Detail Order : {"\n"} {item.detorderid.nama_item}</Text>
                                )
                            })}

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