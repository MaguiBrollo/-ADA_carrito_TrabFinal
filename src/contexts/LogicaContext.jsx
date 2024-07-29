/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
export const LogicaContext = createContext();

import { v4 as uuidv4 } from "uuid";

import { onChangeUser } from "../Firebase/Autenticacion.js";
import { getTodasCategorias } from "../Firebase/BaseDatos.js";
import { getTodosArticulos } from "../Firebase/BaseDatos.js";
import { getUnUsuario } from "../Firebase/BaseDatos.js";
import { instantanea } from "../Firebase/BaseDatos.js";
import { actualizarCarritoDB } from "../Firebase/BaseDatos.js";
import { actualizarCarritoCerradoDB } from "../Firebase/BaseDatos.js";

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
	const [artiBorrarCarrito, setArtiBorrarCarrito] = useState(0);
	const [artiParaAgregarCarrito, setArtiParaAgregarCarrito] = useState({});
	const [guardarCarritoCerrado, setGuardarCarritoCerrado] = useState(false);

	const [misCompras, setMisCompras] = useState([]);
	const [buscarMisCompras, setBuscarMisCompras] = useState(false);

	//-----------------------------------------
	//Verificar si hay o no un usuario logueado
	useEffect(() => {
		console.log("----------busca logueo firebase");
		onChangeUser(setUsusarioId);
	}, []);

	// Actualización en timepo real. Se marca los que tiene que escuchar
	useEffect(() => {
		if (usuarioId !== 0) {
			const inst = instantanea(usuarioId);
			setUsusarioLogin(inst);
		}
	}, []);

	// Se hizo LogIn, con email y contraseña.
	// con el ID se busca de la DBf los demás datos del usuario
	const getUs = async (usuarioId) => {
		const res = await getUnUsuario(usuarioId);
		setUsusarioLogin(res);
	};
	useEffect(() => {
		console.log("buscar datos del Usuario logueado: ", usuarioId);
		if (usuarioId !== 0) {
			//Buscar UN usuario de la DB
			getUs(usuarioId);
		} else {
			//Usuario deslogueado, se limpian array/varibales con datos
			setUsusarioLogin({});
			setBuscarMisCompras(false);
		}
	}, [usuarioId]);

	// Busca Carrito Abierto
	useEffect(() => {
		console.log("busca carrito abierto");
		if (Object.keys(usuarioLogin).length !== 0) {
			if (Object.keys(usuarioLogin.carritoAbierto).length > 0) {
				//Los carritos se borran después de un día
				const unDia = new Date().getTime() - usuarioLogin.carritoAbierto.fecha;
				if (unDia > 86400000) {
					setCarrito({});
					setCantArtCarrito(0);
					actualizarCarritoDB(usuarioId, {});
				} else {
					setCarrito(usuarioLogin.carritoAbierto);
					setCantArtCarrito(usuarioLogin.carritoAbierto.articulos.length);
				}
			} else {
				setCarrito({});
				setCantArtCarrito(0);
			}
		} else {
			setCarrito({});
			setCantArtCarrito(0);
		}
	}, [usuarioLogin]);

	// BORRAR un/Todos artículo/s del carrito
	useEffect(() => {
		console.log("borrar carrito uno/t");
		if (cantArtCarrito > 0) {
			if (artiBorrarCarrito === "T") {
				//Borrar todo el carrito
				setCarrito({});
				actualizarCarritoDB(usuarioId, {});
				setCantArtCarrito(0);
				setArtiBorrarCarrito(0);
			} else {
				const nuevo = carrito.articulos.filter(
					(a) => a.idArticulo !== artiBorrarCarrito
				);

				if (nuevo.length == 0) {
					//De a uno, borró todo
					setCarrito({});
					actualizarCarritoDB(usuarioId, {});
					setCantArtCarrito(0);
				} else {
					//Borró, pero quedan...
					let suma = nuevo.reduce(function (total, art) {
						return total + art.precio * art.cantidad;
					}, 0);

					setCarrito({ ...carrito, articulos: nuevo, total: suma });
					actualizarCarritoDB(usuarioId, {
						...carrito,
						articulos: nuevo,
						total: suma,
					});
					setCantArtCarrito(nuevo.length);
				}
			}
		}
	}, [artiBorrarCarrito]);

	// AGREGAR un artículo al carrito
	useEffect(() => {
		console.log("agregar un art carrito: ");
		if (Object.keys(artiParaAgregarCarrito).length !== 0) {
			console.log(artiParaAgregarCarrito.idArticulo);

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
							idArticulo: artiParaAgregarCarrito.idArticulo,
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
						idArticulo: artiParaAgregarCarrito.idArticulo,
						nombre: artiParaAgregarCarrito.nombre,
						precio: artiParaAgregarCarrito.precio,
						imagen: artiParaAgregarCarrito.imagen,
						cantidad: artiParaAgregarCarrito.cantidad,
					},
				];
			}
			let suma = 0;
			suma = nuevo.reduce(function (total, art) {
				return total + art.precio * art.cantidad;
			}, 0);

			let fechaNumero = new Date().getTime();
			console.log("Fecha numero:", fechaNumero);
			setCarrito({ ...carrito, articulos: nuevo, total: suma });
			actualizarCarritoDB(usuarioId, {
				...carrito,
				fecha: fechaNumero,
				articulos: nuevo,
				total: suma,
			});
			setCantArtCarrito(nuevo.length);
		}
	}, [artiParaAgregarCarrito]);

	// Buscar Mis Compras
	useEffect(() => {
		console.log("buscar mis compras");
		if (buscarMisCompras) {
			getUs(usuarioId);
			setMisCompras(usuarioLogin.carritoCerrado);
		}
	}, [buscarMisCompras]);

	// Guardar carritoAbierto  en carritoCerrado
	useEffect(() => {
		console.log("guardar carrito cerrado");
		if (guardarCarritoCerrado) {
			const fechaNumero = new Date().getTime();
			const id = uuidv4();
			const nC = { ...carrito, fecha: fechaNumero, idOrden: id };
			const nCC = [...usuarioLogin.carritoCerrado, nC];

			actualizarCarritoCerradoDB(usuarioId, nCC);

			setCarrito({});
			actualizarCarritoDB(usuarioId, {});
			setCantArtCarrito(0);
		}
	}, [guardarCarritoCerrado]);

	//-------------------------------------------------------
	// Buscar Categorías y Artículos
	useEffect(() => {
		const getCat = async () => {
			const res = await getTodasCategorias();
			setCategorias(res);
		};
		const getArt = async () => {
			const res = await getTodosArticulos();
			setArticulos(res);
		};

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
	}, [categorias]);

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
				setArtiBorrarCarrito,
				artiParaAgregarCarrito,
				setArtiParaAgregarCarrito,
				setBuscarMisCompras,
				misCompras,
				setGuardarCarritoCerrado,
			}}
		>
			{children}
		</LogicaContext.Provider>
	);
};
