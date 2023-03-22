import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import RegisterUser from './RegisterUser';
import UpdateUser from './UpdateUser';

import ViewUser from './ViewUser';
import DeleteUser from './DeleteUser';
import RealTimeAddUpdateUser from './RealTimeAddUpdateUser';
import AddOrderSummary from './AddOrderSummary';
import ViewAllUser from './ViewAllUser';
import EditPage from './EditPage';

const Stack = createStackNavigator();

const NavigationPage = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#03A89E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
         <Stack.Screen
          name="ViewAllUser"
          component={ViewAllUser}
          options={{title: 'ViewAllUser'}}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUser}
          options={{title: 'Register'}}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{title: 'Update'}}
        />

        <Stack.Screen
          name="ViewUser"
          component={ViewUser}
          options={{title: 'View'}}
        />
        <Stack.Screen
          name="DeleteUser"
          component={DeleteUser}
          options={{title: 'Delete'}}
        />
        <Stack.Screen
          name="RealTimeAddUpdateUser"
          component={RealTimeAddUpdateUser}
          options={{title: 'Real Time Updates'}}
        />
        <Stack.Screen
          name="AddOrderSummary"
          component={AddOrderSummary}
          options={{title: 'Add Order Summary'}}
        />
        <Stack.Screen
          name="EditPage"
          component={EditPage}
          options={{title: 'EditPage'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationPage;