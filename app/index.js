import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "../StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlayerContext } from "../PlayerContext";

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <PlayerContext>
          <Navigation />
        </PlayerContext>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
});
