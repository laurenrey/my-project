import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

import { db } from "../../firebase/config";

import { collection, where, onSnapshot, query } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);
  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), where("userId", "==", userId)),
      (snapshot) => {
        const userPosts = [];
        snapshot.forEach((doc) => {
          userPosts.push({ ...doc.data(), id: doc.id });
        });
        setUserPosts(userPosts);
      }
    );
  }, []);

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBg}
        source={require("../../images/PhotoBG.jpg")}
      >
        <View style={styles.containerProfile}>
          <View style={styles.imgContainer}></View>

          <SafeAreaView>
            <TouchableOpacity
              style={styles.logoutBtnContainer}
              onPress={signOut}
            >
              <Feather
                style={styles.logoutBtn}
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>

            <Text style={styles.header}>{login}</Text>

            <FlatList
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={{
                    marginBottom: 32,
                    justifyContent: "space-between",
                    marginHorizontal: 16,
                  }}
                >
                  <Image source={{ uri: item.photo }} style={styles.image} />
                  <Text style={styles.commentText}>{item.comment}</Text>
                  <View style={styles.details}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Comments", { postId: item.id })
                      }
                    >
                      <EvilIcons name="comment" size={24} color="#FF6C00" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Feather name="thumbs-up" size={24} color="#FF6C00" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Map", { location: item.location })
                      }
                      title={item.title}
                    >
                      <Feather name="map-pin" size={24} color="#BDBDBD" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  containerProfile: {
    marginTop: "50%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },

  imgContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    position: "absolute",
    top: -60,
    left: 135,
  },

  header: {
    color: "#212121",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: "center",
    marginTop: 92,
    marginBottom: 33,
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },

  commentText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginTop: 8,
  },
  logoutBtnContainer: {
    position: "absolute",
    top: 22,
    left: 335,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});

export default ProfileScreen;
