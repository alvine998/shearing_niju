import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base'
import React, { Component } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import { logistics, nijulogo, quality, worker } from '../../assets'

export default class HomeScreen extends Component{
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
                        <View style={{height:normalize(600), backgroundColor:'white', borderTopRightRadius:20, borderTopLeftRadius:20}}>
                            <View style={{alignItems:'center', justifyContent:'center', paddingTop:normalize(10)}}>
                                <View style={{backgroundColor:'#808080', height:normalize(10), width:normalize(250), borderRadius:10}}/>
                                <View style={{paddingTop:normalize(20)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), textAlign:'center'}}>MENU UTAMA</Text>

                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:normalize(20)}}>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'#6D7AF2'}}>

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'#54D871'}}>

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'#C3B257'}}>

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', paddingTop:normalize(20)}}>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'#E78181'}}>

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'#B4B4B4'}}>

                                            </View>
                                        </TouchableOpacity>
                                        <View style={{paddingLeft:normalize(20)}}/>
                                        <TouchableOpacity>
                                            <View style={{width:normalize(70), height:normalize(70), backgroundColor:'white'}}>

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Button */}
                                    <View style={{paddingTop:normalize(290)}}>
                                        <Button onPress={() => navigation.navigate('Login')} full style={{backgroundColor:'#F44444', borderRadius:10, height:normalize(40)}}>
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