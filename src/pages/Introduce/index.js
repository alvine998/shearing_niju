import React, { Component } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { success } from '../../assets';
import normalize from 'react-native-normalize';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        key: 1,
        title: 'Title 1',
        text: 'Description',
        image: success,
        backgroundColor: '#59b2ab', 
    },
    {
        key: 2,
        title: 'Title 2',
        text: 'Description',
        image: success,
        backgroundColor: '#febe29', 
    },
    {
        key: 3,
        title: 'Title 3',
        text: 'Description',
        image: success,
        backgroundColor: '#22bcb5', 
    },
]

export default class Introduce extends Component{
    constructor(props){
        super(props);
        this.state={
            showRealApp: false,
        }
    }

    _renderItem = ({item}) => {
        return(
            <View
            style={[
                styles.mainContent,
                {
                  flex: 1,
                  paddingTop: item.topSpacer,
                  paddingBottom: item.bottomSpacer,
                  width: Dimensions.width,
                  backgroundColor:'white'
                },
              ]}
              colors={item.color}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Image source={item.image} style={{width:normalize(360), height:normalize(360)}} resizeMode='contain' />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        )
    }

    
    render(){
        const navigation = this.props;
        return(
            <View>
                <AppIntroSlider 
                    data={slides}
                    renderItem={this._renderItem}
                    showPrevButton
                    showNextButton
                    dotStyle={{backgroundColor:"#DDD"}}
                    activeDotStyle={{backgroundColor:"green"}}
                    renderNextButton={() => { return (<Text style={{ fontSize: normalize(24), fontWeight: 'bold', color: 'green' }}>Next</Text>) }}
                    renderPrevButton={() => { return (<Text style={{ fontSize: normalize(24), fontWeight: 'bold', color: 'green' }}>Back</Text>) }}
                    renderDoneButton={() => { return (<Text style={{ fontSize: normalize(24), fontWeight: 'bold', color: 'black' }}>Done</Text>) }}
                    onDone={() => this.props.navigation.navigate('Login')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    image: {
      width: normalize(150),
      height: normalize(200),
    },
    text: {
      color: 'black',
      backgroundColor: 'transparent',
      textAlign: 'center',
      paddingHorizontal: 16,
      marginTop: normalize(-2),
      fontSize:20,
      marginTop:10,
  
    },
    title: {
      fontSize: 26,
      color: '#555',
      backgroundColor: 'transparent',
      textAlign: 'center',
      marginBottom: normalize(16),
      fontWeight: 'bold',
      marginTop: normalize(-25)
    },
  })