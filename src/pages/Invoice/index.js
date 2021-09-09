import { Button } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, View } from "react-native";
import normalize from "react-native-normalize";
import { emptys, invoice } from "../../assets";

export default class Invoice extends Component{
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
                    <View style={{paddingTop:normalize(50), alignItems:'center', justifyContent:'center'}}>
                        <Image source={emptys} style={{width:normalize(200), height:normalize(200)}}/>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(20), textAlign:'center', color:'white'}}>
                            Belum ada invoice nih, Yuk Order Dulu
                        </Text>

                        <View style={{paddingTop:normalize(20)}}>
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
                        </View>
                    </View>
                    
                </ScrollView>
            </View>
        )
    }
}