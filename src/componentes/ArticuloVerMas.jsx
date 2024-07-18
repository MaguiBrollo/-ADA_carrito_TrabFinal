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
} from "@mui/material";
import { useTheme } from "@emotion/react";

import { formatPesos } from "../utils/Funciones.js";
import { FirebaseContext } from "./contexts/FirebaseContext";

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
	width: 400,
	bgcolor: "background.default",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};


//====================================================================
//------------------ Componente Principal ----------------------------
export const ArticuloVerMas = ({
	abrirVerMas,
	setAbrirVerMas,
	artParaVerMas,
}) => {
	const [openError, setOpenError] = useState(false);
	const [cantidad, setCantidad] = useState(1);
	const [abrirCantidad, setAbrirCantidad] = useState(false);
	const { usuarioId } = useContext(FirebaseContext);

	const theme = useTheme();

	const guardarCantidad = (event) => {
		setCantidad(event.target.value);
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
			//guardar en el carrito artParaVerMas y cantidad
			setAbrirVerMas(false);
		} else {
			setOpenError(true);
			
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

							<Typography>Stock: {artParaVerMas.stock}</Typography>

							<Divider sx={{ margin: "10px 0px" }} />

							<Typography
								sx={{
									fontWeight: "900",
									textAlign: "end",
								}}
							>
								${formatPesos(artParaVerMas.precio)}
							</Typography>

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
			{openError && (
				<Modal
					open={openError}
					onClose={() => setOpenError(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Inicio de Sesión
						</Typography>
						<Typography id="modal-modal-description" sx={{ m: 4 }}>
							Debe iniciar sesión para realizar compras.
						</Typography>
						<Button variant="contained" onClick={() => setOpenError(false)}>
							Cerrar
						</Button>
					</Box>
				</Modal>
			)}
		</>
	);
};
