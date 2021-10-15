import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import normalize from "react-native-normalize";
import { progress, reports } from "../../assets";

export default class TerimaBuktiPembayaran extends Component{
    constructor(props){
        super(props);
        this.state={
            collect:[],
            collection:[],
            images:'',
            status:'sudah dibayar',
            id:''
        }
    }

    async getDataItem(){
        await AsyncStorage.getItem('progressKey')
        .then(
            res => {
                axios.get(`http://10.0.3.2:3000/orders/${res}`)
                .then(
                    respon => {
                        console.log(`respon.image :`, respon.data.image_tf)
                        this.setState({images: respon.data.image_tf})
                        this.setState({id: respon.data._id})
                    }
                )
            }
        )
    }

    componentDidMount(){
        this.getDataItem();
    }

    updateStatus(){
        if(this.state.images == "" || this.state.images == undefined){
            alert("Tidak ada bukti pembayaran!")
        }
        else{
            const dataUpdate = {
                status_pembayaran: this.state.status
            }
            console.log(`dataupdate : `, dataUpdate)
            axios.put(`http://10.0.3.2:3000/orders/${this.state.id}`, dataUpdate)
            .then(
                res => {
                    console.log(res.data);
                    Alert.alert("Data Berhasil Diupdate")
                    this.props.navigation.push('CustomerProgress')
                }
            )
            .catch(err => {
                console.log(err);
            })
        }
    }



    render(){
        const {collect} = this.state;
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#C3B257', alignItems:'center', justifyContent:'center'}}>
                            <Image source={progress} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Atur Progress</Text>
                    </View>
                </View>
                <ScrollView >
                <View style={{paddingLeft:normalize(30), paddingRight:normalize(30), paddingBottom:normalize(20)}}>
                    <View style={{height:normalize(350), width:'100%', borderRadius:20, backgroundColor:'#fff', marginTop:normalize(50)}}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center', paddingTop:normalize(10)}}>Terima Bukti Pembayaran</Text>

                        <View style={{paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                            <View style={{paddingBottom:normalize(10), alignItems:'center'}}>
                            {this.state.images !== '' &&
                            (
                                <Image
                                source={{uri: `http://192.168.43.100:3000/resources/static/assets/uploads/${this.state.images}`}}
                                style={{height: normalize(200), width: normalize(200)}}
                                />
                            )}
                            </View>
                            <Button onPress={() => {this.updateStatus()}} full style={{backgroundColor:'#73A3EC', height:normalize(40), borderRadius:10, marginTop:normalize(20)}} >
                                <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Terima</Text>
                            </Button>
                        </View>
                    </View>
                    <Button onPress={() => {this.props.navigation.navigate('CustomerProgress')}} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10, marginTop:normalize(20)}} >
                        <Text style={{fontFamily:'RedHatDisplay-Regular', color:'white'}} >Kembali</Text>
                    </Button>
                </View>
                </ScrollView>
            </View>
        )
    }
}