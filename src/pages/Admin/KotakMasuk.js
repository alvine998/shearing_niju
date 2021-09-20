import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { mailing } from "../../assets";

export default class KotakMasuk extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[],
            values:[]
        }
    }

    getDataOrder(){
        axios.get('http://10.0.2.2:3000/orders')
        .then(
            res => {
                const collection = res.data;
                console.log(collection);
                this.setState({collection})

                axios.get(`http://10.0.2.2:3000/customers/${collection.custid}`)
                .then(
                    res => {
                        const values = res.data;
                        console.log(values);
                        this.setState({values})
                    }
                )
            }
        )
    }

    setData = async () => {
        const idm = this.state.collection.map(val => val._id)
        console.log("hello", idm)
        await AsyncStorage.setItem('orderkey', idm)
    }

    componentDidMount(){
        this.getDataOrder();
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                            <Image source={mailing} style={{width:normalize(50), height:normalize(40)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Kotak Masuk</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingTop:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        {this.state.collection && this.state.collection.map(valueses => {
                            return(
                                    <TouchableOpacity onPress={() => {this.setData(), this.props.navigation.navigate('IsiKotakMasuk')}} style={{height:normalize(50), width:'100%', backgroundColor:'white'}}>
                                        <View style={{flexDirection:'row', padding:normalize(10)}}>
                                            <Icon type={"FontAwesome5"} name="envelope"/>
                                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), paddingLeft:normalize(10), paddingTop:normalize(5)}}>Order Masuk {valueses.namapt}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={{padding:normalize(30)}}>
                    <Button onPress={() => this.props.navigation.navigate('Dashboard')} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10}}>
                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18)}}>Kembali</Text>
                    </Button>
                </View>
            </View>
        )
    }
}