import { useState, useEffect } from "react";
import useCursorProgress from "./useCursorProgress";
import { uuidv4, getIndexFromProgress } from "./utils";

/**
 * React Hook that cycles through an image slideshow when the user hovers.
 * Example with a 2 image slideshow:
 * * Cursor on the left half of the element, first image is shown.
 * * Cursor on the right half of the element, second image is shown.
 */
export default function useHoverSlideshow(images, axis = "horizontal") {
	const initialState = {
		currentImage: images[0],
		previousImage: null,
		currentImageIndex: 0,
		previousImageIndex: null
	};
	const [
		{
			currentImage,
			previousImage,
			currentImageIndex,
			previousImageIndex,
			currentImageEventId
		},
		setImageState
	] = useState(initialState);
	const [progress, setCursorProgress] = useCursorProgress();
	let [xProgress, yProgress] = progress;

	function setImage(shouldReset = false) {
		let imageIndex;
		if (shouldReset) {
			imageIndex = 0;
		} else {
			imageIndex =
				axis === "horizontal"
					? getIndexFromProgress(xProgress, images.length)
					: getIndexFromProgress(yProgress, images.length);
		}

		const indexChanged = imageIndex !== currentImageIndex;
		if (indexChanged) {
			setImageState({
				currentImageIndex: imageIndex,
				currentImage: images[imageIndex],
				/**
				 * "Image Events".
				 * In order to properly animate between images, we need to create unique IDs
				 * every time the user mouses into a new image zone.  UUID may be overkill,
				 * but should be fine as long as it's performant enough.
				 */
				currentImageEventId: uuidv4(),
				previousImageIndex: currentImageIndex,
				previousImage:
					typeof previousImageIndex !== "null"
						? images[currentImageIndex]
						: null,
				previousImageEventId: currentImageEventId
			});
		}
	}

	// Responds to x,y progress side effects.
	useEffect(() => {
		setImage();
	}, [xProgress, yProgress]);

	return [
		{
			currentImage,
			currentImageIndex,
			previousImage,
			previousImageIndex,
			currentImageEventId
		},
		{
			updateHoverSlideshow: setCursorProgress,
			resetHoverSlideshow: () => setImage(true)
		}
	];
}
