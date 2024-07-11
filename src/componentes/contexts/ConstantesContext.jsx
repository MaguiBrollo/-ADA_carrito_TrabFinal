import { createContext } from "react";

export const ValoresConstantes = createContext();

//====================================================================
//------------------ Componente Principal ----------------------------
export const ConstantesContext = ({ children }) => {
	const anchoMaximo= '1200';
	

	//===========================
	return (
		<ValoresConstantes.Provider value={{anchoMaximo}}>
			{children}
		</ValoresConstantes.Provider>
	);
};
