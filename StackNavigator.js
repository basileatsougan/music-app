import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";

import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import LikedSongScreen from "./screens/LikedSongScreen";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
          /*rgba(0, 0, 0, 0.5)
        bottom: 0,
        left: 0,
        right: 0,
        shadowOpacity: 4,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: -4,
        },
        borderTopWidth: 0 */
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          headerShown: false,
          tabBarLabelStyle: { color: "white" },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="person" size={24} color="white" />
            ) : (
              <Ionicons name="person-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();
function Navigation() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Liked"
        component={LikedSongScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
