import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,FlatList,ActivityIndicator,Image ,BackHandler} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Overlay } from 'react-native-elements'
import { AntDesign,MaterialIcons,Entypo,Ionicons } from '@expo/vector-icons';
import instance from '../src/api/Gng';
import { Card,Divider} from 'react-native-paper';
import {useFonts} from 'expo-font';
import {useFocusEffect} from '@react-navigation/native'


const BookingHistory = ({navigation}) => {
    
  const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const [bookinglist, setbookinglist] = useState([])

  const [NotesVisible, setNotesVisible] = useState(true)

   
  useFocusEffect(
    useCallback(() => {  
      const onBackPress = () => {
       navigation.navigate('Home')
       return true
      };

      
      BackHandler.addEventListener(
        'hardwareBackPress', onBackPress
      );
  
      return () =>
        BackHandler.removeEventListener(
          'hardwareBackPress', onBackPress
        );
    }, [])
  );


  useEffect(() => {
    (async()=>{
        
        try{
        setloader(true)
        setVisible(true)
        const cid1 = await AsyncStorage.getItem('cid')
        const BookedResult=await instance.get(`/VideoBooking/${cid1}`)
        console.log(BookedResult.data)
        setbookinglist(BookedResult.data)
        setloader(false)
        }catch(err){
        console.log(err)
        setloader(false)
        }
        setloader(false)
       
       
    })();
    
}, [])



const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

let date=''
let date1=''
let splitFulldate=''
let splitDate=''
let splitMonth=''
let monthname=''
let splitStartTime=''
let splitEndTime=''

    return (
        <View style={{marginBottom:'10%'}}>
            
            <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.navigate('Home')}/>
                   <Text style={styles.headingText}>My Bookings</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}


{bookinglist.message==='There Is No Booking Available'?


           <Text style={{marginVertical:'5%',fontFamily:'Poppins_500Medium',color:'gray',marginLeft:'5%',alignSelf:'center',marginTop:'70%',fontSize:16}}>{bookinglist?.message} !</Text>
        :
       
      <FlatList
      data={bookinglist}
      keyExtractor={(item,index)=>item.book_datetime}
      style={{marginBottom:'5%'}}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
       
          date=item.start_datetime
          date1=item.end_datetime
          splitFulldate=date.substr(0,10)
          splitDate=splitFulldate.substr(8,10)
          splitMonth=splitFulldate.substr(6,1)
          splitStartTime=date.substr(11,5)
          splitEndTime=date1.substr(11,5)
          monthname=monthNames[splitMonth-1]
        
     
          
         
         return(
           
          <Card style={{width:'95%',alignSelf:'center',marginVertical:'1.5%'}}>
          <Card.Content>
        <View style={{flexDirection:'row'}}>
            <View style={{marginRight:'5%',backgroundColor:'#D4F1F4',padding:'4%',borderRadius:10,height:'75%'}}>
                <Text style={{fontFamily:'Poppins_700Bold',paddingBottom:'2%'}}>{monthname}</Text>
                <Text style={{fontFamily:'Poppins_500Medium',color:'gray',textAlign:'center',fontSize:16}}>{splitDate}</Text>
            </View>

            
            <View style={{width:'70%'}}>   
              <View style={styles.dataView}>
                <MaterialIcons name="perm-identity" size={22} color="black" />
                <Text style={{fontFamily:'Poppins_500Medium',color:'gray',textTransform:'capitalize',alignSelf:'center',marginLeft:'4%'}}>{item.bookingName}</Text> 
              </View>

              <View style={styles.dataView}>
                <Entypo name="mobile" size={22} color="black" />
                <Text style={{fontFamily:'Poppins_500Medium',color:'gray',alignSelf:'center',marginLeft:'4%'}}>{item.bookingContact}</Text>
              </View>

              <View style={styles.dataView}>
                <Ionicons name="time-outline" size={22} color="black" />
                <Text style={{fontFamily:'Poppins_500Medium',color:'gray',alignSelf:'center',marginLeft:'4%'}}>{splitStartTime} - {splitEndTime}</Text> 
              </View>

      </View>
      </View>
      {item.notes!==''?
      <View style={{ flexDirection:'row'}}>
                <MaterialIcons name="description" size={22} color="black" />
                <Text style={{fontFamily:'Poppins_500Medium',color:'gray',alignSelf:'center',marginLeft:'4%',lineHeight:18}}>{item.notes}</Text>
              </View>:null}
            
          </Card.Content>
        </Card>
         )
       
          
      }}
      />}

            
        </View>
    )
}

export default BookingHistory

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
dataView:{
  flexDirection:'row',
  marginBottom:'3%'
}
})
