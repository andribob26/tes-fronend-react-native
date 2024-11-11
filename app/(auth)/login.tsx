import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { LoginCredentials, LoginResponse } from "@/redux/apis/auth.api";
import { useLoginMutation } from "@/redux/apis/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store/store";
import { setCredentials } from "@/redux/features/auth.slice";

const LoginScreen = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [login, { isLoading, error }] = useLoginMutation();

  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [visibleErr, setVisibleErr] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleOnchange = (field: keyof LoginCredentials, value: string) => {
    setLoginCredentials((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    setVisibleErr(false);
    try {
      const response: LoginResponse = await login(loginCredentials).unwrap();
      dispatch(setCredentials({ data: response }));
      router.replace("/home");
    } catch (err) {
      setVisibleErr(true);
    }
  };
  const handleVisibilityPass = () => {
    setVisiblePass(!visiblePass);
  };

  useEffect(() => {
    if (visibleErr) {
      setTimeout(() => {
        setVisibleErr(false);
      }, 3000);
    }
  }, [visibleErr]);

  useEffect(()=>{
    console.log(error);
  },[error])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Snackbar
        wrapperStyle={{ top: 50 }}
        style={{ backgroundColor: "#e74c3c" }}
        visible={visibleErr}
        onDismiss={() => {}}
      >
        {error && error.toString()}
      </Snackbar>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 32,
            marginBottom: 30,
            fontWeight: "bold",
          }}
        >
          Login
        </Text>

        <View
          style={{
            padding: 30,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={loginCredentials.username.toString()}
            onChangeText={(value) => {
              handleOnchange("username", value);
            }}
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!visiblePass}
              value={loginCredentials.password.toString()}
              onChangeText={(value) => {
                handleOnchange("password", value);
              }}
            />
            <TouchableOpacity
              onPress={handleVisibilityPass}
              style={{
                backgroundColor: "#ffffff",
                padding: 5,
                borderRadius: 100,
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <MaterialIcons name="visibility" size={24} color={"#566573"} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            activeOpacity={0.5}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#28b463",
              height: 52,
              borderRadius: 20,
              elevation: 4,
            }}
          >
            {isLoading ? (
              <ActivityIndicator size={"large"} color="#ffffff" />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
});

export default LoginScreen;
