// import React, { useEffect, useState } from "react";
// import MapView, { Marker } from "react-native-maps";
// import { StyleSheet, View, Button, Vibration } from "react-native";
// import * as Location from "expo-location";
// import * as Notifications from "expo-notifications";

// const nearbyMarkers = [
//   {
//     id: 1,
//     latitude: 21.007,
//     longitude: 105.831,
//     status: "1",
//     address: "Địa chỉ 1",
//   },
//   {
//     id: 2,
//     latitude: 21.009,
//     longitude: 105.833,
//     status: "0",
//     address: "Địa chỉ 2",
//   },
//   {
//     id: 3,
//     latitude: 21.01,
//     longitude: 105.83,
//     status: "0",
//     address: "Địa chỉ 3",
//   },
// ];

// export default function Map() {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const showNotification = async () => {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Hello",
//         body: "Hello",
//       },
//       trigger: null,
//     });
//   };
//   const handleVibrate = () => {
//     Vibration.vibrate(2000);
//   };

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Xin lỗi, không thể lấy vị trí!");
//         return;
//       }
//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       });
//     })();
//   }, []);

//   return (
//     <View style={styles.container}>
//       {/* <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: currentLocation
//             ? currentLocation.latitude
//             : 21.008369539292758,
//           longitude: currentLocation
//             ? currentLocation.longitude
//             : 105.83232046703021,
//           latitudeDelta: 0.005,
//           longitudeDelta: 0.005,
//         }}
//         showsUserLocation={false}
//         zoomEnabled={true}
//       >
//         {currentLocation && (
//           <Marker
//             coordinate={currentLocation}
//             pinColor="blue"
//             title="Vị trí của bạn"
//           />
//         )}
//         {nearbyMarkers.map((marker) => {
//           const icon =
//             marker.status === "0"
//               ? require("../assets/safe.png") // Hình ảnh cho an toàn
//               : require("../assets/danger.png"); // Hình ảnh cho cháy

//           return (
//             <Marker
//               key={marker.id}
//               coordinate={{
//                 latitude: marker.latitude,
//                 longitude: marker.longitude,
//               }}
//               image={icon}
//               title={marker.address}
//             />
//           );
//         })}
//       </MapView> */}
//       <Button
//         title="Rung & Đọc"
//         onPress={() => {
//           handleVibrate();
//           showNotification();
//         }}
//       />
//       <View className="h-10">
//         <Button title="Show Notification" onPress={showNotification} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     width: "100%",
//     height: "100%",
//   },
// });


import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Send Hello World Notification"
        onPress={async () => {
          await sendHelloWorldNotification();
        }}
      />
    </View>
  );
}

async function sendHelloWorldNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hello World",
      body: 'This is a notification saying Hello World!',
    },
    trigger: null, // Gửi ngay lập tức
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

