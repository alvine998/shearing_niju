import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { reports } from "../../assets";

export default class DataCustomer extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[],
            collectionCustomer:[]
        }
    }

    componentDidMount(){
        this.getItem();
    }

    getItem = async () => {
        await AsyncStorage.getItem('custkey')
        .then(
            collection => {
                console.log("Hey" ,collection);
                this.setState({
                    collection
                })
                axios.get(`http://10.0.3.2:3000/customers/${collection}`)
                    .then((res,i) => {
                        const collectionCustomer = res.data;
                        console.log("data obj",collectionCustomer)
                        this.setState({collectionCustomer}) 
                    }).catch(err => {console.log(err)})
                
            }
        )
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#54D871', alignItems:'center', justifyContent:'center'}}>
                            <Image source={reports} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Data Customer</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{height:normalize(350), width:'100%', borderRadius:20, backgroundColor:'#fff', marginTop:normalize(50)}}>
                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center'}}>Data Master Customer</Text>
                    <ScrollView>
                        <View style={{paddingTop:normalize(20)}}>
                            {
                                // console.log("Element bawah",this.state.collectionCustomer)
                                (
                                    <View style={{paddingLeft:normalize(10), paddingRight:normalize(10)}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18)}}>Nama : {"\n"} {this.state.collectionCustomer.nama}</Text>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18)}}>Nama Perusahaan : {"\n"} {this.state.collectionCustomer.namapt}</Text>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18)}}>Alamat Perusahaan : {"\n"} {this.state.collectionCustomer.alamatpt}</Text>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18)}}>Email : {"\n"} {this.state.collectionCustomer.email}</Text>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18)}}>Nomor Hp : {"\n"} {this.state.collectionCustomer.nohp}</Text>
                                    </View>
                                )
                            }
                        </View>

                    </ScrollView>
                    </View>
                    <View style={{paddingTop:normalize(20), paddingLeft:normalize(30), paddingRight:normalize(30)}}>
                        <Button onPress={() => this.props.navigation.navigate('BuatLaporan')} full style={{height:normalize(40), borderRadius:10, backgroundColor:'#E78181'}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Kembali</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}