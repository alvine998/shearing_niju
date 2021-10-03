import React, {Component} from "react";
import { Alert, Image, PermissionsAndroid, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import normalize from "react-native-normalize";
import { box_add, reports } from "../../assets";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from "rn-fetch-blob";
import { Button } from "native-base";


export default class UploadBukti extends Component{
    constructor(props){
        super(props);
        this.state={
            url:'http://10.0.3.2:3000/files',
            saving: false
        };
    }

    updateUrl = url => {
        this.setState({url});
    }

    getPermissionAndroid = async () => {
        try{
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Image Download Permission',
                    message: 'Your permission is required to save images',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Ok',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED){
                return true;
            }
            Alert.alert(
                'Save remote Image',
                'Grant Me Permission to save Image',
                [{text: 'OK', onPress: () => console.log('Ok Pressed')}],
                {cancelable: false},
            );
        } catch(err){
            Alert.alert(
                'Save remote Image',
                'Failed to save Image : ' + err.message,
                [{text: 'OK', onPress: () => console.log('Ok Pressed')}],
                {cancelable: false},
            );
        }
    };

    handleDownload = async () => {
        if(Platform.OS === 'android'){
            const granted = await this.getPermissionAndroid();
            if(!granted){
                return;
            }
        }
        this.setState({saving: true});
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
        })
            .fetch('GET', this.state.url)
    }

    // requestCameraPermission = async () => {
    //     if(Platform.OS === 'android'){
    //         try{
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.CAMERA,
    //                 {
    //                     title:'Camera Permission',
    //                     message:'App needs camera permission',
    //                 },
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err){
    //             console.warn(err);
    //             return false;
    //         }
    //     } else return true;
    // }

    // requestExternalPermission = async () => {
    //     if(Platform.OS === 'android'){
    //         try{
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title:'External Storage Write Permission',
    //                     message:'App needs write permission',
    //                 },
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } catch (err){
    //             console.warn(err);
    //             alert('Write permission err', err)
    //         } 
    //         return false;
    //     } else return true;
    // };

    // captureImage = async (type) => {
    //     let options = {
    //         mediaType: type,
    //         maxWidth: 300,
    //         maxHeight: 550,
    //         quality: 1,
    //         videoQuality: 'low',
    //         durationLimit: 30,
    //         saveToPhotos: true
    //     };
    //     let isCameraPermitted = await this.requestCameraPermission();
    //     let isStoragePermitted = await this.requestExternalPermission();
    //     if(isCameraPermitted && isStoragePermitted){
    //         launchCamera(options, (res) => {
    //             console.log('Response = ', res);

    //             if (res.didCancel) {
    //                 alert('User cancelled camera picker');
    //                 return;
    //               } else if (res.errorCode == 'camera_unavailable') {
    //                 alert('Camera not available on device');
    //                 return;
    //               } else if (res.errorCode == 'permission') {
    //                 alert('Permission not satisfied');
    //                 return;
    //               } else if (res.errorCode == 'others') {
    //                 alert(res.errorMessage);
    //                 return;
    //               }

    //                 console.log('base64 -> ', res.base64);
    //                 console.log('uri -> ', res.uri);
    //                 console.log('width -> ', res.width);
    //                 console.log('height -> ', res.height);
    //                 console.log('fileSize -> ', res.fileSize);
    //                 console.log('type -> ', res.type);
    //                 console.log('fileName -> ', res.fileName);
    //                 this.setState({res});
    //         });
    //     }
    // };

    // chooseFile = (type) => {
    //     let options = {
    //         mediaType: type,
    //         maxWidth: 300,
    //         maxHeight: 550,
    //         quality: 1,
    //     };
    //     launchImageLibrary(options, (response) => {
    //         const res = response.assets;
    //         console.log('Response = ', res);
      
    //         if (response.didCancel) {
    //           alert('User cancelled camera picker');
    //           return;
    //         } else if (response.errorCode == 'camera_unavailable') {
    //           alert('Camera not available on device');
    //           return;
    //         } else if (response.errorCode == 'permission') {
    //           alert('Permission not satisfied');
    //           return;
    //         } else if (response.errorCode == 'others') {
    //           alert(response.errorMessage);
    //           return;
    //         }

    //         console.log('base64 -> ', res.base64);
    //         console.log('uri -> ', res.uri);
    //         console.log('width -> ', res.width);
    //         console.log('height -> ', res.height);
    //         console.log('fileSize -> ', res.fileSize);
    //         console.log('type -> ', res.type);
    //         console.log('fileName -> ', res.fileName);
    //         this.setState({res});
    //     })
    // }

    render(){
        return(
            <View style={{height:'100%', backgroundColor:'#73A3EC'}}>
                <View style={{backgroundColor:'white', borderBottomLeftRadius:50, borderBottomRightRadius:50, height:normalize(120)}}>
                    <View style={{alignItems:'center', justifyContent:'center', flexDirection:'row', paddingTop:normalize(20)}}>
                        <View style={{width:normalize(70),borderRadius:10, height:normalize(70), backgroundColor:'#6D7AF2', alignItems:'center', justifyContent:'center'}}>
                            <Image source={reports} style={{width:normalize(60), height:normalize(60)}}/>
                        </View>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Upload Bukti</Text>
                    </View>
                </View>
                <ScrollView>
                    {/* <Image source={{uri: this.state.filePath.uri}} style={{width:normalize(100), height:normalize(150)}}/> */}

                    <TouchableOpacity style={{width:normalize(100), height:normalize(40), backgroundColor:'#fff'}} onPress={() => this.captureImage('photo')}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Capture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width:normalize(100), height:normalize(40), backgroundColor:'#fff'}} onPress={() => this.chooseFile('photo')}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(24), paddingLeft:normalize(10)}}>Gallery</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={{paddingTop:normalize(20), paddingLeft:normalize(50), paddingBottom:normalize(20)}}>
                    <Button full style={{backgroundColor:'#F44444', height:normalize(40), width:normalize(280), borderRadius:10}} onPress={() => this.props.navigation.navigate('FindOrder')}>
                        <Text style={{fontFamily:'RedHatDisplay-Bold', fontSize:normalize(18),color:'white', paddingLeft:normalize(10), textAlign:'left'}}>Kembali</Text>
                    </Button>
                </View>
            </View>
        )
    }
}