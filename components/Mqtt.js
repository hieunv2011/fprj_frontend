import Paho from "paho-mqtt";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView } from "react-native";
import { useDevices } from "../hooks/get"; // Import hook lấy danh sách thiết bị

// Khởi tạo client Paho MQTT
const client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

export default function Mqtt() {
  const [value, setValue] = useState("");

  // Lấy dữ liệu từ API danh sách thiết bị
  const { data: devices, isLoading, error } = useDevices();

  function onMessage(message) {
    if (message.destinationName === "device001") {
      const jsonData = JSON.parse(message.payloadString);
      setValue(JSON.stringify(jsonData, null, 2)); // Hiển thị dữ liệu JSON với định dạng
    }
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("device001"); // Subscribe vào topic device001
        client.onMessageArrived = onMessage; // Gán hàm xử lý tin nhắn
      },
      onFailure: () => {
        console.log("Failed to connect!");
      },
    });
  }, []);

  if (isLoading) {
    return <Text>Loading devices...</Text>;
  }

  if (error) {
    return <Text>Error fetching devices: {error.message}</Text>;
  }

  return (
    <ScrollView>
      <View>
        <Text>Received Data from MQTT:</Text>
        <Text>{value}</Text>
      </View>
      <View>
        <Text>Device List from API:</Text>
        {devices && devices.map((device, index) => (
          <View key={index}>
            <Text>Device ID: {device.deviceId}</Text>
          </View>
        ))}
      </View>
      <StatusBar />
    </ScrollView>
  );
}
