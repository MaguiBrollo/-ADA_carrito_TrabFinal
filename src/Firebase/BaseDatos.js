import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
	getDocs,
	onSnapshot,
	updateDoc,
	orderBy,
	query,
} from "firebase/firestore";
import { handleError } from "./ManejoErrores";

const {
	VITE_FIREBASE_CONFIG,
	VITE_COLECCION_US,
	VITE_COLECCION_CAT,
	VITE_COLECCION_ART,
} = import.meta.env;

const firebaseConfig = JSON.parse(VITE_FIREBASE_CONFIG);
export const appFirebase = initializeApp(firebaseConfig);

const db = getFirestore(appFirebase);

//=====================================================================
//-------- Actualización en tiempo real de los datos de UN usuario
export const instantanea = (usuarioId) => {
	const unsub = onSnapshot(doc(db, VITE_COLECCION_US, usuarioId), (doc) => {
		console.log("Usuario a escuchar: ", doc.data());
		return unsub;
	}, (error)=>{alert("Error al buscar usuario logueado."+error.message)});
};

export const actualizarCarritoDB = async (idUs, carrito) => {
	console.log("actu CARRR", carrito);
	await updateDoc(doc(db, VITE_COLECCION_US, idUs), {
		carritoAbierto: carrito,
	}).catch((e)=> alert("Error al actualizar carrito Abierto: ",e.message));
};

export const actualizarCarritoCerradoDB = async (idUs, carrito) => {
	console.log("actu CARRR Cerrado", carrito);
	await updateDoc(doc(db, VITE_COLECCION_US, idUs), {
		carritoCerrado: carrito,
	}).catch((e) => alert("Error al actualizar carrito Cerrado: ", e.message));
};

//-------- Crear un susuario con todos los datos.
export const crearUsuarioBD = async (nuevoUs, setMensajeError) => {
	console.log("llegoooo a crear una DB usuario");

	await setDoc(doc(db, VITE_COLECCION_US, nuevoUs.idUsuario), nuevoUs)
		.then((resultado) => console.log(resultado))
		.catch((err) => {
			setMensajeError(handleError(err.code, err.message));
		});

	//esta forma... el nombre del nuevo documento lo crea FireStore.
	/* addDoc(collection(db, VITE_COLECCION_US), nuevoUs)
		.then((resultado) => console.log(resultado))
		.catch((err) => {
			console.log(err.code);
			setMensajeError(handleError(err.code, err.message));
		}); */
};

//-------- Busca un Usuario y sus datos
export const getUnUsuario = async (idUs) => {
	const usuRef = doc(db, VITE_COLECCION_US, idUs);
	const docUs = await getDoc(usuRef).catch((e) =>
		alert("Error al buscar datos de un usuarios: ", e.message)
	);
	if (docUs.exists()) {
		return docUs.data();
	} else {
		return {};
	}
};

//-------- Buscar Categorías Ordenadas
export const getTodasCategorias = async () => {
	const catOrdenado = query(
		collection(db, VITE_COLECCION_CAT),
		orderBy("categoria")
	);
	const resCat = await getDocs(catOrdenado);

	const catDatos = resCat.docs.map((document) => document.data());
	return catDatos;
};

//-------- Buscar Artículos Ordenados
export const getTodosArticulos = async () => {
	console.log("hhhhhhhhhhh");
	const artOrdenado = query(
		collection(db, VITE_COLECCION_ART),
		orderBy("nombre")
	);

	/* NO puedo hacer un await... pasa de largo antes de traer la data...
	   const art =  onSnapshot(artOrdenado, (data) => {
		const arr = data.docs.map((document) => document.data());
		return arr
	}); */

	const resArt = await getDocs(artOrdenado);
	const artDatos = resArt.docs.map((document) => document.data());
	return artDatos;
};
