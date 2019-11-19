import React from "react";
import HoverSlideshow from "./HoverSlideshow";
import HoverSlideshowAnimated from "./HoverSlideshowAnimated";

export default { title: "HoverSlideshow" };

const images = [
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/01.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/02.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/03.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/04.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/05.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/06.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/07.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/08.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/09.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/10.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/11.jpg",
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/12.jpg"
];

export const withDefault = () => (
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
