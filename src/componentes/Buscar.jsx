import { Box, Tooltip, IconButton, InputBase, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { styled, alpha } from "@mui/material/styles";

import { MdOutlineSearch } from "react-icons/md";
import { MdClose } from "react-icons/md";

//------ESTILOS de barra de Busqueda ---------------------
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	color: theme.palette.text.secondary,
	backgroundColor: alpha(theme.palette.common.white, 0.5),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.85),
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	},
}));
//-------------------------------------------------------

//====================================================================
//------------------ Componente Principal ----------------------------
export const Buscar = ({ abrirBuscar, setAbrirBuscar }) => {
	const abrirCerrarModalBuscar = () => {
		setAbrirBuscar(false);
	};

	const list = () => (
		<Box
			sx={{ paddingTop: "15px", width: "300px" }}
			role="presentation"
			/* onKeyDown={() => setStateBuscar(false)} */
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
						onClick={abrirCerrarModalBuscar}
					>
						<MdClose />
					</IconButton>
				</Tooltip>
			</Box>
			<Divider sx={{ margin: "15px" }} />
			<Box
				sx={{
					margin: "0px auto",
					width: "90%",
				}}
			>
				<Search>
					<SearchIconWrapper>
						<MdOutlineSearch />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Buscar..."
						inputProps={{ "aria-label": "Buscar..." }}
					/>
				</Search>
			</Box>
			<Divider sx={{ margin: "15px" }} />
		</Box>
	);

	//===========================
	return (
		<div>
			<Drawer open={abrirBuscar} onClose={() => setAbrirBuscar(false)}>
				{list()}
			</Drawer>
		</div>
	);
};
