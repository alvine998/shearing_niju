import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import normalize from "react-native-normalize";
import { invoice, mailing } from "../../assets";

export default class BuatInvoice extends Component{
    constructor(props){
        super(props);
        this.state={
            dateVisibility:false,
            collect:[],
            collects:[],
            collection:[],
            harga:[],
            total:0,
            date: new Date(),
            hargatotal:0,
            status:'sudah dikirim',
            karyawan:'Leni Kusrini'
        }
    }

    // getDate(){
    //     var date = {currentTime: (new Date()).toLocaleString()};
    //     this.setState({date: date})
    // }

    getDataItem = async () => {
        await AsyncStorage.getItem('orderkey')
        .then(
            res => {
                console.log("Hello",res);
                this.setState({collect: res})

                axios.get(`http://10.0.3.2:3000/orders/${res}`)
                .then(
                    res => {
                        console.log("Tes",res.data)
                        const collection = res.data;
                        this.setState({collection})
                        console.log("nama : ", collection._id)
                    }
                )
            }
        )
    }

    getTotalHarga(prevState){
        console.log('prev', this.state.collection.detorderid)
            try{
                const arr = this.state.collection.detorderid
                console.log(arr.length)
                arr.map((user,i) => {
                    axios.get(`http://10.0.3.2:3000/detorders/${user}`)
                    .then(
                        (res,v) => {
                            console.log(res.data)
                            const harga = res.data;
                            this.setState({harga}); 
                            const total = harga.jumlah_item * 1200000
                            console.log("total: ", total)
                            this.setState({total})
                            console.log(this.state.total)
                        }
                    )
                    
                })
            }
            catch(err){
                console.log(err)
            }
    }

    saveInvoice(){
        const saving = {
            orderid: this.state.collect,
            karyawanid: this.state.collects._id,
            custid: this.state.collection.custid,
            tanggal: this.state.date.toLocaleDateString(),
            nama_pt: this.state.collection.namapt,
            total_biaya: this.state.hargatotal,
            status: this.state.status
        }
        console.log(saving)
        axios.post(`http://10.0.3.2:3000/invoices`, saving)
        .then(
            res => {
                console.log("Sukses save invoice", res.data)
                Alert.alert("Berhasil Kirim Invoice")
                this.props.navigation.push('ListKotakInvoice')
            }

        )
    }

    componentDidUpdate(prevProps, prevState){
        const {collection} = this.state;

        if(collection && prevState.collection !== collection){
            this.getTotalHarga()
        }
    }

    componentDidMount(){
        this.getDataItem();
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#E78181', alignItems:'center', justifyContent:'center'}}>
                            <Image source={invoice} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Buat Invoice</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{padding:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:normalize(350), width:'100%', backgroundColor:'#fff', borderRadius:20, padding:normalize(20)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', textAlign:'center', fontSize:normalize(20), paddingBottom:normalize(10)}} >Invoice</Text>
                            <View style={{paddingTop:normalize(0), paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Nomor Invoice : </Text>
                                    <TextInput
                                        placeholder="__/INV/X/2021"
                                        underlineColorAndroid="#dfdfdf"
                                        style={{paddingLeft:normalize(20)}}
                                    />
                                </View>
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Order Id : {this.state.collect}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Karyawan : {this.state.karyawan}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Tanggal : {this.state.date.toLocaleDateString()}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Nama Perusahaan : {this.state.collection.namapt}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Alamat Perusahaan : {this.state.collection.alamatpt}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Total Biaya : Rp.{this.state.hargatotal},-</Text>
                                
                            </View>
                            <View style={{paddingTop:normalize(20)}}>
                                <Button onPress={() => this.saveInvoice()} full style={{backgroundColor:'#73A3EC', height:normalize(40), borderRadius:10, width:normalize(280)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), color:'white'}}>Kirim</Text>
                                </Button>
                            </View>
                        </View>
                        <View style={{padding:normalize(20)}}>
                            <Button onPress={() => this.props.navigation.navigate('ListKotakInvoice')} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10, width:normalize(300)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), color:'white'}}>Kembali</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}