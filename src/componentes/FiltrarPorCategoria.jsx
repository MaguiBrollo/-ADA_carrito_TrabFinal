import {
	Box,
	Tooltip,
	IconButton,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Button,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";

import { MdClose } from "react-icons/md";

import { FirebaseContext } from "./contexts/FirebaseContext";
import { useContext } from "react";

//====================================================================
//------------------ Componente Principal ----------------------------
export const FiltrarPorCategoria = ({
	setMenu,
	abrirFiltrar,
	setAbrirFiltrar,
}) => {
	const { categoria, setFiltrarPor } = useContext(FirebaseContext);

	const mostraTodosLosArticulos = () => {
		setAbrirFiltrar(false);
		setFiltrarPor("TODOS");
		setMenu("articulos");
	};

	const mostraArticulosFiltrados = (e) => {
		setAbrirFiltrar(false);
		setFiltrarPor(e.target.value);
		setMenu("articulos");
	};

	//----------------------------------
	const list = () => (
		<Box sx={{ paddingTop: "10px", width: "300px" }} role="presentation">
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
					Artículos por Categorías
				</Typography>
				<Tooltip title="Cerrar categorías">
					<IconButton
						size="large"
						aria-label="Cerrar categorías"
						color="inherit"
						onClick={() => setAbrirFiltrar(false)}
					>
						<MdClose />
					</IconButton>
				</Tooltip>
			</Box>

			<Divider sx={{ marginTop: "10px" }} />

			{/*  -------------------------------- */}
			<Box
				sx={{
					margin: "0px auto",
					width: "90%",
					fontSize: "0.8rem",
				}}
			>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={mostraTodosLosArticulos}>
							<ListItemText
								primary="TODOS"
								secondary="Todos los artículos"
								primaryTypographyProps={{ fontSize: "0.8rem" }}
							/>
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					{categoria.map((cat) => (
						<ListItem key={cat.id} disablePadding>
							<Button
								color="secondary"
								disabled={cat.cantidad > 0 ? false : true}
								value={cat.id}
								variant="text"
								onClick={(e) => mostraArticulosFiltrados(e)}
							>
								{cat.categoria} ({cat.cantidad})
							</Button>
						</ListItem>
					))}
				</List>
			</Box>
			<Divider />
		</Box>
	);

	//===========================
	return (
		<div>
			<Drawer open={abrirFiltrar} onClose={() => setAbrirFiltrar(false)}>
				{list()}
			</Drawer>
		</div>
	);
};
