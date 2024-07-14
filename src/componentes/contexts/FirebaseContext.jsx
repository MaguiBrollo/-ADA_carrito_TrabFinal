import { createContext, useEffect, useState } from "react";

import { articulos } from "../../utils/Articulos.jsx";
import { categorias } from "../../utils/Articulos.jsx";

export const FirebaseContext = createContext();

//-------------------------
export const FirebaseProvider = ({ children }) => {
	const [filtrarPor, setFiltrarPor] = useState("");
	const [articulosMostrar, setArticulosMostrar] = useState([]);
	const [categoria, setCategoria] = useState([]);
	//-------------
	//Aquí debería buscar articulos de firebase
	//y dejarlos en el array "articulos"

	useEffect(() => {
		const cat = categorias.map((c) => {
			const cant = articulos.filter((a) => a.categoriaId === c.id);
			return { ...c, cantidad: cant.length };
		});
		setCategoria(cat);
	}, []);

	useEffect(() => {
		if (filtrarPor !== "") {
			let articulosFiltrados = [];
			if (filtrarPor === "TODOS") {
				articulosFiltrados = [...articulos];
			} else {
				articulosFiltrados = articulos.filter(
					(a) => a.categoriaId === filtrarPor
				);
			}
			setArticulosMostrar(articulosFiltrados);
		}
	}, [filtrarPor]);

	return (
		<FirebaseContext.Provider
			value={{ articulosMostrar, categoria, filtrarPor, setFiltrarPor }}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
