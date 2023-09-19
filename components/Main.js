

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchUser } from '../redux/actions';
import Add from './main/Add';
import Feed from './main/Feed';
import Profile from './main/Profile';

const Tab = createBottomTabNavigator();
const NullComponent = () => null;

const Main = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator initialRouteName='Feed' backBehavior='initialRoute' >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='newspaper-variant' size={26} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Postar"
        component={NullComponent}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Add');
          }
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='plus-box' size={26} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='account-circle' size={26} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

//aqui é para mapear todas as ações e pegar uma dado especifico o fetchUser, os dados do usuario
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchUser },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Main);