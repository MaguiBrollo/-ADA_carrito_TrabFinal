import { useContext } from "react";
import { Box } from "@mui/material";

import { v4 as uuidv4 } from "uuid";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import { imagenes } from "../utils/ImagenesCarrusel";
import { ConstantesContext } from "./contexts/ConstantesContext";
import { useTheme } from "@emotion/react";

//====================================================================
//------------------ Componente Principal ----------------------------
export const CarruselPpal = () => {
	const theme = useTheme();
	const { anchoMaximo } = useContext(ConstantesContext);

	//===========================
	return (
		<Box sx={{ margin: "20px auto", maxWidth: `${anchoMaximo}px` }}>
			<Splide
				aria-label="Carrusel de Imágenes"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				options={{
					start: 0, // índice de inicio
					rewindByDrag: true, //mover arrastrando
					pagination: true, //saca los puntitos blancos
					type: "slide", //dejar slide
					arrows: "true", // Si usa flechas o no
					keyborad: "global", //habilita atajos teclado
					drag: "free", //si se permite al usuario arrastrar el carrusel o no
					autoplay: true, //reproducción automática o no
					rewind: true, //si se rebobina
					pauseOnHover: false,
					resetProgress: false,
					//width: "300px", //tiene relación con el width de la img
					//perPage:xs: 1, //número de diapositivas que se mostrarán en una página.
					//gap: "15px",
					//perMove: 1,   //número de diapositivas que se moverán a la vez
					breakpoints: {
						600: { perPage: 1, width: "300px" },
						900: { perPage: 2, width: "600px" },
						1200: { perPage: 3, width: "900px" },
						3000: { perPage: 4, width: "1200px" },
					},
				}}
			>
				{imagenes.map((imagen) => {
					return (
						<SplideSlide key={uuidv4()}>
							<Box>
								<img
									src={imagen.img}
									alt="Imagen del producto"
									style={{
										width: "300px",
										/* aspectRatio: "1/1", */
										objectFit: "cover",
										objectPposition: "center",
									}}
								/>
								<Box
									sx={{
										position: "absolute",
										top: "90%",
										left: "50%",
										transform: "translate(-50%, -50%)",
										fontWeight: "900",
										fontSize: "2rem",
										color: "text.primary",
										textShadow: `0px 0px 10px black, 0 0 1em ${theme.palette.background.paper}, 0 0 0.2em ${theme.palette.background.paper}`,
										/* textShadow:
											"0px 0px 10px ${background.paper}, 0 0 1em black, 0 0 0.2em black", */
									}}
								>
									{imagen.etiqueta}
								</Box>
							</Box>
						</SplideSlide>
					);
				})}
			</Splide>
		</Box>
	);
};
