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
            collect:[],
            id:'',
            status:'sudah verifikasi',
            ordid:[]
        }
    }

    getItem = async () => {
        await AsyncStorage.getItem('orderkey')
        .then(
            collectionOrder => {
                console.log("Hey" ,collectionOrder);
                this.setState({
                    collectionOrder
                })
                axios.get(`http://10.0.2.2:3000/orders/${collectionOrder}`)
                    .then(res => {
                        const collectionCustomer = res.data;
                        console.log("data obj",collectionCustomer)
                        this.setState({collectionCustomer})

                        return collectionCustomer.detorderid.map(id => 
                            {
                                console.log("id : ", id)
                                // this.setState({ordid: id})
                                // console.log(this.state.ordid)
                                axios.get(`http://10.0.2.2:3000/detorders/${id}`)
                                .then(res => {
                                    const collect = res.data;
                                    console.log("data ok",collect)
                                    this.setState({collect})
                                })
                            }
                        );
                        
                    })
                
            }
        )
    }

    updateStatus(){
        const stats = { status: this.state.status}
        console.log(this.state.status)
        axios.put(`http://10.0.2.2:3000/orders/${this.state.collectionCustomer._id}`, stats)
        .then(
            res => 
            {
                console.log(res.data)
                alert('Status Update')
            }
        )
        
    }

    componentDidMount(){
        this.getItem();
    }

    render(){
        const {collectionCustomer, collect} = this.state;
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
                    <View style={{padding:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:normalize(400), width:'100%', backgroundColor:'#fff', borderRadius:20, padding:normalize(20)}}>
                            <ScrollView>
                                <View>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', textAlign:'center', fontSize:normalize(20), paddingBottom:normalize(10)}} >Request Shearing</Text>
                                    <View style={{paddingTop:normalize(20)}}>
                                        <Text>Order Id : {"\n"} {collectionCustomer._id}</Text>
                                        <Text>Cust Id : {"\n"} {collectionCustomer.custid}</Text>
                                        <Text>Nama PT : {"\n"} {collectionCustomer.namapt}</Text>
                                        <Text>Alamat PT : {"\n"} {collectionCustomer.alamatpt}</Text>
                                        <View style={{paddingTop:normalize(10)}} />
                                        <Text>Detail Order :</Text>
                                        {collect.map(collects => 
                                            {
                                                return(
                                                    <View style={{borderBottomWidth:1}}>
                                                        <Text>Nama Item : {collects.nama_item}</Text>
                                                        <Text>Jumlah Item : {collects.jumlah_item}</Text>
                                                        <Text>Harga Satuan : {collects.harga_satuan}</Text>
                                                        <Text>Total Harga : {collects.total_harga}</Text>
                                                    </View>
                                                )
                                            }
                                        )}
                                    </View>
                                    

                                    <Button onPress={() => {this.updateStatus(), this.props.navigation.navigate('KotakMasuk')}} full style={{backgroundColor:'#73A3EC', height:normalize(40), borderRadius:10, marginTop:normalize(20)}} >
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Terima</Text>
                                    </Button>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
            </View>
        )
    }
}