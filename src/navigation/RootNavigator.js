import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext";

import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import CategoryServicesScreen from "../screens/CategoryServicesScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import LifeEventsScreen from "../screens/LifeEventsScreen";
import JourneyDetailScreen from "../screens/JourneyDetailScreen";
import RemindersScreen from "../screens/RemindersScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const ServicesStack = createNativeStackNavigator();
const JourneyStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const ICONS = {
  Home: { active: "home", inactive: "home-outline" },
  Journey: { active: "chatbubbles", inactive: "chatbubbles-outline" },
  Services: { active: "business", inactive: "business-outline" },
  Reminders: { active: "notifications", inactive: "notifications-outline" },
  Profile: { active: "person-circle", inactive: "person-circle-outline" },
};

function stackHeaderOptions(colors) {
  return {
    headerStyle: { backgroundColor: colors.bgElevated },
    headerTintColor: colors.text,
    headerTitleStyle: { color: colors.text, fontWeight: "700" },
    headerShadowVisible: false,
  };
}

function HomeStackScreen() {
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator screenOptions={stackHeaderOptions(colors)}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: "IndiaAssist AI" }} />
      <HomeStack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: "Service Details" }} />
    </HomeStack.Navigator>
  );
}

function ServicesStackScreen() {
  const { colors } = useTheme();
  return (
    <ServicesStack.Navigator screenOptions={stackHeaderOptions(colors)}>
      <ServicesStack.Screen name="ServicesMain" component={ServicesScreen} options={{ title: "Services" }} />
      <ServicesStack.Screen
        name="CategoryServices"
        component={CategoryServicesScreen}
        options={({ route }) => ({ title: route.params.category })}
      />
      <ServicesStack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: "Service Details" }} />
    </ServicesStack.Navigator>
  );
}

function JourneyStackScreen() {
  const { colors } = useTheme();
  return (
    <JourneyStack.Navigator screenOptions={stackHeaderOptions(colors)}>
      <JourneyStack.Screen name="JourneyMain" component={LifeEventsScreen} options={{ title: "Life Events" }} />
      <JourneyStack.Screen name="JourneyDetail" component={JourneyDetailScreen} options={{ title: "Journey" }} />
      <JourneyStack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: "Service Details" }} />
    </JourneyStack.Navigator>
  );
}

export default function RootNavigator() {
  const { colors, mode } = useTheme();

  const navTheme = {
    ...(mode === "dark" ? DarkTheme : DefaultTheme),
    colors: {
      ...(mode === "dark" ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      card: colors.bgElevated,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? ICONS[route.name].active : ICONS[route.name].inactive} size={22} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.bgElevated,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
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
