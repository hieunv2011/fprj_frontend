import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const image = {
//   uri: "https://wallpaper.forfun.com/fetch/59/594dc3afe8ba7a5719d7563c08c743d7.jpeg?h=900&r=0.5",
// };
const image = require("../assets/bg.jpg");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return; // Ngừng thực thi hàm nếu dữ liệu không hợp lệ
    }

    const requestBody = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://192.168.110.26:3008/api/users/login",
        {
          // Thay đổi URL theo đúng API của bạn
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token);
        Alert.alert("Success", "Login successful!");
        console.log("Token:", data.token); // Hiển thị token trong console (nếu có)
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="flex-1 justify-center items-center h-full w-full space-y-5"
      >
        <View className="w-full max-w-sm px-8 rounded-2xl-lg shadow-lg">
          {/* <View className="w-full flex items-center">
            <Image
              className="w-20 h-24"
              source={require("../assets/logo.png")}
            />
          </View> */}
          <View className=" mt-8">
            <TextInput
              className="border border-gray-300 p-2 mb-4 rounded-2xl bg-white"
              placeholder="Tên đăng nhập..."
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={{
                fontFamily: "tahoma",
              }}
            />
            <TextInput
              className="border border-gray-300 p-2 rounded-2xl pr-10 bg-white"
              placeholder="Mật khẩu..."
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              style={{
                fontFamily: "tahoma",
              }}
            />
            <TouchableOpacity
              className="absolute right-2 top-2.5"
              onPress={() => setShowPassword(!showPassword)}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
            className="bg-[#c52728] p-1 w-40 rounded-2xl"
            onPress={handleLogin}
          >
            <Text
              className="text-white text-center text-base"
              style={{
                fontFamily: "tahoma",
              }}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-2xl"
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              className="text-[#c52728] text-center text-sm underline mt-2"
              style={{
                fontFamily: "Roboto-Bold",
              }}
            >
              Quên mật khẩu ?
            </Text>
            <Text
              className="text-[#c52728] text-center text-sm underline mt-2"
              style={{
                fontFamily: "Roboto-Bold",
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Login;
