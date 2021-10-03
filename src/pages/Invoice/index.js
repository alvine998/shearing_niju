import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { emptys, invoice } from "../../assets";

export default class Invoice extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[],
            values:'',
            ordid:[],
            inv:[],
            collect:[]
        };
    }

    getDataInvoice = async() => {
        await AsyncStorage.getItem('emailKey')
        .then(
            (values, collection) => {
                console.log(values)
                this.setState({valEmail:values})

                // Mengambil data customer by email
                axios.get(`http://10.0.3.2:3000/customerss/${values}`)
                .then(res => {
                    collection = res.data;
                    console.log(collection._id);
                    this.setState({collection});

                    axios.get(`http://10.0.3.2:3000/orderss/${collection._id}`)
                    .then(
                        res => {
                            const ordid = res.data;
                            console.log("order data: ", ordid.map(id => id._id))
                            this.setState({ordid})


                            ordid.map(id => {
                                axios.get(`http://10.0.3.2:3000/invoicess/${id._id}`)
                                .then(
                                    res => {
                                        console.log("Data Invoice : ",res.data)
                                        const inv = res.data;
                                        this.setState({inv})
                                    }
                                )
                            })
                                
                        }
                    )
                })
            }
        )
    }

    getDataInvoices(){
        const id = this.state.collection._id
        axios.get(`http://10.0.3.2:3000/invoicesss/${id}`)
        .then(
            res => {
                console.log("Data Invoice : ",res.data)
                const inv = res.data;
                this.setState({collect})
            }
        )
    }

    componentDidMount(){
        this.getDataInvoice();
    }

    componentDidUpdate(prevProps, prevState){
        const {collection} = this.state;
        if(collection && prevState.collection !== collection){
            this.getDataInvoices();
        }
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#C3B257', alignItems:'center', justifyContent:'center'}}>
                            <Image source={invoice} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Invoice</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingTop:normalize(50), alignItems:'center', justifyContent:'center'}}>
                        {
                            this.state.inv ?
                            (
                                <View style={{paddingTop:normalize(30), alignItems:'center', justifyContent:'center'}}>
                                    <View style={{paddingBottom:normalize(20)}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24)}}>Invoice Anda</Text>
                                    </View>
                                    {
                                        this.state.collect && this.state.collect.map(invs => {
                                            return(
                                                <View>
                                                    <TouchableOpacity style={{backgroundColor:'#dfdfdf', width:normalize(300), flexDirection:'row', height:normalize(50), paddingTop:normalize(10), paddingLeft:normalize(20)}}>
                                                        <View style={{width:normalize(30), height:normalize(30), borderRadius:15, backgroundColor:'#F44444'}}/>
                                                        <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), paddingLeft:normalize(10)}}>Invoice</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })
                                    }
                                    <View style={{paddingTop:normalize(50)}}/>
                                    <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(300), borderRadius:10}} onPress={() => this.props.navigation.navigate('Home')}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                                    </Button>
                                </View>
                                
                            ) :
                            (
                                <View>
                                    <Image source={emptys} style={{width:normalize(200), height:normalize(200)}}/>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', color:'white'}}>
                                        Belum ada invoice nih, Yuk Order Dulu
                                    </Text>
                                </View>
                            )
                        }
                        

                        {/* <View style={{paddingTop:normalize(20)}}>
                            <Button full style={{backgroundColor:'#003499', height:normalize(40), width:normalize(200), borderRadius:10}} onPress={() => this.props.navigation.navigate('Order')}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Order</Text>
                            </Button>
                            <View style={{paddingTop:normalize(10)}}/>
                            <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(200), borderRadius:10}} onPress={() => this.props.navigation.navigate('Home')}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                            </Button>
                            <View style={{paddingTop:normalize(10)}}/>
                            <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(200), borderRadius:10}} onPress={() => this.props.navigation.navigate('AvailInvoice')}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Avail</Text>
                            </Button>
                        </View> */}
                    </View>
                    
                </ScrollView>
            </View>
        )
    }
}