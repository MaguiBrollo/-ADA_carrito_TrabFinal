//import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import CssBaseline from "@mui/material/CssBaseline";

import { ConstantesProvider } from "./componentes/contexts/ConstantesContext.jsx";
import { ModoClaOscProvider } from "./componentes/contexts/ModoClaOscContext.jsx";
import { FirebaseProvider } from "./componentes/contexts/FirebaseContext.jsx";

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
