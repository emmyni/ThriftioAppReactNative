import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Icon } from "native-base";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import firebase from "firebase";

import {
  iosClientId,
  androidClientId,
  facebookAppId,
} from "../../firebaseConfig";

const LoginExternal = ({ navigation }) => {
  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  const onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );
        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .set({
                  email: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now(),
                })
                .then(function (snapshot) {});
            } else {
              firebase
                .database()
                .ref("/users/" + result.user.uid)
                .update({ last_logged_in: Date.now() });
            }
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
          });
      } else {
        navigation.navigate("ProfileScreen");
      }
    });
  };

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: iosClientId,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  const loginWithFacebook = async () => {
    await Facebook.initializeAsync(facebookAppId);

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      facebookAppId,
      {
        permissions: ["public_profile"],
      }
    );

    if (type === "success") {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error) => {
          console.log(error);
        });
    }
  };

  logIn = async () => {
    try {
      await Facebook.initializeAsync(facebookAppId);
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log(await response.json());
        alert("Logged in!", `Hi ${(await response.json()).name}!`);

        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        console.log(credential);

        firebase
          .auth()
          .signInWithCredential(credential)
          .catch((error) => {
            console.log(error);
          });
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      console.log(error);
      // alert(`Facebook Login Error: ${message}`);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Button block danger rounded onPress={() => signInWithGoogleAsync()}>
        <Icon active name="logo-googleplus" />
        <Text>Google</Text>
      </Button>
      <Button block rounded onPress={() => loginWithFacebook()}>
        <Icon active name="logo-facebook" />
        <Text>Facebook</Text>
      </Button>
    </View>
  );
};
export default LoginExternal;

const styles = StyleSheet.create({});
