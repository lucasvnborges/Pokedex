import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainTabs } from "./tab.navigation";
import { PokemonListScreen } from "../screens";

const Stack = createNativeStackNavigator();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tabs"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Tabs"
          component={MainTabs}
          options={{ animation: "none" }}
        />
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
