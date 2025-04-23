import React from "react";
import ReactDOM from "react-dom/client";
import './globale.css'; // Aggiornato il nome del file
import DietPlannerApp from "./app"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DietPlannerApp />
  </React.StrictMode>
);
