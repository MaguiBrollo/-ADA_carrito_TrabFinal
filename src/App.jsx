/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from "react";
import { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { NavBar } from "./componentes/NavBar";
import { ColorModeContext } from "./componentes/ModoClaOscContext";

import { ModoClaro } from "./utils/ColoresModo";
import { ModoOscuro } from "./utils/ColoresModo";

//------------------- PRINCIPAL ------------------
function App() {
	const { mode } = useContext(ColorModeContext);

	//---------- Paleta de colores para Modo Claro Oscuro
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === "light" ? ModoOscuro : ModoClaro),
				},
			}),
		[mode]
	);

	return (
		<ThemeProvider theme={theme}>
			<p>Aqui empieza el final</p>
			<NavBar />
		</ThemeProvider>
	);
}

export default App;
