import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Dimensions, FlatList, Image } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";
import { Loader } from "../components";
import { getPokemonsByType, getAllPokemonsDetails } from "../api";

const { width } = Dimensions.get("window");

export default function PokemonList() {
  // hooks
  const theme = useTheme();
  const params = useRoute().params;
  const navigation = useNavigation();
  // state
  const [isLoading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonsWithDetails, setPokemonsWithDetails] = useState([]);

  useEffect(() => {
    const fetchPokemonsByType = async () => {
      const response = await getPokemonsByType(params.item.name);

      setPokemons(response);
    };

    fetchPokemonsByType();
  }, [params.item.name]);

  useEffect(() => {
    if (pokemons.length > 0) {
      const fetchAllPokemonDetails = async () => {
        const response = await getAllPokemonsDetails(pokemons);

        setPokemonsWithDetails(response);
        setLoading(false);
      };

      fetchAllPokemonDetails();
    }
  }, [pokemons]);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.listItem,
        { backgroundColor: theme.colors.elevation.level2 },
      ]}
    >
      <Image
        style={styles.image}
        source={{ uri: item.sprites.front_default }}
      />
      <Text style={styles.listItemText} variant="labelLarge">
        {item.id} - {item.name}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small" statusBarHeight={0} style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <FlatList
        numColumns={2}
        renderItem={renderItem}
        data={pokemonsWithDetails}
        keyExtractor={(item) => item.id}
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
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
  },
  list: {
    padding: 16,
  },
  listItem: {
    flex: 1,
    margin: 4,
    borderRadius: 16,
    height: width / 2.5,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemText: {
    textAlign: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "cover",
  },
  indicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
