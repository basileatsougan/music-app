import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecentlyPlayedCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Info", { item: item })} // pass also the data (item) of each song
      style={{ margin: 10 }}
    >
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
