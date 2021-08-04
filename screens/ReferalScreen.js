import React,{useEffect} from 'react'
import {BackHandler, Image, SafeAreaView, StyleSheet, Text, View,Share,TouchableOpacity } from 'react-native'
import {useFonts} from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { Divider} from 'react-native-paper';

const ReferalScreen = ({navigation}) => {

    

    const [loaded] = useFonts({
        RobotoSlab: require('../assets/fonts/RobotoSlab-Regular.ttf'),
        RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
        RobotoSlabBold:require('../assets/fonts/RobotoSlab-Bold.ttf')
        
      });

      if (!loaded) {
        return null;
      }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Share App</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>
             <View style={styles.imageview}>
              
                 <Image source={require('../assets/refimage.jpg')} style={styles.image}/>
                 
                  </View>
             <View style={styles.bodyContainer}>
                 <Text style={styles.bottomText}></Text>
             </View>

             <TouchableOpacity onPress={onShare} style={{flexDirection:'row',justifyContent:'center',marginTop:'5%',borderWidth:1,width:'80%',alignSelf:'center',padding:'3%',borderColor:'gray'}}>
                <Text style={{fontFamily:'Poppins_500Medium',alignSelf:'center',fontSize:20,color:'gray'}}>share App</Text>
                <Ionicons name="share-social-sharp" size={24} color="gray" style={{marginLeft:'5%',alignSelf:'center'}}/>
             </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ReferalScreen

const styles = StyleSheet.create({
    mainContainer:{
      backgroundColor:'white',
      flex:1,

    },
    arrow:{
      position:'absolute',
      top:10,
      left:10
    },
    image:{
        width:'100%',
        height:'100%',
    },
    imageview:{
        width:'100%',
        height:'48.5%',
        alignItems:'center',
        position:'relative',
        marginTop:'1%'
        
    },
    bodyContainer:{
        marginTop:'2%'
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
      fontFamily:"Poppins_500Medium",
      marginLeft:'5%',
      color:'#A8062A'
  },
    bottomText:{
        alignSelf:'center',
        fontSize:20,
        fontFamily:"Poppins_500Medium",
        color:'#A8062A',
        marginTop:'5%'
    }
})
