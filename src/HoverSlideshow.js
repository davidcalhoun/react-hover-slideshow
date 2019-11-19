import React from "react";
import PropTypes from "prop-types";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshow.css";

export default function HoverSlideshow(props) {
	const { axis, images, style, ...otherProps } = props;

	let [
		// Current image href, which will update on mousemove/touchmove
		{ currentImage },
		// Update will recompute currentImage based on the user's cursor
		// Reset assumes the user is no longer interacting, so it will return to the first (default) image
		{ updateHoverSlideshow, resetHoverSlideshow }
	] = useHoverSlideshow(images, axis);

	return (
		<div
			onMouseLeave={resetHoverSlideshow}
			onMouseMove={updateHoverSlideshow}
			onTouchStart={updateHoverSlideshow}
			onTouchMove={updateHoverSlideshow}
			onTouchEnd={resetHoverSlideshow}
			className={styles.container}
			/**
			 * Swap out background-image instead of img src, the latter which is problematic
			 * with touchmove on mobile.
			 */
			style={{ backgroundImage: `url(${currentImage})`, ...style }}
			{...otherProps}
		/>
	);
}

HoverSlideshow.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string)
};

HoverSlideshow.defaultProps = {
	"aria-label": "Image slideshow",
	axis: "horizontal",
	images: [],
	role: "img"
};
