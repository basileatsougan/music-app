import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

const HomeScreen = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
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
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={{ width: 55, height: 55 }}
      />
      <View style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}>
        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );

  const recentlyplayed = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Music Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Music Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Music Item",
    },
  ];
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView style={{ marginTop: 40 }}>
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
        <FlatList
          data={recentlyplayed}
          render={renderItem}
          // numColumns={2}
          // key={`numColumns-${2}`} // Use numColumns in the key to force re-render if it changes
          keyExtractor={(item) => item.id}
          // columnWrapperStyle={{ justifyContent: "space-between" }}
          nestedScrollEnabled={true}
          horizontal
        />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
