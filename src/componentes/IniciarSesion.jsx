import { useContext } from "react";
import Typography from "@mui/material/Typography";

import { Button, Card, CardContent, Box, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { ConstantesContext } from "../contexts/ConstantesContext";
//Importar módulos defirebas
import appFirebase from "./FirebaseCredenciales";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth(appFirebase);

//====================================================================
//------------------ Componente Principal ----------------------------
export const IniciarSesion = () => {
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);

	const navegar = useNavigate();

	const iniciarSesion = async (event) => {
		event.preventDefault();

		const correo = event.target[0].value;
		const contrasenia = event.target[2].value;

		await signInWithEmailAndPassword(auth, correo, contrasenia);
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
					Inicio de Sesión
				</Typography>

				<CardContent>
					<Box component="form" onSubmit={iniciarSesion}>
						<Box sx={{ margin: "20px 0px" }}>
							<TextField
								type="email"
								error={false}
								id="email"
								label=" Email "
								helperText="Email no existe"
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>

						<Box sx={{ margin: "20px 0px" }}>
							<TextField
								type="password"
								error={false}
								id="contrasenia"
								label=" Contraseña "
								helperText="Contraseña incorrecta"
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Button
								sx={{ width: "160px", marginRight: "20px" }}
								variant="outlined"
								onClick={cancelar}
							>
								Cancelar
							</Button>
							<Button type="submit" sx={{ width: "160px" }} variant="contained">
								Iniciar Sesión
							</Button>
						</Box>
					</Box>
				</CardContent>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography sx={{ fontSize: "0.8rem" }}>
						¿No tenés cuenta aún?
					</Typography>
					<Button size="small" variant="text">
						Crear una Cuenta
					</Button>
				</Box>
			</Card>
		</Box>
	);
};
