import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { getBookmarks } from "@/redux/features/bookmark.slice";

const BookmarkScreen = () => {
  const bookmarks = useSelector(getBookmarks);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {bookmarks.length > 0 ? (
          <FlatList
            data={bookmarks ?? []}
            keyExtractor={(item, index) =>
              item.id.toString() + index.toString()
            }
            renderItem={({ item, index }) => (
              <View
                key={item.id}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  padding: 10,
                  borderRadius: 20,
                  marginBottom: 10,
                  backgroundColor: "#ffffff",
                  elevation: 4,
                }}
              >
                <Image
                  source={{ uri: item.previewURL }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 10,
                    marginEnd: 10,
                  }}
                  resizeMode="cover"
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontWeight: "bold" }}
                  >{`User : ${item.user}`}</Text>
                  <Text
                    style={{ fontWeight: "bold" }}
                  >{`Tags : ${item.tags}`}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Tidak ada data</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookmarkScreen;
