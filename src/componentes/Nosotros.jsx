import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ValoresConstantes } from "./contexts/ConstantesContext";

export const Nosotros = () => {
	const { anchoMaximo } = useContext(ValoresConstantes);
	return (
		<Box
			sx={{
				backgroundColor: "background.secondary",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Box sx={{ maxWidth: `${anchoMaximo}px`, margin: "20px" }}>
				<Typography
					sx={{
						fontSize: { xs: "1.5rem", md: "2rem" },
						fontStyle: "italic",
						textShadow: "0px 0px 15px black",
						textAlign: "center",
					}}
				>
					Nosotros
				</Typography>
				<Typography
					sx={{
						textAlign: "Center",
						margin: "15px",
					}}
				>
					"Baby Store" es una tienda online y física con más de
					20.000 artículos para bebés y niños, como ropa y calzadoss de moda.
					Trabajamos con marcas de representación oficial en Argentina, y
					ofrecemos envíos a todo el país.
				</Typography>
			</Box>
		</Box>
	);
};
