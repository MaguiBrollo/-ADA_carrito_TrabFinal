import { useContext } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import { MdOutlineHome } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { ConstantesContext } from "../contexts/ConstantesContext";
import logo from "../assets/Logo_Baby.png";

//====================================================================
//------------------ Componente Principal ----------------------------
export const MuchasGracias = () => {
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const navegar = useNavigate();

	const volverInicio = () => {
		navegar("/");
	};
	//===========================
	return (
		<Box
			sx={{
				width: "100%",
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-around",
				}}
			>
				<Typography sx={{ mt: 2, mb: 1 }}>
					Todos los pasos completos - Compra Finalizada.
				</Typography>
				<Box
					sx={{
						margin: "20px auto",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent:"space-around"
					}}
				>
					<Typography
						sx={{
							fontSize: { xs: "1.5rem", md: "2rem" },
							fontStyle: "italic",
							textShadow: "0px 0px 15px black",
							padding: "10px",
						}}
					>
						¡Muchas Gracias!
					</Typography>
					<Typography
						sx={{
							fontSize: { xs: "1rem", md: "1.5rem" },
							fontStyle: "italic",
							padding: "0px 10px",
						}}
					>
						por confiar en Baby Store
					</Typography>
					<CardMedia
						sx={{ width: "50%" }}
						component="img"
						image={logo}
						alt="Logo Baby Store"
					/>
					<Typography
						sx={{
							fontSize: { xs: "0.8rem", md: "1rem" },
							fontStyle: "italic",
							padding: "10px",
						}}
					>
						Le invitamos a seguir recorriento nuestro store online.
					</Typography>
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button
							variant="contained"
							onClick={volverInicio}
							endIcon={<MdOutlineHome />}
						>
							Inicio
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
