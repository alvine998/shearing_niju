import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { mailing, reports } from "../../assets";

export default class ListLaporanMaterial extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[],
            values:[],
        }
    }

    getDataOrder(){
        axios.get('http://10.0.3.2:3000/orders')
        .then(
            res => {
                const collection = res.data;
                console.log(collection);
                this.setState({collection})
                // axios.get(`http://10.0.2.2:3000/customers/${collection.custid}`)
                // .then(
                //     res => {
                //         const values = res.data;
                //         console.log(values);
                //         this.setState({values})
                //     }
                // )
            }
        )
    }

    setData = async (id) => {
        // for(let i = 0; i < this.state.collection.length; i++){
            // const idm = this.state.collection
            console.log("hello", id)
            try{
                await AsyncStorage.setItem('orderkey', id)
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
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#E78181', alignItems:'center', justifyContent:'center'}}>
                            <Image source={reports} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>List Material Bermasalah</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingTop:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        {/* {this.state.collection.sort((a,b) => new Date(a) < new Date(b) ? 1 : -1) && this.state.collection.map(valueses => {
                            return(
                                    <TouchableOpacity onPress={() => {this.setData(valueses._id),this.props.navigation.navigate('IsiKotakMasuk')}} style={{height:normalize(50), width:'100%', backgroundColor:'white'}}>
                                        <View style={{flexDirection:'row', padding:normalize(10)}}>
                                            <Icon type={"FontAwesome5"} name="envelope"/>
                                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), paddingLeft:normalize(10), paddingTop:normalize(5)}}>Order Masuk {valueses.namapt}</Text>
                                        </View>
                                    </TouchableOpacity>
                            )
                        })} */}
                    </View>
                </ScrollView>
                <View style={{padding:normalize(30)}}>
                    <Button onPress={() => this.props.navigation.navigate('BuatLaporan')} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10}}>
                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18)}}>Kembali</Text>
                    </Button>
                </View>
            </View>
        )
    }
}