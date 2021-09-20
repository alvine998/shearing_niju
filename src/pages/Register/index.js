import axios from 'axios';
import { Button } from 'native-base';
import React, { Component } from 'react'
import { Alert, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import { nijulogo } from '../../assets';

export default class Registrasi extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            phone:'',
            name:'',
            password:'',
            collection:[],
            namapt:'',
            alamatpt:''
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleNamapt = this.handleNamapt.bind(this);
        this.handleAlamatpt = this.handleAlamatpt.bind(this);
    }

    handleEmail = (event) => {
        this.setState({email: event})
    }

    handlePass = (event) => {
        this.setState({password: event})
    }

    handleName = (event) => {
        this.setState({name: event})
    }

    handlePhone = (event) => {
        this.setState({phone: event})
    }

    handleNamapt = (event) => {
        this.setState({namapt: event})
    }

    handleAlamatpt = (event) => {
        this.setState({alamatpt: event})
    }

    componentDidMount(){
        axios.get('http://10.0.2.2:3000/customers')
        .then(res => {
            const collection = res.data;
            console.log(collection);
            this.setState({collection});
        })
        .catch(err => {
            console.log(err)
        })
    }

    onSubmit(){
        if(!this.state.name){
            Alert.alert("Harap Isi Nama Anda")
        }
        else if(!this.state.email){
            Alert.alert("Harap Isi Email Anda")
        }
        else if(!this.state.phone){
            Alert.alert("Harap Isi Nomor Ponsel Anda")
        }
        else if(!this.state.password){
            Alert.alert("Harap Isi Password Anda")
        }
        else if(!this.state.namapt){
            Alert.alert("Harap Isi Nama Perusahaan Anda")
        }
        else if(!this.state.email){
            Alert.alert("Harap Isi Alamat Perusahaan Anda")
        }
        else if(this.state.password.length < 8){
            Alert.alert("Password Tidak Boleh Kurang Dari 8 Karakter")
        }
        else {
            const custObject = {
                nama: this.state.name,
                email: this.state.email,
                nohp: this.state.phone,
                password: this.state.password,
                namapt: this.state.namapt,
                alamatpt: this.state.alamatpt
            };
            console.log('hello ',custObject) 
            axios.post('http://10.0.2.2:3000/customers/', custObject)
                .then(res => 
                    {
                    console.log(res.data)
                    Alert.alert('Berhasil Daftar')
                    this.setState({name: '', email:'', phone:'', password:'', namapt:'', alamatpt:''})
                    this.props.navigation.navigate('Login')
                    }
                    );
        }
        
        // this.props.navigation.navigate('Login')
    }


    render(){
        const {collection} = this.state;
        const screenheight = Dimensions.get('window').height;
        return(
            <View style={{backgroundColor:'#73A3EC', height: '100%', maxHeight: screenheight}}>
                <ScrollView>
                    <View  style={{alignItems:'center', justifyContent:'center', paddingTop:normalize(50), paddingBottom:normalize(50)}}>
                        <Image source={nijulogo} style={{height:normalize(120), width:normalize(120)}} />
                            <View style={{padding:normalize(10)}}>
                                <Text style={{color:'white', fontSize:normalize(30), fontWeight:'bold', textAlign:'center'}}>NIJU</Text>
                                <Text style={{color:'white', fontSize:normalize(20)}}>Shearing Metal Plate</Text>
                            </View>
                            <View style={{padding:normalize(20)}}>
                                    <TextInput
                                        placeholder="Nama"
                                        style={{
                                            width:normalize(250),
                                            paddingLeft:normalize(20),
                                            color:'white'
                                        }}
                                        underlineColorAndroid="white"
                                        value={this.state.name}
                                        onChangeText={this.handleName}
                                    />
                                <View style={{padding:normalize(10)}} />
                                    <TextInput
                                        placeholder="Nomor Ponsel"
                                        style={{
                                            width:normalize(250),
                                            paddingLeft:normalize(20),
                                            color:'white'
                                        }}
                                        underlineColorAndroid="white"
                                        value={this.state.phone}
                                        onChangeText={this.handlePhone}
                                        keyboardType="number-pad"
                                        maxLength={12}
                                    />
                                <View style={{padding:normalize(10)}} />
                                {/* <View style={{borderWidth:1, backgroundColor:'white', width:normalize(250),borderColor:'white', height:normalize(40), borderRadius:10}}>
               
                                </View> */}
                                <View>
                                    <TextInput
                                        placeholder="Email"
                                        style={{
                                            width:normalize(250),
                                            paddingLeft:normalize(20),
                                            color:'white'
                                        }}
                                        underlineColorAndroid="white"
                                        value={this.state.email}
                                        onChangeText={this.handleEmail}
                                    />
                                </View>
                                <View style={{padding:normalize(10)}} />

                                <View>
                                    <TextInput
                                        placeholder="Nama Perusahaan"
                                        style={{
                                            width:normalize(250),
                                            paddingLeft:normalize(20),
                                            color:'white'
                                        }}
                                        underlineColorAndroid="white"
                                        value={this.state.namapt}
                                        onChangeText={this.handleNamapt}
                                    />
                                </View>
                                <View style={{padding:normalize(10)}} />

                                <View>
                                    <TextInput
                                        placeholder="Alamat Perusahaan"
                                        style={{
                                            width:normalize(250),
                                            paddingLeft:normalize(20),
                                            color:'white'
                                        }}
                                        underlineColorAndroid="white"
                                        value={this.state.alamatpt}
                                        onChangeText={this.handleAlamatpt}
                                    />
                                </View>
                                <View style={{padding:normalize(10)}} />
                                    <TextInput
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        style={{
                                            width:normalize(250),
                                            paddingLeft:normalize(20),
                                            color:'white'
                                        }}
                                        underlineColorAndroid="white"
                                        value={this.state.password}
                                        onChangeText={this.handlePass}
                                    />
                                    {/* <Icon type={"FontAwesome5"} name="eye-slash" style={{color:'#dfdfdf'}} /> */}
                            </View>
                            <View>
                                <Button onPress={() => this.onSubmit()} full success style={{width:normalize(100), height:normalize(40), borderRadius:10}}>
                                    <Text style={{color:'white'}}>Daftar</Text>
                                </Button>
                            </View>
                        </View>
                </ScrollView>
            </View>
        )
    }
}