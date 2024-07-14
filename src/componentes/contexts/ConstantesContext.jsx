import { createContext } from "react";

export const ConstantesContext = createContext();

//====================================================================
//------------------ Componente Principal ----------------------------
export const ConstantesProvider = ({ children }) => {
	const anchoMaximo= '1200';
	const altoMinimo ='75';

	//===========================
	return (
		<ConstantesContext.Provider value={{anchoMaximo, altoMinimo}}>
			{children}
		</ConstantesContext.Provider>
	);
};
