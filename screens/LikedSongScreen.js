import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { data } from "../constants/data.js";
import { Player } from "../PlayerContext";

import SongItem from "../components/SongItem";

import { Audio } from "expo-av";
import { BottomModal, ModalContent } from "react-native-modals";
import { debounce } from "lodash";

const LikedSongScreen = () => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [savedTracks, setSavedTracks] = useState(data.gospel);
  const { currentTrack, setCurrentTrack } = useContext(Player);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [searchedTracks, setsearchedTracks] = useState([]);

  // the 03 values for the progression of the sound
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  //
  const [isPlaying, setIsPlaying] = useState(false);

  // initialize my reference to the song
  const value = useRef(0);

  // useEffect(() => {
  //   getSavedTracks(); // Load tracks on component mount
  // }, []);

  // console.log("My saved track is: ", savedTracks);

  // console.log(savedTracks);
  const playTrack = async () => {
    if (savedTracks.length > 0) {
      setCurrentTrack(savedTracks[0]); //  Play the first track as an example
    }
    await play(savedTracks[0]);
  };

  const play = async (nextTrack) => {
    console.log("Track url is : ", nextTrack);
    const preview_url = nextTrack.track;
    try {
      // stop curreny sound if it is playing
      if (currentSound) {
        await currentSound.stopAsync();
      }

      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true, // audio will still play in silent or no disturb mode
        staysActiveInBackground: false, // audio will stay active in bcgrd
        shouldDuckAndroid: false, // should not reduce (duck) volume when another app plays sound.
      });
      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: preview_url,
        },
        {
          shouldPlay: true, // Automatically starts playing the sound once it is loaded.
          isLooping: false, // sound should not repeat (loop) after it finishes playing.
        },
        onPlayBackStatusUpdate
      );
      // console.log("sound", status);
      onPlayBackStatusUpdate(status);
      setCurrentSound(sound);
      setIsPlaying(status.isLoaded);
      await sound.playAsync();
    } catch (error) {
      console.log("Error during play: ", error.message);
    }
  };

  const onPlayBackStatusUpdate = async (status) => {
    // console.log("Playback status : ", status);
    if (status.isLoaded && status.isPlaying) {
      // Update the current track
      const progress = status.positionMillis / status.durationMillis; // we need the percentage of the song that is played
      // console.log("progress", progress);
      setProgress(progress);
      setCurrentTime(status.positionMillis);
      setTotalDuration(status.durationMillis);
    }

    // Automatically play next sound if current finished
    if (status.didJustFinish) {
      setCurrentSound(null);
      playNextTrack();
    }
  };

  // console.log(currentTrack);
  // Fetch data for liked songs here

  const circleSize = 12;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
        setIsPlaying(false);
      } else {
        await currentSound.playAsync();
        setIsPlaying(true);
      }

      // setIsPlaying(!isPlaying);
    }
  };

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < savedTracks.length) {
      const nextTrack = savedTracks[value.current];
      setCurrentTrack(nextTrack);

      await play(nextTrack);
    } else {
      console.log("End of playlist");
    }
  };

  const playPrevTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current -= 1;
    if (value.current >= 0) {
      const prevTrack = savedTracks[value.current];
      setCurrentTrack(prevTrack);

      await play(prevTrack);
    } else {
      console.log("End of playlist");
    }
  };

  const debouncedSearch = debounce(handleSearch, 800);

  function handleSearch(search) {
    const filteredTracks = savedTracks.filter;
  }

  const handleInputChange = (text) => {
    setInput(text);
    debouncedSearch(text);
    // console.log("Debounced search", debouncedSearch);
  };

  return (
    <>
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
                onChangeText={(text) => handleInputChange(text)}
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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

          <FlatList
            data={data.gospel} // Pass the gospel array
            renderItem={({ item }) => (
              <SongItem
                item={item}
                onPress={play}
                isPlaying={item === currentTrack} // to check if there is any song playing
              />
            )}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}
          />
        </ScrollView>
      </LinearGradient>
      {currentTrack && (
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            flexDirection: "row",
            backgroundColor: "#5072A7",
            width: "90%",
            padding: 10,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 15,
            position: "absolute",
            borderRaduis: 6,
            left: 20,
            bottom: 10,
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              source={{ uri: currentTrack?.imageUrl }}
              style={{ width: 40, height: 40 }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontSize: 13,
                width: 220,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {currentTrack?.title} • {currentTrack?.author}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <AntDesign name="heart" size={24} color="#1DB954" />
            <Pressable>
              <AntDesign name="pausecircle" size={24} color="white" />
            </Pressable>
          </View>
        </Pressable>
      )}

      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeTreshold={200}
      >
        <ModalContent
          style={{ height: "100%", weight: "100%", backgroundColor: "#5072A7" }}
        >
          <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign
                onPress={() => setModalVisible(!modalVisible)}
                name="down"
                size={24}
                color="white"
              />
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                {currentTrack?.author}
              </Text>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>
            <View style={{ height: 40 }} />
            <View style={{ padding: 10 }}>
              <Image
                source={{ uri: currentTrack?.imageUrl }}
                style={{ width: "100%", height: 330, borderRadius: 4 }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                >
                  {currentTrack?.title}
                </Text>
                <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                  {currentTrack?.author}
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="#1DB954" />
            </View>

            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  width: "100%",
                  marginTop: 10,
                  height: 3,
                  backgroundColor: "gray",
                  borderRadius: 5,
                }}
              >
                <View
                  style={[styles.progressbar, { width: `${progress * 100}%` }]}
                />

                <View
                  style={[
                    {
                      position: "absolute",
                      top: -5,
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      backgroundColor: "white",
                    },
                    {
                      // Move circle from left to right
                      left: `${progress * 100}%`,
                      marginLeft: -circleSize / 2,
                    },
                  ]}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 12,
                }}
              >
                <Text style={{ color: "#D3D3D3", fontSize: 15 }}>
                  {formatTime(currentTime)}
                </Text>
                <Text style={{ color: "#D3D3D3", fontSize: 15 }}>
                  {formatTime(totalDuration)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 17,
                }}
              >
                <Pressable>
                  <FontAwesome name="arrows" size={30} color="#03C03C" />
                </Pressable>

                <Pressable onPress={playPrevTrack}>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>

                <Pressable onPress={handlePlayPause}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    // using pressable to have large button styled
                    <Pressable
                      onPress={handlePlayPause}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Entypo name="controller-play" size={24} color="black" />
                    </Pressable>
                  )}
                </Pressable>

                <Pressable onPress={playNextTrack}>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={30} color="#03C03C" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default LikedSongScreen;

const styles = StyleSheet.create({
  progressbar: {
    height: "100%",
    backgroundColor: "white",
  },
});
