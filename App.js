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
import PurchaseOrder from './src/pages/PurchaseOrder';
import DetailOrder from './src/pages/PurchaseOrder/DetailOrder';
import VerificationOrder from './src/pages/PurchaseOrder/VerificationOrder';
import FindOrder from './src/pages/FindOrder';
import Invoice from './src/pages/Invoice';
import AvailInvoice from './src/pages/Invoice/AvailInvoice';
import Profiles from './src/pages/Profiles';
import Dashboard from './src/pages/Admin/Dashboard';
import KotakMasuk from './src/pages/Admin/KotakMasuk';
import IsiKotakMasuk from './src/pages/Admin/IsiKotakMasuk';
import BuatLaporan from './src/pages/Admin/BuatLaporan';
import AturProgress from './src/pages/Admin/AturProgress';

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
          {/* order */}
          <Stack.Screen name="Order" component={PurchaseOrder} options={{headerShown: false}} />
          <Stack.Screen name="DetailOrder" component={DetailOrder} options={{headerShown: false}} />
          <Stack.Screen name="Verification" component={VerificationOrder} options={{headerShown: false}} />
          {/* find order */}
          <Stack.Screen name="FindOrder" component={FindOrder} options={{headerShown: false}} />
          {/* Invoice */}
          <Stack.Screen name="Invoice" component={Invoice} options={{headerShown: false}} />
          <Stack.Screen name="AvailInvoice" component={AvailInvoice} options={{headerShown: false}} />
          {/* Profil */}
          <Stack.Screen name="Profiles" component={Profiles} options={{headerShown: false}} />

          {/* Admin NIJU */}
          <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
          {/* Kotak Masuk */}
          <Stack.Screen name="KotakMasuk" component={KotakMasuk} options={{headerShown: false}} />
          <Stack.Screen name="IsiKotakMasuk" component={IsiKotakMasuk} options={{headerShown: false}} />
          {/* Buat Laporan */}
          <Stack.Screen name="BuatLaporan" component={BuatLaporan} options={{headerShown: false}} />
          {/* Atur Progress */}
          <Stack.Screen name="AturProgress" component={AturProgress} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      // <View>
      //   <ForgetPass/>
      // </View>
    )
  }

export default App;
