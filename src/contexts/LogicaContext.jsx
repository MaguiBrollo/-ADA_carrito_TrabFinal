import { createContext, useEffect, useState } from "react";
export const LogicaContext = createContext();

import dayjs from "dayjs";

import { onChangeUser } from "../Firebase/Autenticacion.js";
//import { logoutUsuario } from "../Firebase/Autenticacion.js";
import { getTodasCategorias } from "../Firebase/BaseDatos.js";
import { getTodosArticulos } from "../Firebase/BaseDatos.js";
import { getUnUsuario } from "../Firebase/BaseDatos.js";

//====================================================================
//------------------ Componente Principal ----------------------------
export const LogicaProvider = ({ children }) => {
	//Array de las DBF firebase
	const [categorias, setCategorias] = useState();
	const [articulos, setArticulos] = useState([]);

	const [filtrarPor, setFiltrarPor] = useState("");
	const [categoria, setCategoria] = useState([]);

	const [buscarPor, setBuscarPor] = useState("");

	const [usuarioId, setUsusarioId] = useState(0);
	const [usuarioLogin, setUsusarioLogin] = useState({});

	const [articulosMostrar, setArticulosMostrar] = useState([]);
	const [mostrarTitulo, setMostrarTitulo] = useState(""); //articuloListar.jsx

	const [carrito, setCarrito] = useState({});
	const [cantArtCarrito, setCantArtCarrito] = useState(0);
	const [artiBrorrarCarrito, setArtiBrorrarCarrito] = useState(0);
	const [artiParaAgregarCarrito, setArtiParaAgregarCarrito] = useState({});

	const [misCompras, setMisCompras] = useState([]);
	const [buscarMisCompras, setBuscarMisCompras] = useState(false);

	//-----------------------------------------
	//Verificar si hay o no un usuario logueado
	useEffect(() => {
		console.log("----------busca logueo firebase");
		onChangeUser(setUsusarioId);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// se hizo LogIn, con email y contraseña.
	// con el ID se busca de la DBf los demás datos del usuario
	const getUs = async (usuarioId) => {
		const res = await getUnUsuario(usuarioId);
		setUsusarioLogin(res);
	};
	useEffect(() => {
		console.log("buscar dato Usuario, y su carrito", usuarioId);
		if (usuarioId !== 0) {
			//buscar UN usuario de la DB
			getUs(usuarioId);
		} else {
			//Usuario deslogueado, se limpian array/varibales con datos
			setUsusarioLogin({});
			setBuscarMisCompras(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usuarioId]);

	// Busca Carrito Abierto
	useEffect(() => {
		console.log("busca carrito abierto");
		if (Object.keys(usuarioLogin).length !== 0) {
			setCarrito(usuarioLogin.carritoAbierto);
			if (Object.keys(usuarioLogin.carritoAbierto).length > 0) {
				setCantArtCarrito(usuarioLogin.carritoAbierto.articulos.length);
			} else {
				setCantArtCarrito(0);
			}
		} else {
			setCarrito({});
			setCantArtCarrito(0);
		}
	}, [usuarioLogin]);

	// BORRAR un artículo del carrito
	useEffect(() => {
		console.log("borrar carrito uno/t");
		if (cantArtCarrito > 0) {
			if (artiBrorrarCarrito === "T") {
				setCarrito({});
				setCantArtCarrito(0);
				setArtiBrorrarCarrito(0);
			} else {
				const nuevo = carrito.articulos.filter(
					(a) => a.idArticulo !== artiBrorrarCarrito
				);

				let suma = nuevo.reduce(function (total, art) {
					return total + art.precio * art.cantidad;
				}, 0);

				setCarrito({ ...carrito, articulos: nuevo, total: suma });
				setCantArtCarrito(nuevo.length);
			}
			//aqui UPDATE objeto carrito.
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [artiBrorrarCarrito]);

	// AGREGAR un artículo al carrito
	useEffect(() => {
		console.log("agregar carrito");
		if (Object.keys(artiParaAgregarCarrito).length !== 0) {
			let nuevo = [];
			if (cantArtCarrito > 0) {
				let indice = carrito.articulos.findIndex(
					(art) => art.idArticulo === artiParaAgregarCarrito.ID
				);
				if (indice > -1) {
					if (
						carrito.articulos[indice].cantidad +
							artiParaAgregarCarrito.cantidad >
						5
					) {
						carrito.articulos[indice].cantidad = 5;
					} else {
						carrito.articulos[indice].cantidad +=
							artiParaAgregarCarrito.cantidad;
					}

					nuevo = [...carrito.articulos];
				} else {
					nuevo = [
						...carrito.articulos,
						{
							idArticulo: artiParaAgregarCarrito.ID,
							nombre: artiParaAgregarCarrito.nombre,
							precio: artiParaAgregarCarrito.precio,
							imagen: artiParaAgregarCarrito.imagen,
							cantidad: artiParaAgregarCarrito.cantidad,
						},
					];
				}
			} else {
				nuevo = [
					{
						idArticulo: artiParaAgregarCarrito.ID,
						nombre: artiParaAgregarCarrito.nombre,
						precio: artiParaAgregarCarrito.precio,
						imagen: artiParaAgregarCarrito.imagen,
						cantidad: artiParaAgregarCarrito.cantidad,
					},
				];
				setCarrito({
					idOrden: dayjs(), //una fecha como ID
					fecha: dayjs().format("YYYY/MM/DD"),
					total: 0,
					cerrado: false,
					articulos: [],
				});
			}
			let suma = 0;
			suma = nuevo.reduce(function (total, art) {
				return total + art.precio * art.cantidad;
			}, 0);

			setCarrito({ ...carrito, articulos: nuevo, total: suma });
			setCantArtCarrito(nuevo.length);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [artiParaAgregarCarrito]);

	// Buscar Mis Compras
	useEffect(() => {
		console.log("buscar mis compras");
		if (buscarMisCompras) {
			if (usuarioLogin.carritoCerrado.length > 0) {
				setMisCompras(usuarioLogin.carritoCerrado);
			} else {
				//No tiene compras
				setMisCompras([]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buscarMisCompras]);

	//-------------------------------------------------------
	//-------------------------------------------------------
	// categorías y artículos de la BaseDatos.jsx
	const getCat = async () => {
		const res = await getTodasCategorias();
		setCategorias(res);
	};
	const getArt = async () => {
		const res = await getTodosArticulos();
		setArticulos(res);
	};

	useEffect(() => {
		getCat();
		getArt();
	}, []);

	//Contar cantidad de artículos por categoría
	useEffect(() => {
		console.log("cant art x cat");

		if (categorias) {
			const cat = categorias.map((c) => {
				const cant = articulos.filter((a) => a.categoriaId === c.idCateg);
				return { ...c, cantidad: cant.length };
			});
			setCategoria(cat);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categorias, articulos]);

	//Filtrar por categoría
	useEffect(() => {
		console.log("filtrar por cat");
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
		console.log("buscar los articulos");
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buscarPor]);

	//==============================
	return (
		<LogicaContext.Provider
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
				artiParaAgregarCarrito,
				setArtiParaAgregarCarrito,
				setBuscarMisCompras,
				misCompras,
			}}
		>
			{children}
		</LogicaContext.Provider>
	);
};
