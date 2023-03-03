import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  console.log("navigation", navigation);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../images/PhotoBG.jpg")}
        >
          <View style={{ ...styles.container, marginTop: "40%" }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.authContainer}>
                <View style={styles.imgContainer}></View>
                <Text style={styles.header}>Register</Text>
                <View
                  style={{
                    ...styles.form,
                    paddingBottom: isShowKeyboard ? 43 : 100,
                  }}
                >
                  <View>
                    <TextInput
                      style={styles.input}
                      onFocus={() => setIsShowKeyboard(true)}
                      placeholder="Login"
                      value={state.login}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          login: value,
                        }))
                      }
                    />
                  </View>
                  <View style={{ marginTop: 16 }}>
                    <TextInput
                      style={styles.input}
                      onFocus={() => setIsShowKeyboard(true)}
                      placeholder="Email"
                      value={state.email}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          email: value,
                        }))
                      }
                    />
                  </View>
                  <View style={{ marginTop: 16 }}>
                    <TextInput
                      style={styles.input}
                      textAlign={"left"}
                      secureTextEntry={showPassword}
                      onFocus={() => setIsShowKeyboard(true)}
                      placeholder="Password"
                      value={state.password}
                      onChangeText={(value) =>
                        setState((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
                      }
                    />
                    <TouchableOpacity
                      onPressIn={() => setShowPassword(false)}
                      onPressOut={() => setShowPassword(true)}
                    >
                      <Text style={styles.btnShowPassword}>Show</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.button}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonTitle}>Sign up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.text}>
                      Are you a member?{"  "}
                      <Text style={{ color: "#0000cd" }}>Sign in</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },

  authContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 16,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  form: {
    marginHorizontal: 16,
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
  button: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btnShowPassword: {
    position: "absolute",
    right: 16,
    top: -34,
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  text: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 16,
  },
});
