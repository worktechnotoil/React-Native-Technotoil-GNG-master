import _ from 'lodash';
import moment from 'moment';
import React, {useState,useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, ActivityIndicator,FlatList,SafeAreaView,Alert,ToastAndroid,Image,StatusBar} from 'react-native';
import {Calendar,calendarTheme} from 'react-native-calendars';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import instance from '../src/api/Gng';
import { Checkbox,Card,TextInput,DefaultTheme,Divider} from 'react-native-paper';
import {Overlay } from 'react-native-elements'
import { Ionicons,MaterialCommunityIcons  } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useToast } from "react-native-toast-notifications";
import { Platform } from 'react-native';


const BookAppoinment = ({navigation}) => {
  const toast = useToast()
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#A8062A',
      accent: '#f1c40f',
    }
  };

  const[userdata,setuserdata]=useState({})
   
    const [startTime, setstartTime] = useState('')
    const [endTime, setendTime] = useState('')
    const [noteText, setnoteText] = useState('')//input
    const [Phone, setPhone] = useState('')
    const [name, setname] = useState('')
    const [Cid, setCid] = useState('')
    const [localcid, setlocalcid] = useState('')
    

    const [BookedDate, setBookedDate] = useState([]) //Booked date list
    const [BookedTime, setBookedTime] = useState([]) //Booked Time list

    const [dateSelect, setdateSelect] = useState(false)
    const [selectedDate, setselectedDate] = useState('')
    const [Timeslot, setTimeslot] = useState({})
    const [dayTimeslot, setdayTimeslot] = useState({})
    const [Day, setDay] = useState('')
    const [markedDates, setmarkedDates] = useState({'2021-04-7': {selected: true, marked: true, selectedColor: 'blue'}})
    const [showMarkedDatesExamples, setShowMarkedDatesExamples] = useState(false);
    const [empty, setempty] = useState(false)

    const [loader,setloader]=useState(false) //loader
  const [visible, setVisible] = useState(false);  //overly
  const [select, setselect] = useState(false)

    const [checked, setChecked] = useState(false);
    const [selectedTimeSlot, setselectedTimeSlot] = useState([])

    useEffect(() => {

      const unsubscribe = navigation.addListener('focus', async() => {
        setDay('')
        setselectedDate('')
        setdayTimeslot({})
        setmarkedDates({})
        setempty(true)
          setnoteText('');
        (async()=>{
            
          try{
          setloader(true)
          setVisible(true)
          const cid1 = await AsyncStorage.getItem('cid')
          setlocalcid(cid1)

          const result1=await instance.get(`/customer/${cid1}`)
          const BookedResult=await instance.get('/VideoBooking')
          const BookedResultArray=BookedResult.data
         
            let array=[]
            let array1=[]
            let array2=[]

            BookedResultArray.map((item)=>{
             array = item.start_datetime.split(' ');

            array1.push(array[0])
            array2.push(array[1].substr(0,5))
           
           
          })

          setBookedDate(array1)
          setBookedTime(array2)

          
          
          setname(result1.data.fname)
          setPhone(result1.data.contact)
          setCid(result1.data.cid)
          

          const jsonValue1 = await AsyncStorage.getItem('userdata')
          const parseData1=JSON.parse(jsonValue1)
          console.log('user',parseData1)
          setuserdata(parseData1)

          setloader(false)
          }catch(err){
          console.log(err)
          setloader(false)
          }
          setloader(false)
          
          
         
      })();
         
             
      });
      
      return ()=>{
          unsubscribe
          
      };
    }, [navigation]);

    


    const getSelectedDayEvents =  async(date) => {
      
      try {
        setloader(true)
      setVisible(true)
        const timeslotlist=await instance.get(`/VideoTimeslotByDate/${date}`)
        console.log(timeslotlist.data)
        setdayTimeslot(timeslotlist.data)
        setTimeslot(timeslotlist.data)
        setloader(false)

           
      setselect(true)
      setselectedTimeSlot([])
        let markedDates = {};
        markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
        
        let serviceDate = moment(date);
        serviceDate = serviceDate.format("YYYY-MM-DD");
        console.log('serviceDate',serviceDate,'Booked Date',BookedDate)
        let date1=new Date(serviceDate)
        let day=date1.getDay()
        var weekday = new Array(7);

weekday[0] = "sunday";
weekday[1] = 'monday';
weekday[2] = "tuesday";
weekday[3] = "wednesday";
weekday[4] = "thursday";
weekday[5] = "friday";
weekday[6] = "saturday";


var n = weekday[day];





setChecked(false)

        setDay(n)
        setselectedDate(serviceDate)
        setmarkedDates(markedDates)
        console.log(timeslotlist.data.return,'........')
        if(timeslotlist.data.return==='holiday'){
          console.log(timeslotlist.data.result)
          setempty(true)
        }
        else{
          setempty(false)
        }
        
          
        

      } catch (error) {
        
      }
      
      
      
   
      
       
    };

    const BookVideo=()=>{
      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let bookdateTime=selectedDate + ' ' +time
      console.log('Bookdate time :',bookdateTime);

      (async()=>{
        if( selectedTimeSlot.length!==0){
          try{
  
            const formData = new FormData();
            // formData.append('data', JSON.stringify(data));
            formData.append('book_datetime', bookdateTime);
            formData.append('start_datetime', startTime);
            formData.append('end_datetime', endTime);
            formData.append('id_users_customer', Cid);
            formData.append('notes', noteText);
            formData.append('bookingName', name);
            formData.append('bookingContact', Phone);
            
            
                    setloader(true)
                    setVisible(true)
                  await  axios({
                      url    : `https://develop-c.cheshtainfotech.com/CEA/api/VideoBooking`,
                      method : 'POST',
                      data   : formData,
                      headers: {
                                   'Content-Type': 'multipart/form-data',
                                   'Authorization':'@CEAUTH09#'
                               }
                           })
                           .then(function (response) {
                                   console.log("response :", response.data);
                                  
                          })
                          .catch(function (error) {
                                   console.log('Booking error',error);
                          })
                          
                          
                        setloader(false)
                        
                       
                        
                        if(Platform.OS==='ios'){
                          Alert.alert(
                            'Appointment Booked','Thank you for booking',[
                                {text:'Ok',onPress:()=>  toastMessage("Booking Finished")}
                            ]
                        )
                        navigation.navigate('History')
                      
                        }else{
                          Alert.alert(
                            'Appointment Booked','Thank you for booking',[
                                {text:'Ok',onPress:()=>navigation.navigate('History')}
                            ]
                        )
                        toastMessage("Booking Finished")
                        }
                          
                
                      }catch(err){
                        
                        console.log('Booking function :',err)
                        alert('something goes wrong')
                      } 
                      
        }else{
          Alert.alert(
            'Alert','Please choose the available Time slot'
        )
        }
       
  
                      
      })();
      
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
        
        <View style={{flex:1}}>
           <StatusBar barStyle='default' backgroundColor='white' />
            {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}

      <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>Book Video Call</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1,marginBottom:15}}/>


<ScrollView
keyboardShouldPersistTaps='handled'
keyboardDismissMode='on-drag'
showsVerticalScrollIndicator={false}
>
<TextInput
  theme={theme}
      label="Name"
      value={name}
      onChangeText={text =>setname(text)}
      style={{width:'90%',alignSelf:'center',backgroundColor:'white',marginBottom:'3%'}}
    />

<TextInput
  theme={theme}
      label="Phone"
      value={Phone}
      onChangeText={text =>setPhone(text)}
      style={{width:'90%',alignSelf:'center',backgroundColor:'white',marginBottom:'3%'}}
    />
 <SafeAreaView style={{flex: 1,}}>
<Card style={{width:'90%',alignSelf:'center'}}>
   
    <Card.Content>
        
<Calendar
  style={{ height: 350, width: "90%",alignSelf:'center'}}
  theme={{
    backgroundColor: "#ffffff",
    calendarBackground: "#ffffff",
    todayTextColor: "#A8062A",
    dayTextColor: "#222222",
    textDisabledColor: "#d9e1e8",
    monthTextColor: "#A8062A",
    arrowColor: "#A8062A",
    textDayFontWeight: "300",
    textMonthFontWeight: "bold",
    textDayHeaderFontWeight: "500",
    textDayFontSize: 16,
    textMonthFontSize: 18,
    selectedDayBackgroundColor: "#A8062A",
    selectedDayTextColor: "white",
    textDayHeaderFontSize: 14
  }}
  current={new Date()}
  firstDay={1}
  enableSwipeMonths={true}
  hideExtraDays={true}
  minDate={new Date()}
  maxDate={"2030-05-30"}
  monthFormat={"MMMM yyyy "}
  markedDates={markedDates}
  scrollEnabled={true}
  horizontal={true}
  showScrollIndicator={true}
  disableMonthChange={true}
  onDayPress={day => getSelectedDayEvents(day.dateString)}
/>
    </Card.Content>
    
  </Card>

{select?
  <Card  style={{width:'90%',alignSelf:'center',marginTop:"4%"}}>
    <Text style={{fontFamily:'Poppins_500Medium',marginLeft:'3%',marginTop:'3%',fontSize:16}}>Availibility</Text>
   
       {empty?<Text style={{marginVertical:'5%',fontFamily:'Poppins_500Medium',color:'gray',marginLeft:'5%'}}>No time slot available !</Text>:
      
       <FlatList 
scrollToOverflowEnabled={true}
nestedScrollEnabled
style={{marginVertical:'5%',height:150}}
data={Object.keys(dayTimeslot)}
keyExtractor={(item,index)=>item}
renderItem={({item,index})=>{
  
    return(
     <View style={{flexDirection:'row'}}>
          <Checkbox.Android
          color='#A8062A'
          status={selectedTimeSlot.includes(index)?'checked':'unchecked'}
          onPress={() => {
      
       if(selectedTimeSlot.includes(index)) {
         setselectedTimeSlot(selectedTimeSlot.filter(item=>item!==index))
       } else {
         setselectedTimeSlot([index])
         let str = dayTimeslot[item]
         let array = str.split(' - ');
         setstartTime(selectedDate+' '+array[0]+':00')
         setendTime(selectedDate+' '+array[1]+':00')
         console.log('Start time',selectedDate+' '+array[0]+':00')
         console.log('End time',selectedDate+' '+array[1]+':00')
      
         
      }
      
      }}
      />
      
      <Text style={{alignSelf:'center',fontFamily:'Poppins_500Medium',color:'gray',marginLeft:'5%',width:'50%'}}>{dayTimeslot[item]}</Text>
      
      </View>

    )
  }
    
         
      }
      />
    
      }

     </Card>:null}
    
      <TextInput
      theme={theme}
          label="Your Message"
          value={noteText}
          onChangeText={text =>setnoteText(text)}
          multiline={true}
          style={{width:'90%',alignSelf:'center',backgroundColor:'white',height:90,marginTop:'4%'}}
        />
    
      <TouchableOpacity onPress={BookVideo}  style={styles.buttonTouch}>
                        <Text style={styles.buttonStyle}>Book</Text>
                    </TouchableOpacity>
                    </SafeAreaView>
      </ScrollView>
    
      
          </View>
    )}
  
        
    


export default BookAppoinment

const styles = StyleSheet.create({
    calendar: {
     width:'90%',
     alignSelf:'center'

      },
      headerContainer:{
        padding:'3%',
        flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'space-between',
        paddingHorizontal:'3%',
        paddingTop:50,
  
       
        
    },
    headingText:{
        alignSelf:'center',
        fontSize:20,
        fontFamily:"Poppins_500Medium",
        marginLeft:'3%',
        color:'#A8062A'
    },
    buttonStyle:{
      fontFamily:'Poppins_500Medium',
      color:'#fff',
      fontSize:16,
      alignSelf:'center',
      marginVertical:13
      
  },
  buttonTouch:{
      height:45,
      backgroundColor:'#A8062A',
      borderRadius:7,
      width:'70%',
      alignSelf:'center',
      marginBottom:'10%',
      marginTop:'5%'
  },
})

