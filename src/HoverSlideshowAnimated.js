import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshowAnimated.css";

export default function HoverSlideshowAnimated(props) {
	let [
		{ currentImage, currentImageIndex, previousImage, currentImageEventId, previousImageEventId },
		setImage
	] = useHoverSlideshow(props.images);

	return (
		<a href="https://www.google.com">
			<picture
				// onMouseLeave={setImage}
				onMouseMove={setImage}
			>
				<TransitionGroup>
					<CSSTransition
						timeout={250}
						classNames={styles.container}
						key={currentImageEventId}
					>
						<div>
							<source srcSet={currentImage} media="(min-width: 800px)" />
							<img src={currentImage} />
						</div>
					</CSSTransition>
				</TransitionGroup>
			</picture>
		</a>
	);
}
