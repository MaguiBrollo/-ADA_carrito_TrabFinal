import { useContext } from "react";
import { ConstantesContext } from "../contexts/ConstantesContext.jsx";
import { Box, CardMedia, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import dayjs from "dayjs";

import { LogicaContext } from "../contexts/LogicaContext.jsx";
import { formatPesos } from "../utils/Funciones.js";



//====================================================================
//------------------ Componente Principal ----------------------------
export const MisCompras = () => {
	const { anchoMaximo, altoMinimo } = useContext(ConstantesContext);
	const { misCompras } = useContext(LogicaContext);
	
	const theme = useTheme();

	const style = {
		width: { xs: "100%", sm: "60%" },
		bgcolor: "background.default",
		border: `1px solid ${theme.palette.primary}`,
		boxShadow: 24,
		p: 2,
		m: 1,
	};
	//===========================
	return (
		<Box
			sx={{
				width: "90%",
				minHeight: `${altoMinimo}vh`,
				maxWidth: `${anchoMaximo}px`,
				margin: "20px auto",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{misCompras.length > 0 ? (
				<>
					{misCompras.map((mis) => (
						<Box key={mis.idOrden} sx={style}>
							<Typography sx={{ fontSize: "0.8rem", marginLeft: "10px" }}>
								Fecha: {dayjs(mis.fecha).format("DD/MM/YYYY")}
							</Typography>
							<Divider />
							<Box>
								{mis.articulos.map((arti) => (
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
													sx={{ fontSize: "0.8rem", marginLeft: "10px" }}
												>
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
									Total de la compra: {"  $"} {formatPesos(mis.total)}
								</Typography>
							</Box>
						</Box>
					))}
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
					<Typography>No hay compras</Typography>
				</Box>
			)}
		</Box>
	);
};
