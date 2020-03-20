import React, { useState } from "react";
import PropTypes from "prop-types";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshow.css";

/**
 * TODO: support images array of objects, to support alt titles for each image.
 */

/**
 * Cycles through an image slideshow on cursor/touch movement across an image.
 */
export default function HoverSlideshow(props) {
	const {
		axis,
		images,
		width,
		height,
		style,
		className,
		LoadingPlaceholder,
		...otherProps
	} = props;

	let [
		// Current image href, which will update on mousemove/touchmove
		{ currentImageIndex },
		// Update will recompute currentImage based on the user's cursor
		// Reset assumes the user is no longer interacting, so it will return to the first (default) image
		{ updateHoverSlideshow, resetHoverSlideshow }
	] = useHoverSlideshow(images, axis);

	const [loadProgress, setLoadProgress] = useState({
		percent: 0,
		totalLoaded: 0,
		imagesLoaded: []
	});

	function handleLoad(image) {
		setLoadProgress({
			percent: parseInt(
				((loadProgress.totalLoaded + 1) / images.length) * 100
			),
			totalLoaded: loadProgress.totalLoaded + 1,
			imagesLoaded: [...loadProgress.imagesLoaded, image],
			isLoading: loadProgress.totalLoaded + 1 < images.length
		});
	}

	const showPlaceholder = loadProgress.isLoading && LoadingPlaceholder;

	return (
		<div
			onMouseLeave={resetHoverSlideshow}
			onMouseMove={updateHoverSlideshow}
			onTouchStart={updateHoverSlideshow}
			onTouchMove={updateHoverSlideshow}
			onTouchEnd={resetHoverSlideshow}
			className={`${styles.container} ${className}`}
			style={{
				width,
				height,
				...style
			}}
			{...otherProps}
		>
			{showPlaceholder && (
				<LoadingPlaceholder progressPercent={loadProgress.percent} />
			)}
			<div
				className={styles.innerContainer}
				style={{
					transform: `translateX(-${parseInt(width) *
						currentImageIndex}px)`
				}}
			>
				{images.map(src => {
					const style = LoadingPlaceholder
						? {
								visibility: showPlaceholder
									? "hidden"
									: "visible",
								opacity: showPlaceholder ? 0 : 1
						  }
						: {};

					return (
						<img
							src={src}
							key={src}
							className={styles.img}
							onLoad={handleLoad.bind(null, src)}
							style={style}
						/>
					);
				})}
			</div>
		</div>
	);
}

HoverSlideshow.propTypes = {
	/** ARIA label to add to container. */
	"aria-label": PropTypes.string,
	/** Axis to monitor cursor/touch "progress" on. */
	axis: PropTypes.oneOf(["horizontal", "vertical"]),
	/** Additional CSS classnames to add to the root container. */
	className: PropTypes.string,
	/** Height of the container, e.g. "100px" */
	height: PropTypes.string,
	/** Array of image hrefs. */
	images: PropTypes.arrayOf(PropTypes.string),
	LoadingPlaceholder: PropTypes.elementType,
	/** ARIA role to add to image container. */
	role: PropTypes.string,
	/** Custom CSS style overrides. */
	style: PropTypes.object,
	/** Width of the container, e.g. "100px" */
	width: PropTypes.string
};

HoverSlideshow.defaultProps = {
	"aria-label": "Image slideshow",
	axis: "horizontal",
	className: "",
	images: [],
	role: "img",
	style: {}
};
