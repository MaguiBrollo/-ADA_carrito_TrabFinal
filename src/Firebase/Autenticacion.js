//Importar módulos defirebas
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";

import { handleError } from "./ManejoErrores.js";

//--- Mis funciones de Base de Datos
import { appFirebase } from "./BaseDatos.js";
import { crearUsuarioBD } from "./BaseDatos.js";

//-----------------------------------------
//Verificar si hay o no un usuario logueado
export const onChangeUser = (setUsusarioId) => {
	console.log("pasa por buscar");
	const auth = getAuth(appFirebase);
	onAuthStateChanged(auth, (usuFirebase) => {
		if (usuFirebase) {
			setUsusarioId(usuFirebase.uid);
		} else {
			setUsusarioId(0);
		}
	});
};

//-----------------------------------------
//Iniciar Sesión
export const loginUsuario = async (correo, contrasenia, setMensajeError) => {
	const auth = getAuth(appFirebase);

	await signInWithEmailAndPassword(auth, correo, contrasenia)
		.then((credencial) => {
			const usuario = credencial.user;
			console.log("login:", usuario);
		})
		.catch((err) => {
			console.log("ERROR login:", err.message);
			setMensajeError(handleError(err.code, err.message));
		});
};

//-----------------------------------------
//Cerrar Sesión
export const logoutUsuario = () => {
	const auth = getAuth(appFirebase);
	signOut(auth);
};

//-----------------------------------------
//Crear una cuenta
export const crearCuentaUsuario = async (datos, setMensajeError) => {
	console.log("datos:", datos);
	const { correo, contrasenia } = datos;
	const auth = getAuth(appFirebase);

	await createUserWithEmailAndPassword(auth, correo, contrasenia)
		.then((credencial) => {
			const nuevoUs = {
				idUsuario: credencial.user.uid,
				nombre: datos.nombre,
				imagen: datos.imagen,
				carritoAbierto: datos.carritoAbierto,
				carritoCerrado: datos.carritoCerrado,
			};

			console.log("Nuevo Us: ", nuevoUs);
			crearUsuarioBD(nuevoUs, setMensajeError);
		})
		.catch((err) => {
			console.log("NUEVO US:", err.message);
			setMensajeError(handleError(err.code, err.message));
		});
};
