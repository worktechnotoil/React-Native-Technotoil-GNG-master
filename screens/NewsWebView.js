import React,{useState} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import {Overlay} from 'react-native-elements';
import { Divider} from 'react-native-paper';

const NewsWebView = ({navigation,route}) => {
   const content= route.params.content

    const [loader,setloader]=useState(false) //loader
    const [visible, setVisible] = useState(false);  //overly
   

   
    return (
        <>
         <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>News Page</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>
              {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}

              <WebView
              injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit
        source={{ html: content }}
        
      />
        </>
    )
}

export default NewsWebView

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


