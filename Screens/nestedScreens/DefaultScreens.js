import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  
} from "react-native";
import { useSelector } from "react-redux";

import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../firebase/config";

import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);
  console.log("route.params", route.params);

  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
              marginHorizontal: 16,
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>

            <View style={styles.details}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Comments", { postId: item.id })
                }
              >
                <EvilIcons name="comment" size={24} ccolor="#BDBDBD" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Map", { location: item.location })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },
  comment: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default DefaultScreenPosts;
