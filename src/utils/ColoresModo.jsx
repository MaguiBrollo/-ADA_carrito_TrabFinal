import { grey } from "@mui/material/colors";

//colores, ver img en carpeta: img de los tp
export const ModoClaro = {
	primary: {
		main: "#B1E1EA", //+clarito - 1
	},
	secondary: {
		main: "#00899A", // +oscuro - 5
	},

	background: {
		default: "#B1E1EA", //+clarito - 1  - fondo ppal
		paper: "#00899A", // +oscuro - 5   - navbar
		
		secondary: "#8DD2DD", //clarito - 2  - fondo secundario
		third: "#00B4C5", // intermedio - 3  - fondo iconos en xs
		fourth: "#009EB0", // +oscuro - 4
	},
	text: {
		primary: "#FFFFFF", //blanco
		secondary: "black",
	},
	/*button: {
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
		secondary: grey[500],
	},
	text: {
		primary: "#FFFFFF", //blanco
		secondary: "black",
	},
	/*button: {
		textHover: grey[200],
		hover: grey[900],
	}, */
	error: {
		main: "#FFEB3B", //amarillo
	},
};
