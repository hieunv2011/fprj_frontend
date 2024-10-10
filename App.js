import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { CartProvider, CartContext } from "./context/CartContext";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Map from "./components/Map";
import Settings from "./components/Settings";
import Table from "./components/Table";
import Mqtt from "./components/Mqtt";

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { cartItems } = React.useContext(CartContext);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if (route.name === "Mqtt") {
            iconName = focused ? "cafe" : "cafe-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: { backgroundColor: "#a11611" },
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: '#a11611',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontFamily: 'tahoma',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: "Trang chủ",
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          headerTitle: "Bản đồ",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Cài đặt",
        }}
      />
      <Tab.Screen
        name="Mqtt"
        component={Mqtt}
        options={{
          headerTitle: "Mqtt",
        }}
      />
    </Tab.Navigator>
  );
};

// Tạo Stack Navigator
const Stack = createStackNavigator();
const queryClient = new QueryClient();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "PlayfairDisplay-SemiBold": require("./assets/fonts/PlayfairDisplay-SemiBold.ttf"),
    "tahoma": require("./assets/fonts/tahoma.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Main" component={TabNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
