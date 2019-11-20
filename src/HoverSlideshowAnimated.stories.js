import React from "react";
import HoverSlideshow from "./HoverSlideshow";
import HoverSlideshowAnimated from "./HoverSlideshowAnimated";
import { createNumberedArray } from "./utils";

export default { title: "HoverSlideshowAnimated" };

const images = createNumberedArray({
	length: 12,
	prefix: "https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/",
	suffix: ".jpg"
});

export const withDefaultCrossfade = () => (
	<HoverSlideshowAnimated
		aria-label="Muybridge horse gallop slideshow"
		images={images}
		href="https://www.google.com/"
		width="410px"
		height="308px"
	/>
);
