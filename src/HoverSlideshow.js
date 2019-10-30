import React from "react";
import useHoverSlideshow from "./useHoverSlideshow";

export default function HoverSlideshow(props) {
	let [
		{ currentImage },
		{ updateHoverSlideshow, resetHoverSlideshow }
	] = useHoverSlideshow(props.images);

	return (
		<div>
			<picture
				onMouseLeave={resetHoverSlideshow}
				onMouseMove={updateHoverSlideshow}
			>
				<source srcSet={currentImage} media="(min-width: 800px)" />
				<img src={currentImage} key={currentImage} />
			</picture>
		</div>
	);
}

HoverSlideshow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};

HoverSlideshow.defaultProps = {
  images: []
};
