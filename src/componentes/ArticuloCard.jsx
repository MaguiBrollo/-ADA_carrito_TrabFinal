import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { formatPesos } from "../utils/Funciones.js";

//====================================================================
//------------------ Componente Principal ----------------------------
export const ArticuloCard = ({ art, setAbrirVerMas, setArtParaVerMas }) => {
	const handleClickOpen = () => {
		setArtParaVerMas(art);
		setAbrirVerMas(true);
	};

	//===========================
	return (
		<Card sx={{ width: "270px" }}>
			<CardActionArea
				sx={{
					justifyContent: "center",
					backgroundColor: "background.third",
				}}
			>
				<CardMedia
					component="img"
					sx={{
						":hover": {
							transform: "scale(1.2)",
							transition: "all 300ms linear",
						},
					}}
					image={art.imagen}
					alt={art.nombre}
				/>

				<CardContent sx={{ minHeight: "120px" }}>
					<Typography
						component="div"
						sx={{
							color: "text.secondary",
							fontWeight: "900",
							display: "-webkit-box",
							WebkitLineClamp: "1",
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							height: "23px",
						}}
					>
						{art.nombre}
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{
							display: "-webkit-box",
							WebkitLineClamp: "2",
							WebkitBoxOrient: "vertical",
							overflow: "hidden",
							height: "45px",
						}}
					>
						{art.descripcion}
					</Typography>
					<Typography
						sx={{
							color: "text.secondary",
							fontWeight: "900",
							textAlign: "end",
						}}
					>
						${formatPesos(art.precio)}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions
				sx={{
					justifyContent: "center",
				}}
			>
				<Button
					onClick={handleClickOpen}
					size="small"
					sx={{
						color: "text.primary",
						":hover": {
							color: "text.secondary",
							backgroundColor: "background.third",
						},
					}}
				>
					Ver más - Comprar
				</Button>
			</CardActions>
		</Card>
	);
};
