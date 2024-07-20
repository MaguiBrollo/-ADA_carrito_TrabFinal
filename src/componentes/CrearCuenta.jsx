import { useContext, useEffect, useState } from "react";

import {
	Button,
	Card,
	CardContent,
	Box,
	TextField,
	Typography,
	Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";

import { ConstantesContext } from "../contexts/ConstantesContext";

import { crearCuentaUsuario } from "../Firebase/Autenticacion";
import { IoCloudUploadOutline } from "react-icons/io5";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const controlarDatos = (event, setMensajeError) => {
	if (event.target[0].value === "") {
		setMensajeError("Email vacío.");
		return false;
	}

	if (event.target[2].value === "" || event.target[4].value === "") {
		setMensajeError("Contraseña vacía.");
		return false;
	}

	if (event.target[2].value.length < 6) {
		setMensajeError("La contraseña debe tener seis o más caracteres.");
		return false;
	}

	if (event.target[2].value !== event.target[4].value) {
		setMensajeError("Contraseña y confirmar contraseña no coinicen.");
		return false;
	}
	if (event.target[6].value === "") {
		setMensajeError("Nombre vacío.");
		return false;
	}
   return true;
};

//====================================================================
//------------------ Componente Principal ----------------------------
export const CrearCuenta = () => {
	const [alertaError, setAlertaError] = useState(false);
	const [mensajeError, setMensajeError] = useState("");

	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);

	const navegar = useNavigate();

	//Iniciar SS
	const iniciarSesion = (event) => {
		event.preventDefault();
		setMensajeError("");
		if (controlarDatos(event, setMensajeError)) {
			crearCuentaUsuario(
				event.target[0].value,
				event.target[2].value,
				setMensajeError
			);
		} else {
			setAlertaError(true);
			setTimeout(() => {
				setAlertaError(false);
			}, 4000);
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

	const quiereIniciarSesion = () => {
		navegar("/iniciarsesion");
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
					Crear una cuenta
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

						<Box sx={{ margin: "20px 0px" }}>
							<TextField
								type="password"
								id="confirmarcontrasenia"
								label=" Confirmar Contraseña "
								helperText="Repita la contraseña."
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>

						<Box sx={{ margin: "20px 0px" }}>
							<TextField
								type="text"
								id="nombre"
								label=" Nombre "
								helperText="Ingrese su nombre."
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>

						<Box
							sx={{
								display: "Flex",
								flexDirection: "row",
								alignItems: "center",
								margin: "10px 10px 20px 10px",
							}}
						>
							<Typography sx={{ marginRight: "10px" }}>
								Subir imagen de usuario:
							</Typography>
							<Button
								variant="outlined"
								component="label"
								role={undefined}
								tabIndex={-1}
								startIcon={<IoCloudUploadOutline />}
							>
								Archivo de imagen
								<VisuallyHiddenInput type="file" />
							</Button>
						</Box>

						{alertaError && (
							<Alert
								sx={{ margin: "25px auto" }}
								severity="warning"
								color="warning"
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
								Crear Cuenta
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
						¿Tiene una cuenta?
					</Typography>
					<Button size="small" variant="text" onClick={quiereIniciarSesion}>
						Inicia Sesión
					</Button>
				</Box>
			</Card>
		</Box>
	);
};
