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
				<TransitionGroup className={ styles.container }>
					<CSSTransition
						timeout={250}
					    classNames={{
					        appear: styles['crossfade-appear'],
					        appearActive: styles['crossfade-appear-active'],
					        enter: styles['crossfade-enter'],
					        enterActive: styles['crossfade-enter-active'],
					        enterDone: styles['crossfade-enter-done'],
					        exit: styles['crossfade-exit'],
					        exitActive: styles['crossfade-exit-active'],
					        exitDone: styles['crossfade-exit-done']
					    }}
						key={currentImageEventId}
					>
						<div className={ styles.imageContainer }>
							<source srcSet={currentImage} media="(min-width: 800px)" />
							<img src={currentImage} />
						</div>
					</CSSTransition>
				</TransitionGroup>
			</picture>
		</a>
	);
}
