import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,Image,TouchableOpacity} from 'react-native'
import {Overlay } from 'react-native-elements'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import instance from '../src/api/Gng';
import { Divider,Avatar} from 'react-native-paper';
import {useFonts} from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationMain from './NotificationMain';
import { Card } from 'native-base';


const NotificationScreen = ({navigation}) => {
  
  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const [NotificationList, setNotificationList] = useState([])
  
  useEffect(() => {
    (async()=>{
        
      try{
      setloader(true)
      setVisible(true)
      const cid1 = await AsyncStorage.getItem('cid')
      const NotificationResult=await instance.get(`/NotificationByCid/${cid1}`)
      console.log(NotificationResult.data)
      setNotificationList(NotificationResult.data)
        

     
      setloader(false)
      }catch(err){
      console.log(err)
      setloader(false)
      }
      setloader(false)
     
     
  })();
    
  }, [])

 

let name=[]
  return (
    <View style={{marginBottom:'10%'}}>
       <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Notifications</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}

      {NotificationList!=='' && NotificationList.length!==0  ?
      <FlatList 
      data={NotificationList}
      keyExtractor={(item,index)=>index.toString()}
      renderItem={({item})=>{
        return(
          <View style={{width:'95%',alignSelf:'center',marginVertical:'1.5%',paddingRight:'10%',backgroundColor:'#ededed',borderRadius:5,}}>
          <TouchableOpacity onPress={()=>navigation.navigate('NotificationMain',{id:item.id})} style={{paddingVertical:'4%',width:'95%',alignSelf:'center',flexDirection:'row',paddingHorizontal:'2%'}}>
          <View>
             <Avatar.Image size={50} source={{uri:item.image}} />
          </View>
          
           <View style={{marginLeft:'3%',paddingRight:'20%'}}>
             
                 <Text style={{fontFamily:'Poppins_700Bold',paddingVertical:'1%',color:'black',alignSelf:'flex-start',marginLeft:'4%',textTransform:'capitalize',fontSize:15,lineHeight:16}}>{item.title}</Text>
                 <Text style={{fontFamily:'Poppins_500Medium',color:'gray',alignSelf:'flex-start',marginLeft:'4%',lineHeight:16,fontSize:12}}>{item.date}</Text>
            
    
            
           </View>
           
      </TouchableOpacity>
         
      </View>
        )
      }}
      />:  
      <Text style={{marginVertical:'5%',fontFamily:'Poppins_500Medium',color:'gray',marginLeft:'5%',alignSelf:'center',marginTop:'70%',fontSize:16}}>No Notification available !</Text>
           
        
        }
    </View>
  )
}


export default NotificationScreen

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
