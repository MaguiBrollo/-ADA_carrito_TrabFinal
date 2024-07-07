import { grey, deepPurple } from "@mui/material/colors";

export const ModoClaro = {
	primary: {
		main: deepPurple[600], //calendario: botones inferior
	},
	secondary: {
		main: deepPurple[500],
	},

	background: {
		default: deepPurple[200],
		paper: deepPurple[800], //calendario: fondo,
		tableHead: "#5034c9",
		tableRows: "#6355E6",
	},
	text: {
		primary: "#FFFFFF", //calendario: título, nro, días
		secondary: grey[200],
		iconos: grey[600],
	},
	button: {
		textHover: grey[200],
		hover: "#2A2239",
	},
	error: {
		main: "#FFEB3B", //amarillo
	},
};

export const ModoOscuro = {
	primary: {
		main: grey[800], //navbar fondo iconos
	},
	secondary: {
		main: grey[800],
	},
	background: {
		default: grey[700],  //fondo iconos en xs
		paper: grey[800],
		tableRows: grey[600],
		tableHead: grey[700],
	},
	text: {
		primary: "#FFFFFF", //blanco
		secondary: grey[200],
		iconos: grey[800],
	},
	button: {
		textHover: grey[200],
		hover: grey[900],
	},
	error: {
		main: "#FFEB3B", //amarillo
	},
};
