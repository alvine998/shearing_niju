import { Button } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { progress, reports } from "../../assets";

export default class AturProgress extends Component{
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
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#C3B257', alignItems:'center', justifyContent:'center'}}>
                            <Image source={progress} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Atur Progress</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={{paddingLeft:normalize(30), paddingRight:normalize(30)}}>
                        <View style={{height:normalize(350), width:'100%', borderRadius:20, backgroundColor:'#fff', marginTop:normalize(50)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), textAlign:'center', paddingTop:normalize(10)}}>Customer On Progress</Text>
                            <ScrollView style={{padding:normalize(20), paddingLeft:normalize(30), paddingRight:normalize(30)}}>
                                <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row'}}>
                                    <TouchableOpacity>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C001</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C002</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C003</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                                    <TouchableOpacity>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C004</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C005</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C006</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                                    <TouchableOpacity>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C007</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C008</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C009</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row', paddingTop:normalize(20), paddingBottom:normalize(50)}}>
                                    <TouchableOpacity>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C010</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C011</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{paddingLeft:normalize(20)}}>
                                        <View style={{height:normalize(70), width:normalize(70), backgroundColor:'#dfdfdf'}}>
                                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', paddingTop:normalize(20)}}>C012</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{paddingTop:normalize(20)}}>
                            <Button onPress={() => this.props.navigation.navigate('Dashboard')} full style={{height:normalize(40), borderRadius:10, backgroundColor:'#E78181'}}>
                                <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18), textAlign:'center'}}>Kembali</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}