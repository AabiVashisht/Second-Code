import React, {useState} from 'react';
import {View} from 'react-native';
import Mytextinput from './Mytextinput';
import Mybutton from './Mybutton';
import firestore from '@react-native-firebase/firestore';

const AddOrderSummary = () => {
  const dummyOrder = [
    {
      itemId: 1,
      itemName: 'T-Shirt',
      itemQuantity: 5,
      amount: 5000,
    },
    {
      itemId: 2,
      itemName: 'Shoe',
      itemQuantity: 2,
      amount: 2000,
    },
  ];

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
          if (documentSnapshot.exists) {
            userDetails = documentSnapshot.data();
            userDetails['id'] = documentSnapshot.id;
          }
          setUserData(userDetails);
        });
    }
  };

  const updateOrder = () => {
    if (userID) {
      let newOrderCollection = firestore()
        .collection('Abhi')
        .doc(userID)
        .collection('ordersummary');
      dummyOrder.forEach((item) => {
        newOrderCollection
          .add(item)
          .then(() => {
            alert('Added Successfully');
          })
          .catch((error) => {
            alert(`Exception: ${error}`);
          });
      });
    }
  };

  return (
    <View style={{paddingHorizontal: 35}}>
      <Mytextinput
        placeholder="Enter User Id"
        onChangeText={(userID) => setUserID(userID)}
        value={userID}
        style={{padding: 10}}
      />
      <Mybutton
        title="Search User"
        customClick={searchUser}
      />
      {Object.keys(userData).length ? (
        <Mybutton
          title="Add Order in User Document"
          customClick={updateOrder}
        />
        ) : null}

    </View>
  );
};

export default AddOrderSummary;