import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
} from "react-query";
import Route from "./src/routes/TabNavigator";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

const queryCache = new QueryCache();
export default function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <PaperProvider theme={theme}>
        <Route />
      </PaperProvider>
    </ReactQueryCacheProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
