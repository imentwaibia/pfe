import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Landing = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.0.103:5000/api/jardin/`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingJardin);
    };
    sendRequest();
  }, []);

  const [list, setList] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const response = await fetch(`http://192.168.0.103:5000/api/jardin`);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }

      setList(responseData.existingJardin);
    };
    sendRequest();
  }, []);
  return (
    <View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list &&
          list.map((row) => (
            <View style={styles.mealItem}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate({
                    routeName: "JardinDetail",
                    params: {
                      id: row._id,
                    },
                  });
                }}
              >
                <View>
                  <View style={{ ...styles.MealRow, ...styles.mealHeader }}>
                    <ImageBackground
                      source={{ uri: `http://192.168.0.103:5000/${row.logo}` }}
                      style={styles.bgImage}
                    >
                      <Text style={styles.title}>{props.title}</Text>
                    </ImageBackground>
                  </View>
                  <View style={{ ...styles.MealRow, ...styles.mealDetail }}>
                    <Text>{row.nom}</Text>
                    <Text>{row.adresse}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

Landing.navigationOptions = (navData) => {
  return {
    headerTitle: "Acceuil",
  };
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    overflow: "hidden",
  },
  MealRow: {
    flexDirection: "row",
  },
  mealHeader: {
    height: "85%",
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    height: "15%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 20,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    textAlign: "center",
  },
});

export default Landing;
