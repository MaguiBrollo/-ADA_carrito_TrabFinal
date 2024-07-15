import { createContext, useEffect, useState } from "react";

import { articulos } from "../../utils/Articulos.jsx";
import { categorias } from "../../utils/Articulos.jsx";

export const FirebaseContext = createContext();

//====================================================================
//------------------ Componente Principal ----------------------------
export const FirebaseProvider = ({ children }) => {
	const [filtrarPor, setFiltrarPor] = useState("");
	const [buscarPor, setBuscarPor] = useState("");

	const [mostrarTitulo, setMostrarTitulo] = useState("");

	const [articulosMostrar, setArticulosMostrar] = useState([]);
	const [categoria, setCategoria] = useState([]);
	//-------------
	//Aquí debería buscar articulos de firebase
	//y dejarlos en el array "articulos"

	//Contar cantidad de artículos por categoría
	useEffect(() => {
		const cat = categorias.map((c) => {
			const cant = articulos.filter((a) => a.categoriaId === c.id);
			return { ...c, cantidad: cant.length };
		});
		setCategoria(cat);
	}, []);

	//Filtrar por categoría
	useEffect(() => {
		if (filtrarPor !== "") {
			let articulosFiltrados = [];

			if (filtrarPor === "TODOS") {
				articulosFiltrados = [...articulos];
				setMostrarTitulo("Artículos: TODOS");
			} else {
				articulosFiltrados = articulos.filter(
					(a) => a.categoriaId === filtrarPor
				);

				const cat = categoria.find((c) => {
					return c.id === filtrarPor;
				});
				setMostrarTitulo("Artículos por categoría: " + cat.categoria);
			}
			setArticulosMostrar(articulosFiltrados);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtrarPor]);

	//Buscar artíciculos
	useEffect(() => {
		if (buscarPor !== undefined && buscarPor.trim() !== "") {
			const articulosBuscados = articulos.filter((a) => {
				return (
					a.nombre.includes(buscarPor) ||
					a.descripcion.includes(buscarPor) ||
					a.descripcionLarga.includes(buscarPor)
				);
			});
			if (articulosBuscados.length > 0) {
				setArticulosMostrar(articulosBuscados);
				setMostrarTitulo("Artículo buscado: " + buscarPor);
			} else {
				setArticulosMostrar([]);
				setMostrarTitulo("NO HUBO RESULTADOS PARA LA BÚSQUEDA");
			}
		}
	}, [buscarPor]);

	//==============================
	return (
		<FirebaseContext.Provider
			value={{
				articulosMostrar,
				categoria,
				filtrarPor,
				setFiltrarPor,
				setBuscarPor,
				mostrarTitulo,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
