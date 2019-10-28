import { useState, useEffect } from "react";
import useCursorProgress from "./useCursorProgress";

const getIndexFromProgress = (progress, total) => {
	const index = Math.ceil(total * (progress / 100));
	const zeroIndex = index !== 0 ? index - 1 : index;

	return zeroIndex;
};

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
				currentImageEventId:
					Date.now() + Math.floor(Math.random() * 10000),
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
		setImage();
	}, [xProgress, yProgress]);

	useEffect(() => {
		// Preload all images.
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
