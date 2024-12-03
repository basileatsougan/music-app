import { View, Text, Image } from "react-native";
import React from "react";

const ArtisCard = ({ item }) => {
  return (
    <View style={{ margin: 10 }}>
      <Image
        source={{ uri: item.imageUrl }}
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
        {item.author}
      </Text>
    </View>
  );
};

export default ArtisCard;
