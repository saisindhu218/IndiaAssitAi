import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import LifeEventsScreen from "../screens/LifeEventsScreen";
import JourneyDetailScreen from "../screens/JourneyDetailScreen";
import RemindersScreen from "../screens/RemindersScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const ServicesStack = createNativeStackNavigator();
const JourneyStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: "IndiaAssist AI" }} />
      <HomeStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Service Details" }}
      />
    </HomeStack.Navigator>
  );
}

function ServicesStackScreen() {
  return (
    <ServicesStack.Navigator>
      <ServicesStack.Screen name="ServicesMain" component={ServicesScreen} options={{ title: "Services" }} />
      <ServicesStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Service Details" }}
      />
    </ServicesStack.Navigator>
  );
}

function JourneyStackScreen() {
  return (
    <JourneyStack.Navigator>
      <JourneyStack.Screen name="JourneyMain" component={LifeEventsScreen} options={{ title: "Life Events" }} />
      <JourneyStack.Screen
        name="JourneyDetail"
        component={JourneyDetailScreen}
        options={{ title: "Journey" }}
      />
      <JourneyStack.Screen
        name="ServiceDetail"
        component={ServiceDetailScreen}
        options={{ title: "Service Details" }}
      />
    </JourneyStack.Navigator>
  );
}

const ICONS = {
  Home: "🏠",
  Journey: "🧭",
  Services: "🏛",
  Reminders: "🔔",
  Profile: "👤",
};

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>{ICONS[route.name]}</Text>,
          tabBarActiveTintColor: "#0B5FFF",
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Journey" component={JourneyStackScreen} options={{ tabBarLabel: "Life Events" }} />
        <Tab.Screen name="Services" component={ServicesStackScreen} />
        <Tab.Screen name="Reminders" component={RemindersScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
