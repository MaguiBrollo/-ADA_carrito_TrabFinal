import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ModoClaOscContext } from "./componentes/ModoClaOscContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ModoClaOscContext>
			<App />
		</ModoClaOscContext>
	</React.StrictMode>
);
