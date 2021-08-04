import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,Image} from 'react-native'
import { WebView } from 'react-native-webview';
import instance from '../src/api/Gng';
import {Overlay } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';
import { Divider} from 'react-native-paper';

const ContactUs = ({navigation}) => {

  const[result,setResult]=useState('<h1>Hello world</h1>')
  const [visible, setVisible] = useState(false); 
  const [loader,setloader]=useState(false)
 

   useEffect(() => {
      (async()=>{
          try{
              setVisible(true)
              setloader(true)
          const responce=await instance.get('/contactHtml')
          const data=responce.data
          const html=data.html_content
          setResult(html)
          
          setVisible(false)
              setloader(false)
          }catch(err){
              console.log(err)
          }
      })()
      
   }, [])

    return (
        <>
          <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Contact Us</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

        {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:
      
      <WebView 
        originWhitelist={['*']}
        source={{ html: result }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit
        
        />}

            </>
        
    )
}

export default ContactUs

const styles = StyleSheet.create({
    headerContainer:{
        padding:'3%',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        paddingHorizontal:'3%',
        paddingTop:45
        
    },
    headingText:{
        alignSelf:'center',
        fontSize:20,
        fontFamily:"Poppins_500Medium",
        marginLeft:'5%',
        color:'#A8062A'
    },
})









