import React,{useEffect,useState,useMemo, useReducer} from 'react';
import { View, Text ,StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { AntDesign } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import OtpScreen from './screens/OtpScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import ReferalScreen from './screens/ReferalScreen';
import DrawerScreen from './screens/DrawerScreen'
import NotificationScreen from './screens/NotificationScreen';
import MyProfileScreeen from './screens/MyProfileScreen';
import NewsScreen from './screens/NewsScreen';
import AboutusScreen from './screens/AboutusScreen';
import Contactus from './screens/Contactus';
import PrivicyPolicy from './screens/PrivicyPolicy';
import TermsConditions from './screens/TermsConditions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import {AuthContext,Context} from './components/Context'
import instance from './src/api/Gng';
import NewsWebView from './screens/NewsWebView';
import PickerView from './screens/PickerView';
import PickerView2 from './screens/PickerView2';
import BookAppoinment from './screens/BookAppoinment';
import BookingHistory from './screens/BookingHistory';
import { Provider as PaperProvider } from 'react-native-paper';
import NotificationMain from './screens/NotificationMain';
import AppLoading from 'expo-app-loading';
import {useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,Poppins_400Regular_Italic
} from '@expo-google-fonts/poppins'
import {RobotoMono_400Regular,RobotoMono_500Medium,RobotoMono_600SemiBold,RobotoMono_700Bold
} from '@expo-google-fonts/roboto-mono'
import {RobotoSlab_400Regular,RobotoSlab_500Medium,RobotoSlab_600SemiBold,RobotoSlab_700Bold
} from '@expo-google-fonts/roboto-slab'
import { ToastProvider } from 'react-native-toast-notifications'





const MainStack = createStackNavigator();
const HomeStack =createStackNavigator();
const DrwaweStack=createDrawerNavigator();





const MainStackScreens=()=>{
  return(
  <MainStack.Navigator initialRouteName='Login'>
    <MainStack.Screen name='Login' component={LoginScreen} options={{headerShown:false}} />
    <MainStack.Screen name="Otp" component={OtpScreen} options={{headerShown:false}}/>
    <MainStack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    <MainStack.Screen name='PickerView' component={PickerView} options={{headerShown:false}} />
    <MainStack.Screen name='PickerView2' component={PickerView2} options={{headerShown:false}} />
    <MainStack.Screen name="Terms" component={TermsConditions}  options={{headerShown:false}}/>
    
  </MainStack.Navigator>

  )
  }   





  const HomeStackScreen=()=>{
    return(
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <HomeStack.Screen name="HomeProfile" component={MyProfileScreeen} options={{headerShown:false}}/>
        <HomeStack.Screen name="Notification" component={NotificationScreen} options={{headerShown:false}}/>
        <HomeStack.Screen name="Referal" component={ReferalScreen} options={{headerShown:false}}/>
         <HomeStack.Screen name="Booking" component={BookAppoinment} options={{headerShown:false}}/>
         <HomeStack.Screen name="History" component={BookingHistory} options={{headerShown:false}}/>
         <HomeStack.Screen name="NotificationMain" component={NotificationMain} options={{headerShown:false}}/>
        
      </HomeStack.Navigator>
    )
  }


  const NewsStackScreen=()=>{
    return(
    <MainStack.Navigator initialRouteName='NewsList'>
      <MainStack.Screen name='NewsList' component={NewsScreen} options={{headerShown:false}} />
      <MainStack.Screen name="NewsView" component={NewsWebView} options={{headerShown:false}}/>
    </MainStack.Navigator>
  
    )
    } 

  const ProfileStackScreen=()=>{
      return(
        <PaperProvider>
      <MainStack.Navigator >
        <MainStack.Screen name='Picker1' component={MyProfileScreeen} options={{headerShown:false}} />
        <MainStack.Screen name='PickerView' component={PickerView} options={{headerShown:false}} />
        <MainStack.Screen name="PickerView2" component={PickerView2} options={{headerShown:false}}/>
      </MainStack.Navigator>
      </PaperProvider>
    
      )
      } 
  

const DrawerStackScreen=()=>{
  
  return(
    <DrwaweStack.Navigator  drawerContent={props=><DrawerScreen {...props}/> }>
      <DrwaweStack.Screen name="HomeSt"   component={HomeStackScreen} />
      <DrwaweStack.Screen name="MyProfile" component={ProfileStackScreen} />
      <DrwaweStack.Screen name="News"   component={NewsStackScreen} />
      <DrwaweStack.Screen name="BookVideo" component={BookAppoinment} />
      <DrwaweStack.Screen name="AboutUs"   component={AboutusScreen} />
      <DrwaweStack.Screen name="ContactUs" component={Contactus} />
      <DrwaweStack.Screen name="Policy"   component={PrivicyPolicy} />
     
    </DrwaweStack.Navigator>
  )
}






function App() {
  
 
  

 
 const [isLoading, setIsLoading] = useState(true);
 const [userToken, setUserToken] = useState(null); 
 



 AsyncStorage.getItem('cidfortoken').then(value=>{
  setUserToken(value) 
})


 const authContext = useMemo(() => ({
  

    signIn: (number) => {
 
    AsyncStorage.getItem('cidfortoken').then(value=>{
      setUserToken(value)
    })
       },

  signOut: () => {
    AsyncStorage.clear()
     setUserToken(null);
    
   
  },
 
 
}),[]);

 useEffect(() => {
  
  setTimeout(() => {
     setIsLoading(false);
     
    
  }, 1000);
}, []);

let [fontsLoaded] = useFonts({
  Poppins_400Regular,Poppins_400Regular_Italic,Poppins_500Medium,Poppins_600SemiBold,Poppins_700Bold,
  RobotoMono_400Regular,RobotoMono_500Medium,RobotoMono_600SemiBold,RobotoMono_700Bold,
  RobotoSlab_400Regular,RobotoSlab_500Medium,RobotoSlab_600SemiBold,RobotoSlab_700Bold
});

if(!fontsLoaded){
  return(
    <View style={{justifyContent:'center',alignItems:'center'}}>
   <ActivityIndicator color='gray' size='large' />
    </View>
    
  )
}else{
  return(
 <ToastProvider style={{backgroundColor:'#ebebeb',borderRadius:20,paddingVertical:15,paddingHorizontal:15}} textStyle={{color:'#030303'}} duration={3000}> 
  <Context>
   <AuthContext.Provider value={authContext}>
  <NavigationContainer>
    {userToken !==null?<DrawerStackScreen/>:<MainStackScreens/>}
  </NavigationContainer>
  </AuthContext.Provider>
  </Context>
  </ToastProvider>
  
  
 )

}
}

export default App;

const styles = StyleSheet.create({
  headerContainer:{
      padding:'3%',
      flexDirection:'row',
      backgroundColor:'#A8062A'
      
  },
  headingText:{
      alignSelf:'center',
      fontSize:20,
      fontFamily:"Poppins_500Medium",
      marginLeft:'5%',
      color:'white'
  }
})