import React from "react";
import AppAuth from "./App.Auth";
import RouterApp from "./router";

function App() {
  return (
    <AppAuth>
      <RouterApp />
    </AppAuth>
  );
}

export default App;
