import { View, Text, Pressable, Image } from "react-native";
import React from "react";

import { AntDesign, Entypo } from "@expo/vector-icons";

import { data } from "../constants/data";
const SongItem = ({ item }) => {
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
    >
      <Image
        style={{ width: 50, height: 60, marginRight: 10 }}
        source={item.imageUrl}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={{ fontWeight: "bold", fontSize: 14, color: "white" }}
        >
          {item.title}
        </Text>
        <Text style={{ marginTop: 4, color: "#989898" }}>{item.author}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 7,
          marginHorizontal: 10,
        }}
      >
        <AntDesign name="heart" size={24} color="#1DB954" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

export default SongItem;
