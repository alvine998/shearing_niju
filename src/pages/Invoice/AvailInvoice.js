import { Body, Button, ListItem } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { emptys, invoice } from "../../assets";

export default class AvailInvoice extends Component{
    constructor(props){
        super(props);
        this.state={
            collection:[],
        };
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
                    <View style={{paddingTop:normalize(30), alignItems:'center', justifyContent:'center'}}>
                        <View style={{paddingBottom:normalize(20)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24)}}>Invoice Anda</Text>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#dfdfdf', width:'100%', flexDirection:'row', height:normalize(50), paddingTop:normalize(10), paddingLeft:normalize(20)}}>
                            <View style={{width:normalize(30), height:normalize(30), borderRadius:15, backgroundColor:'#F44444'}}/>
                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), paddingLeft:normalize(10)}}>Invoice 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#dfdfdf', width:'100%', flexDirection:'row', height:normalize(50), paddingTop:normalize(10), paddingLeft:normalize(20)}}>
                            <View style={{width:normalize(30), height:normalize(30), borderRadius:15, backgroundColor:'#F44444'}}/>
                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), paddingLeft:normalize(10)}}>Invoice 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor:'#dfdfdf', width:'100%', flexDirection:'row', height:normalize(50), paddingTop:normalize(10), paddingLeft:normalize(20)}}>
                            <View style={{width:normalize(30), height:normalize(30), borderRadius:15, backgroundColor:'#F44444'}}/>
                            <Text style={{fontFamily:'RedHatDisplay-Regular', fontSize:normalize(24), paddingLeft:normalize(10)}}>Invoice 3</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={{paddingBottom:normalize(10), paddingLeft:normalize(100)}}>
                    <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(200), borderRadius:10}} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                    </Button>
                </View>
            </View>
        )
    }
}