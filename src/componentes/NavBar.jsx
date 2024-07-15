import { useState, useContext } from "react";
import {
	AppBar,
	Box,
	IconButton,
	Toolbar,
	Typography,
	Tooltip,
	Badge,
	MenuItem,
	Menu,
	CardMedia,
	Divider,
} from "@mui/material";

import {
	MdOutlineWbSunny,
	MdOutlineSearch,
	MdOutlineAccountCircle,
	MdOutlineFilterList,
	MdOutlineHome,
} from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { TbShoppingCart } from "react-icons/tb";

import { ColorModeContext } from "./contexts/ModoClaOscContext";
import { ConstantesContext } from "./contexts/ConstantesContext";

import Logo_Baby from "../assets/Logo_Baby.png";

//====================================================================
//------------------ Componente Principal ----------------------------
export const NavBar = ({
	setMenu,
	setAbrirBuscar,
	setAbrirFiltrar,
}) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const { anchoMaximo } = useContext(ConstantesContext);
	const { colorMode, mode } = useContext(ColorModeContext);

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	//--- navbar ---
	const volverInicio = () => {
		setMenu("inicio");
	};
	const abrirCerrarModalBuscar = () => {
		setAbrirBuscar(true);
	};
	const abrirCerrarModalArticulos = () => {
		setAbrirFiltrar(true);
	};

	//-------- Menú de Usuario Login/out -----
	const menuId = "menu-usuario";
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
			<MenuItem onClick={handleMenuClose}>Iniciar SESIÓN</MenuItem>
			<Divider />
			<MenuItem onClick={handleMenuClose}>Crear CUENTA</MenuItem>

			{/* 
			<MenuItem onClick={handleMenuClose}>Mi perfil</MenuItem>
			<MenuItem onClick={handleMenuClose}>Mis compras</MenuItem> 
			<Divider/>
			<MenuItem onClick={handleMenuClose}>Cerrar sesión</MenuItem>*/}
		</Menu>
	);

	//===========================
	return (
		<Box sx={{ padding: "0px" }}>
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
							maxWidth: `${anchoMaximo}px`,
							margin: "0px auto",
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
									fontSize: { xs: "1.5rem", md: "2rem" },
									fontStyle: "italic",
									textShadow: "0px 0px 15px black",
									padding: "10px 15px",
								}}
								noWrap
								component="div"
							>
								Baby Store
							</Typography>
						</Box>

						{/* ----------------- Iconos----------- */}
						<Box
							sx={{
								display: "flex",
								justifyContent: { xs: "space-around", md: "flex-end" },
								backgroundColor: {
									xs: "background.third",
									md: "background.paper",
								},
								padding: { xs: "0px", md: "8px" },
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "0px 5px",
								}}
							>
								<Tooltip title="Página Principal">
									<IconButton
										aria-label="Página Principal"
										color="inherit"
										onClick={volverInicio}
									>
										<MdOutlineHome />
									</IconButton>
								</Tooltip>
								<Typography
									sx={{
										fontSize: "0.8rem",
										textAlign: "center",
									}}
								>
									Inicio
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "0px 5px",
								}}
							>
								<Tooltip title="Filtrar artículos">
									<IconButton
										aria-label="Filtrar artículos"
										color="inherit"
										onClick={abrirCerrarModalArticulos}
									>
										<MdOutlineFilterList />
									</IconButton>
								</Tooltip>
								<Typography
									sx={{
										fontSize: "0.8rem",
										textAlign: "center",
									}}
								>
									Artículos
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "0px 5px",
								}}
							>
								<Tooltip title="Buscar artículo">
									<IconButton
										aria-label="Buscar artículos"
										color="inherit"
										onClick={abrirCerrarModalBuscar}
									>
										<MdOutlineSearch />
									</IconButton>
								</Tooltip>
								<Typography
									sx={{
										fontSize: "0.8rem",
										textAlign: "center",
									}}
								>
									Buscar
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "0px 5px",
								}}
							>
								<Tooltip title="Alternar tema claro/oscuro">
									<IconButton
										aria-label="Alternar tema claro/oscuro"
										color="inherit"
										onClick={colorMode.toggleColorMode}
									>
										{mode === "dark" ? <FiMoon /> : <MdOutlineWbSunny />}
									</IconButton>
								</Tooltip>
								<Typography
									sx={{
										fontSize: "0.8rem",
										textAlign: "center",
									}}
								>
									Modo
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "0px 5px",
								}}
							>
								<Tooltip title="Login/Logout">
									<IconButton
										aria-label="Login/logout"
										aria-controls={menuId}
										aria-haspopup="true"
										onClick={handleProfileMenuOpen}
										color="inherit"
									>
										<MdOutlineAccountCircle />
									</IconButton>
								</Tooltip>
								<Typography
									sx={{
										fontSize: "0.8rem",
										textAlign: "center",
									}}
								>
									Usuario
								</Typography>
							</Box>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									margin: "0px 5px",
								}}
							>
								<Tooltip title="Carrito de Compras">
									<IconButton
										aria-label="Carrito de Compras - Cantidad"
										color="inherit"
									>
										<Badge badgeContent={17} color="error">
											<TbShoppingCart />
										</Badge>
									</IconButton>
								</Tooltip>
								<Typography
									sx={{
										fontSize: "0.8rem",
										textAlign: "center",
									}}
								>
									Compras
								</Typography>
							</Box>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>

			{renderMenu}
		</Box>
	);
};
