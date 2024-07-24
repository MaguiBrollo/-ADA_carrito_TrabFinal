import { useContext } from "react";

import { MdClose, MdDeleteOutline } from "react-icons/md";
import {
	Box,
	Drawer,
	Divider,
	IconButton,
	Tooltip,
	Typography,
	Button,
	CardMedia,
	ListItemIcon,
} from "@mui/material";

import { LogicaContext } from "../contexts/LogicaContext";
import { formatPesos } from "../utils/Funciones.js";
import carritoVacioImg from "../assets/carritovacio.png";

//====================================================================
//------------------ Componente Principal ----------------------------
export const CarritoModal = ({ abrirCarrito, setAbrirCarrito }) => {
	const { carrito, cantArtCarrito, setArtiBrorrarCarrito } =
		useContext(LogicaContext);

	const anchor = "right";

	const borrarArtCarrito = (idBorrar) => {
		setArtiBrorrarCarrito(idBorrar);
	};

	const borrarTodoCarrito = () => {
		//para borrar todos
		setAbrirCarrito(false);
		setArtiBrorrarCarrito("T");
	};

	const finalizarCompraCarrito = () => {
		alert("Finlizó");
		setAbrirCarrito(false);
		//Antes de Borrar Carrito, debe:
		// pasar el IDcarrito de la propiedad carritoAbierto a carritoCerrado.
		// poner la propiedad de  cerrado=True, en carrito.
		// descontar el stock de los artículos.
		setArtiBrorrarCarrito("T");
	};

	//===========================
	return (
		<Drawer
			anchor={anchor}
			open={abrirCarrito}
			onClose={() => setAbrirCarrito(false)}
		>
			<Box sx={{ width: "350px", padding: "10px" }} role="presentation">
				<Box
					sx={{
						margin: "10px",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography
						sx={{
							fontSize: "1.5rem",
							fontStyle: "italic",
							textShadow: "0px 0px 15px black",
						}}
					>
						Carrito de Compras
					</Typography>
					<Tooltip title="Cerrar buscar">
						<IconButton
							size="large"
							aria-label="Cerrar buscar"
							color="inherit"
							onClick={() => setAbrirCarrito(false)}
						>
							<MdClose />
						</IconButton>
					</Tooltip>
				</Box>
				<Divider sx={{ margin: "10px0px" }} />

				{cantArtCarrito > 0 ? (
					<>
						<Box sx={{ margin: "5px 10px" }}>
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
											<Typography
												sx={{ fontSize: "0.7rem", marginLeft: "10px" }}
											>
												{arti.nombre}
											</Typography>

											<Box
												sx={{
													display: "flex",
													flexDirection: "row",
													alignItems: "center",
												}}
											>
												<Typography
													sx={{ width: "35%", fontSize: "0.8rem", ml: 2 }}
												>
													{arti.cantidad + " x  $" + formatPesos(arti.precio)}
												</Typography>
												<Typography
													sx={{
														width: "40%",
														fontSize: "0.8rem",
														textAlign: "end",
													}}
												>
													${formatPesos(arti.cantidad * arti.precio)}
												</Typography>

												<Box
													sx={{
														width: "20%",
														display: "flex",
														justifyContent: "flex-end",
													}}
												>
													<ListItemIcon
														sx={{ minWidth: "20px" }}
														onClick={() => borrarArtCarrito(arti.idArticulo)}
													>
														<IconButton
															size="small"
															sx={{ color: "text.primary" }}
														>
															<MdDeleteOutline />
														</IconButton>
													</ListItemIcon>
												</Box>
											</Box>
										</Box>
									</Box>
									<Divider sx={{ margin: "5px 0px" }} />
								</Box>
							))}

							<Typography sx={{ display: "flex", justifyContent: "center" }}>
								Total de la compra: {"  $"} {formatPesos(carrito.total)}
							</Typography>
						</Box>

						<Divider sx={{ margin: "10px 0px" }} />

						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Button
								variant="contained"
								onClick={finalizarCompraCarrito}
								sx={{
									width: "80%",
									color: "button.primaryText",
									backgroundColor: "button.primaryBack",
									":hover": {
										color: "button.hoverText",
										backgroundColor: "button.hoverBack",
									},
								}}
							>
								Finalizar Compra
							</Button>

							<Button
								variant="outline"
								sx={{ width: "80%" }}
								onClick={borrarTodoCarrito}
							>
								Eliminar Carrito
							</Button>
						</Box>
					</>
				) : (
					<Box
						sx={{
							margin: "20px",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<CardMedia
							component="img"
							image={carritoVacioImg}
							alt="Carrito vacío"
							sx={{
								maxWidth: "150px",
								margin: "10px",
								borderRadius: "50%",
								boxShadow: "0px 0px 15px black",
							}}
						/>
					</Box>
				)}
			</Box>
		</Drawer>
	);
};
