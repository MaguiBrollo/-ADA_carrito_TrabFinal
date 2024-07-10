import { Typography } from "@mui/material";

//====================================================================
//------------------ Componente Principal ----------------------------
export const Header = () => {
	//===========================
	return (
		<>
			<Typography
				sx={{
					textAlign: "center",
					backgroundColor: "background.default",
					fontSize: { xs: "0.9rem", md: "1rem" },
					fontStyle: "italic",
				}}
			>
				¡Compras mayores a $100.000,00... envío gratis!
			</Typography>
		</>
	);
};
