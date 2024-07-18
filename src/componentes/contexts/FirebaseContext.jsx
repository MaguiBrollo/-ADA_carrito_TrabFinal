import { createContext, useEffect, useState } from "react";

import { articulos } from "../../utils/Articulos.jsx";
import { categorias } from "../../utils/Articulos.jsx";
import { usuarios } from "../../utils/Articulos.jsx";
import { ordenes } from "../../utils/Articulos.jsx";

export const FirebaseContext = createContext();

//====================================================================
//------------------ Componente Principal ----------------------------
export const FirebaseProvider = ({ children }) => {
	const [filtrarPor, setFiltrarPor] = useState("");
	const [buscarPor, setBuscarPor] = useState("");

	const [mostrarTitulo, setMostrarTitulo] = useState("");

	const [articulosMostrar, setArticulosMostrar] = useState([]);
	const [categoria, setCategoria] = useState([]);

	const [usuarioId, setUsusarioId] = useState(0);
	const [usuarioLogin, setUsusarioLogin] = useState(0);
	const [carrito, setCarrito] = useState({});
	const [cantArtCarrito, setCantArtCarrito] = useState(0);
	const [artiBrorrarCarrito, setArtiBrorrarCarrito] = useState(0);

	// se hizo LogIn, con email y contraseña.
	// con el ID se busca de la DBf usuario, sus datos, por
	// ahora en al array "usuarios"
	useEffect(() => {
		if (usuarioId !== 0) {
			console.log("usuario: ", usuarioId);
			const usuLogin = usuarios.find((usu) => {
				return usu.idUsuario === usuarioId;
			});
			setUsusarioLogin(usuLogin);

			//con el objeto usuario.. si tiene carritoAbierto
			// se lo busca en "ordenes" y se lo carga
			if (usuLogin.carritoAbierto > 0) {
				const car = ordenes.find((ord) => {
					return ord.idOrden === usuLogin.carritoAbierto;
				});
				setCarrito(car);
				setCantArtCarrito(car.articulos.length);
			} else {
				setCarrito({});
				setCantArtCarrito(0);
			}
		} else {
			setCarrito({});
			setCantArtCarrito(0);
			setUsusarioLogin({})
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usuarioId]);

	//solo cuando se borrar un articulo del carrito
	useEffect(() => {
		if (cantArtCarrito > 0) {
			const nuevo = carrito.articulos.filter(
				(a) => a.idArticulo !== artiBrorrarCarrito
			);

			let suma = nuevo.reduce(function (total, art) {
				return total + art.precio * art.cantidad;
			}, 0);

			setCarrito({ ...carrito, articulos: nuevo, total: suma });
			setCantArtCarrito(nuevo.length);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [artiBrorrarCarrito]);

	//-------------
	//Aquí debería buscar articulos de firebase
	//y dejarlos en el array "articulos"

	//Contar cantidad de artículos por categoría
	useEffect(() => {
		const cat = categorias.map((c) => {
			const cant = articulos.filter((a) => a.categoriaId === c.idCateg);
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
					return c.idCateg === filtrarPor;
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
				usuarioId,
				setUsusarioId,
				usuarioLogin,
				cantArtCarrito,
				carrito,
				setArtiBrorrarCarrito,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
