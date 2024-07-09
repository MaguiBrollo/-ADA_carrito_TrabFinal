import { Typography } from '@mui/material'

//====================================================================
//------------------ Componente Principal ----------------------------
export const Header = () => {
	//===========================
	return (
		<>
			<Typography
				sx={{ textAlign: "center", backgroundColor: "background.default" }}
			>
				¡Compras mayores a $50.000,00... envío gratis!
			</Typography>
		</>
	);
}
