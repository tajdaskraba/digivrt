import * as Paho from 'paho-mqtt';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  interface Message {
    timestamp: number;
    temperature: number;
    humidity: number;
  }

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const client = new Paho.Client('213.172.234.74', 9001, 'clientId');
    client.connect({
      userName: 'rampa',
      password: 'rampa',
      onSuccess() {
        console.log('Connected to MQTT broker', client.host);
        client.subscribe('sensors/temperature-humidity');
      },
    });

    client.onMessageArrived = (message) => {
      const payload = JSON.parse(message.payloadString);

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, payload];
        return newMessages.length > 10 ? newMessages.slice(1) : newMessages;
      });
    };


    return () => {
      client.disconnect();
    };
  }, []);


  return (
    <ScrollView style={styles.container}>
      {messages.map((message, index) => (
        <View key={index} style={styles.messageContainer}>
          <Text style={styles.timestamp}>
            Time: {new Date(message.timestamp).toLocaleString()}
          </Text>
          <View style={styles.dataContainer}>
            <Text style={styles.data}>
              Temperature: {message.temperature.toFixed(2)}°C
            </Text>
            <Text style={styles.data}>
              Humidity: {message.humidity.toFixed(2)}%
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  timestamp: {
    fontSize: 16,
    marginBottom: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  data: {
    fontSize: 14,
  },
});