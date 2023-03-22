import React, {useState,useEffect} from 'react';
import {View, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import firestore from '@react-native-firebase/firestore';


const EditPage = ({route,props}) => {
  let [userID, setUserID] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let [userData, setUserData] = useState({});

  useEffect(() => {
    if (route.params.someParam) {
        firestore()
        .collection('Abhi')
        .doc(route.params.someParam)
        .get()
        .then((documentSnapshot) => {

          let userDetails = {};

          userDetails = documentSnapshot.data();

          userDetails['id'] = documentSnapshot.id;
          setUserData(userDetails);
          setUserName(userData.name);
          setUserContact(userData.contact);
          setUserAddress(userData.address);
        });
    }
  }, []);

  const EditUser = () => {
    if (userID && userName && userContact && userAddress) {


      firestore()
        .collection('Abhi')
        .doc(userID)
        .update({
          name: userName,
          contact: userContact,
          address: userAddress
        })
        .then(() => {
          Alert.alert(
            'Success',
            'Updated Successfully',
            [
              {
                text: 'Ok',
                onPress:
                  () => props.navigation.navigate('HomeScreen')
              },
            ],
            {cancelable: false},
          );
        })
        .catch((error) => {
          Alert.alert(
            'Exception',
            error,
            [
              {
                text: 'Ok',
                onPress:
                  () => props.navigation.navigate('HomeScreen'),
              },
            ],
            {cancelable: false},
          );
        });
    } else {
      alert('Please fill all fields');
    }
  };





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
            value={route.params.someParam}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Name"
            onChangeText={
              (userName) => setUserName(userName)
            }
            value={userName}
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Contact No"
            onChangeText={
              (userContact) => setUserContact(userContact)
            }
            value={userContact}
            maxLength={10}
            keyboardType="numeric"
            style={{padding: 10}}
          />
          <Mytextinput
            placeholder="Enter Address"
            onChangeText={
              (userAddress) => setUserAddress(userAddress)
            }
            value={userAddress}
            maxLength={225}
            numberOfLines={5}
            multiline={true}
            style={{textAlignVertical: 'top', padding: 10}}
          />
          <Mybutton
            title="Submit"
            customClick={EditUser}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default EditPage;



