/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from "react";
import { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { NavBar } from "./componentes/NavBar";
import { ColorModeContext } from "./componentes/ModoClaOscContext";

import { ModoClaro } from "./utils/ColoresModo";
import { ModoOscuro } from "./utils/ColoresModo";
import { Header } from "./componentes/Header";
import { Box } from "@mui/material";

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
			<Box
				sx={{
					width: "100%",
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
					bgcolor: "background.default",
				}}
			>
				<Header />
				<NavBar />
			</Box>
		</ThemeProvider>
	);
}

export default App;
