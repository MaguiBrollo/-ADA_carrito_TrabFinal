import { useContext } from "react";
import { Box } from "@mui/material";

import { articulos } from "../utils/Articulos";
import { ArticuloCard } from "./ArticuloCard";

import { ValoresConstantes } from "./contexts/ConstantesContext";

export const ArticulosListar = () => {
	const { anchoMaximo } = useContext(ValoresConstantes);

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
			{articulos.map((art) => {
				return <ArticuloCard key={art.ID} art={art} />;
			})}
		</Box>
	);
};
