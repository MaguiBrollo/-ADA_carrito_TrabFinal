import { useState, useContext } from "react";

import Draggable from "react-draggable";

import {
	Box,
	Button,
	CardMedia,
	Dialog,
	DialogActions,
	DialogTitle,
	Paper,
	Divider,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	FormHelperText,
	Modal,
	Alert,
} from "@mui/material";
import { useTheme } from "@emotion/react";

import { formatPesos } from "../utils/Funciones.js";
import { LogicaContext } from "../contexts/LogicaContext";

function PaperComponent(props) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={'[class*="MuiDialogContent-root"]'}
		>
			<Paper {...props} />
		</Draggable>
	);
}

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "200",
	bgcolor: "background.default",
	border: "2px solid #000",
	boxShadow: 24,
	p: 2,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
};

//====================================================================
//------------------ Componente Principal ----------------------------
export const ArticuloVerMas = ({
	abrirVerMas,
	setAbrirVerMas,
	artParaVerMas,
	setAbrirAgregadoCarrito,
}) => {
	const [avisoNoInicioSesion, setAvisoNoInicioSesion] = useState(false);
	const [cantidad, setCantidad] = useState(1);
	const [abrirCantidad, setAbrirCantidad] = useState(false);
	const [alertaStock, setAlertaStock] = useState(false);
	const { usuarioId, setArtiParaAgregarCarrito } = useContext(LogicaContext);

	const theme = useTheme();

	const guardarCantidad = (event) => {
		if (parseInt(event.target.value) > artParaVerMas.stock) {
			setAlertaStock(true);
			setCantidad(artParaVerMas.stock);
			setTimeout(() => {
				setAlertaStock(false);
			}, 4000);
		} else {
			setCantidad(parseInt(event.target.value));
		}
	};
	const handleCloseCantidad = () => {
		setAbrirCantidad(false);
	};
	const handleOpenCantidad = () => {
		setAbrirCantidad(true);
	};

	const etiqueta = "draggable-dialog-title";
	const cerrarModalVerMas = () => {
		setAbrirVerMas(false);
	};

	const agregarAlCarrito = () => {
		//si hay un usuario
		if (usuarioId !== 0) {
			//guardar en el carrito artParaVerMas y cantidadPedida
			setArtiParaAgregarCarrito({ ...artParaVerMas, cantidad: cantidad });

			setAbrirVerMas(false);
			setAbrirAgregadoCarrito(true);
			setTimeout(() => {
					setAbrirAgregadoCarrito(false);
			}, 3000);
		} else {
			setAvisoNoInicioSesion(true);
		}
	};
	//===========================
	return (
		<>
			<Dialog
				maxWidth="md"
				open={abrirVerMas}
				onClose={cerrarModalVerMas}
				PaperComponent={PaperComponent}
				aria-labelledby={etiqueta}
			>
				<Box sx={{ padding: "10px" }}>
					<DialogTitle
						style={{ cursor: "move", padding: "0px 10px" }}
						id={etiqueta}
					>
						{artParaVerMas.nombre}
					</DialogTitle>
					<Box
						sx={{
							padding: "10px",
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
						}}
					>
						<CardMedia
							component="img"
							sx={{
								width: "50%",
								maxWidth: "350px",
								margin: "15px auto",
								boxShadow: `0px 0px 8px 15px ${theme.palette.background.paper}`,
							}}
							image={artParaVerMas.imagen}
						/>
						<Box
							sx={{
								padding: { xs: "0px", sm: "20px 10px 20px 30px" },

								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
							}}
						>
							<Typography>{artParaVerMas.descripcion}</Typography>

							<Divider sx={{ margin: "10px 0px" }} />

							<Typography sx={{ fontSize: "0.8rem" }}>
								Características: {artParaVerMas.descripcionLarga}
							</Typography>

							<Divider sx={{ margin: "10px 0px" }} />

							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-around",
								}}
							>
								<Typography>Stock: {artParaVerMas.stock}</Typography>
								<Typography
									sx={{
										fontWeight: "900",
										textAlign: "end",
									}}
								>
									${formatPesos(artParaVerMas.precio)}
								</Typography>
							</Box>
							<Divider sx={{ margin: "10px 0px" }} />

							<Box sx={{ margin: "10px" }}>
								<FormControl color="secondary">
									<InputLabel id="cantidad-comprar">Cantidad</InputLabel>
									<Select
										size="small"
										labelId="cantidad-comprar"
										id="demo-controlled-open-select"
										onClose={handleCloseCantidad}
										onOpen={handleOpenCantidad}
										open={abrirCantidad}
										value={cantidad}
										label="Cantidad"
										onChange={guardarCantidad}
									>
										<MenuItem value="1">1</MenuItem>
										<MenuItem value="2">2</MenuItem>
										<MenuItem value="3">3</MenuItem>
										<MenuItem value="4">4</MenuItem>
										<MenuItem value="5">5</MenuItem>
									</Select>
									<FormHelperText>
										Compras por menor, hasta 5 artículos.
									</FormHelperText>
								</FormControl>
								{alertaStock && (
									<Alert
										severity="warning"
										color="warning"
										onClose={() => setAlertaStock(false)}
									>
										Stock insuficiente.
									</Alert>
								)}
							</Box>
						</Box>
					</Box>

					<DialogActions sx={{ padding: "10px" }}>
						<Button variant="contained" onClick={cerrarModalVerMas}>
							Cancelar
						</Button>
						<Button
							variant="contained"
							onClick={agregarAlCarrito}
							sx={{
								color: "button.primaryText",
								backgroundColor: "button.primaryBack",
								":hover": {
									color: "button.hoverText",
									backgroundColor: "button.hoverBack",
								},
							}}
						>
							Comprar
						</Button>
					</DialogActions>
				</Box>
			</Dialog>

			{/* ---- Modal de aviso que NO inició sesión, No puede comprar --- */}
			{avisoNoInicioSesion && (
				<Modal
					open={avisoNoInicioSesion}
					onClose={() => setAvisoNoInicioSesion(false)}
					aria-labelledby="aviso-inicio-sesion-titulo"
					aria-describedby="aviso-inicio-sesion-descripcion"
				>
					<Box sx={style}>
						<Typography
							id="aviso-inicio-sesion-titulo"
							variant="h6"
							component="h2"
							color={theme.palette.error.main}
						>
							Inicio de Sesión
						</Typography>
						<Typography
							id="aviso-inicio-sesion-descripcion"
							sx={{ m: 1, fontSize: "0.7rem" }}
						>
							Debe iniciar sesión para realizar compras.
						</Typography>
						<Button
							size="small"
							variant="contained"
							onClick={() => setAvisoNoInicioSesion(false)}
						>
							Cerrar
						</Button>
					</Box>
				</Modal>
			)}
		</>
	);
};
