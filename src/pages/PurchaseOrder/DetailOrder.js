import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Body, Button, Left } from "native-base";
import React, { Component } from "react";
import { Image, ScrollView, Text, TextInput, View, TouchableOpacity, Alert, BackHandler } from "react-native";
import normalize from "react-native-normalize";
import { box_add } from "../../assets";

export default class DetailOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            namaMaterial:'',
            jumlahMaterial:'',
            hargaSatuan:500,
            totalharga:'',
            collection:[],
            values:'',
            orderid:'',
            session_detail:1,
            berat:''
        };
    }

    getValueId = async () => {
        await AsyncStorage.getItem('emailKey').then(
            (values, collection) => {
                console.log(values)
                this.setState({valEmail:values}) 
                axios.get(`http://10.0.3.2:3000/customerss/${values}`)
                .then(res => {
                    collection = res.data;
                    console.log(collection);
                    this.setState({collection});
                })
                .catch(err => {
                    console.log(err)
                })
            }
          )
    }

    handleNamaMaterial(event){
        this.setState({namaMaterial: event})
    }

    handleBerat(event){
        this.setState({berat: event})
    }


    handleJumlahMaterial(event){
        this.setState({jumlahMaterial: event})
    }
    
    
    onSubmit = () => {
        if(this.state.berat == 0 || this.state.berat == ''){
            this.setState({totalharga: ''})
        } else if(this.state.berat >= 1) {
            const total = this.state.hargaSatuan * this.state.berat;
            // this.setState({totalharga : total})
            this.setState((prevState) => ({
                totalharga: prevState.totalharga + total
            }))
        } else if(this.state.berat < 1){
            const total = this.state.hargaSatuan * this.state.jumlahMaterial;
            // this.setState({totalharga : total})
            this.setState((prevState) => ({
                totalharga: prevState.totalharga + total
            }))
        }
    }

    backHandling(){
        Alert.alert("Tekan Tombol Kembali Ya"
        );
        return true;
    }

    onAdd = () => {
        if(!this.state.namaMaterial){
            Alert.alert('harap isi nama material')
        }
        else if(!this.state.jumlahMaterial){
            Alert.alert('harap isi jumlah material')
        }
        else if(!this.state.berat){
            Alert.alert('harap isi Berat Material')
        }
        else if(!this.state.hargaSatuan){
            Alert.alert('harap isi harga satuan')
        }
        else if(!this.state.totalharga){
            Alert.alert('harap isi total harga')
        }
        else {
            const details = {
                custid: this.state.collection._id,
                orderid: this.state.orderid,
                berat: this.state.berat,
                nama_item: this.state.namaMaterial,
                jumlah_item: this.state.jumlahMaterial,
                harga_satuan: this.state.hargaSatuan,
                total_harga: this.state.totalharga,
                session_detail: this.state.session_detail
            }
            console.log('hey', details)
            axios.post('http://10.0.3.2:3000/detorders', details)
            .then(res => {
                console.log(res.data);
                Alert.alert("Data berhasil ditambah");
                this.setState({namaMaterial:'', jumlahMaterial:'', hargaSatuan:500, totalharga:'', berat:''})
            })
        }

        
    }

    componentDidMount(){
        this.getValueId();
        const backHandler = BackHandler.addEventListener("hardwareBackPress", this.backHandling);
        return () => backHandler.remove();
    }

    render(){
        return(
            <View style={{height:'100%', backgroundColor:'#73A3EC'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                            <Image source={box_add} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Detail Order</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingLeft:normalize(30), paddingRight:normalize(30), alignItems:'center', justifyContent:'center', paddingTop:normalize(20)}}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), paddingLeft:normalize(10), color:'white', textAlign:'center'}}>
                            Isi Data Detail Order Dibawah Ini
                            Sesuai Dengan Kebutuhan Order Anda
                        </Text>
                    </View>
                    <View style={{padding:normalize(20), alignItems:'center'}}>
                        <View>
                            <TextInput
                            placeholder="Nama Material"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            value={this.state.namaMaterial}
                            onChangeText={this.handleNamaMaterial.bind(this)}
                            />
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                            <TextInput
                            placeholder="Berat Material"
                            style={{
                                width:normalize(260),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            keyboardType="number-pad"
                            value={this.state.berat}
                            onChangeText={this.handleBerat.bind(this)}
                            />
                            <Text> Kg</Text>
                        </View>
                        <View>
                            <TextInput
                            placeholder="Jumlah Material per Sheet / Pcs"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            keyboardType="number-pad"
                            value={this.state.jumlahMaterial}
                            onChangeText={this.handleJumlahMaterial.bind(this)}
                            />
                        </View>
                        <View>
                            <TextInput
                            keyboardType="number-pad"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            editable={false}
                            value={"Harga Jasa Rp." + JSON.stringify(this.state.hargaSatuan) + ",-"}
                            />
                        </View>

                        <View style={{paddingTop:normalize(10), paddingBottom:normalize(10)}}>
                            <Button onPress={() => this.onSubmit()} full style={{backgroundColor:'#003499', height:normalize(40), width:normalize(100)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white'}}>Cek Total</Text>
                            </Button>
                        </View>
                        <View>
                            <TextInput
                            placeholder="Total Harga"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            editable={false}
                            value={this.state.totalharga}
                            />
                        </View>
                        

                            <View style={{paddingTop:normalize(20)}}>
                                <Button full style={{backgroundColor:'#003499', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => this.onAdd()}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Tambahkan</Text>
                                </Button>
                                <View style={{paddingTop:normalize(10)}}/>
                                <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.push('Order')}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                                </Button>
                            </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}