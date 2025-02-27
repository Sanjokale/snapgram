'use client'

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "../slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
import postReducer from "../slices/postSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer


});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [logger],
});

export const persistor = persistStore(store);
