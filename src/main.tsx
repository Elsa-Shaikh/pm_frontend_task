import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-secondary)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </StrictMode>
    </QueryClientProvider>
  </Provider>,
);
