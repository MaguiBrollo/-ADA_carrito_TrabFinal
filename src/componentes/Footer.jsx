import { Box, IconButton, Link, Tooltip, Typography } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { MdOutlineEmail, MdOutlineFacebook } from "react-icons/md";

export const Footer = () => {
	return (
		<Box>
			<Box
				sx={{
					color: "text.primary",
					display: "flex",
					justifyContent: { xs: "space-around", md: "flex-end" },
					backgroundColor: "background.paper",
					padding: { xs: "0px", md: "8px" },
					boxShadow: "0px 0px 10px black",
				}}
			>
				<Link
					href="https://www.instagram.com/maguibro"
					target="_blank"
					color="inherit"
				>
					<Tooltip title="Instagram">
						<IconButton size="large" aria-label="Instagram" color="inherit">
							<FaInstagram />
						</IconButton>
					</Tooltip>
				</Link>

				<Link
					href="https://www.facebook.com/magui.bro?mibextid=ZbWKwL"
					target="_blank"
					color="inherit"
				>
					<Tooltip title="Facebook">
						<IconButton size="large" aria-label="Facebook" color="inherit">
							<MdOutlineFacebook />
						</IconButton>
					</Tooltip>
				</Link>
				<Link
					href="mailto:maguieb@gmail.com?Subject=Interesado%20en%20los%20productos%20de%20Baby%20Store."
					target="_blank"
					color="inherit"
				>
					<Tooltip title="Correo Electrónico">
						<IconButton
							size="large"
							aria-label="Correo Electrónico"
							color="inherit"
						>
							<MdOutlineEmail />
						</IconButton>
					</Tooltip>
				</Link>
			</Box>
			<Typography
				sx={{
					textAlign: "center",
					backgroundColor: "background.default",
					fontSize: { xs: "0.9rem", md: "1rem" },
					fontStyle: "italic",
				}}
			>
				Baby Store - 2024 - © Magui Brollo.
			</Typography>
		</Box>
	);
};
