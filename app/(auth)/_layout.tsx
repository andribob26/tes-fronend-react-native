import { Stack } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ headerShown: false, animation: "fade" }}
      />
    </Stack>
  );
};

export default Layout;
