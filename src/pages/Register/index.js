import { Button } from 'native-base';
import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
            collection:[]
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePass = this.handlePass.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleName = this.handleName.bind(this);
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


    render(){
        const screenheight = Dimensions.get('window').height;
        return(
            <View style={{backgroundColor:'#73A3EC', height: 'auto', maxHeight: screenheight}}>
                <ScrollView style={{paddingBottom:normalize(50)}}>
                    <View  style={{alignItems:'center', justifyContent:'center', paddingTop:normalize(50)}}>
                        <Image source={nijulogo} style={{height:normalize(120), width:normalize(120)}} />
                            <View style={{padding:normalize(10)}}>
                                <Text style={{color:'white', fontSize:normalize(30), fontWeight:'bold', textAlign:'center'}}>NIJU</Text>
                                <Text style={{color:'white', fontSize:normalize(20)}}>Shearing Metal Plate</Text>
                            </View>

                            <View style={{padding:normalize(20)}}>
                                <View style={{borderWidth:1, flexDirection:'row' ,backgroundColor:'white', width:normalize(250),borderColor:'white', height:normalize(40), borderRadius:10}}>
                                    <TextInput
                                        placeholder="Nama"
                                        style={{
                                            width:'100%',
                                            paddingLeft:normalize(20)
                                        }}
                                        value={this.state.name}
                                        onChange={this.handleName}
                                    />
                                </View>
                                <View style={{padding:normalize(10)}} />
                                <View style={{borderWidth:1, flexDirection:'row' ,backgroundColor:'white', width:normalize(250),borderColor:'white', height:normalize(40), borderRadius:10}}>
                                    <TextInput
                                        placeholder="Nomor Ponsel"
                                        style={{
                                            width:'100%',
                                            paddingLeft:normalize(20)
                                        }}
                                        value={this.state.phone}
                                        onChange={this.handlePhone}
                                        keyboardType="number-pad"
                                        maxLength={13}
                                    />
                                </View>
                                <View style={{padding:normalize(10)}} />
                                <View style={{borderWidth:1, backgroundColor:'white', width:normalize(250),borderColor:'white', height:normalize(40), borderRadius:10}}>
                                    <TextInput
                                        placeholder="Email"
                                        style={{
                                            width:'100%',
                                            paddingLeft:normalize(20)
                                        }}
                                        value={this.state.email}
                                        onChange={this.handleEmail}
                                    />
                                </View>
                                <View style={{padding:normalize(10)}} />
                                <View style={{borderWidth:1, flexDirection:'row' ,backgroundColor:'white', width:normalize(250),borderColor:'white', height:normalize(40), borderRadius:10}}>
                                    <TextInput
                                        placeholder="Password"
                                        secureTextEntry={true}
                                        style={{
                                            width:'100%',
                                            paddingLeft:normalize(20)
                                        }}
                                        value={this.state.password}
                                        onChange={this.handlePass}
                                    />
                                    {/* <Icon type={"FontAwesome5"} name="eye-slash" style={{color:'#dfdfdf'}} /> */}
                                </View>
                            </View>
                            <View>
                                <Button onPress={() => this.props.navigation.navigate('Home')} full success style={{width:normalize(100), height:normalize(40), borderRadius:10, backgroundColor:'#56FF1B'}}>
                                    <Text style={{color:'black'}}>Daftar</Text>
                                </Button>
                            </View>
                        </View>
                </ScrollView>
            </View>
        )
    }
}