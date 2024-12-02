import { View, Text, Pressable, Image } from "react-native";
import React, { useContext } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

import { data } from "../constants/data.js";
import { Player } from "../PlayerContext.js";

const SongItem = ({ item, onPress, isPlaying }) => {
  const { currentTrack, setCurrentTrack } = useContext(Player);

  const handlePress = () => {
    setCurrentTrack(item);
    onPress(item);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
    >
      <Image
        style={{ width: 50, height: 60, marginRight: 10 }}
        source={{ uri: item.imageUrl }}
      />
      <View style={{ flex: 1 }}>
        <Text
          numberOfLines={1}
          style={
            isPlaying
              ? {
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#3FFF00", // make color green if song is playing
                }
              : {
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "white",
                }
          }
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
