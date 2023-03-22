import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import firestore from '@react-native-firebase/firestore';

const ViewUser = () => {
  let [userID, setUserID] = useState('');
  let [userData, setUserData] = useState({});

  const searchUser = () => {
    if (userID) {
      firestore()
        .collection('Abhi')
        .doc(userID)
        .get()
        .then((documentSnapshot) => {

          let userDetails = {};

          userDetails = documentSnapshot.data();

          userDetails['id'] = documentSnapshot.id;
          setUserData(userDetails);
        });
    }
  };


  return (
    <View style={{paddingHorizontal: 35}}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={
        (userID) => setUserID(userID)}

        style={{padding: 10}}
      />
      <Mybutton title="Search User" customClick={searchUser} />
      <View style={{marginTop: 10}}>
        <Text>
          User Id:{userData ? userData.id : ''}
        </Text>
        <Text>
          User Name:{userData ? userData.name : ''}
        </Text>
        <Text>
          User Contact:{userData ? userData.contact : ''}
        </Text>
        <Text>
          User Address:{userData ? userData.address : ''}
        </Text>
      </View>
    </View>
  );
};

export default ViewUser;



