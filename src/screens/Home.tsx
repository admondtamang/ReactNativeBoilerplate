import Axios from "axios";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  View,
  SafeAreaView,
} from "react-native";
import { DataTable } from "react-native-paper";
import { QueryCache, useQuery, setConsole } from "react-query";
import ItemTitle from "../components/ItemTitle";

export default function Home() {
  const queryCache = new QueryCache();
  const { isLoading, error, data } = useQuery("shareData", () =>
    Axios.get("http://nepstockapi.herokuapp.com/")
  );

  setConsole({
    log: console.log,
    warn: console.warn,
    error: console.warn,
  });

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView>
      <ScrollView>
        <ItemTitle name="Share Market" />
        <View style={styles.container}>
          <Text>Today Share</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title numeric>S.N</DataTable.Title>
              <DataTable.Title sortDirection="ascending">
                Symbol
              </DataTable.Title>
              <DataTable.Title numeric>High</DataTable.Title>
              <DataTable.Title numeric>Low</DataTable.Title>
              <DataTable.Title numeric>Close</DataTable.Title>
              <DataTable.Title numeric>Change</DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={data?.data}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell numeric>{item["S.No"]}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.Symbol}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.High}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.Low}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.Close}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.Change}</DataTable.Cell>
                </DataTable.Row>
              )}
            />
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
});
