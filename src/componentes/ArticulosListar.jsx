import { useContext } from "react";
import { Box } from "@mui/material";

import { ArticuloCard } from "./ArticuloCard";
import { ConstantesContext } from "./contexts/ConstantesContext";
import { FirebaseContext } from "./contexts/FirebaseContext";

export const ArticulosListar = () => {
	const { anchoMaximo } = useContext(ConstantesContext);
	const { articulosMostrar } = useContext(FirebaseContext);

	//===========================
	return (
		<Box
			sx={{
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
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
	);
};
