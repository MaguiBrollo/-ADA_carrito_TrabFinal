import * as React from "react";
//import { styled, alpha } from "@mui/material/styles";
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Tooltip,
	//InputBase,
	Badge,
	MenuItem,
	Menu,
} from "@mui/material";

import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { MdOutlineSearch } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";

import { ColorModeContext } from "./ModoClaOscContext";

/* const Search = styled("div")(({ theme }) => ({
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
})); */

/* const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
})); */

//==========================================
export const NavBar = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const { colorMode, mode } = React.useContext(ColorModeContext);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	//-------- menú de Login/out
	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	//===========================
	return (
		<Box sx={{ flexGrow: 1, padding: "0px" }}>
			<AppBar position="static">
				<Toolbar sx={{ padding: { xs: "0px", md: "15px" } }}>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							justifyContent: "space-between",
							width: "100%",
							
						}}
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: { xs: "center", md: "left" },
								alignItems: "center",
								padding: { xs: "20px", md: "0px" },
							}}
						>
							<Typography variant="h6" noWrap component="div">
								Carrito de Compras
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: { xs: "space-around", md: "flex-end" },
								backgroundColor: {
									xs: "background.default",
									md: "primary.main",
								},
							}}
						>
							<Tooltip title="Buscar artículo">
								<IconButton
									size="large"
									aria-label="Buscar artículos"
									color="inherit"
								>
									<MdOutlineSearch />
								</IconButton>
							</Tooltip>

							<Tooltip title="Filtrar artículos">
								<IconButton
									size="large"
									aria-label="filtrar artículos"
									color="inherit"
								>
									<MdOutlineFilterList />
								</IconButton>
							</Tooltip>

							<Tooltip title="Alternar tema claro/oscuro">
								<IconButton
									size="large"
									aria-label="Alternar tema claro/oscuro"
									color="inherit"
									onClick={colorMode.toggleColorMode}
								>
									{mode === "dark" ? <FiMoon /> : <MdOutlineWbSunny />}
								</IconButton>
							</Tooltip>

							<Tooltip title="Carrito de Compras">
								<IconButton
									size="large"
									aria-label="Carrito de Compras - Cantidad"
									color="inherit"
								>
									<Badge badgeContent={17} color="error">
										<TbShoppingCart />
									</Badge>
								</IconButton>
							</Tooltip>
							<Tooltip title="Login/Logout">
								<IconButton
									size="large"
									edge="end"
									aria-label="Login/logout"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<MdAccountCircle />
								</IconButton>
							</Tooltip>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>

			{renderMenu}
		</Box>
	);
};
