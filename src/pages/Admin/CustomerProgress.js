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
        }
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
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center', paddingTop:normalize(15)}}>Customer Progress</Text>
                            <View style={{flexDirection:'row', padding:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>1. Verifikasi Data Customer</Text>
                                <View style={{paddingLeft:normalize(10) }}/>
                                <Button onPress={() => [Alert.alert('Data Diverifikasi'), this.setState({active: !this.state.active})]} full style={[ this.state.active ? {backgroundColor: '#6D7AF2'} : {backgroundColor:'#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row', paddingLeft:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>2. Penerimaan Material</Text>
                                <View style={{paddingLeft:normalize(40) }}/>
                                <Button onPress={() => [Alert.alert('Barang Diterima'), this.setState({active2: !this.state.active2})]} full style={[ this.state.active2 ? {backgroundColor: '#6D7AF2'} : {backgroundColor:'#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>3. Working Instruction</Text>
                                <View style={{paddingLeft:normalize(50) }}/>
                                <Button onPress={() => [Alert.alert('Working Instruction Diterima'), this.setState({active3: !this.state.active3})]} full style={[ this.state.active3 ? {backgroundColor: '#6D7AF2'} : {backgroundColor:'#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>4. Produksi Shearing</Text>
                                <View style={{paddingLeft:normalize(58) }}/>
                                <Button onPress={() => [Alert.alert('Material Telah Masuk Produksi'), this.setState({active4: !this.state.active4})]} full style={[ this.state.active4 ? {backgroundColor: '#6D7AF2'} : {backgroundColor:'#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>5. Pembayaran</Text>
                                <View style={{paddingLeft:normalize(102) }}/>
                                <Button onPress={() => [Alert.alert('Pembayaran Telah Lunas'), this.setState({active5: !this.state.active5})]} full style={[ this.state.active5 ? {backgroundColor: '#6D7AF2'} : {backgroundColor:'#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
                                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Update</Text>
                                </Button>
                            </View>
                            <View style={{flexDirection:'row', paddingLeft:normalize(20), paddingTop:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(20), paddingTop:normalize(10)}}>6. Pengiriman Pesanan</Text>
                                <View style={{paddingLeft:normalize(38) }}/>
                                <Button onPress={() => [Alert.alert('Pesanan Telah Dikirim'), this.setState({active6: !this.state.active6})]} full style={[ this.state.active6 ? {backgroundColor: '#6D7AF2'} : {backgroundColor:'#E78181'}, { height:normalize(40),width:normalize(80), borderRadius:10}]}>
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