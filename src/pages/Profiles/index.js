import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Body, Button, ListItem } from "native-base";
import React, {Component} from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { emptys, invoice, profile } from "../../assets";

export default class Profiles extends Component{
    constructor(props){
        super(props);
        this.state={
            nama:'',
            email:'',
            phone:'',
            password:'',
            collection:[],
            valEmail:'',
            values:''
        };
        this.handleNama = this.handleNama.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleNohp = this.handleNohp.bind(this);
        this.handlePass = this.handlePass.bind(this);
    }

    handleNama(event){
        this.setState({nama: event})
    }

    handleEmail(event){
        this.setState({email: event})
    }

    handleNohp(event){
        this.setState({phone: event})
    }

    handlePass(event){
        this.setState({password: event})
    }


    // Mendapatkan data email current user
    getValueFunction = async () => {
        // Function to get the value from AsyncStorage
      await AsyncStorage.getItem('emailKey').then(
        (values, collection) => {
            console.log(values)
            this.setState({valEmail:values}) 
            axios.get(`http://10.0.2.2:3000/customerss/${values}`)
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
      
        
      };
      updateData = () => {
          const changeUser = {
              nama: this.state.nama,
              email: this.state.email,
              nohp: this.state.phone,
              password: this.state.password,
          }
        console.log('hey', changeUser)
        axios.put(`http://10.0.2.2:3000/customers/${this.state.collection._id}`, changeUser)
        .then( (res) => res.json())
          .then(resJson => {
              console.log(resJson)
          })
        
    }
      

    componentDidMount(){
        this.getValueFunction();
    }

    // getDataCurrentUser = async (values) => {
    //     console.log(values);
    //     await
        
    // }

    // {collection.map(user => <Text>{user.email}</Text>)}


    render(){
        const {collection, valEmail} = this.state;
        
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
                        {/* {collectionCust.map((users) => <Text>{users.email}</Text>)} */}
                    
                        <TextInput
                            placeholder={collection.nama}
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            placeholderTextColor={'#fff'}
                            underlineColorAndroid="white"
                            value={this.state.nama}
                            onChangeText={this.handleNama}
                        />
                        
                        <TextInput
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            placeholderTextColor={'#fff'}
                            underlineColorAndroid="white"
                            placeholder={collection.email}
                            value={this.state.email}
                            onChangeText={this.handleEmail}
                        />
                        <TextInput
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            underlineColorAndroid="white"
                            placeholder={collection.nohp}
                            value={this.state.phone}
                            placeholderTextColor={'#fff'}
                            onChangeText={this.handleNohp}
                        />
                        <TextInput
                            style={{
                                width:normalize(280),
                                paddingLeft:normalize(20),
                                color:'white'
                            }}
                            secureTextEntry={true}
                            underlineColorAndroid="white"
                            placeholder="********"
                            placeholderTextColor={'#fff'}
                            value={this.state.password}
                            onChangeText={this.handlePass}
                        />

                        <View style={{paddingTop:normalize(20)}}>
                            <Button full style={{backgroundColor:'#003499', height:normalize(40),width:normalize(280), borderRadius:10}} onPress={() => this.updateData()}>
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