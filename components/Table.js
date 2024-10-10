import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Table = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('User is not authenticated');
        }

        const response = await fetch('http://192.168.110.26:3008/api/order', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders(); // Fetch initial data

    const intervalId = setInterval(() => {
      fetchOrders(); // Fetch data periodically every 1 second
    }, 1000); // Thời gian thăm dò là 1000ms (1 giây)

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  const renderOrderItem = ({ item }) => (
    <View className="p-4 bg-white mb-2 rounded-lg shadow-md border border-slate-300">
      <Text className="text-lg font-bold">Order ID: {item._id}</Text>
      <Text>User ID: {item.user ? item.user.$oid : 'No User ID'}</Text>
      <Text>Payment Method: {item.paymentMethod}</Text>
      <Text>Total Price: {item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Text>
      <Text>Order Date: {new Date(item.orderDate).toLocaleDateString()}</Text>
      <Text className="mt-2 font-bold">Items:</Text>
      {item.orderItems.map((orderItem, index) => (
        <View key={index} className="ml-4">
          <Text>Cafe ID: {orderItem.cafe ? orderItem.cafe.$oid : 'No Cafe ID'}</Text>
          <Text>Quantity: {orderItem.quantity}</Text>
          <Text>Price: {orderItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VNĐ</Text>
        </View>
      ))}
    </View>
  );

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default Table;
