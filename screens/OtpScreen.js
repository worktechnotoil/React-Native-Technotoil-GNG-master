import React,{useState,useRef,useEffect,useContext} from 'react'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { StyleSheet, Text, View ,SafeAreaView,StatusBar, TextInput,TouchableOpacity, ToastAndroid,ActivityIndicator,Platform,Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import instance from '../src/api/Gng';
import {Overlay } from 'react-native-elements';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../components/Context'
import axios from 'axios';
import { useToast } from "react-native-toast-notifications";


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  

const OtpScreen = ({navigation,route}) => {
    const toast = useToast()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log('')
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

      async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

    const {signIn}=useContext(AuthContext)

const number=route.params.number
    const [loader,setloader]=useState(false) //loader
    const [visible, setVisible] = useState(false);  //overly
     //apiResult
    
   const defaultCountdown=30
   let clockCall=null
   const[countdown,setCountdown]=useState(defaultCountdown)
   const [enableResend,setEnableResend]=useState(false)

   useEffect(()=>{
      clockCall=setInterval(() => {
          decrementClock()
      },1000); 

      return ()=>{
          clearInterval(clockCall)
      }
   })




   const decrementClock=()=>{
       if(countdown===0){
           setEnableResend(true)
           setCountdown(0)
           clearInterval(clockCall)
       }
       else{
        setCountdown(countdown-1)
       }
       
   }

   const onResendOtp=async()=>{
   
  
     if(enableResend){
        setCountdown(defaultCountdown)
        setEnableResend(false)
        clearInterval(clockCall)
        clockCall=setInterval(() => {
            decrementClock()
        }, 1000);

        try{
       
       
            setVisible(true)
             setloader(true)
    
            await instance.get(`/GoOtp/${number}`)
            setloader(false)
         }catch(err){
              alert('Something goes wrong')
         }
        
    }  
       
   }



   const [value1,setvalue1]=useState(null)
   const [value2,setvalue2]=useState(null)
   const [value3,setvalue3]=useState(null)
   const [value4,setvalue4]=useState(null)

  
  
   
    
   
   const input1=useRef()
   const input2=useRef()
   const input3=useRef()
   const input4=useRef()

    

      const validation=async()=>{
          try{
            const formData = new FormData(); //upload user token
            // formData.append('data', JSON.stringify(data));
            console.log(expoPushToken,number)
            formData.append('token',expoPushToken);
            formData.append('customer_contact',number);
            formData.append('badgecount','example');
            formData.append('device','android');
            
            
                    setloader(true)
                    setVisible(true)
                  await  axios({
                      url    : `https://develop-c.cheshtainfotech.com/CEA/api/token`,
                      method : 'POST',
                      data   : formData,
                      headers: {
                                   'Content-Type': 'multipart/form-data',
                                   'Authorization':'@CEAUTH09#'
                               }
                           })
                           .then(function (response) {
                                   console.log("Token response :", response.data);
                                  
                          })
                          .catch(function (error) {
                                   console.log('Token error',error);
                          })
          }catch(err){
             console.log('Token',err)
          }
         
          setloader(false)
          if(value1==null||value2==null||value3==null||value4==null){
            toastMessage("Please Fill the OTP")
          }
          else{
           const otp=`${value1}${value2}${value3}${value4}`

           setVisible(true)
           setloader(true)
           
        try{
            
           const responce=await instance.get(`/Verifyotp/${number}/${otp}`) //change after gateway
           console.log('otp responce',responce)

         let results=responce.data
        

        const cid1=results.cid
        
       console.log(results['Customer Account'],'customer account',   'cid',cid1)
         const result1=await instance.get(`/customer/${cid1}`)
         const value=result1.data.fname
         console.log('fname',value)
        if(results['Customer Account']==='0' ){
           if (value!=='') {
            try {
                
                
              await AsyncStorage.setItem('number', number)
              await AsyncStorage.setItem('cid', cid1)
              await AsyncStorage.setItem('cidfortoken', cid1)
              const result=await instance.get(`/customer/${cid1}`)
              
              console.log('userlist :', result.data)
              const jsonValue1 = JSON.stringify({
                  name:result.data.fname,
                  email:result.data.email,
                  image:result.data.image
              })
              await AsyncStorage.setItem('userdata',jsonValue1)

              setloader(false)
              console.log('save Scussfully')
              setloader(false)
         
       signIn(number)
            } catch (e) {
                console.log(e)
              setloader(false)
            }
              
         
           } else {
             try {
              await AsyncStorage.setItem('number', number)
              await AsyncStorage.setItem('cid', cid1)
              setloader(false)
              navigation.navigate('Profile')
             } catch (error) {
               console.log(error)
             }
            
           }
           
          }
          else if(results['Customer Account']==='1'){
              
               try {
                  
                
                
                await AsyncStorage.setItem('number', number)
                await AsyncStorage.setItem('cid', cid1)
                  setloader(false)
                  console.log('save Scussfully OTP')
                } catch (e) {
                    console.log(e)
                  setloader(false)
                }
                navigation.navigate('Profile')
              }
              
           
               else{
                toastMessage("Invalid OTP or Contact No")
                setloader(false)
        
          }
           
          
        
        }catch(err){
          setloader(false)
          toastMessage("Invalid OTP")
            
            console.log(err)
            
        }

        
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
    
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar barStyle='dark-content' />
            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}
              
      <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>OTP</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>
            
              <View style={styles.bodyContainer}>
              
                       <Text style={styles.MainHeadingText}>Verification Code</Text>
                       <Text style={styles.sideHeading}>We have sent a verification code on your number  <Text style={{color:'silver',fontFamily:'Poppins_700Bold'}}>+{route.params.code } {number}</Text> .Please enter the verification code below.</Text>
                      

                <View style={styles.inputContainer}>
                    <View style={styles.inputView1}>
                        <TextInput

                      
                        autoFocus={false}
                        ref={input1}
                        placeholder='0'
                        style={styles.textInput1}
                        maxLength={1}
                        onChangeText={(value)=>
                           {
                            setvalue1(value)
                            if(value===''){
                                input1.current.focus()
                            }
                            else{
                                input2.current.focus()
                                
                            }
                           }
                        }
                        value={value1}
                        keyboardType='phone-pad'
                        returnKeyType='done'
                        />
                     </View>

                     <View style={styles.inputView1}>
                        <TextInput
                        ref={input2}
                        placeholder='0'
                         style={styles.textInput1}
                        maxLength={1}
                        onChangeText={(value)=>{
                            setvalue2(value)
                            if(value===''){
                                input2.current.focus()
                            }
                            else{
                                input3.current.focus()
                            }
                        }}
                        value={value2}
                        keyboardType='phone-pad'
                        returnKeyType='done'
                        />
                     </View>

                     <View style={styles.inputView1}>
                        <TextInput
                        ref={input3}
                        placeholder='0'
                         style={styles.textInput1}
                        maxLength={1}
                        onChangeText={(value)=>{
                            setvalue3(value)
                            if(value===''){
                                input3.current.focus()
                            }
                            else{
                                input4.current.focus()
                            }
                        }}
                        value={value3}
                        keyboardType='phone-pad'
                        returnKeyType='done'
                        />
                     </View>

                     <View style={styles.inputView1}>
                        <TextInput
                        ref={input4}
                        placeholder='0'
                         style={styles.textInput1}
                        maxLength={1}
                        onChangeText={(value)=>setvalue4(value)}
                        value={value4}
                        keyboardType='phone-pad'
                        returnKeyType='done'
                        />
                     </View>
                    
                </View>
                <View style={{flexDirection:'row'}}>
               <Text onPress={onResendOtp} style={[styles.textResent,{color:enableResend?"#A8062A":"#A8062A"},{opacity:enableResend?1:0.3}]}>Resend Otp ? {countdown===0?null:countdown} </Text>
             
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={validation}  style={styles.buttonTouch}>
                    <Text style={styles.buttonStyle}>Submit</Text>
                </TouchableOpacity>

              </View>
             
        </SafeAreaView>
        
    )
}

export default OtpScreen

/*    
*/

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'white',
        flex:1,

       
        
    },
    headerContainer:{
        padding:'3%',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        paddingHorizontal:'3%'
        
    },
    headingText:{
        alignSelf:'center',
        fontSize:20,
        fontFamily:'Poppins_500Medium',
        marginLeft:'5%',
        color:'#A8062A'
    },
    MainHeadingText:{
        fontFamily:'Poppins_500Medium',
        color:'black',
        fontSize:20
    },
    bodyContainer:{
         flex:1,
         alignItems:'center',
         marginTop:'15%'  
       },
 
    sideHeading:{
        fontFamily:'Poppins_500Medium',
        marginHorizontal:'10%',
        textAlign:'center',
        color:'gray',
        lineHeight:20,
        marginTop:'3%',
        
        
    },
    inputContainer:{
      flexDirection:'row',
      paddingTop:'10%',
      paddingBottom:'3%'


    },
    inputView1:{
        borderWidth:1.3,
        width:50,
        height:50,
        borderRadius:10,
        marginHorizontal:'2.5%',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#E0E0E0'


    },
    textInput1:{
        
        width:50,
        height:50,
        borderRadius:10,
       fontSize:23,
        textAlign:'center',
        fontFamily:'Poppins_500Medium'
        
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
        marginTop:'12%',
        width:'75%'
        
        
    },
    textResent:{
        
        fontFamily:'Poppins_500Medium',
        marginTop:'4%'
        
    }
})
