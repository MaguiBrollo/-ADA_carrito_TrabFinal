/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from "react";

//Fuentes
import LoraItalicVariableFontwght from "./fonts/LoraItalicVariableFontwght.ttf";

import { useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

import { Header } from "./componentes/Header";
import { NavBar } from "./componentes/NavBar";
import { ColorModeContext } from "./componentes/contexts/ModoClaOscContext";
import { ModoClaro } from "./utils/ColoresModo";
import { ModoOscuro } from "./utils/ColoresModo";
import { Footer } from "./componentes/Footer";
import { Nosotros } from "./componentes/Nosotros";
import { CarruselPpal } from "./componentes/CarruselPpal";
import { Buscar } from "./componentes/Buscar";
import { FiltrarPorCategoria } from "./componentes/FiltrarPorCategoria";
import { ArticulosListar } from "./componentes/ArticulosListar";

//====================================================================
//------------------- PRINCIPAL ------------------
function App() {
	const [menu, setMenu] = React.useState("inicio");
	const [abrirBuscar, setAbrirBuscar] = React.useState(false);
	const [abrirFiltrar, setAbrirFiltrar] = React.useState(false);
	const { mode } = useContext(ColorModeContext);

	//---------- Paleta de colores para Modo Claro Oscuro
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === "light" ? ModoOscuro : ModoClaro),
				},
				typography: {
					fontFamily: "Lora, Arial",
				},
				components: {
					MuiCssBaseline: {
						styleOverrides: `
							@font-face {
								font-family: 'Lora';
								font-style: normal;
								font-display: swap;
								font-weight: 400;
								src: local('Lora'), local('Lora-Regular'), url(${LoraItalicVariableFontwght}) format('ttf');
								unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
							}
							`,
					},
				},
			}),
		[mode]
	);

	//===========================
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
				{/* --------- Mensaje envio gratis ------- */}
				<Header />

				{/* --------- Barra de Navegación -------- */}
				<NavBar
					setMenu={setMenu}
					setAbrirBuscar={setAbrirBuscar}
					abrirFiltrar={abrirFiltrar}
					setAbrirFiltrar={setAbrirFiltrar}
				/>

				{/* -- Carrusel / Información de la empresa ------------------ */}
				{menu === "inicio" && (
					<>
						<CarruselPpal /> <Nosotros />
					</>
				)}

				{/* --------- Modal Drawer Buscar -------- */}
				{abrirFiltrar && (
					<FiltrarPorCategoria
						setMenu={setMenu}
						abrirFiltrar={abrirFiltrar}
						setAbrirFiltrar={setAbrirFiltrar}
					/>
				)}
				{/* --------- Carrusel ------------------- */}
				{menu === "articulosTodos" && <ArticulosListar />}

				{/* --------- Modal Drawer Buscar -------- */}
				{abrirBuscar && (
					<Buscar abrirBuscar={abrirBuscar} setAbrirBuscar={setAbrirBuscar} />
				)}

				{/* --------- Barra de Footer  ----------- */}
				<Footer />
			</Box>
		</ThemeProvider>
	);
}

export default App;
