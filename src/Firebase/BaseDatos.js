import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { handleError } from "./ManejoErrores";

const { VITE_FIREBASE_CONFIG, VITE_DATABASE_NAME } = import.meta.env;

const firebaseConfig = JSON.parse(VITE_FIREBASE_CONFIG);
export const appFirebase = initializeApp(firebaseConfig);

const db = getFirestore(appFirebase);

//Crear un susuario con todos los datos.
export const crearUsuarioBD = (nuevoUs, setMensajeError) => {
	console.log("llegoooo a crear una DB ususario");

	addDoc(collection(db, VITE_DATABASE_NAME), nuevoUs)
		.then((resultado) => console.log(resultado))
		.catch((err) => {
			console.log(err.code);
			setMensajeError(handleError(err.code, err.message));
		});
};

/* export const createPost = (post) =>
	addDoc(collection(db, VITE_DATABASE_NAME), post); */
/* 
export const getTodosArticulos = async () => {
	const result = await getDocs(collection(db, VITE_DATABASE_NAME));

	const postsData = result.docs.map((document) => document.data());

	return postsData;
};
 */
