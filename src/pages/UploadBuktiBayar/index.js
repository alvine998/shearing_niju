import React, {Component} from 'react';
import {
  Alert,
  Image,
  Linking,
  PermissionsAndroid,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {box_add, reports} from '../../assets';
import {Button} from 'native-base';
import axios from 'axios';
import ImageCropPicker from 'react-native-image-crop-picker';
import {uploadReplaceImage, uploadReplaceImage2} from './utils';
import AsyncStorage from '@react-native-community/async-storage';

export default class UploadBuktiBayar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      photo: '',
      source: null,
      filePath: [],
      oldPhoto: '',
      status: 'sedang verifikasi'
    };
  }

  selectImage() {
    ImageCropPicker.openPicker({
      width: normalize(500),
      height: normalize(400),
      cropping: true,
    }).then(image => {
      console.log(image.path);
      this.setState({photo: image.path});
    });
  }

  async uploadImage() {
    console.log(this.state.photo);
    const newPhoto = this.state.photo;
    const oldPhoto = this.state.oldPhoto;
    const urlImage = 'http://localhost:3000/resources/static/assets/uploads/';
    let newUpload = '';
    if (newPhoto === urlImage + oldPhoto) {
      newUpload = oldPhoto;
    } else {
      newUpload = newPhoto;
    }

    let result ={info:""}
    try {
       result =  await uploadReplaceImage2(oldPhoto,newUpload,newPhoto)
    } catch (error) {
      console.log(`error`, error);
    }
    const dataUpdate = {
        image_tf: result.info,
        status_pembayaran: this.state.status
    }
        await AsyncStorage.getItem('findKey')
        .then(
            res => {
                axios.put(`http://10.0.3.2:3000/orders/${res}`, dataUpdate)
                .then(
                    respon => {
                        console.log("respon", respon.data)
                        alert("Berhasil upload")
                    }
                )
            }
        )
    

    
  }

  async getDataImage(){
    await AsyncStorage.getItem('findKey')
    .then(
        res => {
            axios.get(`http://10.0.3.2:3000/orders/${res}`)
            .then(
                result => {
                    console.log(`result`, result.data.image_tf)
                    this.setState({oldPhoto: result.data.image_tf,photo: result.data.image_tf})
                    console.log(`oldPhoto`, this.state.oldPhoto)
                }
            )
        }
    )
  }

  componentDidMount(){
      this.getDataImage()
  }

  render() {
    return (
      <View style={{height: '100%', backgroundColor: '#73A3EC'}}>
        <View
          style={{
            backgroundColor: 'white',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            height: normalize(120),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingTop: normalize(20),
            }}>
            <View
              style={{
                width: normalize(70),
                borderRadius: 10,
                height: normalize(70),
                backgroundColor: '#6D7AF2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={reports}
                style={{width: normalize(60), height: normalize(60)}}
              />
            </View>
            <Text
              style={{
                fontFamily: 'RedHatDisplay-Bold',
                fontSize: normalize(24),
                paddingLeft: normalize(10),
              }}>
              Upload Bukti Pembayaran
            </Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: normalize(50),
            paddingLeft: normalize(20),
            paddingRight: normalize(20),
          }}>
          {/* <Button full success style={{height:normalize(40), borderRadius:10}} onPress={() =>  Linking.openURL('https://api.whatsapp.com/send?phone=6285703049632&text=Saya%20mengirim%20bukti%20resi%20pengiriman%20material%20')}>
                            <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(22), paddingLeft:normalize(10)}}>Kirim Resi Penyediaan Barang</Text>
                        </Button> */}

          {(this.state.photo !== '' || this.state.oldPhoto !== '') && (
            <Image
              source={{uri: this.state.oldPhoto !== this.state.photo ? this.state.photo : `http://192.168.43.100:3000/resources/static/assets/uploads/${this.state.oldPhoto}` }}
              style={{height: normalize(200), width: normalize(200)}}
            />
          )}

          <View style={{paddingTop: normalize(10)}} />
          <Button
            full
            success
            style={{height: normalize(40), borderRadius: 10}}
            onPress={() => this.selectImage()}>
            <Text
              style={{
                fontFamily: 'RedHatDisplay-Bold',
                fontSize: normalize(22),
                paddingLeft: normalize(10),
              }}>
              Pilih Gambar
            </Text>
          </Button>

          <View style={{paddingTop: normalize(10)}} />
          <Button
            full
            success
            style={{height: normalize(40), borderRadius: 10}}
            onPress={() => this.uploadImage()}>
            <Text
              style={{
                fontFamily: 'RedHatDisplay-Bold',
                fontSize: normalize(22),
                paddingLeft: normalize(10),
              }}>
              Upload
            </Text>
          </Button>
        </View>
        <View
          style={{
            paddingTop: normalize(20),
            paddingLeft: normalize(50),
            paddingBottom: normalize(20),
          }}>
          <Button
            full
            style={{
              backgroundColor: '#F44444',
              height: normalize(40),
              width: normalize(280),
              borderRadius: 10,
            }}
            onPress={() => {
              this.props.navigation.push('FindOrder'),
                alert('Mohon ditunggu untuk verifikasi bukti pengiriman');
            }}>
            <Text
              style={{
                fontFamily: 'RedHatDisplay-Bold',
                fontSize: normalize(18),
                color: 'white',
                paddingLeft: normalize(10),
                textAlign: 'left',
              }}>
              Kembali
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}
