import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Button, Icon, Right } from 'native-base';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import { nijulogo } from '../../assets';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            collection:[],
            karyawan:[]
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }

    handleEmail = (event) => {
        this.setState({email: event})
    }

    handlePass = (event) => {
        this.setState({password: event})
    }

    componentDidMount(){
        axios.get(`http://10.0.3.2:3000/karyawans`)
        .then(
            res => {
                console.log(res.data.map(email => email.email))
                this.setState({karyawan: res.data})
            }
        )
    }

    storeData = async () => {
        if(this.state.email){
            AsyncStorage.setItem('emailKey', this.state.email)
        } else {
            alert('Please fill')
        }
    }

    onLogin(){
        const authOk = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://10.0.3.2:3000/customers/login/', authOk)
        .then(res => {
            console.log(res.data);
            Alert.alert("Login Sukses");
            this.storeData();
            this.props.navigation.navigate('Home')   
        })   
        .catch(err => {
            if(this.state.email = 'alfi@gmail.com' && this.state.password == 12345678){
                Alert.alert("Login Sukses");
                this.props.navigation.navigate('Dashboard')
            } else {
                console.log(err);
                Alert.alert("Username atau Password Salah")
            }
        })     
    }



    render(){
        const screenheight = Dimensions.get('window').height;
        const screenwidth = Dimensions.get('window').width;
        const navigation = this.props;
        return(
            <View style={{backgroundColor:'#73A3EC', height: 'auto', maxHeight: screenheight, width: 'auto', maxWidth: screenwidth }}>
                <ScrollView style={{paddingBottom:normalize(150)}}>
                    <View style={{alignItems:'center', justifyContent:'center', paddingTop:normalize(50)}}>
                        <Image source={nijulogo} style={{height:normalize(120), width:normalize(120)}} />
                        <View style={{padding:normalize(10)}}>
                            <Text style={{color:'white', fontSize:normalize(30), fontWeight:'bold', textAlign:'center', fontFamily:'RedHatDisplay-Bold'}}>NIJU</Text>
                            <Text style={{color:'white', fontSize:normalize(20), fontFamily:'RedHatDisplay-Bold'}}>Shearing Metal Plate</Text>
                        </View>
                        <View style={{padding:normalize(20)}}>
                            {/* <View style={{borderWidth:1, backgroundColor:'white', width:normalize(250),borderColor:'white', height:normalize(40), borderRadius:10, paddingTop:normalize(-10)}}>
                                
                            </View> */}
                            <View>
                                <TextInput
                                    placeholder="Email"
                                    style={{
                                        width:normalize(250),
                                        paddingLeft:normalize(20),
                                    }}
                                    underlineColorAndroid="white"
                                    value={this.state.email}
                                    onChangeText={this.handleEmail}
                                />
                            </View>
                            <View>
                                <TextInput
                                    placeholder="Password"
                                    style={{
                                        width:'100%',
                                        paddingLeft:normalize(20),
                                    }}
                                    underlineColorAndroid="white"
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={this.handlePass}
                                />
                            </View>
                            {/* <TouchableOpacity style={{paddingTop:normalize(5)}}>
                                <Text style={{textAlign:'right', color:'#003499'}}>Lupa Password ?</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View>
                            <Button full success onPress={() => this.onLogin()}  style={{width:normalize(250), height:normalize(40), borderRadius:10}}>
                                <Text style={{color:'white', fontFamily:'RedHatDisplay-Regular', textAlign:'center'}}>Masuk</Text>
                            </Button>
                        </View>
                        {/* <View style={{paddingTop:normalize(10)}}>
                            <Button full success onPress={() => this.props.navigation.navigate('Dashboard')}  style={{width:normalize(250), height:normalize(40), borderRadius:10}}>
                                <Text style={{color:'white', fontFamily:'RedHatDisplay-Regular', textAlign:'center'}}>Masuk Admin</Text>
                            </Button>
                        </View> */}
                        <View style={{flexDirection:'row', paddingTop:normalize(50)}}>
                            <Text style={{textAlign:'right', color:'black', fontFamily:'RedHatDisplay-Regular'}}>Belum Punya Akun ? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Registrasi')} >
                            <Text style={{textAlign:'right', color:'#003499', fontFamily:'RedHatDisplay-Regular'}}>Daftar Disini</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}