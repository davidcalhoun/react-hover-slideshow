import React from "react";
import PropTypes from "prop-types";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshow.css";

export default function HoverSlideshow(props) {
	const { axis, images, width, height, style, ...otherProps } = props;

	let [
		// Current image href, which will update on mousemove/touchmove
		{ currentImage, currentImageIndex },
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
			style={{
				width,
				height,
				...style
			}}
			{...otherProps}
		>
			<div
				className={styles.innerContainer}
				style={{
					transform: `translateX(-${parseInt(width) *
						currentImageIndex}px)`
				}}
			>
				{images.map((src, index) => {
					return <img src={src} key={src} />;
				})}
			</div>
		</div>
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
