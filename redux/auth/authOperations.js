import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { authSlice, authSignOut } from "./authReducer";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: login,
      });

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const userUpdateProfile = {
            login: user.displayName,
            userId: user.uid,
          };

          dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
          dispatch(authSlice.actions.authStateChange({ stateChange: true }));
        }
      });
    });
  } catch (error) {
    console.log("error:", error);
    console.log("error.code:", error.code);
    console.log("error.message:", error.message);
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  auth.signOut();

  dispatch(authSlice.actions.authSignOut());
};
