import React from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
const image = {
  uri: "https://wallpaper.forfun.com/fetch/56/56a18f25be95967ffc8c2963114ce160.jpeg?h=900&r=0.5",
};
const Home = ({ navigation }) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ImageBackground
        source={image}
        resizeMode="cover"
        className="flex-1 justify-end items-center h-full w-full space-y-5"
      >
        <Text
          className="text-white text-center text-xl pb-40"
          style={{
            fontFamily: "Roboto-Medium",
          }}
        >
          HUST CAFE {"\n"}
          Khơi dậy tỉnh táo - học tập sáng tạo
        </Text>
        <Text
          className="text-white text-right"
          style={{
            fontFamily: "PlayfairDisplay-SemiBold",
          }}
        >
          Mỗi buổi sáng thức dậy không có cà phê, tôi thấy mình vô vị Napoleon
          1769-1821
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#c77c4f",
          }}
          className="h-12 w-full items-center justify-center p-2.5 rounded-2xl mt-2.5"
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            className="text-white text-xl"
            style={{
              fontFamily: "Roboto-Medium",
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Home;
