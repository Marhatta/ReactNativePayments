/**
    @flow strict-local
 */
import React from 'react';
import {Text, TouchableHighlight, StyleSheet} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZOR_PAY_API_KEY} from '@env';

const Razorpay = () => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        var options = {
          description: 'Credits towards consultation',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: RAZOR_PAY_API_KEY, // Your api key
          amount: '5000',
          name: 'foo',
          prefill: {
            email: 'void@razorpay.com',
            contact: '9191919191',
            name: 'Razorpay Software',
          },
          theme: {color: '#F37254'},
        };
        RazorpayCheckout.open(options)
          .then((data) => {
            // handle success

            console.log(data);
            alert(`Success: ${data.razorpay_payment_id}`);
          })
          .catch((error) => {
            // handle failure
            console.log(error);
            alert(`Error: ${error.code} | ${error.description}`);
          });
      }}>
      <Text style={styles.text}>RazorPay</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});

export default Razorpay;
