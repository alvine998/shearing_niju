import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Body, Button, Left } from "native-base";
import React, { Component } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity } from "react-native";
import normalize from "react-native-normalize";
import { box_add } from "../../assets";

export default class PurchaseOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            namapt:"",
            alamatpt:"",
            collection:[],
            values:"",
            detCollect:[],
            valEmail:'',
        };
    }

    handleNamaPt(event){
        this.setState({namapt: event})
    }

    handleAlamatPt(event){
        this.setState({alamatpt: event})
    }

    getValueId = async () => {
        await AsyncStorage.getItem('emailKey').then(
            (values, collection) => {
                console.log(values)
                this.setState({valEmail:values}) 
                axios.get(`http://10.0.3.2:3000/customerss/${values}`)
                .then(res => {
                    collection = res.data;
                    console.log(collection._id);
                    this.setState({collection});
                })
                .catch(err => {
                    console.log(err)
                })
            }
          )
    }

    getDataDetail = () => {
        console.log("hello", this.state.collection);
        axios.get(`http://10.0.3.2:3000/detorderss/${this.state.collection._id}`)
        .then(res => {
            const detCollect = res.data;
            console.log(detCollect);
            this.setState({detCollect})
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidUpdate(){
        // this.getDataDetail();
    }

    componentDidMount(){
        this.getValueId();
    }

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
                            placeholder="Nama Perusahaan"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            value={this.state.namapt}
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
                            underlineColorAndroid="white"
                            value={this.state.alamatpt}
                            onChangeText={this.handleAlamatPt.bind(this)}
                            />
                        </View>
                        <View style={{flexDirection:'row', paddingTop:normalize(10)}}>
                            <Left>
                                <Button onPress={() => this.props.navigation.navigate('DetailOrder')} style={{backgroundColor:'#003499', height:normalize(40), width:normalize(120), marginLeft:normalize(40)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(16),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Tambah Data</Text>
                                </Button>
                            </Left>
                            <Body/>
                        </View>
                            <View style={{height:normalize(100), width:normalize(250),marginTop:normalize(20), backgroundColor:'#fff'}}>

                            </View>
                        

                            <View style={{paddingTop:normalize(20)}}>
                                <Button full style={{backgroundColor:'#003499', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.navigate('Verification')}>
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