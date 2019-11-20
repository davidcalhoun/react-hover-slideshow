import React from "react";
import HoverSlideshow from "./HoverSlideshow";
import HoverSlideshowAnimated from "./HoverSlideshowAnimated";
import { createNumberedArray } from "./utils";

export default { title: "HoverSlideshow" };

const images = createNumberedArray({
	length: 12,
	prefix: "https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/",
	suffix: ".jpg"
});

export const withDefaultHorizontalAxis = () => (
	<HoverSlideshow
		aria-label="Muybridge horse gallop slideshow"
		images={images}
		width="410px"
		height="308px"
	/>
);
export const withVerticalAxis = () => (
	<HoverSlideshow
		axis="vertical"
		aria-label="Muybridge horse gallop slideshow"
		images={images}
		width="410px"
		height="308px"
	/>
);
export const withCrossfade = () => (
	<HoverSlideshowAnimated
		aria-label="Muybridge horse gallop slideshow"
		images={images}
		href="https://www.google.com/"
		width="410px"
		height="308px"
	/>
);
