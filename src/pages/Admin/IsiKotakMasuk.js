import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import NumberFormat from "react-number-format";
import { mailing } from "../../assets";

export default class IsiKotakMasuk extends Component{
    constructor(props){
        super(props);
        this.state={
            collectionOrder:[],
            collectionCustomer:[],
            ordid:[],
            detail:[],
            id:'',
            status:'sudah verifikasi',
            nama_item:'',
            harga_satuan:'',
            jumlah_item:'',
            total_harga:''
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
                axios.get(`http://10.0.3.2:3000/orders/${collectionOrder}`)
                    .then((res,i) => {
                        const collectionCustomer = res.data;
                        console.log(`collectionCustomer`, collectionCustomer)
                        // console.log("data obj",collectionCustomer.detailorders.map(id => id._id))
                        // collectionCustomer.detailorders.forEach(element => {
                        //   console.log('element',element)  
                        // })
                        this.setState({collectionCustomer}) 
                    }).catch(err => {console.log(err)})
                
            }
        )
    }


    // renderValue(){
    //     return this.state.collectionCustomer.detorderid.map(id => {
    //         axios.get(`http://10.0.3.2:3000/detorders/${id}`)
    //         .then(
    //             res => {
    //                 const detail = res.data;
    //                 console.log("detail : ", detail)
    //                 this.setState({detail})
    //             }
    //         )
    //     })
    // }

    updateStatus(){
        const stats = { status: this.state.status}
        console.log(this.state.status)
        axios.put(`http://10.0.3.2:3000/orders/${this.state.collectionCustomer._id}`, stats)
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
        const {collectionCustomer, collect, detail} = this.state;
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
                                        <Text>Nomor PO : {collectionCustomer.no_po}</Text>
                                        {/* <Text>Cust Id : {"\n"} {collectionCustomer.custid}</Text> */}
                                        <Text>Nama Perusahaan : {"\n"} {collectionCustomer.namapt}</Text>
                                        <Text>Alamat Perusahaan : {"\n"} {collectionCustomer.alamatpt}</Text>
                                        <View style={{paddingTop:normalize(10)}} />
                                        <Text>Detail Order :</Text>
                                        {
                                            collectionCustomer && collectionCustomer.detailorders && collectionCustomer.detailorders.map((element,i) => {
                                                console.log(`element bawah`, element)
                                                return(
                                                    <View style={{borderBottomWidth:1}} key={i}>
                                                        <Text >Nama Item : {element.nama_item}</Text>
                                                        <Text>Jumlah Item : {element.jumlah_item}</Text>
                                                        <Text>Harga Satuan : {element.harga_satuan}</Text>
                                                        <NumberFormat value={element.total_harga} thousandSeparator={true} 
                                                        displayType="text" prefix="Rp." 
                                                        renderText={(value) => <Text>Total Harga : {value}</Text>}
                                                        />
                                                    </View>
                                                )
                                            })
                                        }
                                        
                                        {
                                            // this.state.collectionCustomer.map((res) => {
                                            //     res.detorderid.map((respo,i) => {
                                                    
                                            //     })
                                            // })
                                            // this.renderValue()
                                        }
                                        {/* {
                                            collectionCustomer.map(id => {
                                                axios.get(`http://10.0.3.2:3000/detorders/${id.detorderid}`)
                                                    .then(res => {
                                                    const collect = res.data;
                                                    console.log("data ok",collect)
                                                    this.setState({collect})

                                                    console.log("Detail : ", collect)

                                                    // collect.map(collects => 
                                                    //     {
                                                    
                                                    //         )
                                                    //     }   
                                                    // )
                                                })
                                            })
                                        } */}
                                    </View>
                                    

                                    {
                                        this.state.collectionCustomer.status == "sudah verifikasi" ?
                                        (
                                            <View>
                                                <Button onPress={() => {this.props.navigation.navigate('KotakMasuk')}} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10, marginTop:normalize(20)}} >
                                                    <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Kembali</Text>
                                                </Button>
                                            </View>
                                        ) : 
                                        (
                                            <View>
                                                <Button onPress={() => {this.updateStatus(), this.props.navigation.navigate('KotakMasuk')}} full style={{backgroundColor:'#73A3EC', height:normalize(40), borderRadius:10, marginTop:normalize(20)}} >
                                                    <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Terima</Text>
                                                </Button>
                                                <View style={{paddingTop:normalize(0)}}>
                                                    <Button onPress={() => {this.props.navigation.navigate('KotakMasuk')}} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10, marginTop:normalize(20)}} >
                                                        <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Kembali</Text>
                                                    </Button>
                                                </View>
                                            </View>
                                            
                                        )
                                    }
                                    
                                </View>
                            </ScrollView>
                        </View>
                    </View>
            </View>
        )
    }
}