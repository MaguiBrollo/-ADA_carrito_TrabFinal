/* eslint-disable react/no-unescaped-entities */
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
				margin: "20px 0px",
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
					"Baby Store" es una tienda online con excelentes artículos
					para bebes y niños hasta 6 años. Trabajamos con marcas de
					representación oficial en Argentina, y ofrecemos envíos a todo el
					país.
				</Typography>
			</Box>
		</Box>
	);
};
