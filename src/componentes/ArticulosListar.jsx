import { useContext, useState, useMemo, useEffect } from "react";
import { Box, Pagination, Stack, Typography } from "@mui/material";

import { ArticuloCard } from "./ArticuloCard";
import { ConstantesContext } from "./contexts/ConstantesContext";
import { FirebaseContext } from "./contexts/FirebaseContext";

//====================================================================
//------------------ Componente Principal ----------------------------
export const ArticulosListar = () => {
	const [pagina, setPagina] = useState(1);
	const [cantPaginas, setCantPaginas] = useState(0);
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { articulosMostrar, mostrarTitulo } = useContext(FirebaseContext);

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
						/* "& .Mui-selected": {
							color: "blue", // Color de los números activos
						}, */
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
					return <ArticuloCard key={art.ID} art={art} />;
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
		</Box>
	);
};
