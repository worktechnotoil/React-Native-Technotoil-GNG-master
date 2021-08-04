import React,{createContext,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const AuthContext =createContext()

export const StateContext=createContext()








export const Context = (props) => {

    const [ConName, setConName] = useState('')
    const [ConImage, setConImage] = useState('https://i.pinimg.com/originals/77/19/b8/7719b857237e97a22bb352f6b83c2b04.jpg')
    const [ConLastName, setConLastName] = useState('')

    


    return (
       <StateContext.Provider value={[ConName,ConImage,ConLastName,setConName,setConImage,setConLastName]}>
          {props.children}
       </StateContext.Provider>
    )
}




const styles = StyleSheet.create({})


 
