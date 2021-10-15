import { shallowEqual } from "@babel/types";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button } from "native-base";
import React, {Component} from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modalbox";
import normalize from "react-native-normalize";
import { box_time } from "../../assets";

export default class FindOrder extends Component{
    constructor(props){
        super(props);
        this.state={
            values:'',
            valOrder:''
        };
        this.show = React.createRef();
    }

    showModal(){
        this.show.open(true)
    }

    getData = async () => {
        await AsyncStorage.getItem('findKey')
        .then(
            res => {
                console.log(res);
                this.setState({res})

                axios.get(`http://10.0.3.2:3000/orders/${res}`)
                .then(
                    res => {
                        const valOrder = res.data;
                        console.log(valOrder)
                        this.setState({valOrder})
                    }
                )
            }
        )
    }

    componentDidMount(){
        this.getData();
    }

    handleStatus(){
        console.log(this.state.valOrder.status);
        if(this.state.valOrder.status == 'sudah verifikasi'){
            Alert.alert("Order Telah Diverifikasi")
        }
        else {
            this.props.navigation.navigate('Verification')
        }
    }

    render(){
        const {valOrder} = this.state;
        return(
            <View style={{height:'100%', backgroundColor:'#73A3EC'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#54D871', alignItems:'center', justifyContent:'center'}}>
                            <Image source={box_time} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Lacak Pesanan</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingBottom:normalize(20)}}>
                        {/* Ball 1 */}
                        <TouchableOpacity onPress={() => this.handleStatus()}>
                            <View style={{paddingTop:normalize(20), paddingLeft:normalize(50), paddingRight:normalize(50), flexDirection:'row'}}>
                                <View style={[valOrder.status == 'sudah verifikasi' ? styles.buttonVerif : styles.buttonNonVerif]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), color:'white'}}>1</Text>
                                </View>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft:normalize(10)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), color:'white'}}>Verifikasi Pesanan</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Ball 2 */}
                        <TouchableOpacity onPress={() => valOrder.status == "belum verifikasi" ? Alert.alert("Selesaikan Verifikasi Dahulu") :  valOrder.status_material == "sedang dikirim" ? Alert.alert("Material dalam pengiriman") : valOrder.status_material == "sudah diterima" ? Alert.alert("Material telah diterima PT NIJU") : this.props.navigation.navigate('UploadBukti')}>
                            <View style={{paddingTop:normalize(20), paddingLeft:normalize(50), paddingRight:normalize(50), flexDirection:'row'}}>
                                <View style={[valOrder.status_material == 'sedang dikirim' ? styles.buttonSpecial : valOrder.status_material == 'sudah diterima' ? styles.buttonVerif : styles.buttonNonVerif]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), color:'white'}}>2</Text>
                                </View>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft:normalize(10)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), color:'white'}}>Penyediaan Material</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Ball 3 */}
                        <TouchableOpacity onPress={() => {valOrder.status_material == "belum diterima" ? Alert.alert("Selesaikan Penyediaan Material Dahulu") : valOrder.status_produksi == "sedang produksi" ? Alert.alert("Produksi Sedang Dimulai") : Alert.alert("Produksi Telah Selesai")}}>
                            <View style={{paddingTop:normalize(20), paddingLeft:normalize(50), paddingRight:normalize(50), flexDirection:'row'}}>
                                <View style={[valOrder.status_produksi == 'sedang produksi' ? styles.buttonSpecial : valOrder.status_produksi == 'sudah produksi' ? styles.buttonVerif : styles.buttonNonVerif]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), color:'white'}}>3</Text>
                                </View>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft:normalize(10)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), color:'white'}}>Produksi Shearing</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Ball 4 */}
                        <TouchableOpacity onPress={() => {valOrder.status_produksi == "belum produksi" || valOrder.status_produksi == "sedang produksi" ? Alert.alert("Produksi belum selesai") : valOrder.status_pembayaran == 'sedang verifikasi' ? alert("Menunggu verifikasi") : valOrder.status_pembayaran == 'sudah dibayar' ? alert("Pembayaran Selesai") : this.props.navigation.navigate('UploadBuktiBayar')}}>
                            <View style={{paddingTop:normalize(20), paddingLeft:normalize(50), paddingRight:normalize(50), flexDirection:'row'}}>
                                <View style={[valOrder.status_pembayaran == 'sedang verifikasi' ? styles.buttonSpecial : valOrder.status_pembayaran == 'sudah dibayar' ? styles.buttonVerif : styles.buttonNonVerif]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), color:'white'}}>4</Text>
                                </View>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft:normalize(10)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), color:'white'}}>Pembayaran</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        {/* Ball 5 */}
                        <TouchableOpacity onPress={() => {valOrder.status_pembayaran == "belum dibayar" ? Alert.alert("Selesaikan Pembayaran Dahulu") : valOrder.status_pengiriman == 'sedang dikirim' ? this.props.navigation.navigate('UploadBuktiPengiriman') : valOrder.status_pengiriman == 'sudah diterima' ? alert("Produksi telah diterima") : alert("Menunggu Pengiriman Produk")}}>
                            <View style={{paddingTop:normalize(20), paddingLeft:normalize(50), paddingRight:normalize(50), flexDirection:'row'}}>
                                <View style={[valOrder.status_pengiriman == 'sedang dikirim' ? styles.buttonSpecial : valOrder.status_pengiriman == 'sudah diterima' ? styles.buttonVerif : styles.buttonNonVerif]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), color:'white'}}>5</Text>
                                </View>
                                <View style={{alignItems:'center', justifyContent:'center', paddingLeft:normalize(10)}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), color:'white'}}>Pengiriman Pesanan</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style={{paddingTop:normalize(20), paddingLeft:normalize(50)}}>
                            <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.navigate('ListOrder')}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                            </Button>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonVerif:{
        height:normalize(60), 
        width:normalize(60), 
        borderRadius:30, 
        backgroundColor:'#003499', 
        alignItems:'center', 
        justifyContent:'center'
    },
    buttonSpecial:{
        height:normalize(60), 
        width:normalize(60), 
        borderRadius:30, 
        backgroundColor:'#FFDD3C', 
        alignItems:'center', 
        justifyContent:'center'
    },
    buttonNonVerif:{
        height:normalize(60), 
        width:normalize(60), 
        borderRadius:30, 
        backgroundColor:'#B1B1B1', 
        alignItems:'center', 
        justifyContent:'center'
    }
})