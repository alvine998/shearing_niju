import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import HomeScreen from './src/pages/HomeScreen';
import Introduce from './src/pages/Introduce';
import Login from './src/pages/Login';
import { createStackNavigator } from '@react-navigation/stack';
import Registrasi from './src/pages/Register';
import { View } from 'react-native';
import ForgetPass from './src/pages/ForgetPass';
import Splash from './src/pages/Splash';

const Stack = createStackNavigator();

  const App = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Splash"} screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="Intro" component={Introduce} options={{headerShown: false}} />
          <Stack.Screen name="Registrasi" component={Registrasi} options={{headerShown: false}} />
          <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      // <View>
      //   <ForgetPass/>
      // </View>
    )
  }

export default App;
