import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as Location from "expo-location";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { v4 as uuidv4 } from "uuid";

const CreatePostScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");

        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    console.log("comment", comment);
    const photo = await camera.takePictureAsync();
    console.log("location", location);

    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  const sendPhoto = () => {
    uploadPostToServer();
    console.log("navigation", navigation);
    navigation.navigate("DefaultScreen");
    setPhoto(null);
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

    const docRef = await addDoc(collection(db, "posts"), {
      photo,
      comment,
      location: location.coords,
      userId,
      login,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = uuidv4();

    const storageReference = ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageReference, file);
    console.log("storageReference", storageReference);

    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${uniquePostId}`)
    );

    return processedPhoto;
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("status", status);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        )}
        <TouchableOpacity style={styles.snapContainer} onPress={takePhoto}>
          <FontAwesome5 name="camera" size={24} color="#ffff" />
        </TouchableOpacity>
      </Camera>
      <Text style={styles.text}>Upload photo</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Title..."
          onChangeText={setComment}
        />

        <EvilIcons
          style={styles.icon}
          name="location"
          size={24}
          color="#BDBDBD"
        />
        <TextInput
          style={{ ...styles.input, marginTop: 16, marginLeft: 24 }}
          placeholder="Location"
        />
      </View>
      <View>
        <TouchableOpacity style={styles.sendBtn} onPress={sendPhoto}>
          <Text style={styles.sendLabel}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  camera: {
    marginTop: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 240,
  },

  snapContainer: {
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#FFFFFF4C",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },

  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    marginBottom: 32,
  },

  input: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,

    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },

  icon: {
    position: "absolute",
    top: 80,
    left: -5,
  },
  sendBtn: {
    color: "red",
    height: 51,
    borderWidth: 1,
    borderColor: "#FF6C00",
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  sendLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
  },
});

export default CreatePostScreen;
