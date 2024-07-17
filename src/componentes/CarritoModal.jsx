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
} from "@mui/material";

import { FirebaseContext } from "./contexts/FirebaseContext";

//====================================================================
//------------------ Componente Principal ----------------------------
export const CarritoModal = ({ abrirCarrito, setAbrirCarrito }) => {
	const { carrito } = useContext(FirebaseContext);

	const anchor = "right";

	//===========================
	return (
		<Drawer
			anchor={anchor}
			open={abrirCarrito}
			onClose={() => setAbrirCarrito(false)}
		>
			<Box sx={{ width: "350px" }} role="presentation">
				<Box
					sx={{
						margin: "15px",
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
							padding: "15px",
						}}
					>
						Carrito
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
				<Divider sx={{ margin: "15px" }} />

				<Box sx={{ margin: "5px 10px" }}>
					{carrito.articulos.map((arti) => (
						<Box key={arti.id}>
							<Typography sx={{ fontSize: "0.9rem" }}>{arti.nombre}</Typography>
							<Box
								sx={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Typography sx={{ width: "43%" }}>
									Cant.: {arti.cantidad}
								</Typography>
								<Typography sx={{ width: "43%" }}>${arti.precio}</Typography>

								<Tooltip title="Borrar artículo">
									<IconButton>
										<MdDeleteOutline />
									</IconButton>
								</Tooltip>
							</Box>
							<Divider sx={{ margin: "10px" }} />
						</Box>
					))}

					<Typography>Total de la compra:{carrito.total}</Typography>
				</Box>

				<Divider sx={{ margin: "15px" }} />

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Button
						variant="contained"
						/* onClick={agregarAlCarrito} */
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

						/* onClick={cerrarModalVerMas} */
					>
						Eliminar Carrito
					</Button>
				</Box>
			</Box>
		</Drawer>
	);
};
