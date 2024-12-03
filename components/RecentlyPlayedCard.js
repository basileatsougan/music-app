import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const RecentlyPlayedCard = ({ item }) => {
  return (
    <Pressable style={{ margin: 10 }}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{ width: 130, height: 130, borderRadius: 5 }}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: "500",
          color: "white",
          marginTop: 10,
        }}
      >
        {item.title}
      </Text>
    </Pressable>
  );
};

export default RecentlyPlayedCard;
