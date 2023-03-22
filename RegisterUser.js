import React, {useState} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import firestore from '@react-native-firebase/firestore';

const RegisterUser = (props) => {

let [userID,setUserID] = useState('');
let [userName,setUserName] = useState('');
let [userContact,setUserContact] = useState('');
let [userAddress,setUserAddress] = useState('');

const Registration = ()=> {
  if(userName&&userContact&&userAddress){
    firestore()
    .collection('Abhi')
    .doc(userID)
    .set({
      name:userName,
      contact:userContact,
      address:userAddress
    })
    .then( ()=> {
      Alert.alert(
        'Success',
        'You Are Registered Successfully',
        [
          {
            text:'ok',
            onPress: ()=> props.navigation.navigate('HomeScreen'),
          }
        ],
        {cancelable:false},
      )
    })
  }
  else{
    alert('Fill all Details')}
}
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35
      }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior="padding"
          style={{flex: 1, justifyContent: 'space-between'}}>
          <Mytextinput
            placeholder="Enter ID"
            onChangeText={
              (userID) => setUserID(userID)
            }
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={
              (userName) => setUserName(userName)
            }
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Contact No"
            onChangeText={
              (userContact) => setUserContact(userContact)
            }
            maxLength={10}
            keyboardType="numeric"
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Address"
            onChangeText={
              (userAddress) => setUserAddress(userAddress)
            }
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mybutton
            title="Submit"
            customClick={Registration}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default RegisterUser;