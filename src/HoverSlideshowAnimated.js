import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshowAnimated.css";

export default function HoverSlideshowAnimated(props) {
	const { images, style, className, href } = props;
	let [
		{ currentImage, currentImageEventId },
		{ updateHoverSlideshow, resetHoverSlideshow }
	] = useHoverSlideshow(images);

	const containerProps = {
		href,
		style,
		className
	};

	return (
		<a {...containerProps}>
			<picture
				onMouseLeave={resetHoverSlideshow}
				onMouseMove={updateHoverSlideshow}
			>
				<TransitionGroup className={styles.container}>
					<CSSTransition
						timeout={300}
						classNames={{
							appear: styles["crossfade-appear"],
							appearActive: styles["crossfade-appear-active"],
							enter: styles["crossfade-enter"],
							enterActive: styles["crossfade-enter-active"],
							enterDone: styles["crossfade-enter-done"],
							exit: styles["crossfade-exit"],
							exitActive: styles["crossfade-exit-active"],
							exitDone: styles["crossfade-exit-done"]
						}}
						key={currentImageEventId}
					>
						<div className={styles.imageContainer}>
							<img src={currentImage} />
						</div>
					</CSSTransition>
				</TransitionGroup>
			</picture>
		</a>
	);
}

HoverSlideshowAnimated.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string),
	style: PropTypes.object,
	className: PropTypes.string,
	href: PropTypes.string
};

HoverSlideshowAnimated.defaultProps = {
	images: []
};
