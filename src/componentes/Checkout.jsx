/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from "react";

import {
	Divider,
	Box,
	Stepper,
	Step,
	StepButton,
	Button,
	Typography,
	CardMedia,
	TextField,
	Alert,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

import { formatPesos } from "../utils/Funciones.js";
import { ConstantesContext } from "../contexts/ConstantesContext";
import { LogicaContext } from "../contexts/LogicaContext";

//====================================================================
//------------------ Componente Principal ----------------------------
export const Checkout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { carrito, usuarioLogin, setGuardarCarritoCerrado } =
		useContext(LogicaContext);
	const [datos, setDatos] = useState({
		nombre: usuarioLogin.nombre,
		codigo: "",
		localidad: "",
		provincia: "",
		errorNombre: false,
		menErrorNombre: "",
		errorCodigo: false,
		menErrorCodigo: "",
		errorLocalidad: false,
		menErrorLocalidad: "",
	});
	const [alertaError, setAlertaError] = useState(false);
	
	useEffect(()=>{
		setGuardarCarritoCerrado(false)
	})
	
	const theme = useTheme();
	const steps = ["Carrito", "Datos", "Finalizar"];
	const navegar = useNavigate();

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		if (
			activeStep === 1 &&
			(datos.nombre.length < 5 ||
				datos.codigo.length !== 4 ||
				datos.localidad.length < 5 ||
				datos.provincia.length < 5)
		) {
			setAlertaError(true);
			setTimeout(() => {
				setAlertaError(false);
			}, 4000);
		} else {
			const newCompleted = completed;
			newCompleted[activeStep] = true;
			setCompleted(newCompleted);
			handleNext();
			if (allStepsCompleted()) {
				setGuardarCarritoCerrado(true);
				navegar("/muchasgracias");
			}
		}
	};

	const style = {
		width: { xs: "100%", sm: "60%" },
		bgcolor: "background.default",
		border: `1px solid ${theme.palette.primary}`,
		boxShadow: 24,
		p: 2,
		m: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	};

	/* ===============  PASO 1 ============== */
	const renderPaso1 = (
		<>
			<Typography
				sx={{ margin: "15px 10px", fontSize: { xs: "0.8rem", md: "1rem" } }}
			>
				Paso {activeStep + 1}: Controlar Artículos, Cantidad, Precio y Total.
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box sx={style}>
					<Typography
						sx={{ fontSize: "0.8rem", marginLeft: "10px", fontWeight: "bold" }}
					>
						Fecha del Carrito:{" "}
						{dayjs(carrito.fecha).format("DD/MM/YYYY - HH:mm")}hs.
					</Typography>
					<Divider />
					<Box>
						{carrito?.articulos.map((arti) => (
							<Box key={arti.idArticulo}>
								<Box
									sx={{
										display: "flex",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<CardMedia
										component="img"
										sx={{
											maxWidth: "50px",
										}}
										image={arti.imagen}
									/>

									<Box
										sx={{
											display: "flex",
											flexDirection: "column",
											width: "100%",
										}}
									>
										<Typography sx={{ fontSize: "0.8rem", marginLeft: "10px" }}>
											{arti.nombre}
										</Typography>

										<Box
											sx={{
												display: "flex",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<Typography sx={{ fontSize: "0.8rem", ml: 2 }}>
												{arti.cantidad + " x  $" + formatPesos(arti.precio)}
											</Typography>
											<Typography
												sx={{
													fontSize: "0.8rem",
													textAlign: "end",
												}}
											>
												${formatPesos(arti.cantidad * arti.precio)}
											</Typography>
										</Box>
									</Box>
								</Box>
								<Divider sx={{ margin: "5px 0px" }} />
							</Box>
						))}

						<Typography
							sx={{
								fontSize: "0.8rem",
							}}
						>
							Cantidad de Artículos: {carrito.articulos.length}
						</Typography>
						<Typography
							sx={{
								fontSize: "0.8rem",
								display: "flex",
								justifyContent: "flex-end",
								fontWeight: "bold",
							}}
						>
							Total de la compra: {"  $"} {formatPesos(carrito.total)}
						</Typography>
					</Box>
				</Box>
			</Box>
		</>
	);

	/* ===============  PASO 2 ============== */
	const cambiarNombre = (e) => {
		if (e.target.value.length < 5 || e.target.value.length > 30) {
			setDatos({
				...datos,
				nombre: e.target.value.toUpperCase(),
				errorNombre: true,
				menErrorNombre: "No puede ser vacío., 5-30 caracteres.",
			});
		} else {
			setDatos({
				...datos,
				nombre: e.target.value.toUpperCase(),
				errorNombre: false,
				menErrorNombre: "Ingrese nombre completo, 5-30 caracteres.",
			});
		}
	};
	const cambiarCodigo = (e) => {
		if (e.target.value.length > 4) {
			setDatos({
				...datos,
				codigo: e.target.value,
				errorCodigo: true,
				menErrorCodigo: "No puede ser vacío. Cuatro números.",
			});
		} else {
			setDatos({
				...datos,
				codigo: e.target.value,
				errorCodigo: false,
				menErrorCodigo: "Ingrese código postal. Cuatro números.",
			});
		}
	};

	const cambiarLocalidad = (e) => {
		if (e.target.value.length < 5 || e.target.value.length > 30) {
			setDatos({
				...datos,
				localidad: e.target.value.toUpperCase(),
				errorLocalidad: true,
				menErrorLocalidad: "No puede ser vacío., 5-30 caracteres..",
			});
		} else {
			setDatos({
				...datos,
				localidad: e.target.value.toUpperCase(),
				errorLocalidad: false,
				menErrorLocalidad: "Ingrese Localidad, 5-30 caracteres.",
			});
		}
	};
	const cambiarProvincia = (e) => {
		if (e.target.value.length < 5 || e.target.value.length > 30) {
			setDatos({
				...datos,
				provincia: e.target.value.toUpperCase(),
				errorProvincia: true,
				menErrorProvincia: "No puede ser vacío, 5-30 caracteres..",
			});
		} else {
			setDatos({
				...datos,
				provincia: e.target.value.toUpperCase(),
				errorProvincia: false,
				menErrorProvincia: "Ingrese Provincia, 5-30 caracteres.",
			});
		}
	};
	const renderPaso2 = (
		<>
			<Typography
				sx={{ margin: "15px 10px", fontSize: { xs: "0.8rem", md: "1rem" } }}
			>
				Paso {activeStep + 1}: Completar datos de envío.
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box sx={style}>
					<TextField
						error={datos.errorNombre}
						value={datos.nombre}
						onChange={cambiarNombre}
						label=" Nombre completo "
						helperText={datos.menErrorNombre}
						inputProps={{
							"aria-label": "Ingrese nombre completo",
							style: { color: "black" },
							maxLength: 30,
						}}
						autoComplete="off"
						sx={{ margin: "10px 0px" }}
					/>

					<TextField
						error={datos.errorCodigo}
						value={datos.codigo}
						onChange={cambiarCodigo}
						label=" Código Postal"
						helperText={datos.menErrorCodigo}
						inputProps={{
							"aria-label": "Ingrese código postal",
							style: { color: "black" },
							maxLength: 4,
						}}
						autoComplete="off"
						sx={{ margin: "10px 0px" }}
					/>

					<TextField
						error={datos.errorLocalidad}
						value={datos.localidad}
						onChange={cambiarLocalidad}
						label=" Localidad "
						helperText={datos.menErrorLocalidad}
						inputProps={{
							"aria-label": "Ingrese Localidad",
							style: { color: "black" },
							maxLength: 30,
						}}
						autoComplete="off"
						sx={{ margin: "10px 0px" }}
					/>

					<TextField
						error={datos.errorProvincia}
						value={datos.provincia}
						onChange={cambiarProvincia}
						label=" Provincia "
						helperText={datos.menErrorProvincia}
						inputProps={{
							"aria-label": "Ingrese Provincia",
							style: { color: "black" },
							maxLength: 30,
						}}
						autoComplete="off"
						sx={{ margin: "10px 0px" }}
					/>
				</Box>
				{alertaError && (
					<Alert
						sx={{ margin: "25px auto" }}
						severity="warning"
						color="warning"
						onClose={() => setAlertaError(false)}
					>
						{"COMPLETAR TODOS LOS CAMPOS"}
					</Alert>
				)}
			</Box>
		</>
	);

	/* ===============  PASO 3 ============== */
	const renderPaso3 = (
		<>
			<Typography
				sx={{ margin: "15px 10px", fontSize: { xs: "0.8rem", md: "1rem" } }}
			>
				Paso {activeStep + 1}: Aceptar todos los datos.
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Box sx={style}>
					<Typography
						sx={{ mt: 2, mb: 1, py: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
					>
						Nombre: {datos.nombre}
					</Typography>
					<Typography
						sx={{ mt: 1, mb: 1, py: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
					>
						Localidad: {datos.localidad} - CP:{datos.codigo}
					</Typography>
					<Typography
						sx={{ mt: 1, mb: 1, py: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
					>
						Provincia: {datos.provincia}
					</Typography>
					<Typography
						sx={{ mt: 1, mb: 1, py: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
					>
						Importe Total de la Compra $: {formatPesos(carrito.total)} -
					</Typography>
					<Typography
						sx={{ mt: 1, mb: 1, py: 1, fontSize: { xs: "0.8rem", md: "1rem" } }}
					>
						Envio: $ {carrito.total > 100000 ? "0.00" : "15.000,00"}
					</Typography>
					<Typography
						sx={{
							mt: 1,
							mb: 1,
							py: 1,
							fontSize: {
								xs: "0.8rem",
								md: "1rem",
								fontSize: { xs: "0.8rem", md: "1rem" },
							},
						}}
					>
						Total a Pagar:{" "}
						{" $" +
							formatPesos(
								carrito.total > 100000 ? carrito.total : carrito.total + 15000
							)}
					</Typography>
				</Box>
			</Box>
		</>
	);

	//===========================
	return (
		<Box
			sx={{
				width: "100%",
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					width: "100%",
					padding: "15px",
				}}
			>
				<Stepper nonLinear activeStep={activeStep}>
					{steps.map((label, index) => (
						<Step key={label} completed={completed[index]}>
							<StepButton color="inherit" onClick={handleStep(index)}>
								{label}
							</StepButton>
						</Step>
					))}
				</Stepper>
				<div>
					{allStepsCompleted() ? (
						<></>
					) : (
						<>
							<Box
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									fontStyle: "italic",
								}}
							>
								<Typography>MARCAR cada paso como realizado</Typography>
							</Box>

							{activeStep + 1 === 1 && renderPaso1}

							{activeStep + 1 === 2 && renderPaso2}
							{activeStep + 1 === 3 && renderPaso3}

							<Divider sx={{ mt: 3 }} />
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Button
									color="inherit"
									disabled={activeStep === 0}
									onClick={handleBack}
									sx={{ mr: 1 }}
								>
									Anterior
								</Button>
								<Box sx={{ flex: "1 1 auto" }} />
								<Button onClick={handleNext} sx={{ mr: 1 }}>
									Siguiente
								</Button>
								{activeStep !== steps.length &&
									(completed[activeStep] ? (
										<Typography
											variant="caption"
											sx={{
												display: "flex",
												alignItems: "center",
												fontWeight: "bold",
											}}
										>
											Paso {activeStep + 1} completado.
										</Typography>
									) : (
										<Button onClick={handleComplete}>
											{completedSteps() === totalSteps() - 1
												? "Finalizar"
												: "Marcar"}
										</Button>
									))}
							</Box>
						</>
					)}
				</div>
			</Box>
		</Box>
	);
};
