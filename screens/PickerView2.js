import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,SafeAreaView,FlatList,Image} from 'react-native'
import { List,Divider,Searchbar } from 'react-native-paper';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import {useFonts} from 'expo-font';

const PickerView2 = ({navigation,route}) => {
    const [filterData, setfilterData] = useState([])
    const [masterData, setmasterData] = useState([])
    const [search, setsearch] = useState('')
    const [navView, setnavView] = useState('')

    useEffect(() => {
        const DATA=route.params.stateList
        setfilterData(DATA)
        setmasterData(DATA)
        setnavView(route.params.navView)
    }, [])

    const searchFilter=(text)=>{
           if(text){
               const newData=masterData.filter((item)=>{
                   const itemData=item.StateName ? item.StateName.toUpperCase():''.toUpperCase();
                   const textData=text.toUpperCase();
                   return itemData.indexOf(textData)>-1;
               })
               setfilterData(newData)
               setsearch(text)
           }else{
               setfilterData(masterData);
               setsearch(text);
           }
    }
    


    const [loaded] = useFonts({
        RobotoSlab: require('../assets/fonts/RobotoSlab-Regular.ttf'),
        RobotoMono:require('../assets/fonts/RobotoMono-Bold.ttf'),
        Gotham:require('../assets/fonts/GothamMedium.ttf'),
        GothamBold:require('../assets/fonts/GothamBold.ttf'),
      });
    
      if (!loaded) {
        return null;
      }
    

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>State</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

              <Searchbar
              style={{marginVertical:'3%',width:'95%',alignSelf:'center'}}
      placeholder="Search"
      onChangeText={value=>{searchFilter(value)}}
      value={search}
      returnKeyType='done'
      selectionColor='#A8062A'
      />

        <FlatList
          data={filterData}
          keyExtractor={item => item.stateId}
          renderItem={({item})=>{
              return(
                 <>
                <List.Item
                title={item.StateName}
                
                onPress={()=>
                    {
                        
                        navigation.navigate(`${navView}`,{StateName:item.StateName,stateId:item.stateId});
}
                    }
                />
                <Divider />
                </>
              )
          }}
        />
      </SafeAreaView>
    )
}

export default PickerView2

const styles = StyleSheet.create({
    container:{
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
        fontFamily:"Poppins_500Medium",
        marginLeft:'5%',
        color:'#A8062A'
    },

})
