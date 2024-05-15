import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Store.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
/////////////////////////////////////[Redux Persist Essentials]
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
let persistor = persistStore(store);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 5 * 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ReactQueryDevtools />
            <App />
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
