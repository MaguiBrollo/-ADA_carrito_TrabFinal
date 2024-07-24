import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import {
	Button,
	Card,
	CardContent,
	Box,
	TextField,
	Alert,
	FormControl,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import { ConstantesContext } from "../contexts/ConstantesContext";

import { loginUsuario } from "../Firebase/Autenticacion";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

//====================================================================
//------------------ Componente Principal ----------------------------
export const IniciarSesion = () => {
	const [alertaError, setAlertaError] = useState(false);
	const [mensajeError, setMensajeError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const navegar = useNavigate();

	//Iiniciar SS
	const iniciarSesion = (event) => {
		event.preventDefault();
		setMensajeError("");
		if (event.target[0].value === "" || event.target[2].value === "") {
			setMensajeError("Email o contraseña vacío.");
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

	const quiereCrearCuenta = () => {
		navegar("/crearcuenta");
	};

	const cancelar = () => {
		navegar("/");
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
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
								id="email"
								label=" Email "
								fullWidth
								inputProps={{ style: { color: "black" } }}
								autoComplete="off"
							/>
						</Box>

						<FormControl sx={{ width: "100%" }} variant="outlined">
							<InputLabel htmlFor="ver-contrasenia">Contraseña</InputLabel>
							<OutlinedInput
								id="ver-contrasenia"
								type={showPassword ? "text" : "password"}
								inputProps={{
									"aria-label": "Ingrese ontraseña",
									style: { color: "black" },
								}}
								autoComplete="off"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="Cambiar visibilidad de la contraseña"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? (
												<MdOutlineVisibilityOff />
											) : (
												<MdOutlineVisibility />
											)}
										</IconButton>
									</InputAdornment>
								}
								label=" Contraseña "
							/>
						</FormControl>

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
								marginTop: "25px",
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
						¿No tiene cuenta aún?
					</Typography>
					<Button size="small" variant="text" onClick={quiereCrearCuenta}>
						Crear una Cuenta
					</Button>
				</Box>
			</Card>
		</Box>
	);
};
