import { useContext } from "react";
import { Box } from "@mui/material";
import { CarruselPpal } from "./CarruselPpal";
import { Nosotros } from "./Nosotros";
import { ConstantesContext } from "./contexts/ConstantesContext";

export const Inicio = () => {
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
			}}
		>
			<CarruselPpal />
			<Nosotros />
		</Box>
	);
};
