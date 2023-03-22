import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import firestore from '@react-native-firebase/firestore';

const UpdateUser = (props) => {

  let [userID, setUserID] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  const searchUser = () => {
    if(userID){
      firestore()
      .collection('Abhi')
      .doc(userID)
      .get()
      .then((documentSnapshot)=> {
        if(documentSnapshot){
          setUserName(documentSnapshot.data().name);
          setUserContact(documentSnapshot.data().contact);
          setUserAddress(documentSnapshot.data().address);
        }
        else{
          setUserName('');
          setUserContact('');
          setUserAddress('');
        }
      })
    }
  }

  const updateUser = ()=> {
    if(userID&&userName&&userContact&&userAddress){
      firestore()
      .collection('Abhi')
      .doc(userID)
      .update({
        name:userName,
        contact:userContact,
        address:userAddress,
      })
      .then(()=>{
        Alert.alert(
          'Success',
          'Update Successfully',
          [{
            text:'Ok',
            onPress: props.navigation.navigate('HomeScreen')
          }],
          {cancelable:false}
        )
      })
    }
    else{
      alert('Please Fill All Fields')
    }
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
            placeholder="Enter User Id"
            style={{padding: 10}}
            onChangeText={(userID) => setUserID(userID)}
            value={userID}

          />
         <Mybutton title="Search User" customClick={searchUser} />
          <Mytextinput
            placeholder="Enter Name"
            value={userName}
            style={{padding: 10}}
            onChangeText={
              (userName) => setUserName(userName)
            }
          />
          <Mytextinput
            placeholder="Enter Contact No"
            value={'' + userContact}
            onChangeText={
              (userContact) => setUserContact(userContact)
            }
            maxLength={10}
            style={{padding: 10}}
            keyboardType="numeric"
          />
          <Mytextinput
            value={userAddress}
            placeholder="Enter Address"
            onChangeText={
              (userAddress) => setUserAddress(userAddress)
            }
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mybutton title="Update User" customClick={updateUser} />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default UpdateUser;