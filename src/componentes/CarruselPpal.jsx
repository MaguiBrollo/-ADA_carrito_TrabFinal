import { Box } from "@mui/material";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { v4 as uuidv4 } from "uuid";
import "@splidejs/react-splide/css";

import { imagenes } from "../utils/ImagenesCarrusel";

export const CarruselPpal = () => {
	return (
		<Box sx={{ margin: "20px auto" }}>
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
					pagination: false, //saca los puntitos blancos
					type: "slide", //dejar slide
					width: "300px", //tiene relación con el width de la img
					arrows: "true", // Si usa flechas o no
					keyborad: "global", //habilita atajos teclado
					perPage: 1, //número de diapositivas que se mostrarán en una página.
					//gap: "15px",
					perMove: 1, //número de diapositivas que se moverán a la vez
					drag: "free", //si se permite al usuario arrastrar el carrusel o no
					autoplay: true, //reproducción automática o no
					rewind: true, //si se rebobina
					pauseOnHover: false,
					resetProgress: false,
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
										textShadow:
											"0px 0px 10px black, 0 0 1em black, 0 0 0.2em black",
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
