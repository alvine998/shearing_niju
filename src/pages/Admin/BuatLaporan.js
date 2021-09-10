import { Button } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { reports } from "../../assets";

export default class BuatLaporan extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <View style={{backgroundColor:'#73A3EC', height:'100%'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#54D871', alignItems:'center', justifyContent:'center'}}>
                            <Image source={reports} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Buat Laporan</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{height:normalize(180), width:'100%', borderRadius:20, backgroundColor:'#fff', marginTop:normalize(50)}}>
                    <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center'}}>Pilih Menu Laporan</Text>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:normalize(10)}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BuatLaporan')} style={{alignItems:'center', justifyContent:'center'}}>
                                <View style={{width:normalize(70), height:normalize(70),borderRadius:10, backgroundColor:'#54D871', alignItems:'center', justifyContent:'center'}}>
                                    <Image source={reports} style={{width:normalize(60), height:normalize(60)}}/>
                                </View>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center'}}>Laporan{"\n"}Material{"\n"}Bermasalah</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('BuatLaporan')} style={{alignItems:'center', justifyContent:'center'}}>
                                <View style={{width:normalize(70), height:normalize(70),borderRadius:10, backgroundColor:'#E78181', alignItems:'center', justifyContent:'center'}}>
                                    <Image source={reports} style={{width:normalize(60), height:normalize(60)}}/>
                                </View>
                                <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(18), textAlign:'center'}}>Laporan{"\n"}Invoice{"\n"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{paddingTop:normalize(180), paddingLeft:normalize(30), paddingRight:normalize(30)}}>
                        <Button onPress={() => this.props.navigation.navigate('Dashboard')} full style={{height:normalize(40), borderRadius:10, backgroundColor:'#E78181'}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Kembali</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}