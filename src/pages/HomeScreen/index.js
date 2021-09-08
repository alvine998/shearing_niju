import { Body, Header, Left, Right, Title } from 'native-base'
import React, { Component } from 'react'
import { View } from 'react-native'

export default class HomeScreen extends Component{
    render(){
        return(
            <View>
                <Header style={{backgroundColor:'black'}}>
                    <Left>

                    </Left>
                    <Body>
                        <Title>NIJU - Shearing</Title>
                    </Body>
                    <Right>

                    </Right>
                </Header>
            </View>
        )
    }
}