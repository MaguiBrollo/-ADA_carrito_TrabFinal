import {
	Box,
	Tooltip,
	IconButton,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
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
	const { categorias, setFiltrarPor } = useContext(FirebaseContext);

	const mostraTodosLosArticulos = () => {
		setAbrirFiltrar(false);
		setFiltrarPor("TODOS");
		setMenu("articulosTodos");
	};

	const mostraArticulosFiltrados = (e, cat) => {
		setAbrirFiltrar(false);
		console.log(e.target.innerText);
		setFiltrarPor("TODOS");
		setMenu("articulosTodos");
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
				<Tooltip title="Cerrar buscar">
					<IconButton
						size="large"
						aria-label="Cerrar buscar"
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
					{categorias.map((cat) => (
						<ListItem key={cat.id} disablePadding>
							<ListItemButton
								title={cat.id}
								onClick={(e, cat) => mostraArticulosFiltrados(e, cat)}
							>
								<ListItemText
									primary={cat.categoria}
									primaryTypographyProps={{
										fontSize: "0.8rem",
										lineHeight: "1",
									}}
								/>
							</ListItemButton>
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
