import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import { data } from "../constants/data";
import ArtisCard from "../components/ArtistCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";

const HomeScreen = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState(data.recent);

  const [topArtist, setTopArtist] = useState(data.adoration);

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginVertical: 8,
          backgroundColor: "#282828",
          borderRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 55, height: 55 }}
        />
        <View
          style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
        >
          <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  console.log("New recentlyPlayed played : ", recentlyPlayed);

  const navigation = useNavigation();
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/basilerond.png")}
              resizeMode="contain"
              style={{ width: 60, height: 60 }}
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
              }}
            >
              Hello
            </Text>
          </View>
          <MaterialCommunityIcons
            name="lightning-bolt"
            size={24}
            color="white"
          />
        </View>

        <View style={{ marginHorizontal: 12, flexDirection: "row", gap: 10 }}>
          <Pressable
            style={{
              backgroundColor: "#282828",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#913691",
              padding: 10,
              borderRadius: 30,
            }}
          >
            <Text style={{ fontSize: 15, color: "white" }}>
              Podcasts & Shows
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 10 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <LinearGradient colors={["#33006F", "#FFFFFF"]}>
              <Pressable
                onPress={() => navigation.navigate("Liked")}
                style={{
                  width: 55,
                  height: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
              Liked Songs
            </Text>
          </Pressable>

          <View
            style={{
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 8,
              backgroundColor: "#202020",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={{ width: 55, height: 55 }}
            />
            <View>
              <Text
                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
              >
                Hiphop Tamhiza
              </Text>
            </View>
          </View>
        </View>

        {/* for top recently played */}
        <FlatList
          data={recentlyPlayed}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          // nestedScrollEnabled={true}
        />
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Your Top Artist
        </Text>

        {/* Your Top Artist */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topArtist.map((item, index) => (
            <ArtisCard item={item} key={index} />
          ))}
        </ScrollView>

        {/* Final Recently played */}
        <View style={{ height: 10 }} />
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          Recently Played
        </Text>
        <FlatList
          data={recentlyPlayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <RecentlyPlayedCard item={item} key={index} />
          )}
        />

        <View style={{ height: 20 }} />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
