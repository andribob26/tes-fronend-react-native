import { logOut } from "@/redux/features/auth.slice";
import { AppDispatch } from "@/redux/store/store";
import { FontAwesome } from "@expo/vector-icons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";

export default function TabsLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logOut());
    router.replace("/login")
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#239b56",
        tabBarStyle: { backgroundColor: "#28b463" },
      }}
      initialRouteName="home"
      tabBar={(props) => <BottomTabBar {...props} style={{ height: 64 }} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          href: "/home",
          title: "",
          headerTitle: "Tes Frontend",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: "#ffffff",
                padding: 10,
                borderRadius: 100,
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <MaterialIcons name="logout" size={24} color={"#566573"} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <TabBarIcon name="home" color={color} size={24} />
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  opacity: 0.5,
                  fontWeight: "bold",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="bookmark"
        options={{
          href: "/bookmark",
          title: "",
          headerTitle: "Tes Frontend",
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                backgroundColor: "#ffffff",
                padding: 10,
                borderRadius: 100,
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <MaterialIcons name="logout" size={24} color={"#566573"} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 17,
                backgroundColor: "transparent",
              }}
            >
              <TabBarIcon name="bookmark" color={color} size={24} />
              <Text
                style={{
                  color: color,
                  fontSize: 12,
                  opacity: 0.5,
                  fontWeight: "bold",
                }}
              >
                Bookmark
              </Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size?: number;
}) {
  return <MaterialIcons {...props} />;
}
