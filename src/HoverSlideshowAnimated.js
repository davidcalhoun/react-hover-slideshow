import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshowAnimated.css";

/**
 * Cycles through an image slideshow on cursor/touch movement across an image.  Uses CSS transitions to achieve a crossfade effect.
 *
 * Note: this component depends on the optional peer dependency `react-transition-group`, which can be installed with this command:
 *
 * ```npm i --save react-transition-group```
 */
export default function HoverSlideshowAnimated(props) {
	const { images, style, className, width, height, children, ...otherProps } = props;
	let [
		{ currentImage, currentImageEventId },
		{ updateHoverSlideshow, resetHoverSlideshow },
	] = useHoverSlideshow(images);

	return (
		<div
			onMouseLeave={resetHoverSlideshow}
			onMouseMove={updateHoverSlideshow}
			style={{
				width,
				height,
				...style,
			}}
			className={`${styles.container} ${className}`}
			{...otherProps}
		>
			<picture>
				<TransitionGroup>
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
							exitDone: styles["crossfade-exit-done"],
						}}
						key={currentImageEventId}
					>
						<div className={styles.imageContainer}>
							<img src={currentImage} className={styles.img} />
						</div>
					</CSSTransition>
				</TransitionGroup>
			</picture>
			{children}
		</div>
	);
}

HoverSlideshowAnimated.propTypes = {
	/** Additional CSS classnames to add to the root container. */
	className: PropTypes.string,
	/** Height of the container, e.g. "100px" */
	height: PropTypes.string,
	/** Optional href to add to anchor wrapper. */
	href: PropTypes.string,
	/** Array of image hrefs. */
	images: PropTypes.arrayOf(PropTypes.string),
	/** Custom CSS style overrides. */
	style: PropTypes.object,
	/** Width of the container, e.g. "100px" */
	width: PropTypes.string,
};

HoverSlideshowAnimated.defaultProps = {
	className: "",
	images: [],
	style: {},
};
