import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./store/index";
import router from "./routes/index";
import "./i18n/i18n";

import "antd/dist/reset.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { RootState } from "./store";

const ThemedApp = () => {
  const isDark = useSelector((state: RootState) => state.theme.darkMode);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedApp />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
