import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import {
	Button,
	Card,
	CardContent,
	Box,
	TextField,
	Alert,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { ConstantesContext } from "../contexts/ConstantesContext";

import { loginUsuario } from "../Firebase/Autenticacion";

//====================================================================
//------------------ Componente Principal ----------------------------
export const IniciarSesion = () => {
	const [alertaError, setAlertaError] = useState(false);
	const [mensajeError, setMensajeError] = useState("");

	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);

	const navegar = useNavigate();

	//Iiniciar SS
	const iniciarSesion = (event) => {
		event.preventDefault();
		setMensajeError("");
		if (event.target[2].value === "") {
			setMensajeError("Email o contraseña vacío..");
			setAlertaError(true);
			setTimeout(() => {
				setAlertaError(false);
			}, 4000);
		} else {
			loginUsuario(
				event.target[0].value,
				event.target[2].value,
				setMensajeError
			);
		}
	};

	useEffect(() => {
		if (mensajeError.length > 0) {
			setAlertaError(true);

			setTimeout(() => {
				setAlertaError(false);
			}, 4000);
		} else {
			setAlertaError(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mensajeError]);

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
								/* error={false} */
								id="email"
								label=" Email "
								helperText="Ingrese email."
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>

						<Box sx={{ margin: "20px 0px" }}>
							<TextField
								type="password"
								id="contrasenia"
								label=" Contraseña "
								helperText="Ingrese contraseña."
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>

						{alertaError && (
							<Alert
								sx={{ margin: "25px auto" }}
								variant="outlined"
								severity="warning"
								onClose={() => setAlertaError(false)}
							>
								{mensajeError}
							</Alert>
						)}
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Button
								sx={{ marginRight: "15px" }}
								variant="outlined"
								onClick={cancelar}
							>
								Cancelar
							</Button>
							<Button type="submit" variant="contained">
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
