import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { box_time, mailing } from "../../assets";

export default class ListOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[],
            values:[],
            custColl:[]
        }
    }

    getDataOrder = async() => {
        await AsyncStorage.getItem('emailKey')
        .then(
            res => {
                console.log(res)
                this.setState({res})

                axios.get(`http://10.0.3.2:3000/customerss/${res}`)
                .then(
                    res => {
                        const collection = res.data;
                        console.log(collection);
                        this.setState({collection})

                        axios.get(`http://10.0.3.2:3000/orderss/${collection._id}`)
                        .then(
                            res => {
                                const custColl = res.data;
                                console.log(custColl);
                                this.setState({custColl})
                            }
                        )
                    }
                )
            }
        )
    }

    setData = async (id) => {
        // for(let i = 0; i < this.state.collection.length; i++){
            // const idm = this.state.collection
            console.log("hello", id)
            try{
                await AsyncStorage.setItem('findKey', id)
            }
            catch(err){
                console.log(err)
            }
        // }
        
    }

    componentDidMount(){
        this.getDataOrder();
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#54D871', alignItems:'center', justifyContent:'center'}}>
                            <Image source={box_time} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Lacak Pesanan</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingTop:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        <View>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingBottom:normalize(20), color:'white'}}>Daftar Pesanan Anda</Text>
                        </View>
                        {this.state.custColl.reverse() && this.state.custColl.map(valueses => {
                            return(
                                    <TouchableOpacity onPress={() => {this.setData(valueses._id),this.props.navigation.navigate('FindOrder')}} style={{height:normalize(70), width:'100%', backgroundColor:'white'}}>
                                        <View style={{flexDirection:'row', padding:normalize(10)}}>
                                            <Icon type={"FontAwesome5"} name="envelope"/>
                                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), paddingLeft:normalize(10), paddingTop:normalize(5)}}>Nomor PO : {valueses.no_po} / {valueses.createdAt}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={{padding:normalize(30)}}>
                    <Button onPress={() => this.props.navigation.navigate('Home')} full style={{backgroundColor:'#F44444', height:normalize(40), borderRadius:10}}>
                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), color:'white'}}>Kembali</Text>
                    </Button>
                </View>
            </View>
        )
    }
}