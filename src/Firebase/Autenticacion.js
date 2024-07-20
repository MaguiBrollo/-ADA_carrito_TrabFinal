//Importar módulos defirebas
import appFirebase from "./FirebaseCredenciales";
import {
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
} from "firebase/auth";

//Iniciar Sesión
export const loginUsuario = async (correo, contrasenia, setMensajeError) => {
	const auth = getAuth(appFirebase);

	await signInWithEmailAndPassword(auth, correo, contrasenia)
		.then((credencial) => {
			const usuario = credencial.user;
			console.log(usuario);
		})
		.catch((err) => {
			console.log(err.message);
			setMensajeError(handleError(err.code, err.message));
		});
};

//Cerrar Sesión
export const logoutUsuario = () => {
	const auth = getAuth(appFirebase);
	signOut(auth);
};

//Registrar Usuario
export const registroUsuario = (formData, setFormData) => {
	const { correo, contrasenia } = formData;
	const auth = getAuth(appFirebase);

	if (!correo || !contrasenia) return;

	createUserWithEmailAndPassword(auth, correo, contrasenia)
		.then((result) => console.log(result))
		.catch((err) =>
			setFormData({ ...formData, error: handleError(err.code, err.message) })
		);
};

function handleError(code, message) {
	switch (code) {
		case "auth/wrong-password":
			return "Correo o contraseña incorrectos.";
		case "auth/user-not-found":
			return "Correo o contraseña incorrectos.";
		case "auth/invalid-credential":
			return "Correo o contraseña incorrectos.";
		case "auth/invalid-email":
			return "Por favor valida que el correo electrónico este escrito correctamente.";
		case "auth/weak-password":
			return "La contraseña debe tener al menos 6 caracteres.";
		case "auth/email-already-in-use":
			return "La dirección de correo electrónico ya se encuentra en uso.";
		default:
			return message;
	}
}
