/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, Button} from 'react-native';
import axios from 'axios';

import {RAZOR_PAY_API_KEY, RAZOR_PAY_KEY_SECRET} from '@env';

import Razorpay from './src/components/Razorpay';

const App = () => {
  const [payments, setPayments] = useState(null);
  const [refundResponse, setRefundResponse] = useState(null);
  useEffect(() => {
    async function getPayments() {
      try {
        const payments = await axios.get(
          'https://api.razorpay.com/v1/payments/',
          {
            withCredentials: true,
            auth: {
              username: RAZOR_PAY_API_KEY,
              password: RAZOR_PAY_KEY_SECRET,
            },
          },
        );
        setPayments(payments.data.items);
      } catch (error) {
        console.log('===error===', error);
      }
    }
    getPayments();
  }, [refundResponse]);

  issuePartialRefund = async (paymentId,amount) => {
    try {
      const refundResponse = await axios.post(
        `https://api.razorpay.com/v1/payments/${paymentId}/refund`,
        {
         amount:amount / 2
        },
        {
          withCredentials: true,
          auth: {
            username: RAZOR_PAY_API_KEY,
            password: RAZOR_PAY_KEY_SECRET,
          },
        },
      );
      setRefundResponse(refundResponse);
      console.log('=====Refund Response=====', refundResponse);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>
          Only those items can be refunded which have a status of "Captured"
        </Text>
        {payments?.map((payment, index) => {
          return (
            <View key={index} style={styles.card}>
              <Text style={styles.text}>Bank - {payment.bank}</Text>
              <Text style={styles.text}>Payment Method - {payment.method}</Text>
              <Text style={styles.text}>
                Amount - INR {payment.amount / 100}
              </Text>
              <Text style={styles.text}>Status - {payment.status}</Text>
              <Text style={styles.text}>
                Refund Status -{' '}
                {payment.refund_status ? payment.refund_status : 'NIL'}
              </Text>
              <Text style={styles.text}>
                Amount Refunded - INR {payment.amount_refunded / 100}
              </Text>
              {payment.status === 'captured' && payment.amount > 0 ? (
                <Button
                  title="Refund Partial Amount"
                  onPress={() => issuePartialRefund(payment.id,payment.amount)}
                />
              ) : null}
            </View>
          );
        })}
      </ScrollView>
      <Razorpay />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    marginVertical: 15,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: 'white',
    elevation: 4,
  },
  text: {
    fontSize: 20,
  },
});

export default App;
