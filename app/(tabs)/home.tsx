import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Content, useGetContentsQuery } from "@/redux/apis/content.api";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Search from "@/components/Search";
import { useDispatch, useSelector } from "react-redux";
import { getAuthToken } from "@/redux/features/auth.slice";
import {
  addBookmark,
  getBookmarks,
  removeBookmark,
} from "@/redux/features/bookmark.slice";
import { AppDispatch } from "@/redux/store/store";
import { Snackbar } from "react-native-paper";

const HomeScreen = () => {
  const token = useSelector(getAuthToken);
  const bookmark = useSelector(getBookmarks);

  const dispatch = useDispatch<AppDispatch>();

  const [visibleSnackBar, setVisibleSnackBar] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [argQueryParam, setArgQueryParam] = useState({
    page: 1,
    perPage: 10,
    searchTerm: "",
    key: token ?? "",
  });

  const { data, isFetching, isLoading } = useGetContentsQuery({
    ...argQueryParam,
  });

  const [isLoadingData, setIsLoadingData] = useState<boolean>(isLoading);

  const handleOnSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleOnClearSearch = () => {
    setIsLoadingData(true);
    setArgQueryParam((prevValue) => {
      return {
        ...prevValue,
        searchTerm: "",
        page: 1,
      };
    });
  };

  const handleTogleBookmark = (content: Content) => {
    if (isIdExist(content.id)) {
      dispatch(removeBookmark({ data: content }));
    } else {
      dispatch(addBookmark({ data: content }));
      setVisibleSnackBar(true);
    }
  };

  const isIdExist = (id: number): boolean => {
    return bookmark.some((item) => item.id === id);
  };

  const renderFooter = () => {
    if (isFetching) {
      return (
        <View style={{ padding: 5 }}>
          <ActivityIndicator size="large" color={"#28b463"} />
        </View>
      );
    }
    return null;
  };

  const onEndReached = () => {
    if (
      !isFetching &&
      data &&
      data?.hits.length !== 0 &&
      data?.hits.length < data.totalHits
    ) {
      setArgQueryParam((prevValue) => {
        return {
          ...prevValue,
          page: prevValue.page + 1,
        };
      });
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm != argQueryParam.searchTerm) {
        setIsLoadingData(true);
        setArgQueryParam((prevValue) => {
          return {
            ...prevValue,
            searchTerm: searchTerm,
            page: 1,
          };
        });
      }
    }, 200);

    return () => {
      clearTimeout(delayDebounce);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (!isFetching) {
      setIsLoadingData(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (visibleSnackBar) {
      setTimeout(() => {
        setVisibleSnackBar(false);
      }, 3000);
    }
  }, [visibleSnackBar]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Snackbar
        wrapperStyle={{ top: 0 }}
        style={{ backgroundColor: "#28b463", zIndex: 10 }}
        visible={visibleSnackBar}
        onDismiss={() => {}}
      >
        Data di tambahkan ke bookmark
      </Snackbar>
      <View style={{ flex: 1 }}>
        <Search
          onSearchListener={handleOnSearch}
          onClearListener={handleOnClearSearch}
        />
        {(data?.hits.length ?? 0) > 0 ? (
          <FlatList
            data={data?.hits}
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

                <TouchableOpacity
                  onPress={() => {
                    handleTogleBookmark(item);
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    padding: 5,
                    borderRadius: 100,
                    position: "absolute",
                    right: 15,
                    bottom: 15,
                  }}
                >
                  {isIdExist(item.id) ? (
                    <MaterialIcons
                      name="bookmark-remove"
                      size={24}
                      color={"#28b463"}
                    />
                  ) : (
                    <MaterialIcons
                      name="bookmark-add"
                      size={24}
                      color={"#566573"}
                    />
                  )}
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={renderFooter}
            onEndReached={onEndReached}
            contentContainerStyle={{
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          />
        ) : isLoadingData ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={"#28b463"} />
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Tidak ada data</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
