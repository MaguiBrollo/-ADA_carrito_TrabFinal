import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { ArticuloCard } from "./ArticuloCard";
import { ConstantesContext } from "./contexts/ConstantesContext";
import { FirebaseContext } from "./contexts/FirebaseContext";

export const ArticulosListar = () => {

	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { articulosMostrar, mostrarTitulo } =
		useContext(FirebaseContext);


	//===========================
	return (
		<Box
			sx={{
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
			}}
		>
			<Typography sx={{ fontSize: "0.8rem", fontStyle: "italic" }}>
				{mostrarTitulo}
			</Typography>

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
				{articulosMostrar.map((art) => {
					return <ArticuloCard key={art.ID} art={art} />;
				})}
			</Box>
		</Box>
	);
};
