import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ConstantesContext } from "./componentes/contexts/ConstantesContext.jsx";
import { ModoClaOscContext } from "./componentes/contexts/ModoClaOscContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ConstantesContext>
			<ModoClaOscContext>
				<App />
			</ModoClaOscContext>
		</ConstantesContext>
	</React.StrictMode>
);
