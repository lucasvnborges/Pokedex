import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { TouchableRipple, Text, useTheme } from "react-native-paper";
import { Loader } from "../components";
import { getPokemonTypes } from "../api";

const { width } = Dimensions.get("window");

export default function Home() {
  // hooks
  const theme = useTheme();
  const navigation = useNavigation();
  // state
  const [isLoading, setLoading] = useState(true);
  const [pokemonTypes, setPokemonTypes] = useState([]);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      const response = await getPokemonTypes();

      setPokemonTypes(response);
      setLoading(false);
    };

    fetchPokemonTypes();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableRipple
      borderless
      rippleColor="#00000010"
      onPress={() => navigation.navigate("PokemonList", { item })}
      style={[
        styles.listItem,
        { backgroundColor: theme.colors.elevation.level2 },
      ]}
    >
      <Text variant="labelLarge">{item.name}</Text>
    </TouchableRipple>
  );

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        data={pokemonTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {isLoading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  list: {
    paddingVertical: 24,
    paddingHorizontal: 2,
  },
  listItem: {
    flex: 1,
    margin: 4,
    borderRadius: 16,
    height: width / 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
