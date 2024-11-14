import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("expiration date", expirationDate);

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parse(expirationDate)) {
          // here the token is still valid
          navigation.replace("Main");
        } else {
          // here the token is expired, we need to re-authenticate
          //navigation.navigate("Login");
          AsyncStorage.removeItem("token");
          AsyncStorage.removeItem("expirationDate");
        }
      }
    };
    checkTokenValidity();
  }, []);

  async function authenticate() {
    console.log("Authenticate function called");
    const redirectUrl = AuthSession.makeRedirectUri();
    console.log("redirect url is : ", redirectUrl);

    const config = {
      issuer: "https://accounts.spotify.com",
      clientId: "9eab54f3a2cb4cfcb645855fd043ca51",
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ],
      redirectUrl: "exp://localhost:19002/--/spotify-auth-callback",
    };
    const result = await AuthSession.authAsync(config);
    console.log("Auth result", result);

    if (result.accessToken) {
      // Assuming result.expiresIn is the number of seconds until expiration
      const expirationDate = new Date(
        Date.now() + result.expiresIn * 1000
      ).getTime();
      await AsyncStorage.setItem("token", result.accessToken);
      await AsyncStorage.setItem("expirationDate", expirationDate.toString());
      navigation.navigate("Main");
    } else {
      console.error("No access token received");
    }
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={{ height: 80 }} />
        <Entypo
          style={{ textAlign: "center" }}
          name="spotify"
          size={80}
          color="white"
        />
        <Text
          style={{
            color: "white",
            fontSize: 40,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 40,
          }}
        >
          Millions of Songs Free on spotify!
        </Text>

        <View style={{ height: 80 }} />

        {/* Sign In with spotify */}
        <Pressable
          onPress={() => authenticate()}
          style={{
            backgroundColor: "#1DB954",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text>Sign In with spotify</Text>
        </Pressable>

        {/* Continue with phone number */}
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            justifyContent: "space-evenly",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
            flexDirection: "row",
          }}
        >
          <MaterialIcons name="phone-android" size={24} color="white" />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
          >
            Continue with phone number
          </Text>
        </Pressable>

        {/* Continue with Google */}
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            justifyContent: "space-evenly",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
            flexDirection: "row",
          }}
        >
          <AntDesign name="google" size={24} color="red" />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
          >
            Continue with Google
          </Text>
        </Pressable>

        {/* Sign In with facebook */}
        <Pressable
          style={{
            backgroundColor: "#131624",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            width: 300,
            borderRadius: 25,
            justifyContent: "space-evenly",
            alignItems: "center",
            marginVertical: 10,
            borderColor: "#C0C0C0",
            borderWidth: 0.8,
            flexDirection: "row",
          }}
        >
          <Entypo name="facebook-with-circle" size={24} color="blue" />
          <Text
            style={{
              fontWeight: "500",
              color: "white",
              textAlign: "center",
            }}
          >
            Sign In with facebook
          </Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

// exp://localhost:19002/--/spotify-auth-callback
// com.spotify://expo-development-client/?url=http%3A%2F%2F192.168.1.101%3A8081

// Console Warning

// Possible unhandled promise rejection (id: 0):
// TypeError: AuthSession.authAsync is not a function (it is undefined)
