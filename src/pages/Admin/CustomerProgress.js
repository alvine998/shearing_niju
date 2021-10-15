import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { Button, Right } from "native-base";
import React, {Component} from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { progress, reports } from "../../assets";

export default class CustomerProgress extends Component{
    constructor(props){
        super(props);
        this.state={
            active:false,
            active2:false,
            active3:false,
            active4:false,
            active5:false,
            active6:false,
            collect:[],
            material:'sudah diterima',
            produksi:'sudah produksi',
            produksi2:'sedang produksi',
            pembayaran: 'sudah dibayar',
            pengiriman:'sudah dikirim'
        }
    }

    getData = async () => {
        await AsyncStorage.getItem('progressKey')
        .then(
            res => {
                console.log('id : ', res);
                this.setState({res})

                axios.get(`http://10.0.3.2:3000/orders/${res}`)
                .then(
                    response => {
                        const collect = response.data;
                        console.log('data : ', collect);
                        this.setState({collect})
                    }
                )
            }
        )
    }

    renderUpdateOne(){
        if(this.state.collect.status == 'sudah verifikasi'){
            this.setState({active: !this.state.active})
        } else {
            return null;
        }
    }

    updateProduksi(){
        const collects = this.state.collect._id;
        const produksi = {
            status_produksi: this.state.produksi
        }
        axios.put(`http://10.0.3.2:3000/orders/${collects}`, produksi)
        .then(
            res => {
                console.log('update : ', res.data);
                this.props.navigation.push('CustomerProgress')
            }
        )
    }

    updateProduksi2(){
        const collects = this.state.collect._id;
        const produksi = {
            status_produksi: this.state.produksi2
        }
        axios.put(`http://10.0.3.2:3000/orders/${collects}`, produksi)
        .then(
            res => {
                console.log('update : ', res.data);
                this.props.navigation.push('CustomerProgress')
            }
        )
    }

    renderProduksi(){
        Alert.alert('Status : Sedang Produksi', 'Selesaikan Produksi ?' ,
            [
                {text:'Tidak', onPress:() => null, style:'cancel'}, 
                {text:'Ya', onPress:() => {this.updateProduksi()}}
            ]
            )
    }

    renderProduksi2(){
        Alert.alert('Apakah Anda Yakin', 'Untuk Mulai Produksi ?' ,
            [
                {text:'Tidak', onPress:() => null, style:'cancel'}, 
                {text:'Ya', onPress:() => {this.updateProduksi2()}}
            ]
            )
    }

    componentDidMount(){
        this.getData();
    }

    render(){
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
                <ScrollView>
                    <View style={{paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                        <View style={{height:normalize(420), width:'100%', borderRadius:20, backgroundColor:'#fff', marginTop:normalize(50)}}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center', paddingTop:normalize(15)}}>Order Progress</Text>
                            {/* Progress 1 */}
                            <View style={{flexDirection:'row', padding:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>1. Verifikasi Data Order</Text>
                                <View style={{paddingLeft:normalize(40) }}/>
                                <Button onPress={() => {this.state.collect.status == 'sudah verifikasi' ? [Alert.alert("Order Telah Aktif")] : alert("Order Belum Aktif")}} full style={[this.state.collect.status == 'sudah verifikasi' ? {backgroundColor:'#6D7AF2'}:{backgroundColor: '#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Active</Text>
                                </Button>
                            </View>
                            {/* Progress 2 */}
                            <View style={{flexDirection:'row', paddingLeft:normalize(0)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10), paddingLeft:normalize(20)}}>2. Penerimaan Material</Text>
                                <View style={{paddingLeft:normalize(40) }}/>
                                <Button onPress={() => {this.state.collect.status_material == 'sudah diterima' ? [alert("Sudah Diterima")] : this.props.navigation.navigate('TerimaOrder')}} full style={[this.state.collect.status_material == 'sudah diterima' ?  {backgroundColor:'#6D7AF2'}:{backgroundColor: '#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            {/* Progress 3 */}
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>3. Produksi Shearing</Text>
                                <View style={{paddingLeft:normalize(58) }}/>
                                <Button onPress={() => {this.state.collect.status_material == 'belum diterima' ? alert("Selesaikan penerimaan material dahulu") : this.state.collect.status_produksi == 'belum produksi' ? this.renderProduksi2() : this.state.collect.status_produksi == 'sedang produksi' ? this.renderProduksi() : alert("Selesai Produksi") }} full style={[this.state.collect.status_produksi == 'sedang produksi' ? {backgroundColor:'#FFDD3C'}:this.state.collect.status_produksi == 'sudah produksi' ? {backgroundColor:'#6D7AF2'}:{backgroundColor: '#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            {/* Progress 4 */}
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>4. Pembayaran</Text>
                                <View style={{paddingLeft:normalize(102) }}/>
                                <Button onPress={() => {this.state.collect.status_produksi == 'belum produksi' || this.state.collect.status_produksi == 'sedang produksi' ? alert("Selesaikan produksi dahulu") : this.state.collect.status_pembayaran == 'sudah dibayar' ? [Alert.alert('Pembayaran Telah Lunas')] : this.props.navigation.navigate('TerimaBayar')}} full style={[this.state.collect.status_pembayaran == 'sudah dibayar' ?  {backgroundColor:'#6D7AF2'}:{backgroundColor: '#E78181'} , { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            {/* Progress 5 */}
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>5. Pengiriman Pesanan</Text>
                                <View style={{paddingLeft:normalize(38) }}/>
                                <Button onPress={() => {this.state.collect.status_pembayaran == 'belum dibayar' ? alert("Selesaikan pembayaran dahulu") : this.state.collect.status_pengiriman == 'sudah diterima' ? [Alert.alert('Pesanan Telah Diterima')] : this.state.collect.status_pengiriman == 'sedang dikirim' ? alert("Produk sedang dikirim") : this.props.navigation.navigate('UploadPengiriman')}} full style={[this.state.collect.status_pengiriman == 'sedang dikirim' ? {backgroundColor:'#FFDD3C'} : this.state.collect.status_pengiriman == 'sudah diterima' ? {backgroundColor:'#6D7AF2'}:{backgroundColor: '#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{paddingTop:normalize(20), paddingLeft:normalize(30), paddingRight:normalize(30), paddingBottom:normalize(20)}}>
                        <Button onPress={() => this.props.navigation.navigate('AturProgress')} full style={{height:normalize(40), borderRadius:10, backgroundColor:'#E78181'}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Kembali</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}