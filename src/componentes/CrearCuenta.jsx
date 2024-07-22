import { useContext, useEffect, useState } from "react";

import {
	Button,
	Card,
	CardContent,
	Box,
	TextField,
	Typography,
	Alert,
	CardMedia,
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
	const [datosUsuario, setDatosUsuario] = useState({
		imagen:
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAG1BMVEXMzMyWlpa3t7eqqqqcnJyjo6PFxcWxsbG+vr6NAD6nAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACjklEQVR4nO3XO2/bMBDA8fNTGn2OlGS00S8QAWnnaKi7xnBQdJSBFl3joY/RRpHv3SNFykYtdKOm/w8BHOkOIM3HkRYBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/uddvWvsI38sj+7xT/2lJ2n8WH64iMbkdCaqurTPteqda98eX6+zKnu9OkdDckIH3W21kbmWlR5F9rrT+6ukTMv3ettFY3JC9UZyfZBJ0czrZxuWjXwtr5KmRSOnmy4ak9PJ3bc+PMveJvJ0a+OwslfNv1knG6Ks7KIhOaGxulYXsl7YmNy1j/XV4nLRXLtoSE4oczN2epLK5mRSuj/x/7tuPImfOfHDKXnRRUNyaq6l17bhu7aX/q1N1fY8Va7TIRqSE/tuS2a78i3Nludu7QsbsW4+54dlFw3JadVqM1Uf3b6XqSsO+4V/n+nrtGt7qrZdYzQkp6WuFLUtNW3DYebqzXoZk0ZqWzZGQ3LqblmLvhFtRq5Ho9Ct9c25OI1c52M0JKftlrzpc+9ozfSilOfbctjRsv226FtbtuBvLpJmOuza8hW7Zyfa4lpeJFl5H24nZr/Fz4srReNQt9ahW5nGpn8d/azFaEhOyJ8hNi+HtnBn5yrvClcsW+44slmL0UPyKj8Jh0/fmVjd12HxV+3hM+CZ6DZUFW4Q9+GOcPShuT6sw5o/3PovEKMhOaG5frZBWPXdt2a2xkMV2JeNuNI62H1LqmJXF9J3O7XbQ65t4xP9+OguFMPdTr9Zkd9I313eLaxt28X5VtUuqAPe5eVH/ckalPyl/THzFn/5jF0H9qEMZC/Fz4toTAYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjpL514clJrNSt2AAAAAElFTkSuQmCC",
	});

	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);

	const navegar = useNavigate();

	const manejarImagen = (e) => {
		e.preventDefault();

		var file = e.target.files[0];
		var reader = new FileReader();
		reader.onloadend = function () {
			setDatosUsuario({ ...datosUsuario, imagen: `${reader.result}` });
		};

		reader.readAsDataURL(file);
	};

	//Crear una cuenta
	const crearCuenta = (event) => {
		event.preventDefault();
		setMensajeError("");
		if (controlarDatos(event, setMensajeError)) {
			const datos = datosUsuario;
			datos.idUsuario = "";
			datos.correo = event.target[0].value;
			datos.contrasenia = event.target[2].value;
			datos.nombre = event.target[6].value;
			//imagen: se guarda en manejarImagen
			datos.carritoAbierto = 0;
			datos.carritoCerrado = [];

			crearCuentaUsuario(datos, setMensajeError);
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
		setDatosUsuario({});
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
					<Box component="form" onSubmit={crearCuenta}>
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
								justifyContent: "space-around",
								margin: "10px 10px 20px 10px",
							}}
						>
							<Box>
								<Typography sx={{ marginBottom: "10px" }}>
									Imagen de perfil
								</Typography>

								<Button
									onChange={manejarImagen}
									variant="outlined"
									component="label"
									role={undefined}
									tabIndex={-1}
									startIcon={<IoCloudUploadOutline />}
								>
									Imagen
									<VisuallyHiddenInput type="file" />
								</Button>
							</Box>
							<CardMedia
								component="img"
								image={datosUsuario.imagen}
								alt="Imagen de usuario"
								sx={{
									maxWidth: "80px",
									margin: "10px",
									borderRadius: "50%",
									boxShadow: "0px 0px 15px black",
								}}
							/>
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
