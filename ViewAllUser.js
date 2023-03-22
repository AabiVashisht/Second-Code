import React, {useState, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewAllUser = () => {
  let [listData, setListData] = useState([]);



  useEffect(() => {
    firestore()
      .collection('Abhi')
      .get()
      .then((querySnapshot) => {
       let temp = [];

        querySnapshot.forEach((documentSnapshot) => {

          let userDetails = {};

          userDetails = documentSnapshot.data();

          userDetails['id'] = documentSnapshot.id;
          temp.push(userDetails);
          setListData(temp);
        });
      });
  }, []);

  const itemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }} />
    );
  };

  let itemView = ({item}) => {
    return (
      <View
        key={item.name}
        style={{
          backgroundColor: 'white',
          padding: 20
        }}>
        <Text>Doc Id: {item.id}</Text>
        <Text>Name: {item.name}</Text>
        <Text>Contact: {item.contact}</Text>
        <Text>Address: {item.address}</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={listData}
        ItemSeparatorComponent={itemSeparatorView}
        keyExtractor={(item, index) => index.toString()}
        renderItem={itemView}
      />
    </View>
  );
};

export default ViewAllUser;