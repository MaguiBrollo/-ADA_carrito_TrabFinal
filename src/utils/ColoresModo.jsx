import { grey } from "@mui/material/colors";

//colores, ver img en carpeta: img de los tp
export const ModoClaro = {
	primary: {
		main: "#00899A", // +oscuro - 5
	},
	secondary: {
		main: "#B1E1EA", //+clarito - 1
	},

	background: {
		default: "#B1E1EA", //+clarito - 1  - fondo ppal
		paper: "#00899A", // +oscuro - 5   - navbar
		icons: "#00B4C5", // intermedio - 3  - fondo iconos en xs
	},
	/* text: {
		primary: "#FFFFFF", //blanco
		secondary: grey[200],
		iconos: grey[600],
	},
	button: {
		textHover: grey[200],
		hover: "#2A2239",
	}, */
	error: {
		main: "#FFEB3B", //amarillo
	},
};

export const ModoOscuro = {
	primary: {
		main: grey[800], //navbar fondo iconos
	},
	secondary: {
		main: grey[400],
	},
	background: {
		default: grey[400], // fondo ppal
		paper: grey[800], //- navbar
		icons: grey[500], //fondo iconos en xs
	},
	/* text: {
		primary: "#FFFFFF", //blanco
		secondary: grey[200],
		iconos: grey[800],
	},
	button: {
		textHover: grey[200],
		hover: grey[900],
	}, */
	error: {
		main: "#FFEB3B", //amarillo
	},
};
