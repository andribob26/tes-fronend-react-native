import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/auth.slice";
import bookmarkReducer from "@/redux/features/bookmark.slice";
import { authApi } from "@/redux/apis/auth.api";
import { contentApi } from "@/redux/apis/content.api";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "bookmark"],
  blacklist: ["authApi", "contentApi"],
};

const combinedReducer = combineReducers({
  auth: authReducer,
  bookmark: bookmarkReducer,
  [authApi.reducerPath]: authApi.reducer,
  [contentApi.reducerPath]: contentApi.reducer,
});

type MainReducer = ReturnType<typeof combinedReducer>;

const persistedReducer = persistReducer<MainReducer>(
  rootPersistConfig,
  combinedReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authApi.middleware)
      .concat(contentApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
