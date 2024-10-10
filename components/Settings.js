import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { useMe } from "../hooks/get";
import { CartContext } from "../context/CartContext"; // Import CartContext

const Settings = ({ navigation }) => {
  const { data: user, isLoading, error } = useMe();
  const { resetCart } = useContext(CartContext); // Lấy resetCart từ CartContext

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleLogout = async () => {
    // Hiển thị thông báo xác nhận đăng xuất
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            // Xóa JWT khỏi AsyncStorage
            try {
              await AsyncStorage.removeItem('userToken');
              resetCart(); // Reset giỏ hàng khi đăng xuất
              navigation.replace("Login"); // Chuyển hướng về màn hình Login
            } catch (error) {
              console.error('Failed to logout:', error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="p-10">
      <Text>Email: {user.email}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Phone: {user.phone}</Text>
      <Text>User Id: {user._id}</Text>
      {/* Nút Đăng xuất */}
      <TouchableOpacity
        className="mt-6 bg-red-500 py-2 px-4 rounded"
        onPress={handleLogout}
      >
        <Text className="text-white text-center">Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
