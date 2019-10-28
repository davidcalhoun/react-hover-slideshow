import { useState, useEffect } from "react";
import useCursorProgress from "./useCursorProgress";
import { uuidv4, getIndexFromProgress } from "./utils";

/**
 * React Hook that cycles through an image slideshow when the user hovers.
 * Example with a 2 image slideshow:
 * * Cursor on the left half of the element, first image is shown.
 * * Cursor on the right half of the element, second image is shown.
 */
export default function useHoverSlideshow(images) {
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
	const [[xProgress, yProgress], setCursorProgress] = useCursorProgress();

	function setImage(syntheticEvent) {
		setCursorProgress(syntheticEvent);

		const imageIndex = getIndexFromProgress(xProgress, images.length);

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

	useEffect(() => {
		// Updates image based on user's x,y cursor over the image.
		setImage();
	}, [xProgress, yProgress]);

	useEffect(() => {
		// Preloads all images.
		images.map(src => {
			const image = new Image();
			image.src = src;
		});
	}, [images]);

	return [
		{
			currentImage,
			currentImageIndex,
			previousImage,
			previousImageIndex,
			currentImageEventId
		},
		setImage
	];
}
