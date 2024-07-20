import { createContext, useEffect, useState } from "react";

//Importar módulos defirebas
import appFirebase from "../componentes/FirebaseCredenciales.js";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const auth = getAuth(appFirebase);

import dayjs from "dayjs";

import { articulos } from "../utils/Articulos.jsx";
import { categorias } from "../utils/Articulos.jsx";
import { usuarios } from "../utils/Articulos.jsx";
import { ordenes } from "../utils/Articulos.jsx";

export const FirebaseContext = createContext();

//====================================================================
//------------------ Componente Principal ----------------------------
export const FirebaseProvider = ({ children }) => {
	const [filtrarPor, setFiltrarPor] = useState("");
	const [categoria, setCategoria] = useState([]);

	const [buscarPor, setBuscarPor] = useState("");

	//const [usuario, setUsuario] = useState(null); //firebase

	const [usuarioId, setUsusarioId] = useState(0);
	const [usuarioLogin, setUsusarioLogin] = useState(0);

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
		console.log("busca logueo firebase");
		onAuthStateChanged(auth, (usuFirebase) => {
			if (usuFirebase) {
				setUsusarioId(usuFirebase.uid);
			} else {
				setUsusarioId(0);
			}
		});
	}, []);

	// se hizo LogIn, con email y contraseña.
	// con el ID se busca de la DBf usuario, sus datos, por
	// ahora en al array "usuarios"
	useEffect(() => {
		console.log("buscar dato us y su carrito");
		if (usuarioId !== 0) {
			const usuLogin = usuarios.find((usu) => {
				return usu.idUsuario === usuarioId;
			});

			if (usuLogin) {
				setUsusarioLogin(usuLogin);
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
				//El usuario se logueo, pero no se encontró sus datos
				signOut(auth); //se cierra sesión
				setUsusarioLogin(0);
				setCarrito({});
				setCantArtCarrito(0);
			}
		} else {
			//Usuario deslogueado, se limpian array/varibales con datos
			setCarrito({});
			setCantArtCarrito(0);
			setUsusarioLogin({});
			setMisCompras([]);
			setBuscarMisCompras(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [usuarioId]);

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

	//-------------
	//Aquí debería buscar articulos de firebase
	//y dejarlos en el array "articulos"

	//Contar cantidad de artículos por categoría
	useEffect(() => {
		console.log("cant art x cat");
		const cat = categorias.map((c) => {
			const cant = articulos.filter((a) => a.categoriaId === c.idCateg);
			return { ...c, cantidad: cant.length };
		});
		setCategoria(cat);
	}, []);

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
	}, [buscarPor]);

	//Buscar Mis Compras
	useEffect(() => {
		console.log("buscar mis compras");
		if (buscarMisCompras) {
			if (usuarioLogin.carritoCerrado.length > 0) {
				//Por cada elemento del array carritoCerrado,
				//hay que bucar en "ordenes", la orden del Carrito.
				const compras = [];
				usuarioLogin.carritoCerrado.forEach((cc) => {
					const car = ordenes.find((ord) => {
						return ord.idOrden === cc;
					});
					compras.push(car);
				});
				setMisCompras(compras);
			} else {
				//No tiene compras
				setMisCompras([]);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [buscarMisCompras]);

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
				artiParaAgregarCarrito,
				setArtiParaAgregarCarrito,
				setBuscarMisCompras,
				misCompras,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};
