import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import React, { Component } from 'react'
import {Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import normalize from 'react-native-normalize'
import { box_add, box_time, invoice, logistics, nijulogo, profile, quality, settings, worker } from '../../assets'
import Login from '../Login'

export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            valEmail:'',
            valId:''
        }
    }

    componentDidMount(){
        const getValueFunction = () => {
            // Function to get the value from AsyncStorage
            AsyncStorage.getItem('emailKey').then(
              (value) =>
                // AsyncStorage returns a promise
                // Adding a callback to get the value
                // this.setState({valEmail: value}),
              // Setting the value in Text
              axios.get(`http://10.0.3.2:3000/customerss/${value}`)
                .then(res => {
                    const collection = res.data;
                    console.log(value);
                    console.log(collection);
                    this.setState({collection});
                })
                .catch(err => {
                    console.log(err)
                })
            );
          };

          getValueFunction();
    }

    _logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Login')
    }
    render(){
        const navigation = this.props.navigation;
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <ScrollView>
                    {/* Header */}
                    <View style={{height:normalize(150), backgroundColor:'#5B6BFB', borderBottomRightRadius:50}}>
                        <View style={{flexDirection:'row', alignItems:'center', paddingTop:normalize(25), paddingLeft:normalize(20)}}>
                            <Image source={nijulogo} style={{width:normalize(110), height:normalize(100)}} />
                            <View>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white', fontSize:normalize(24), fontWeight:'bold'}}>NIJU</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white', fontSize:normalize(20), fontWeight:'bold'}}>SHEARING METAL PLATE</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView horizontal style={{paddingTop:normalize(20)}}>
                        <View style={{height:normalize(300), backgroundColor:'#5B6BFB'}}>
                            <Image source={worker} style={{width:normalize(370), height:normalize(270)}}/>
                        </View>
                        <View style={{height:normalize(300), backgroundColor:'#5B6BFB'}}>
                            <Image source={quality} style={{width:normalize(370), height:normalize(270)}}/>
                        </View>
                        <View style={{height:normalize(300), backgroundColor:'#5B6BFB'}}>
                            <Image source={logistics} style={{width:normalize(370), height:normalize(270)}}/>
                        </View>
                    </ScrollView>

                    

                    <View style={{paddingTop:normalize(20)}}>
                        <View style={{height:normalize(650), backgroundColor:'white', borderTopRightRadius:20, borderTopLeftRadius:20}}>
                            <View style={{alignItems:'center', justifyContent:'center', paddingTop:normalize(10)}}>
                                <View style={{backgroundColor:'#808080', height:normalize(10), width:normalize(250), borderRadius:10}}/>
                                <View style={{paddingTop:normalize(20)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), textAlign:'center'}}>MENU UTAMA</Text>

                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:normalize(20)}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Order')}>
                                            <View style={{width:normalize(70), height:normalize(70),borderRadius:10, backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                                                <Image source={box_add} style={{width:normalize(60), height:normalize(60)}}/>
                                            </View>
                                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center'}}>Pesan {"\n"} Sekarang</Text>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('FindOrder') }>
                                            <View style={{width:normalize(70), height:normalize(70),borderRadius:10, backgroundColor:'#54D871', alignItems:'center', justifyContent:'center'}}>
                                                <Image source={box_time} style={{width:normalize(60), height:normalize(60)}}/>
                                            </View>
                                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center'}}>Lacak {"\n"} Pesanan</Text>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Invoice')}>
                                            <View style={{width:normalize(70), height:normalize(70),borderRadius:10, backgroundColor:'#C3B257', alignItems:'center', justifyContent:'center'}}>
                                                <Image source={invoice} style={{width:normalize(60), height:normalize(60)}}/>
                                            </View>
                                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center'}}>Invoice {"\n"}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:normalize(20)}}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profiles')}>
                                            <View style={{width:normalize(70), height:normalize(70),borderRadius:10, backgroundColor:'#E78181', alignItems:'center', justifyContent:'center'}}>
                                                <Image source={profile} style={{width:normalize(60), height:normalize(60)}}/>
                                            </View>
                                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center'}}>Profil</Text>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'white'}}>

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'white'}}>

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Button */}
                                    <View style={{paddingTop:normalize(250)}}>
                                        <Button onPress={() => this._logout()} full style={{backgroundColor:'#F44444', borderRadius:10, height:normalize(40)}}>
                                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center', fontWeight:'bold'}}>KELUAR</Text>
                                        </Button>
                                    </View>

                                    {/* copyright */}
                                    <View style={{paddingTop:normalize(20)}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(14), textAlign:'center'}}>Copyright By ptniju 2021</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}