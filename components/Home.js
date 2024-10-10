import React, { useState } from "react";
import { View, Text, Image, FlatList, Switch, Button } from "react-native";
import * as Notifications from "expo-notifications";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const userName = "Nguyễn Việt Hiếu";
  const userAvatar = require("../assets/logo.png");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const devices = [
    {
      id: "1",
      name: "Thiết bị 1",
      address: "29 Đặng Văn Ngữ, Hà Nội",
      sensors: [
        { type: "Cảm biến nhiệt độ", value: 75, unit: "°F" },
        { type: "Cảm biến độ ẩm", value: 30, unit: "%" },
        { type: "Cảm biến khí gas", value: 300, unit: "ppb", status: "Cháy" },
        { type: "Cảm biến khói", value: 5, unit: "ppm", status: "Ổn định" },
        {
          type: "Cảm biến nguồn điện",
          value: 220,
          unit: "V",
          status: "Ổn định",
        },
      ],
    },
    {
      id: "2",
      name: "Thiết bị 2",
      address: "Số 1 Đại Cồ Việt, Hà Nội",
      latitude: 20.9987,
      longitude: 105.8532,
      sensors: [
        { type: "Cảm biến nhiệt độ", value: 72, unit: "°F" },
        { type: "Cảm biến độ ẩm", value: 35, unit: "%" },
        {
          type: "Cảm biến khí gas",
          value: 500,
          unit: "ppb",
          status: "Ổn định",
        },
        { type: "Cảm biến khói", value: 10, unit: "ppm", status: "Cháy" },
        {
          type: "Cảm biến nguồn điện",
          value: 230,
          unit: "V",
          status: "Ổn định",
        },
      ],
    },
    {
      id: "3",
      name: "Thiết bị 3",
      address: "192 Lê Trọng Tấn, Hà Nội",
      latitude: 21.0025,
      longitude: 105.8512,
      sensors: [
        { type: "Cảm biến nhiệt độ", value: 80, unit: "°F" },
        { type: "Cảm biến độ ẩm", value: 25, unit: "%" },
        {
          type: "Cảm biến khí gas",
          value: 150,
          unit: "ppb",
          status: "Ổn định",
        },
        { type: "Cảm biến khói", value: 1, unit: "ppm", status: "Ổn định" },
        {
          type: "Cảm biến nguồn điện",
          value: 210,
          unit: "V",
          status: "Ổn định",
        },
      ],
    },
  ];

  const sensorIcons = {
    "Cảm biến nhiệt độ": (
      <MaterialIcons name="thermostat" size={24} color="black" />
    ),
    "Cảm biến độ ẩm": <MaterialIcons name="water" size={24} color="blue" />,
    "Cảm biến khí gas": <FontAwesome name="fire" size={24} color="red" />,
    "Cảm biến khói": <Ionicons name="flame" size={24} color="orange" />,
    "Cảm biến nguồn điện": (
      <MaterialIcons name="power" size={24} color="green" />
    ),
  };

  const renderSensor = ({ item }) => (
    <View className="p-2 bg-white rounded-lg mb-1 items-center">
      {sensorIcons[item.type]}
      <Text style={{ fontFamily: "tahoma", marginLeft: 8 }}>
        {item.value} {item.unit}
      </Text>
      {item.status && (
        <Text
          className={`${
            item.status === "Cháy" ? "text-red-600" : "text-green-600"
          } ml-4`}
        >
          {item.status}
        </Text>
      )}
    </View>
  );

  const renderDevice = ({ item }) => {
    return (
      <View className="p-4 bg-white border-[#a11611] border-2 rounded-lg mx-1 my-2">
        <Text className="text-base" style={{ fontFamily: "tahoma" }}>
          {item.name}: {item.address}
        </Text>
        <View className="flex-row flex-wrap mt-2">
          {item.sensors
            .filter((sensor) =>
              [
                "Cảm biến nhiệt độ",
                "Cảm biến độ ẩm",
                "Cảm biến khí gas",
                "Cảm biến khói",
                "Cảm biến nguồn điện",
              ].includes(sensor.type)
            )
            .map((sensor) => (
              <View key={sensor.type} className="w-1/5 p-1">
                <Text>{renderSensor({ item: sensor })}</Text>
              </View>
            ))}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 p-4 bg-white">
      <View className="h-48 bg-[#a11611] rounded-tl-2xl rounded-tr-2xl">
        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-2 py-2">
              <Text
                style={{
                  fontFamily: "tahoma",
                }}
                className="text-white"
              >
                XIN CHÀO {userName} !
              </Text>
            </View>
            <Image source={userAvatar} className="w-10 h-10 rounded-full" />
          </View>
          <View className="h-[1px] w-full bg-white my-3"></View>
          <View className="flex-row items-center">
            <View className="w-[50%] flex items-center">
              <Text
                className="text-white"
                style={{
                  fontFamily: "tahoma",
                }}
              >
                Số thiết bị hoạt động
              </Text>
              <View className="flex flex-row items-center space-x-3">
                <Text className="text-2xl text-white">{devices.length}</Text>
                <MaterialIcons name="sensors" size={52} color="white" />
              </View>
            </View>
            <View className="bg-white w-[1px] h-full"></View>
            <View className="w-[50%] flex items-center">
              <Text
                className="text-white"
                style={{
                  fontFamily: "tahoma",
                }}
              >
                Trạng thái thiết bị
              </Text>
              <View className="flex flex-row items-center space-x-3">
                <Text className="text-2xl text-white">3</Text>
                <MaterialIcons name="sensors" size={52} color="white" />
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row items-center bg-[#81100e] px-4 rounded-bl-2xl rounded-br-2xl justify-between">
        <View className="flex-row items-center space-x-2 py-2">
          <Text
            style={{
              fontFamily: "tahoma",
            }}
            className="text-white"
          >
            Nhận thông báo qua sim
          </Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View className="h-[65%] mt-4 rounded-2xl">
        <FlatList
          data={devices}
          renderItem={renderDevice}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default Home;
