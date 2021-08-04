import React,{useState,useRef,useEffect, useContext} from 'react'
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View,StatusBar } from 'react-native'
import {useFonts} from 'expo-font';
import CountryPicker from 'react-native-country-picker-modal'
import validator from 'validator';
import instance from '../src/api/Gng';
import {Overlay } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useToast } from "react-native-toast-notifications";
import { Platform } from 'react-native';



const LoginScreen = ({navigation}) => {

    const [visible, setVisible] = useState(false);  //overly
    const toast = useToast();

    const [results,setResults]=useState([])
    const [loader,setloader]=useState(false)
 
   const [value1,setvalue]=useState('')
   const [countryCode,setCountryCode]=useState('IN')
   const [country, setCountry] = useState(null)
   const [callingcode,setcallingcode]=useState('91')


    const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
    setcallingcode(country.callingCode[0])
  }

 
  
  

   const validation =async()=>{
   
     const valid=validator.isMobilePhone(value1)
    if(value1!==''){
        if(valid&&value1.length===10){
            
            setVisible(true)
            setloader(true)

                try{
                    const responce=await instance.get(`/GoOtp/${value1}`)
            
                     setResults(responce.data.response)
                    
                }catch(err){
                    setloader(false)
                   return  alert('Something Goes Wrong')

                }

          setTimeout(function(){ 
                setloader(false)  
                navigation.navigate('Otp',{code:callingcode,number:value1})
             }, 3000);
             
           
            
        }
        else{
            toastMessage("Please Enter The Valid Number")
        }
        
    }
    else{
        toastMessage("Please Enter Your Mobile Number")
    }
   
   }
  

const toastMessage = (value) =>{
    if(Platform.OS==='android'){
        ToastAndroid.showWithGravityAndOffset(
           value,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
    }else{
        toast.show(value);
    }
}



    return (
        
        <SafeAreaView style={styles.mainContainer }>
            <StatusBar barStyle='dark-content' backgroundColor='white'/>


            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}


         <View style={styles.logoContainer}>
                <Image source={require('../assets/Gnglogo.png')} style={styles.logo}/>
            </View>

            <View style={styles.fieldsContainer}>
           
                <Text style={styles.mobileText}>Please Enter Your Mobile Number</Text>

                <View style={styles.inputField}>
                    <View style={styles.countryView}>
                    <CountryPicker 
                    countryCode={countryCode}
                    withFilter={true}
                    {...{
                        onSelect
                    }}
                    withCallingCode
                    />

                    </View>
                    
                   
                    <TextInput 
                    onChangeText={(value)=>setvalue(value) }
                    maxLength={10}
                    color='black'
                    value={value1}
                    placeholder='Mobile Number' 
                    keyboardType='numeric'
                    returnKeyType='done'
                    style={styles.inputStyle}/>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={validation} style={styles.buttonTouch}>
                    <Text style={styles.buttonStyle}>Submit</Text>
                </TouchableOpacity>
               
            </View>


        </SafeAreaView>
                
    )
}

export default LoginScreen

const styles = StyleSheet.create({
   mainContainer:{
       flex:1,
       alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white'
       
       
       
       
   },
   logoContainer:{
     
       
   },
   logo:{
     width:155,
     height:90,
     
   },
   mobileText:{
       fontFamily:'Poppins_700Bold',
       fontSize:15,
       color:'black',
       marginLeft:'0%',
       marginTop:'5%',
       opacity:0.8
   },
   fieldsContainer:{
       marginTop:'20%',
       width:'80%',
       marginBottom:'5%'
   },
   buttonStyle:{
       fontFamily:'Poppins_500Medium',
       color:'#FFFCFC',
       fontSize:16,
      alignSelf:'center',
       marginVertical:13,
       
       
   },
   buttonTouch:{
       height:45,
       backgroundColor:'#A8062A',
       borderRadius:7,
       marginTop:'15%',
       
       
   },
   inputField:{
    height:50,
    borderWidth:1.3,
    borderColor:'#D1D1D1',
    backgroundColor:'white',
    borderRadius:7,
    marginTop:'5%',
    flexDirection:'row',
    
    
    
    
   },
   countryView:{
       alignSelf:'center',
       marginLeft:'3%',
       width:30,
       height:32
   },
   inputStyle:{
      marginLeft:'5%',
      height:45,
      flex:1,
      fontFamily:'Poppins_500Medium',
      fontSize:16
      
     
      
      
       
       
       
   }
})
