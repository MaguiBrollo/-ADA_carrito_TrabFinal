import { createContext } from "react";

export const ConstantesContext = createContext();

//====================================================================
//------------------ Componente Principal ----------------------------
export const ConstantesProvider = ({ children }) => {
	const anchoMaximo= '1200';
	

	//===========================
	return (
		<ConstantesContext.Provider value={{anchoMaximo}}>
			{children}
		</ConstantesContext.Provider>
	);
};
