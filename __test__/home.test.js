import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { render, waitFor } from "@testing-library/react-native";
import { getPokemonTypes } from "../src/api";
import { HomeScreen } from "../src/screens";

jest.mock("../src/api", () => ({
  getPokemonTypes: jest.fn(),
}));

jest.mock("react-native-webview", () => "WebView");

describe("Home Screen", () => {
  it("renders list of Pokemon types", async () => {
    const mockTypes = [
      { name: "fire", url: "https://pokeapi.co/api/v2/type/1/" },
      { name: "water", url: "https://pokeapi.co/api/v2/type/2/" },
    ];

    getPokemonTypes.mockResolvedValueOnce(mockTypes);

    const { getByText } = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    );

    await waitFor(() => {
      mockTypes.forEach((type) => {
        expect(getByText(type.name)).toBeTruthy();
      });
    });
  });
});
