import React, { useState,useEffect } from 'react';
import { Image,StyleSheet ,ActivityIndicator,FlatList,StatusBar,View} from 'react-native';
import {useFonts} from 'expo-font';
import {Overlay} from 'react-native-elements'
import { Divider} from 'react-native-paper';
import instance from '../src/api/Gng';
import { AntDesign,FontAwesome5 } from '@expo/vector-icons';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Title,Subtitle,Right } from 'native-base';

const NewsScreen=({navigation})=> {
    const [loader,setloader]=useState(false) //loader
    const [visible, setVisible] = useState(false);  //overly
    const [newsList, setnewsList] = useState([])
    const [web,setweb]=useState(true)
    const [view,setview]=useState(true)
    useEffect(() => {
        
       (async()=>{
       
        try{
            setloader(true)
            setVisible(true)
            const responce=await instance.get('/news') 
            console.log(responce.data)
            setnewsList(responce.data)
            setloader(false)
           
        }catch(err){
          console.log(err)
        }
    }
    )()
        
           
    }, [])

    
     
  
    return (
      <>
       
      {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large" color="gray" />
</Overlay>:null}

<View style={styles.headerContainer}>
          <View style={{flexDirection:'row'}}>
          <AntDesign name="arrowleft" size={26} color="#A8062A" style={{alignSelf:'center'}} onPress={()=>navigation.goBack()}/>
                   <Text style={styles.headingText}>News</Text>
          </View>
                   
                   <Image source={require('../assets/Gnglogo.png')} style={{width:50,height:30}}/>
              </View>
              <Divider style={{backgroundColor:'#A8062A',height:1}}/>

     <FlatList
      keyExtractor={news=>news.id}
      data={newsList}
      renderItem={({item})=>{
return(
 
        <Container style={{height:'50%'}}>
           <Content>
        
          <Card style={{flex: 0}}  >
            <CardItem  >
              <Left>
                <Thumbnail source={{uri: `${item.image}`}} />
                <Body>
                  <Text style={{fontFamily:'Poppins_700Bold',fontSize:20,marginBottom:'1%',color:'#A8062A'}}>{item.author}</Text>
                  <Text style={{fontFamily:'Poppins_500Medium',lineHeight:17}} note>{item.headline}</Text>
                </Body>
              </Left>
              
            </CardItem>
            <CardItem button onPress={() =>
                
                    navigation.navigate('NewsView',{content:item.newshtmlcontent})
                
            }>
              <Body>
                <Image source={{uri: `${item.image}`}} style={{height: 200, width: '100%', flex: 1}}/>
                
                <Text style={{fontFamily:'Poppins_500Medium'}}>{item.newsorigin}
                </Text>
                {loader?<Overlay isVisible={visible}  style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <ActivityIndicator size="large" color="gray" />
      </Overlay>:null}
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="newspaper-o" type='FontAwesome' style={{color:'#A8062A'}} />
                  <Text style={{fontFamily:'Poppins_500Medium',color:'#A8062A'}}>{item.category}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          </Content> 
      </Container>
     
      )
      }}
      />
      
     
          
          
      </>    
     
   
    );
  }

  export default NewsScreen
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
