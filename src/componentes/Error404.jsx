//NO BORRAR
/* eslint-disable react/no-unescaped-entities */

import { useContext } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { ConstantesContext } from "./contexts/ConstantesContext";
import { ColorModeContext } from "./contexts/ModoClaOscContext";

import Error404img from "../assets/Error404.png";
import Error404img_n from "../assets/Error404_n.png";
import { MdOutlineHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";

//====================================================================
//------------------ Componente Principal ----------------------------
export const Error404 = () => {
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { mode } = useContext(ColorModeContext);

	const navegar = useNavigate();

	const paginaInicio = () => {
		navegar("/");
	};

	//===========================
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
			}}
		>
			<CardMedia
				sx={{ width: "50%" }}
				component="img"
				image={mode === "dark" ? Error404img : Error404img_n}
				alt="Error 404. Página no encontrada."
			/>
			<Typography
				sx={{
					fontSize: { xs: "1.5rem", md: "2rem" },
					fontStyle: "italic",
					textShadow: "0px 0px 15px black",
					textAlign: "center",
					marginTop: "30px",
				}}
			>
				Baby Store
			</Typography>
			<Typography
				sx={{
					fontSize: { xs: "0.8rem", md: "1rem" },
					textAlign: "Center",
					margin: "15px",
				}}
			>
				Somos una tienda online con excelentes artículos para bebes y niños
				hasta 6 años. Trabajamos con marcas de representación oficial en
				Argentina, y ofrecemos envíos a todo el país.
			</Typography>
			<Typography
				sx={{
					fontSize: { xs: "0.8rem", md: "1rem" },
					textAlign: "Center",
					margin: "15px",
					fontWeight: "bold",
				}}
			>
				Le invitamos a visitar nuestra tienda online.
			</Typography>
			<Button
				variant="contained"
				endIcon={<MdOutlineHome />}
				onClick={paginaInicio}
			>
				Página Inicio
			</Button>
		</Box>
	);
};
