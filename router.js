import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";

import PostScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

//icons
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarItemStyle: { borderRadius: 20 },
        tabBarStyle: {
          paddingHorizontal: 82,
          paddingTop: 9,
          paddingBottom: 34,
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="appstore-o"
              size={24}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              onPress={() => navigation.navigate("Login")}
            >
              <Ionicons name="exit-outline" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />

      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostScreen}
        options={{
          //   headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="plus"
              size={24}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#FFFFFF" : "#212121"}
            />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};
