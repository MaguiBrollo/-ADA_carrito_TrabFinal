import { useContext } from "react";
import { Box, Button, Card, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

//Importar módulos defirebas
import appFirebase from "./FirebaseCredenciales";
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth(appFirebase);

import { ConstantesContext } from "../contexts/ConstantesContext";

//====================================================================
//------------------ Componente Principal ----------------------------
export const CerrarSesion = () => {
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);

	const navegar = useNavigate();

	const cerrarSesion = async (event) => {
		event.preventDefault();
		await signOut(auth);
      navegar("/");
	};

	const cancelar = () => {
		navegar("/");
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
				width: "100%",
			}}
		>
			<Card
				sx={{
					width: "100%",
					maxWidth: { xs: "345px", sm: "450px", md: "600px" },
					backgroundColor: "background.secondary",
					border: "1px solid #000",
					boxShadow: 24,
					color: "text.secondary",
					padding: "15px",
					display: "flex",
					flexDirection: "column",
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
					Baby Store
				</Typography>
				<Typography
					sx={{
						fontSize: { xs: "1rem", md: "1.5rem" },
						fontStyle: "italic",
						padding: "0px 10px",
					}}
				>
					Cerrar Sesión
				</Typography>

				<Typography sx={{ margin: "20px auto" }}>
					¿Está seguro que desea cerrar sesión?
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Button
						sx={{ width: "160px", marginRight:"20px" }}
						onClick={cerrarSesion}
						variant="outlined"
					>
						Cerrar Sesión
					</Button>
					<Button
						sx={{ width: "160px" }}
						variant="contained"
						onClick={cancelar}
					>
						Cancelar
					</Button>
				</Box>
			</Card>
		</Box>
	);
};
