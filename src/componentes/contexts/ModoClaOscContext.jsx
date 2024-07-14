import {useState, useMemo, createContext} from "react";

export const ColorModeContext = createContext({
	toggleColorMode: () => {},
});

//====================================================================
//------------------ Componente Principal ----------------------------
export const ModoClaOscProvider = ({ children }) => {
	//--------------------- Modo Claro Oscuro
	const [mode, setMode] = useState(
		localStorage.getItem("modoClaroOscuro") || "light"
	);
	localStorage.setItem("modoClaroOscuro", mode);

	const colorMode = useMemo(
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
