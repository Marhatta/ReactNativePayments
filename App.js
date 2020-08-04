/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Razorpay from "./src/components/Razorpay";

const App = () => {
  return (
    <View style = {styles.container}>
    <Razorpay />
    </View>
  );
};

const styles = StyleSheet.create({
 container:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 }
});

export default App;
