import { Button, Icon, Right } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import normalize from 'react-native-normalize';
import { nijulogo } from '../../assets';

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            collection:[]
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
                            <Text style={{color:'white', fontSize:normalize(30), fontWeight:'bold', textAlign:'center'}}>NIJU</Text>
                            <Text style={{color:'white', fontSize:normalize(20)}}>Shearing Metal Plate</Text>
                        </View>
                        <View style={{padding:normalize(20)}}>
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
                            <TouchableOpacity style={{paddingTop:normalize(5)}}>
                                <Text style={{textAlign:'right', color:'#003499'}}>Lupa Password ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Button onPress={() => this.props.navigation.navigate('Home')} full success style={{width:normalize(100), height:normalize(40), borderRadius:10, backgroundColor:'#56FF1B'}}>
                                <Text style={{color:'black'}}>Masuk</Text>
                            </Button>
                        </View>
                        <View style={{flexDirection:'row', paddingTop:normalize(50)}}>
                            <Text style={{textAlign:'right', color:'black'}}>Belum Punya Akun ? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Registrasi')} >
                            <Text style={{textAlign:'right', color:'#003499'}}>Daftar Disini</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}