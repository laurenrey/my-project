import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, onSnapshot } from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const postId = route.params.postId;

  const { login } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  const createPost = async () => {
    await addDoc(collection(doc(collection(db, "posts"), postId), "comments"), {
      comment,
      login,
    });
    setComment("");
  };

  const getAllPosts = async () => {
    onSnapshot(
      collection(doc(collection(db, "posts"), postId), "comments"),
      (data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.login}</Text>
              <Text>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.form,

              marginBottom: isShowKeyboard ? 0 : 16,
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="Type comment..."
              onChangeText={setComment}
              onFocus={() => setIsShowKeyboard(true)}
            />

            <TouchableOpacity style={styles.sendBtn} onPress={createPost}>
              <AntDesign name="arrowup" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  commentContainer: {
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 24,
    marginHorizontal: 16,
    borderRadius: 6,
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },

  form: {
    marginHorizontal: 16,
  },

  input: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,

    height: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    paddingLeft: 16,
  },
  icon: {
    position: "absolute",
    top: 80,
    left: -5,
  },
  sendBtn: {
    height: 34,
    width: 34,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#FF6C00",
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",
    top: 7,
    left: 310,
    position: "absolute",
  },
});

export default CommentsScreen;
