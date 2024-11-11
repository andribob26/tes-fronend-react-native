import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface SearchProps {
  onSearchListener: (term: string) => void;
  onClearListener: () => void;
}

const Search: React.FC<SearchProps> = (props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleBtnClear, setVisibleBtnClear] = useState<boolean>(false);

  const handleOnChange = (value: string) => {
    setSearchTerm(value);
    props.onSearchListener(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    props.onSearchListener("");
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setVisibleBtnClear(false);
      props.onClearListener();
    } else {
      setVisibleBtnClear(true);
    }
  }, [searchTerm]);

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#ffffff",
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}
    >
      <View style={{ position: "relative" }}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchTerm}
          onChangeText={handleOnChange}
        />
        <View
          style={{
            borderRadius: 100,
            position: "absolute",
            left: 12,
            top: 8,
          }}
        >
          <MaterialIcons name="search" size={24} color={"#566573"} />
        </View>
        {visibleBtnClear && (
          <TouchableOpacity
            onPress={handleClear}
            style={{
              backgroundColor: "#566573",
              padding: 2,
              borderRadius: 100,
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <MaterialIcons name="clear" size={18} color={"#ffffff"} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingVertical: 5,
    paddingStart: 45,
    paddingEnd: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
  },
});

export default Search;
