import { ColorSchemeName } from "react-native";

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import PlannerScreen from "../screens/Planner";
import WorkoutDetailScreen from "../screens/WorkoutDetail";

import { FontAwesome, Entypo } from "@expo/vector-icons";

type SchemaProps = {
  colorScheme: ColorSchemeName;
}

export function Navigation({
  colorScheme,
}: SchemaProps) {
  return (
    <NavigationContainer
      theme={colorScheme === "light" ? DefaultTheme : DarkTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Root"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{
          title: "Workout Info",
        }}
      />
    </stack.Navigator>
  );
}

function BottomNavigator() {
  return (
    <bottomTab.Navigator initialRouteName="Home">
      <bottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      // options={{
      //   unmountOnBlur: true,
      // }}
      />
      <bottomTab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="add-to-list" size={size} color={color} />
          ),
        }}
      />
    </bottomTab.Navigator>
  );
}
