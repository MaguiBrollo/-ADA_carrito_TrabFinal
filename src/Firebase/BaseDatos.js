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
//-------- Actualización en timepo real de los datos de UN usuario
export const instantanea = (usuarioId) => {
	const unsub = onSnapshot(doc(db, VITE_COLECCION_US, usuarioId), (doc) => {
		console.log("Usuario a escuchar: ", doc.data());
		return unsub;
	});
};

export const actualizarCarritoDB = async (idUs, carrito) => {
	console.log("actu CARRR", carrito);
	await updateDoc(doc(db, VITE_COLECCION_US, idUs), {
		carritoAbierto: carrito,
	});
};



//-------- Crear un susuario con todos los datos.
export const crearUsuarioBD = async (nuevoUs, setMensajeError) => {
	console.log("llegoooo a crear una DB usuario");

	//Agrega un nuevo documento a la collección USUARIO, con el ID del usuario
	await setDoc(doc(db, VITE_COLECCION_US, nuevoUs.idUsuario), nuevoUs)
		.then((resultado) => console.log(resultado))
		.catch((err) => {
			console.log(err.code);
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
	const docRef = doc(db, VITE_COLECCION_US, idUs);
	const docUs = await getDoc(docRef);
	if (docUs.exists()) {
		return docUs.data();
	} else {
		return {};
	}
};

//-------- Buscar Categorías
export const getTodasCategorias = async () => {
	const result = await getDocs(collection(db, VITE_COLECCION_CAT));
	const postsData = result.docs.map((document) => document.data());

	return postsData;
};

//-------- Buscar Artículos
export const getTodosArticulos = async () => {
	const result = await getDocs(collection(db, VITE_COLECCION_ART));
	const postsData = result.docs.map((document) => document.data());

	return postsData;
};

