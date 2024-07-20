//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import CssBaseline from "@mui/material/CssBaseline";

import { ConstantesProvider } from "./contexts/ConstantesContext.jsx";
import { ModoClaOscProvider } from "./contexts/ModoClaOscContext.jsx";
import { FirebaseProvider } from "./contexts/FirebaseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	//<React.StrictMode>
		<FirebaseProvider>
			<ConstantesProvider>
				<ModoClaOscProvider>
					<CssBaseline />
					<App />
				</ModoClaOscProvider>
			</ConstantesProvider>
		</FirebaseProvider>
//	</React.StrictMode>
);
