import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import { Card, CardItem, Body } from "native-base";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const JardinDetail = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const id = props.navigation.getParam("id");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    const sendRequest = async () => {
      const response = await fetch(
        `http://192.168.0.104:5000/api/jardin/${id}`
      );

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
      const response = await fetch(
        `http://192.168.0.104:5000/api/jardin/${id}`
      );

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
        {list && (
          <View>
            <Image
              source={{ uri: `http://192.168.43.2:5000/${list.logo}` }}
              style={styles.image}
            />
            <View style={styles.details}>
              <Text>{list.nom}</Text>
              <Text>{list.adresse}</Text>
              <Text>{list.tel}</Text>
            </View>
            <Card>
              <CardItem header>
                <Text>{list.email}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{list.description}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <View style={styles.details}></View>
              </CardItem>
            </Card>
            
          </View>
        )}
      </ScrollView>
    </View>
  );
};

JardinDetail.navigationOptions = {
  headerTitle: "Detail",
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default JardinDetail;
