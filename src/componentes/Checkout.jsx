/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useState } from "react";

import {
	Divider,
	Box,
	Stepper,
	Step,
	StepButton,
	Button,
	Typography,
	CardMedia,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import dayjs from "dayjs";

import { formatPesos } from "../utils/Funciones.js";
import { ConstantesContext } from "../contexts/ConstantesContext";
import { LogicaContext } from "../contexts/LogicaContext";

const steps = ["Carrito", "Datos", "Finalizar"];

//====================================================================
//------------------ Componente Principal ----------------------------
export const Checkout = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState({});
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { carrito } = useContext(LogicaContext);

	const theme = useTheme();

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
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

	const handleReset = () => {
		setActiveStep(0);
		setCompleted({});
	};

	const style = {
		width: { xs: "100%", sm: "60%" },
		bgcolor: "background.default",
		border: `1px solid ${theme.palette.primary}`,
		boxShadow: 24,
		p: 2,
		m: 1,
	};

	/* ===============  PASO 1 ============== */
	const renderPaso1 = (
		<>
			<Typography sx={{ mt: 2, mb: 1, py: 1 }}>
				Controlar Artículos y cantidad
			</Typography>
			<Box
				sx={{
					display: "flex",

					justifyContent: "center",
				}}
			>
				<Box sx={style}>
					<Typography sx={{ fontSize: "0.8rem", marginLeft: "10px", fontWeight:"bold" }}>
						Fecha: {dayjs(carrito.fecha).format("DD/MM/YYYY - HH:mm")}hs.
					</Typography>
					<Divider />
					<Box>
						{carrito.articulos.map((arti) => (
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
								display: "flex",
								justifyContent: "center",
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
	const renderPaso2 = (
		<Typography sx={{ mt: 2, mb: 1, py: 1 }}>Controlar sus datos</Typography>
	);

	/* ===============  PASO 3 ============== */
	const renderPaso3 = (
		<Typography sx={{ mt: 2, mb: 1, py: 1 }}>
			Controlar Importe final
		</Typography>
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
						<>
							<Typography sx={{ mt: 2, mb: 1 }}>
								Todos los pasos completos - Compra Finalizada.
							</Typography>
							<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
								<Box sx={{ flex: "1 1 auto" }} />
								<Button onClick={handleReset}>Reset</Button>
							</Box>
						</>
					) : (
						<>
							<Box
								sx={{
									mt: 1,
									mb: 1,
									py: 1,
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									fontStyle: "italic",
								}}
							>
								<Typography>Paso {activeStep + 1}</Typography>
								<Typography>MARCAR cada paso como realizado</Typography>
							</Box>

							{activeStep + 1 === 1 && renderPaso1}

							{activeStep + 1 === 2 && renderPaso2}
							{activeStep + 1 === 3 && renderPaso3}

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
											sx={{ display: "inline-block" }}
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
