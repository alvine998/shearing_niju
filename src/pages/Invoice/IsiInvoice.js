import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import normalize from "react-native-normalize";
import NumberFormat from "react-number-format";
import { invoice, mailing } from "../../assets";

export default class IsiInovoice extends Component{
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
            karyawan:'Leni Kusrini',
            invoices:'',
            ppn:0,
            ordid:[]
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
                console.log(res)
                const collect = res;
                this.setState({collect})

                axios.get(`http://10.0.3.2:3000/orders/${collect}`)
                .then(
                    res => {
                        const collects = res.data;
                        console.log(`collects`, collects)
                        this.setState({collects})
                        this.setState({ordid: collects.detailorders})
                    }
                )

                axios.get(`http://10.0.3.2:3000/invoicess/${collect}`)
                .then(
                    res => {
                        const invoices = res.data;
                        console.log("Data Invoice : ", invoices)
                        this.setState({invoices})
                    }
                )
            }
        )
    }

    componentDidMount(){
        this.getDataItem();
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#C3B257', alignItems:'center', justifyContent:'center'}}>
                            <Image source={invoice} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Buat Invoice</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{padding:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        <View style={{height:normalize(370), width:'100%', backgroundColor:'#fff', borderRadius:20, padding:normalize(20)}}>
                            <ScrollView nestedScrollEnabled={true}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', textAlign:'center', fontSize:normalize(20), paddingBottom:normalize(10)}} >Invoice</Text>
                            <View style={{paddingTop:normalize(0), paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Nomor Invoice : {this.state.invoices.invoice_no}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Nomor PO : {this.state.collects.no_po}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Karyawan : {this.state.karyawan}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Tanggal : {this.state.date.toLocaleDateString()}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Nama Perusahaan : {this.state.invoices.nama_pt}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Alamat Perusahaan : {this.state.invoices.alamat_pt}</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Detail Order :{"\n"}</Text>
                                    {
                                        this.state.ordid && this.state.ordid.map((element,i) => {
                                            console.log(`element`, element)
                                            return(
                                                <View style={{borderBottomWidth:1}} key={i}>
                                                    <Text>Nama Item : {element.nama_item}</Text>
                                                    <Text>Nama Item : {element.berat} Kg</Text>
                                                    <Text>Jumlah Item : {element.jumlah_item} Sheet</Text>
                                                    <Text>Harga Jasa perKg : Rp.{element.harga_satuan}</Text>
                                                    <NumberFormat value={element.total_harga} thousandSeparator={true} 
                                                    displayType="text" prefix="Rp." 
                                                    renderText={(value) => <Text>Total Harga : {value}</Text>}
                                                    />
                                                </View>
                                            )
                                        })
                                    }
                                    <NumberFormat value={this.state.invoices.total_harga} thousandSeparator={true} 
                                    displayType="text" prefix="Rp." 
                                    renderText={(value) => <Text style={{fontFamily:'RedHatDisplay-Regular'}}>{"\n"}Biaya Produksi : {value}</Text>}
                                    />
                                    <NumberFormat value={this.state.invoices.ppn} thousandSeparator={true} 
                                    displayType="text" prefix="Rp." 
                                    renderText={(value) => <Text style={{fontFamily:'RedHatDisplay-Regular'}}>PPN 10% : {value}</Text>}
                                    />  
                                    <NumberFormat value={this.state.invoices.total_biaya} thousandSeparator={true} 
                                    displayType="text" prefix="Rp." 
                                    renderText={(value) => <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Total Biaya Setelah Pajak : {value}</Text>}
                                    />    
                                
                                {/* <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Biaya Produksi : Rp.{this.state.invoices.total_harga},-</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>PPN 10% : Rp.{this.state.invoices.ppn},-</Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', paddingTop:normalize(10)}}>Total Biaya : Rp.{this.state.invoices.total_biaya},-</Text> */}
                                
                            </View>
                            </ScrollView>
                        </View>
                        <View style={{padding:normalize(20)}}>
                            <Button onPress={() => this.props.navigation.navigate('Home')} full style={{backgroundColor:'#E78181', height:normalize(40), borderRadius:10, width:normalize(300)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), color:'white'}}>Kembali</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}