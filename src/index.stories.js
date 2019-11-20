import React from "react";
import HoverSlideshow from "./HoverSlideshow";
import HoverSlideshowAnimated from "./HoverSlideshowAnimated";

export default { title: "HoverSlideshow" };

/**
 * Example:
 * createNumberedArray({length: 3});  // ['1', '2', '3']
 * createNumberedArray({length: 3, prefix: "foo/"});   // ['foo/1', 'foo/2', 'foo/3']
 * createNumberedArray({length: 3, intOutput: true});  // [1, 2, 3]
 */
const createNumberedArray = ({
	length,
	zeroIndexed = false,
	targetValLength = `${length}`.length,
	prefix = "",
	suffix = "",
	intOutput = false
}) => {
	const baseArr = [...Array(length).keys()];
	const incrementer = zeroIndexed ? 0 : 1;

	return baseArr.map((val, index) => {
		const num = `${index + incrementer}`.padStart(targetValLength, "0");
		return intOutput ? parseInt(num) : `${prefix}${num}${suffix}`;
	});
};

const baseURL =
	"https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/";
const images = createNumberedArray({
	length: 12,
	prefix: baseURL,
	suffix: ".jpg"
});

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
