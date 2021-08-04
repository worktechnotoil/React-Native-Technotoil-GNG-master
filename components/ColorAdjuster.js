import React,{useState} from 'react'
import { StyleSheet, Text, View ,FlatList} from 'react-native'
import {Overlay,CheckBox,Button} from 'react-native-elements';

const ColorAdjuster = ({name}) => {
    
    return (
        <View style={{marginVertical:'5%'}}>
            <Text>{name}</Text>
            <Button style={{width:50}}
  title={`Add ${name}`}
  type="clear"
  onPress={()=>null}
/>

<Button style={{width:50}}
  title={`Reduce ${name}`}
  type="clear"
  onPress={()=>null}/>
        </View>
    )
}

export default ColorAdjuster

const styles = StyleSheet.create({})
