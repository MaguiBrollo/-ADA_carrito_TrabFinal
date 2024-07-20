import { useContext, useState, useMemo, useEffect } from "react";
import {
	Box,
	CardMedia,
	IconButton,
	Modal,
	Pagination,
	Stack,
	Typography,
} from "@mui/material";

import { ArticuloCard } from "./ArticuloCard";
import { ArticuloVerMas } from "./ArticuloVerMas";

import { ConstantesContext } from "../contexts/ConstantesContext";
import { FirebaseContext } from "../contexts/FirebaseContext";
import { MdClose } from "react-icons/md";

const style = {
	position: "absolute",
	top: "15%",
	right: "5%",

	width: "180px",
	bgcolor: "background.default",
	border: "2px solid #000",
	boxShadow: 24,
	p: 1,
};

//====================================================================
//------------------ Componente Principal ----------------------------
export const ArticulosListar = () => {
	const [artParaVerMas, setArtParaVerMas] = useState({});
	const [abrirVerMas, setAbrirVerMas] = useState(false);
	const [pagina, setPagina] = useState(1);
	const [cantPaginas, setCantPaginas] = useState(0);
	const [abrirAgregadoCarrito, setAbrirAgregadoCarrito] = useState(false);

	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { articulosMostrar, mostrarTitulo, artiParaAgregarCarrito } =
		useContext(FirebaseContext);

	const cantArtiPorPagina = 8;

	useEffect(() => {
		setPagina(1);
		setCantPaginas(Math.ceil(articulosMostrar.length / cantArtiPorPagina));
	}, [articulosMostrar]);

	const articulosPorPagina = useMemo(
		() =>
			articulosMostrar.slice(
				(pagina - 1) * cantArtiPorPagina,
				(pagina - 1) * cantArtiPorPagina + cantArtiPorPagina
			),
		[articulosMostrar, pagina]
	);

	//----- Muestra la paginación ----
	const Paginacion = () => {
		const handleChange = (event, value) => {
			setPagina(value);
		};
		return (
			<Stack spacing={2}>
				<Pagination
					size="small"
					count={cantPaginas}
					page={pagina}
					onChange={handleChange}
					color="primary"
					sx={{
						"& .MuiPaginationItem-root": {
							color: "text.secondary", // Color de los números no activos
							":hover": {
								backgroundColor: "button.hoverBack",
								color: "button.hoverText",
							},
						},
					}}
				/>
			</Stack>
		);
	};

	//===========================
	return (
		<Box
			sx={{
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{articulosMostrar.length > 0 ? (
				<>
					<Box
						sx={{
							width: "100%",
							maxWidth: `${anchoMaximo}px`,
							margin: "5px",
						}}
					>
						<Typography sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
							{mostrarTitulo}
						</Typography>
						<Typography sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
							{articulosMostrar.length > cantArtiPorPagina
								? " (Página: " + pagina + ")"
								: ""}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "grid",
							gap: "20px",
							gridTemplateColumns: {
								xs: "1fr",
								sm: "1fr 1fr",
								md: "1fr 1fr 1fr",
								lg: "1fr 1fr 1fr 1fr",
							},
						}}
					>
						{articulosPorPagina.map((art) => {
							return (
								<ArticuloCard
									key={art.ID}
									art={art}
									setAbrirVerMas={setAbrirVerMas}
									setArtParaVerMas={setArtParaVerMas}
								/>
							);
						})}
					</Box>
					{articulosMostrar.length > cantArtiPorPagina ? (
						<Box
							sx={{
								width: "100%",
								margin: "35px 0px 10px 0px",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Paginacion />
						</Box>
					) : (
						""
					)}

					{/* ------ Modal Ver más detalles/Comprar un art. -------- */}
					{abrirVerMas && (
						<ArticuloVerMas
							abrirVerMas={abrirVerMas}
							setAbrirVerMas={setAbrirVerMas}
							artParaVerMas={artParaVerMas}
							setAbrirAgregadoCarrito={setAbrirAgregadoCarrito}
						/>
					)}

					{/* ------ Modal de "Artículo agregado al Carrito" -------- */}
					{abrirAgregadoCarrito && (
						<Modal
							open={abrirAgregadoCarrito}
							onClose={() => setAbrirAgregadoCarrito(false)}
							aria-labelledby="agregado-carrito-titulo"
							aria-describedby="agregado-carrito-descripcion"
						>
							<Box sx={style}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
										justifyContent: "space-between",
									}}
								>
									<Typography
										id="agregado-carrito-titulo"
										sx={{ fontSize: "0.7rem", fontWeight: "bold" }}
									>
										Carrito de Compras
									</Typography>
									<IconButton
										size="small"
										aria-label="Cerrar aviso"
										color="inherit"
										onClick={() => setAbrirAgregadoCarrito(false)}
									>
										<MdClose />
									</IconButton>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<CardMedia
										component="img"
										sx={{
											width: "20%",
											maxWidth: "60px",
											margin: "10px",
										}}
										image={artiParaAgregarCarrito.imagen}
									/>
									<Typography
										id="agregado-carrito-descripcion"
										sx={{ fontSize: "0.7rem" }}
									>
										{artiParaAgregarCarrito.nombre}
									</Typography>
								</Box>
								<Typography
									id="agregado-carrito-descripcion"
									sx={{ fontSize: "0.7rem" }}
								>
									{"Artículo agregado al carrito. "}
								</Typography>
							</Box>
						</Modal>
					)}
				</>
			) : (
				<Box
					sx={{
						margin: "20px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography>
						No hay artículos para mostrar. Vuelva a filtrar/buscar.
					</Typography>
				</Box>
			)}
		</Box>
	);
};
