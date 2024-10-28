import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "../StackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "../screens/LoginScreen";

export default function App() {
  return (
    <>
      <SafeAreaView style={styles.container}>
      
      <LoginScreen />
      
      </SafeAreaView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
});
