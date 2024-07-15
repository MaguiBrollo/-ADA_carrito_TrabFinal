import { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { ArticuloCard } from "./ArticuloCard";
import { ConstantesContext } from "./contexts/ConstantesContext";
import { FirebaseContext } from "./contexts/FirebaseContext";

export const ArticulosListar = () => {
	const [mostrar, setMostrar] = useState("");
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { articulosMostrar, filtrarPor, categoria } =
		useContext(FirebaseContext);

	useEffect(() => {
		if (filtrarPor === "TODOS") {
			setMostrar("TODOS");
		} else {
			const cat = categoria.find((c) => {
				return c.id === filtrarPor;
			});
			setMostrar(cat.categoria);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtrarPor]);

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
				Artículos: {mostrar}{" "}
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
