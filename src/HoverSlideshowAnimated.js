import React, { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useHoverSlideshow from "./useHoverSlideshow";
import styles from "./HoverSlideshowAnimated.css";
import useImgLoadProgress from "./useImgLoadProgress";

/**
 * Cycles through an image slideshow on cursor/touch movement across an image.  Uses CSS transitions to achieve a crossfade effect.
 *
 * Note: this component depends on the optional peer dependency `react-transition-group`, which can be installed with this command:
 *
 * ```npm i --save react-transition-group```
 */
export default function HoverSlideshowAnimated(props) {
	const {
		images,
		style,
		className,
		width,
		height,
		children,
		LoadingPlaceholder,
		...otherProps
	} = props;
	let [
		{ currentImage, currentImageEventId },
		{ updateHoverSlideshow, resetHoverSlideshow },
	] = useHoverSlideshow(images);
	const nodeRef = useRef(null);
	const [inProp, setInProp] = useState(false);

	const [imgLoadProgress, handleImgLoad] = useImgLoadProgress(images.length);

	const showPlaceholder = imgLoadProgress.isLoading && LoadingPlaceholder;

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
			<div className={styles.hiddenPreloadedImages}>
				{images.map((src) => {
					return (
						<img
							key={src}
							src={src}
							onLoad={handleImgLoad.bind(null, src)}
						/>
					);
				})}
			</div>
			{showPlaceholder && (
				<LoadingPlaceholder progressPercent={imgLoadProgress.percent} />
			)}
			{!showPlaceholder && (
				<Fragment>
					<picture>
						<React.StrictMode>
						<TransitionGroup>
							<CSSTransition
								timeout={150}
								in={inProp}
								appear
								classNames={{
									appear: styles["crossfade-appear"],
									appearActive:
										styles["crossfade-appear-active"],
									enter: styles["crossfade-enter"],
									enterActive:
										styles["crossfade-enter-active"],
									enterDone: styles["crossfade-enter-done"],
									exit: styles["crossfade-exit"],
									exitActive: styles["crossfade-exit-active"],
									exitDone: styles["crossfade-exit-done"],
								}}
								key={currentImageEventId}
								nodeRef={nodeRef}
							>
								<div className={styles.imageContainer} ref={nodeRef}>
									<img
										src={currentImage}
										className={styles.img}
									/>
								</div>
							</CSSTransition>
						</TransitionGroup>
						</React.StrictMode>
					</picture>
					{children}
				</Fragment>
			)}
		</div>
	);
}

HoverSlideshowAnimated.propTypes = {
	/** Child elements.  Useful to display absolutely-positioned content over images. */
	children: PropTypes.any,
	/** Additional CSS classnames to add to the root container. */
	className: PropTypes.string,
	/** Height of the container, e.g. "100px" */
	height: PropTypes.string,
	/** Optional href to add to anchor wrapper. */
	href: PropTypes.string,
	/** Array of image hrefs. */
	images: PropTypes.arrayOf(PropTypes.string),
	/** Optional placeholder element to display while images load. */
	LoadingPlaceholder: PropTypes.elementType,
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
