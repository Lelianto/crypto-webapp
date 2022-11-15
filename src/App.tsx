import React from "react";
import Main from "./Main";
import MarketProvider from "./context/marketContext";
import "./styles/index.css";

const App: React.FC = () => {
  return (
    <>
      <MarketProvider>
        <Main />
      </MarketProvider>
    </>
  );
};

export default App;
