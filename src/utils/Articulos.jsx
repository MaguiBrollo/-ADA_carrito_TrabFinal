import magui from "../assets/magui.png";
import maria from "../assets/maria.png";

export const usuarios = [
	{
		idUsuario: "LYi40iHIj7OYuy9muY9wiwlNi4x1",
		nombre: "MAGUI",
		imagen: magui,
		email: "rosa@gmail.com",
		password: "123",
		carritoAbierto: 2,
		carritoCerrado: [1, 2],
	},
	{
		idUsuario: "bwNjElhPZ8MtBPkfqLO0NXwxuj02",
		nombre: "MARIA ROSA",
		imagen: maria,
		email: "maria@gmail.com",
		password: "123",
		carritoAbierto: 0,
		carritoCerrado: [],
	},
];

export const ordenes = [
	{
		idOrden: 1,
		fecha: "2024/06/15",
		total: 82000.25,
		cerrado: true,
		articulos: [
			{
				idArticulo: 1,
				nombre: "CAMPERA NENA 1",
				precio: 45000.25,
				cantidad: 1,
				imagen: ropa,
			},
			{
				idArticulo: 2,
				nombre: "CAMPERA MARRON LINDO PRECIO 2",
				precio: 37000.0,
				cantidad: 1,
				imagen: ropa,
			},
		],
	},
	{
		idOrden: 2,
		fecha: "2024/07/02",
		total: 102000.25,
		cerrado: false,
		articulos: [
			{
				idArticulo: 1,
				nombre: "CAMPERA NENA 1",
				precio: 45000.25,
				cantidad: 1,
				imagen: ropa,
			},
			{
				idArticulo: 2,
				nombre: "CAMPERA MARRON LINDA 2",
				precio: 37000.0,
				cantidad: 1,
				imagen: ropa,
			},
			{
				idArticulo: 4,
				nombre: "CARDIGAN NENA 4",
				precio: 20000.0,
				cantidad: 2,
				imagen: ropa,
			},
		],
	},
];

import ropa from "../assets/ropa.png";

export const categorias = [
	{
		idCateg: "1",
		categoria: "ABRIGOS",
		cantidad: 0,
	},
	{
		idCateg: "2",
		categoria: "ACCESORIOS",
		cantidad: 0,
	},
	{
		idCateg: "3",
		categoria: "CAMISAS",
		cantidad: 0,
	},
	{
		idCateg: "4",
		categoria: "CONJUNTOS",
		cantidad: 0,
	},
	{
		idCateg: "5",
		categoria: "GORROS",
		cantidad: 0,
	},
	{
		idCateg: "6",
		categoria: "JARDINEROS",
		cantidad: 0,
	},
	{
		idCateg: "7",
		categoria: "MONITOS",
		cantidad: 0,
	},
	{
		idCateg: "8",
		categoria: "PANTALONES",
		cantidad: 0,
	},
	{
		idCateg: "9",
		categoria: "REMERAS",
		cantidad: 0,
	},
	{
		idCateg: "10",
		categoria: "VESTIDOS",
		cantidad: 0,
	},
];

export const articulos = [
	{
		ID: 1,
		nombre: "CAMPERA NENA 1",
		categoriaId: "1",
		precio: 45000.25,
		descripcion: "CARDIGAN FRISA ESTAMPADA.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN FRISA ESTAMPADA. COMPOSICIÓN: 88% ALGODÓN-12% POLIESTER.",
		stock: 1,
	},
	{
		ID: 2,
		nombre: "CAMPERA MARRON LINDO PRECIO 2",
		categoriaId: "1",
		precio: 37000.0,
		descripcion: "CAMPERA CORDERITO DOBLE.",
		imagen: ropa,
		descripcionLarga:
			"CAMPERA CORDERITO DOBLE. LA MEJOR OPCIÓN PARA MANTENER ABRIGADO AL BEBE. MUY CALENTITA POR SU CORDERITO DOBLE SHERPA.",
		stock: 2,
	},
	{
		ID: 3,
		nombre: "CAMPERA VIOLETA 3",
		categoriaId: "1",
		precio: 19900.25,
		descripcion: "CAMPERA ESTAMPADA CON CAPUCHA.",
		imagen: ropa,
		descripcionLarga:
			"CAMPERA ESTAMPADA, CON CAPUCHA CONFECCIONADA EN FRISA. CUENTA CON BROCHES A PRESIÓN. DISPONIBLE EN TALLES DE 0 A 12 MESES.",
		stock: 5,
	},
	{
		ID: 4,
		nombre: "CARDIGAN NENA 4",
		categoriaId: "1",
		precio: 34000.25,
		descripcion: "CARDIGAN DE PLUSH CON BORDADO.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN DE PLUSH CON BORDADO. COMPOSICION: 80% ALGODÓN 20% POLIESTER",
		stock: 20,
	},
	{
		ID: 5,
		nombre: "CAMPERA GRIS 5",
		categoriaId: "1",
		precio: 34000.25,
		descripcion: "CARDIGAN DE FRISA MELANGE.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN DE FRISA MELANGE, CON MANGAS COMBINADAS.TIENE BROCHES METÁLICOS EN CARTERA Y PUÑOS TEJIDOS. CON APLIQUE BORDADO. COMPOSICIÓN: 80% ALGODÓN- 20% POLIESTER.",
		stock: 20,
	},
	{
		ID: 6,
		nombre: "CAMPERA NENA CRUDO 6",
		categoriaId: "1",
		precio: 34000.25,
		descripcion: "ABRIGO DE PIELCITA.",
		imagen: ropa,
		descripcionLarga:
			"ABRIGO DE PIELCITA FORRADO EN JERSEY. COMPOSICIÓN: EXT. 100% POLIESTER - FORRO 65% POLIESTER- 35% ALGODÓN.",
		stock: 2,
	},

	{
		ID: 7,
		nombre: "CAMPERA RAYAS COLORES 7",
		categoriaId: "1",
		precio: 34000.25,
		descripcion: "CAMPERA DE NYLON CON RECORTES.",
		imagen: ropa,
		descripcionLarga:
			"CAMPERA DE NYLON CON RECORTES, FORRERIA EN TAFETA. COMPOSICION: 100% POLIESTER.",
		stock: 12,
	},
	{
		ID: 8,
		nombre: "CARDIGAN NENA 8",
		categoriaId: "1",
		precio: 40000.25,
		descripcion: "CARDIGAN DE FRISA.",
		imagen: ropa,
		descripcionLarga: "CARDIGAN DE FRISA. COMPOSICIÓN: 96% ALGODÓN-4% ELASTANO",
		stock: 20,
	},

	{
		ID: 9,
		nombre: "CARDIGAN NEGRO 9",
		categoriaId: "1",
		precio: 12000.0,
		descripcion: "CARDIGAN DE FRISA.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN DE FRISA MELANGE UNISEX. COMPOSICIÓN 80 ALGODÓN, 20% POLIESTER. ",
		stock: 8,
	},

	{
		ID: 10,
		nombre: "CARDIGAN VERDE 10",
		categoriaId: "2",
		precio: 35000.25,
		descripcion: "CARDIGAN DE FRISA.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN DE FRISA, TIENE CALCE HOMBRO CAÍDO. ESTAMPA CON ALTURA EN ESPALDA. COMPOSICIÓN: 86% ALGODÓN- 14% POLIESTER.",
		stock: 20,
	},

	{
		ID: 11,
		nombre: "CARDIGAN NENA 11",
		categoriaId: "3",
		precio: 40000.25,
		descripcion: "CARDIGAN DE FRISA.",
		imagen: ropa,
		descripcionLarga: "CARDIGAN DE FRISA. COMPOSICIÓN: 96% ALGODÓN-4% ELASTANO",
		stock: 20,
	},

	{
		ID: 12,
		nombre: "CARDIGAN NEGRO 12",
		categoriaId: "3",
		precio: 12000.0,
		descripcion: "CARDIGAN DE FRISA.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN DE FRISA MELANGE UNISEX. COMPOSICIÓN 80 ALGODÓN, 20% POLIESTER. ",
		stock: 8,
	},

	{
		ID: 13,
		nombre: "CARDIGAN VERDE 13",
		categoriaId: "3",
		precio: 35000.25,
		descripcion: "CARDIGAN DE FRISA.",
		imagen: ropa,
		descripcionLarga:
			"CARDIGAN DE FRISA, TIENE CALCE HOMBRO CAÍDO. ESTAMPA CON ALTURA EN ESPALDA. COMPOSICIÓN: 86% ALGODÓN- 14% POLIESTER.",
		stock: 20,
	},
	{
		ID: 14,
		nombre: "VESTIDOS HERMOSOS 14",
		categoriaId: "10",
		precio: 35000.25,
		descripcion: "VESTIDO DE FRISA.",
		imagen: ropa,
		descripcionLarga:
			"VESTIDO DE FRISA, TIENE CALCE HOMBRO CAÍDO. ESTAMPA CON ALTURA EN ESPALDA. COMPOSICIÓN: 86% ALGODÓN- 14% POLIESTER.",
		stock: 20,
	},
];
