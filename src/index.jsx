import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

import { DataLayer } from "./Components/DataLayer";
import { initialState } from "./Components/reducer";
// import reducer from "./Components/reducer";
import { BrowserRouter } from "react-router-dom";
import reducer from "./Components/reducer";
//import CallbackHandler from "./Components/CallbackHandler";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <DataLayer initialState={initialState} reducer={reducer}>
        <App />
      </DataLayer>
    </BrowserRouter>
  </StrictMode>
);

// src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
// import CallbackHandler from "./components/CallbackHandler";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="/callback" element={<CallbackHandler />} />
//     </Routes>
//   </BrowserRouter>
// );
