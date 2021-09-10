import { Button, Icon } from "native-base";
import React, {Component} from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import normalize from "react-native-normalize";
import { invoice, mailing } from "../../assets";

export default class BuatInvoice extends Component{
    constructor(props){
        super(props);
        this.state={
            dateVisibility:false
        }
    }

    showDatePicker = () => {
        this.setState({dateVisibility: true})
    }

    hideDatePicker = () => {
        this.setState({dateVisibility: false})
    }

    handleConfirm = (date) => {
        console.warn('date has picked', date);
        this.hideDatePicker;
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
                        <View style={{height:normalize(450), width:'100%', backgroundColor:'#fff', borderRadius:20, padding:normalize(20)}}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', textAlign:'center', fontSize:normalize(20), paddingBottom:normalize(10)}} >Invoice</Text>
                            <View style={{paddingTop:normalize(20), paddingLeft:normalize(20), paddingRight:normalize(20)}}>
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Invoice Id : </Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Order Id : </Text>
                                <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Karyawan Id : </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Tanggal Masuk : </Text>
                                    <TouchableOpacity onPress={this.showDatePicker}>
                                        <Text style={{fontFamily:'RedHatDisplay-Regular'}}>Pilih Tanggal</Text>
                                        <DateTimePicker
                                            isVisible={this.state.dateVisibility}
                                            mode="date"
                                            onConfirm={this.handleConfirm}
                                            onCancel={this.hideDatePicker }
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}