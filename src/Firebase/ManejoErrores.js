//-----------------------------------------
//Manejo de Errores
export const handleError = (code, message) => {
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
		case "auth/missing-email":
			return "La dirección de correo electrónico no se encuentra.";
		default:
			return message;
	}
};
