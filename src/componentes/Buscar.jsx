
import {Box, Tooltip, IconButton, InputBase} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { styled, alpha } from "@mui/material/styles";

import { MdOutlineSearch } from "react-icons/md";
import { MdClose } from "react-icons/md";


//-------- Funciones de Buscar ------------------------
const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
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
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));
//-----------------------------------------------
export const Buscar = ({ stateBuscar, setStateBuscar}) => {

	const abrirCerrarModalBuscar = () => {
		setStateBuscar(false);
	};


	const list = () => (
		<Box
			role="presentation"
			/* onKeyDown={() => setStateBuscar(false)} */
		>
			<Box sx={{margin:"15px",display:"flex", justifyContent:"flex-end"}}>
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
			<Search>
				<SearchIconWrapper>
					<MdOutlineSearch />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder="Buscar..."
					inputProps={{ "aria-label": "Buscar..." }}
				/>
			</Search>
			<Divider sx={{marginTop:"20px"}} />
		</Box>
	);

	//==========================================
	return (
		<div>
			<Drawer open={stateBuscar} onClose={()=>setStateBuscar(false)}>
				{list()}
			</Drawer>
		</div>
	);
};
