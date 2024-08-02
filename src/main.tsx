import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import ReduxProvider from "./components/redux/ReduxProvider.tsx";
import { AuthProvider } from "./components/contexts/auth-context/AuthContext.tsx";
import { BrowserRouter } from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={new QueryClient()}>
  <ReduxProvider>
    <AuthProvider>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </AuthProvider>
  </ReduxProvider>
    </QueryClientProvider>
);
