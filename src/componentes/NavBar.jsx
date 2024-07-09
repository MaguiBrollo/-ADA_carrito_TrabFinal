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
	CardMedia,
} from "@mui/material";

import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";
import { TbShoppingCart } from "react-icons/tb";
import { MdOutlineSearch } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";

import { ColorModeContext } from "./ModoClaOscContext";
import Logo_Baby from "../assets/Logo_Baby.png";

//====================================================================
//------------------ Componente Principal ----------------------------
export const NavBar = ({ setStateBuscar }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const { colorMode, mode } = React.useContext(ColorModeContext);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const abrirCerrarModalBuscar = () => {
		setStateBuscar(true);
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
			<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
			<MenuItem onClick={handleMenuClose}>Mi Cuenta</MenuItem>
			<MenuItem onClick={handleMenuClose}>Mis Compras</MenuItem>
		</Menu>
	);

	//===========================
	return (
		<Box sx={{ flexGrow: 1, padding: "0px" }}>
			<AppBar position="static">
				<Toolbar
					sx={{
						padding: { xs: "0px", md: "5px 15px" },
						backgroundColor: "background.paper",
					}}
				>
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
								padding: { xs: "5px", md: "0px" },
							}}
						>
							<CardMedia
								component="img"
								image={Logo_Baby}
								alt="Logo Baby Store"
								sx={{
									
									maxWidth: "50px",
									margin: "10px",
									borderRadius: "50%",
									boxShadow: "0px 0px 15px black",
								}}
							/>
							<Typography
								sx={{
									fontSize: { xs:"1.5rem", md: "2rem" },
									fontStyle: "italic",
									textShadow: "0px 0px 15px black",
									padding:"10px 15px",
								}}
								noWrap
								component="div"
							>
								Baby Store
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: { xs: "space-around", md: "flex-end" },
								backgroundColor: {
									xs: "background.icons",
									md: "background.paper",
								},
								padding:{xs:"0px", md:"8px"},
							}}
						>
							<Tooltip title="Página Principal">
								<IconButton
									size="large"
									aria-label="Página Principal"
									color="inherit"
								>
									<MdOutlineHome />
								</IconButton>
							</Tooltip>

							<Tooltip title="Buscar artículo">
								<IconButton
									size="large"
									aria-label="Buscar artículos"
									color="inherit"
									onClick={abrirCerrarModalBuscar}
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
