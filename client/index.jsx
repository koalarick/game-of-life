import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

function AppRoot() {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
}

ReactDOM.render(AppRoot(), document.getElementById("root"));
