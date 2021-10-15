import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Body, Button, Left, List, ListItem } from "native-base";
import React, { Component } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, FlatList, Alert } from "react-native";
import normalize from "react-native-normalize";
import { box_add } from "../../assets";
import NumberFormat from 'react-number-format'

export default class PurchaseOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            namapt:"",
            alamatpt:"",
            collection:[],
            values:"",
            detCollect:[],
            sessCollect:[],
            valEmail:'',
            status:'belum verifikasi',
            produksi:'belum produksi',
            material:'belum diterima',
            pembayaran:'belum dibayar',
            pengiriman:'belum dikirim',
            sessions:0,
            no_po:''
        };
    }

    handleNamaPt(event){
        this.setState({namapt: event})
    }

    handleNopo(event){
        this.setState({no_po: event})
    }

    handleAlamatPt(event){
        this.setState({alamatpt: event})
    }



    getValueId = async () => {
        await AsyncStorage.getItem('emailKey')
        .then(
            (values, collection) => {
                console.log(values)
                this.setState({valEmail:values})

                // Mengambil data customer by email
                axios.get(`http://10.0.3.2:3000/customerss/${values}`)
                .then(res => {
                    collection = res.data;
                    console.log(collection._id);
                    this.setState({collection});

                    // Memanggil Data Order by Customer Id
                    console.log("hello", collection);
                    axios.get(`http://10.0.3.2:3000/detorderss/${collection._id}`)
                    .then(res => {
                        const detCollect = res.data;
                        console.log(detCollect);
                        this.setState({detCollect})

                        axios.get(`http://10.0.3.2:3000/detorderss/session/1`)
                        .then(res => {
                            const sessCollect = res.data;
                            console.log("Top", sessCollect.map(id => id._id));
                            this.setState({sessCollect})
                            
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            }
          )
    }

    renderValue(){
           return this.state.sessCollect.map((value, index) => {
                return(
                    <View style={{width:normalize(270), height:normalize(140), backgroundColor:'#fff', padding:normalize(20)}}>
                            <View style={{borderBottomWidth:1}}>
                                <Text style={{textAlign:'left',  fontFamily:'RedHatDisplay-Regular'}}>
                                    Nama Item : {value.nama_item}{'\n'}
                                    Jumlah Item : {value.jumlah_item} Sheet{'\n'}
                                    Berat Material : {value.berat} Kg{'\n'}
                                    Harga Satuan : Rp.{value.harga_satuan},-
                                </Text>
                                <NumberFormat value={value.total_harga} thousandSeparator={true} 
                                displayType="text" prefix="Rp." 
                                renderText={(value) => <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Total Harga : {value}</Text>}
                                />
                            </View>
                    </View>
                )
            })
    }

    componentDidMount(){
        this.getValueId();
    }

    onSubmit(){
        if(this.state.sessCollect && this.state.sessCollect.length < 1){
            Alert.alert('Harap tambahkan data order')
        }
        else if(!this.state.no_po){
            Alert.alert('Harap tambahkan nomor PO')
        }
        else {
            this.forCustomer();
            const dataOrder = {
                namapt: this.state.collection.namapt,
                no_po: this.state.no_po,
                custid: this.state.collection._id,
                alamatpt: this.state.collection.alamatpt,
                detorderid: this.state.sessCollect.map(id => id._id),
                status: this.state.status,
                status_material: this.state.material,
                status_produksi: this.state.produksi,
                status_pembayaran: this.state.pembayaran,
                status_pengiriman: this.state.pengiriman
            }
            console.log("order", dataOrder)
            axios.post('http://10.0.3.2:3000/orders', dataOrder)
            .then(
                res => {
                    console.log(res.data)
                    console.log("data sukses order")
                    alert('Order Berhasil')
                    this.props.navigation.navigate('Verification');
                }
            )
        }
        
    }

    forCustomer(){
        const sess = {
            session_detail: this.state.sessions,
        }
        this.state.detCollect.map(id => 
            {
                console.log("id",id._id);
                axios.put(`http://10.0.3.2:3000/detorders/${id._id}`, sess)
                .then(
                    res => {
                        console.log("sukses")
                        console.log(res.data)
                    }
                )
                .catch(err => {
                    console.log(err)
                })
            }    
        );
    }

    // forDetail(){

    // }

    render(){
        const {detCollect, collection} = this.state;
        return(
            <View style={{height:'100%', backgroundColor:'#73A3EC'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                            <Image source={box_add} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>PESAN SEKARANG</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingLeft:normalize(30), paddingRight:normalize(30), alignItems:'center', justifyContent:'center', paddingTop:normalize(20)}}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), paddingLeft:normalize(10), color:'white', textAlign:'center'}}>
                            Isi Data Dibawah Ini Untuk Melakukan
                            Pemesanan Jasa Shearing Metal Plate
                        </Text>
                    </View>
                    <View style={{padding:normalize(20), alignItems:'center'}}>

                        <View>
                            <TextInput
                            placeholder="Nomor PO"
                            style={{
                                width:normalize(100),
                                paddingLeft:normalize(0),
                                color:'white',
                                textAlign:'center'
                            }}
                            maxLength={5}
                            keyboardType="number-pad"
                            underlineColorAndroid="white"
                            value={this.state.no_po}
                            onChangeText={this.handleNopo.bind(this)}
                            />
                        </View>
                        <View>
                            <TextInput
                            placeholder="Nama Perusahaan"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            editable={false}
                            underlineColorAndroid="white"
                            value={collection.namapt}
                            onChangeText={this.handleNamaPt.bind(this)}
                            />
                        </View>
                        <View>
                            <TextInput
                            placeholder="Alamat Perusahaan"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            editable={false}
                            underlineColorAndroid="white"
                            value={collection.alamatpt}
                            onChangeText={this.handleAlamatPt.bind(this)}
                            />
                        </View>
                        <View style={{flexDirection:'row', paddingTop:normalize(10)}}>
                            <Left>
                                <Button onPress={() => this.props.navigation.navigate('DetailOrder')} style={{backgroundColor:'#003499', height:normalize(40), width:normalize(150), marginLeft:normalize(40)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(16),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Tambah Material</Text>
                                </Button>
                            </Left>
                            <Body/>
                        </View>

                            {this.renderValue()}
                            {/* <View style={{height:normalize(100), width:normalize(250),marginTop:normalize(20), backgroundColor:'#fff'}}>

                            </View> */}
                        

                            <View style={{paddingTop:normalize(20)}}>
                                <Button full style={{backgroundColor:'#003499', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => {this.onSubmit()}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Order</Text>
                                </Button>
                                <View style={{paddingTop:normalize(10)}}/>
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