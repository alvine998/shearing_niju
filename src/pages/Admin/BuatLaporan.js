import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { reports } from "../../assets";

export default class BuatLaporan extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[]
        }
    }

    componentDidMount(){
        this.getDataCustomer();
    }

    getDataCustomer(){
        axios.get(`http://10.0.3.2:3000/customers`)
        .then(
            res => {
                const collection = res.data;
                console.log("customer : ", collection)
                this.setState({collection})
            }
        )
    }

    setData = async (id) => {
        // for(let i = 0; i < this.state.collection.length; i++){
            // const idm = this.state.collection
            console.log("hello", id)
            try{
                await AsyncStorage.setItem('custkey', id)
            }
            catch(err){
                console.log(err)
            }
        // }
        
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
                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center'}}>Daftar Customer</Text>
                    <ScrollView>
                        <View style={{paddingTop:normalize(20)}}>
                            {
                                this.state.collection.reverse() && this.state.collection.map(res => {
                                    return(
                                        <TouchableOpacity onPress={() => {this.setData(res._id),this.props.navigation.navigate('DataCustomer')}} style={{height:normalize(50), width:'100%', backgroundColor:'white', borderBottomWidth:1}}>
                                            <View style={{flexDirection:'row', padding:normalize(10)}}>
                                                <Icon type={"FontAwesome5"} name="user"/>
                                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), paddingLeft:normalize(10), paddingTop:normalize(5)}}>{res.namapt}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>

                    </ScrollView>
                    </View>
                    <View style={{paddingTop:normalize(20), paddingLeft:normalize(30), paddingRight:normalize(30)}}>
                        <Button onPress={() => this.props.navigation.navigate('Dashboard')} full style={{height:normalize(40), borderRadius:10, backgroundColor:'#E78181'}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Kembali</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}