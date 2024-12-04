import { View, Text, ScrollView, Image, Pressable } from "react-native";
import React, { useState } from "react";

import { useRoute, useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";

import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const SongInfoScreen = () => {
  const route = useRoute();
  //   const albumUrl = route?.params?.item?.track?.album?.uri;
  //   const albumId = albumUrl.split(":")[2];
  // console.log(albumId);

  const navigation = useNavigation();
  const [track, setTrack] = useState([]);
  console.log("song details route", route);
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 15 }}>
        <View style={{ flexDirection: "row", padding: 12 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              source={{ uri: route?.params.item.imageUrl }}
              style={{ width: 200, height: 200 }}
            />
          </View>
        </View>
        <Text
          style={{
            color: "white",
            marginHorizontal: 12,
            marginTop: 10,
            fontSize: 22,
            fontWeight: "bold",
          }}
        >
          {route?.params.item.title}
        </Text>
        <View style={{ marginHorizontal: 12 }}>
          <Text style={{ color: "#909090", fontSize: 13, fontWeight: "bold" }}>
            {route?.params.item.author}
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
              onPress={() => playTrack(data.gospel)}
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
        <View></View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SongInfoScreen;
