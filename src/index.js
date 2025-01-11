import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const app = ReactDOMClient.createRoot(document.getElementById("app"));

app.render(<App />);
