import axios from "axios";
import { Body, Button, ListItem } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { emptys, invoice, profile } from "../../assets";

export default class Profiles extends Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            phone:'',
            password:'',
            collection:[],
        };
    }

    componentDidMount(){
        axios.get('http://10.0.3.2:3000/customers')
        .then(res => {
            const collection = res.data;
            console.log(collection);
            this.setState({collection});
        })
        .catch(err => {
            console.log(err)
        })
    }

    // {collection.map(user => <Text>{user.email}</Text>)}


    render(){
        const {collection} = this.state;
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#E78181', alignItems:'center', justifyContent:'center'}}>
                            <Image source={profile} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Profil Anda</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{padding:normalize(30), alignItems:'center'}}>
                        <View style={{paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), color:'white'}}>
                                Halaman Ini Untuk Mengubah Profil
                                Sesuai yang Anda Inginkan
                            </Text>
                        </View>
                        <TextInput
                            placeholder="Nama Anda"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                        />
                        <TextInput
                            placeholder="Email"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                        />
                        <TextInput
                            placeholder="Nomor Ponsel"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                        />
                        <TextInput
                            placeholder="Password"
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            secureTextEntry={true}
                            underlineColorAndroid="white"
                        />

                        <View style={{paddingTop:normalize(20)}}>
                            <Button full style={{backgroundColor:'#003499', height:normalize(40),width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'center'}}>Ganti</Text>
                            </Button>
                        </View>
                        <View style={{paddingTop:normalize(20)}}>
                            <Button full style={{backgroundColor:'#F44444', height:normalize(40),width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'center'}}>Kembali</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}