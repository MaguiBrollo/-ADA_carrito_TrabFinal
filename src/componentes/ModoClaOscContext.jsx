/* eslint-disable no-mixed-spaces-and-tabs */
import * as React from "react";


export const ColorModeContext = React.createContext({
	toggleColorMode: () => {},
});

//====================================================================
//------------------ Componente Principal ----------------------------
export const ModoClaOscContext = ({ children }) => {
	//--------------------- Modo Claro Oscuro
	const [mode, setMode] = React.useState(
		localStorage.getItem("modoClaroOscuro") || "light"
	);
	localStorage.setItem("modoClaroOscuro", mode);

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	//===========================
	return (
		<ColorModeContext.Provider value={{ colorMode, mode }}>
			{children}
		</ColorModeContext.Provider>
	);
};
