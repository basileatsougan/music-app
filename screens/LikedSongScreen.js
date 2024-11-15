import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";

import { data } from "../constants/data";
import SongItem from "../components/SongItem";

const LikedSongScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  // Fetch data for liked songs here
  return (
    <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginTop: 40 }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ marginHorizontal: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <Pressable
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            gap: 10,
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#42275a",
              padding: 10,
              borderRadius: 3,
              height: 40,
              flex: 1,
            }}
          >
            <AntDesign name="search1" size={24} color="white" />
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              placeholder="Find in liked songs"
              placeholderTextColor={"white"}
              style={{ fontWeight: "600" }}
            />
          </Pressable>

          <Pressable
            style={{
              marginHorizontal: 10,
              backgroundColor: "#42275a",
              padding: 10,
              borderRadius: 3,
              height: 40,
            }}
          >
            <Text style={{ color: "white" }}>Sort</Text>
          </Pressable>
        </Pressable>

        <View style={{ height: 50 }} />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Liked Songs
          </Text>
          <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
            430 Songs
          </Text>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 10,
          }}
        >
          <Pressable
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#1DB954",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AntDesign name="arrowdown" size={24} color="white" />
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialCommunityIcons
              name="cross-bolnisi"
              size={24}
              color="#1DB954"
            />

            <Pressable
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: "#1DB954",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>

        <FlatList
          data={data.gospel}
          renderItem={({ item }) => <SongItem item={item} />}
          nestedScrollEnabled={true}
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default LikedSongScreen;
