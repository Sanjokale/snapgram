'use client'

import { persistor, store } from "@/redux/store/index";
import React from "react";

import { PersistGate } from "redux-persist/integration/react";

const { Provider } = require("react-redux")
const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loding= {null} persistor={persistor}>
        {children}
        </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
