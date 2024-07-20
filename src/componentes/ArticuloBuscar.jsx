import { Box, Tooltip, IconButton, Typography, TextField } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { MdOutlineSearch } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { useState } from "react";

import { useContext } from "react";

import { useNavigate } from "react-router-dom";

import { FirebaseContext } from "../contexts/FirebaseContext";

//====================================================================
//------------------ Componente Principal ----------------------------
export const ArticuloBuscar = ({ abrirBuscar, setAbrirBuscar }) => {
	const [error, setError] = useState();
	const [helperText, setHelperText] = useState(" ");
	const [buscar, setBuscar] = useState("");
	const { setBuscarPor } = useContext(FirebaseContext);

	const navegar = useNavigate();

	const textoBuscarArticulo = (event) => {
		if (event.target.value.length > 30) {
			setHelperText("Hsta 30 caracteres.");
			setError(true);
		} else {
			setBuscar(event.target.value);
			setHelperText(" ");
			setError(false);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (buscar === undefined || buscar.trim() === "") {
			setHelperText("No puede ser vacío.");
			setError(true);
		} else {
			setBuscarPor(buscar.toUpperCase()); //activa la busqueda en FirebaseContext
			setHelperText("");
			setAbrirBuscar(false);

			navegar("/articulos");
		}
	};

	//===========================
	return (
		<Drawer open={abrirBuscar} onClose={() => setAbrirBuscar(false)}>
			<Box
				sx={{
					paddingTop: "15px",
					width: "340px",
				}}
				role="presentation"
			>
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
						Buscar
					</Typography>
					<Tooltip title="Cerrar buscar">
						<IconButton
							size="large"
							aria-label="Cerrar buscar"
							color="inherit"
							onClick={() => setAbrirBuscar(false)}
						>
							<MdClose />
						</IconButton>
					</Tooltip>
				</Box>
				<Divider sx={{ margin: "15px" }} />

				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-start",
						margin: "15px",
					}}
					autoComplete="off"
				>
					<TextField
						value={buscar}
						error={error}
						id="buscar-articulo"
						label="Buscar artículo..."
						helperText={helperText}
						fullWidth
						variant="outlined"
						color="secondary"
						onChange={textoBuscarArticulo}
					/>

					<Tooltip title="Buscar...">
						<IconButton
							type="submit"
							size="large"
							aria-label="Buscar..."
							color="inherit"
						>
							<MdOutlineSearch />
						</IconButton>
					</Tooltip>
				</Box>
				<Divider sx={{ margin: "15px" }} />
			</Box>
		</Drawer>
	);
};
