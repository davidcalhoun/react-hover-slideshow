import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import useHoverSlideshow from "./useHoverSlideshow";

export default function HoverSlideshow(props) {
	let [
		{ currentImage, currentImageIndex, previousImageIndex },
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
