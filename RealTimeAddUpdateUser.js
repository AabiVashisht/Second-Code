import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,

} from 'react-native';

import Mybutton from './Mybutton';

import firestore from '@react-native-firebase/firestore';

const RealTimeAddUpdateUser = (props) => {

  let [listData, setListData] = useState([]);
  let [userID, setUserID] = useState('');

  useEffect(() => {
    const subscriber = firestore()
      .collection('Abhi')
      .onSnapshot(
        (querySnapshot) => {

          let temp = [];

          querySnapshot.forEach((documentSnapshot) => {


            let userDetails = {};

            userDetails = documentSnapshot.data();

            userDetails['id'] = documentSnapshot.id;
            temp.push(userDetails);
          });
          setListData(temp);
        },
        (error) => {
          console.log('error', error);
        },
      );


    return () => subscriber();
  }, []);

  const onDocSubmit = () => {
    firestore()
      .collection('Abhi')
      .doc(userID)
      .set({

        name: "",
        contact: "",
        address: "",
      })
      .then(() => {
        setUserID('');
        alert('Added');
      })
      .catch((error) => {
        alert(`Exception: ${error}`);
      });
  };

  const onDocRemove = (oldDoc) => {
    firestore()
      .collection('Abhi')
      .doc(oldDoc)
      .delete()
      .catch((error) => {
        alert(`Exception: ${error}`);
      });
  };

  const renderDoc = (doc, index) => {
    return (
      <View style={styles.card} key={index}>
        <Text>Id: {doc.id}</Text>
        <Text>Name: {doc.name}</Text>
        <Text>Contact: {doc.contact}</Text>
        <Text>Address: {doc.address}</Text>
        <Mybutton
          title="Remove"
          customClick={() => onDocRemove(doc.id)}
        />
        <Mybutton title="Edit"
          customClick={
          () => props.navigation.navigate('EditPage', { someParam:doc.id })
        }
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter ID"
            onChangeText={
              (userID) => setUserID(userID)
            }
            value={userID}
          />
          <Mybutton
            title="Submit"
            customClick={onDocSubmit}
          />
        </View>
        <ScrollView>
          {listData.map((doc, index) => renderDoc(doc, index))}
        </ScrollView>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  inputContainer: {
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    maxWidth: 350,
    borderColor: 'black',
    height: 40,
    borderWidth: 0.5,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
  },
  card: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderBottomColor: '#D4D4D4',
    borderBottomWidth: 1,
    borderRadius: 2,
  },
});

export default RealTimeAddUpdateUser;