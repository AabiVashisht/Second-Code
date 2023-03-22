import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import firestore from '@react-native-firebase/firestore';

const DeleteUser = (props) => {

  let [userID, setUserID] = useState('');

  const deleteUser = () => {
    if (userID) {

      firestore()
        .collection('Abhi')
        .doc(userID)
        .delete()
        .then(() => {
          Alert.alert(
            'Success',
            'Deleted Successfully',
            [
              {
                text: 'Ok',
                onPress:
                  () => props.navigation.navigate('HomeScreen')
              },
            ],
            {cancelable: false},
          );
        });

    } else {
      alert('Please Enter ID');
    }
  };



  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        paddingHorizontal: 35
      }}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={
        (userID) => setUserID(userID)}

        style={{padding: 10}}
      />
      <Mybutton title="Delete User" customClick={deleteUser} />
    </View>
  );
};

export default DeleteUser;