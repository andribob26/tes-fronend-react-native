import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store/store";
import { Content } from "@/redux/apis/content.api";

export interface BookmarkState {
  bookmarks: Content[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<{ data: Content }>) => {
      state.bookmarks.push(action.payload.data);
    },
    removeBookmark: (state, action: PayloadAction<{ data: Content }>) => {
      state.bookmarks = state.bookmarks.filter(
        (item) => item.id !== action.payload.data.id
      );
    },
  },
});

export const getBookmarks = (state: RootState) => state.bookmark.bookmarks;

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
