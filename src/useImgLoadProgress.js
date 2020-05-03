import { useState } from "react";

/**
 * Helper hook to keep track of total image loading progress.
 */
export default function useImgLoadProgress(totalImages) {
	const [loadProgress, setLoadProgress] = useState({
		percent: 0,
		totalLoaded: 0,
		imagesLoaded: []
	});

	function handleImgLoad(image) {
		setLoadProgress({
			percent: parseInt(
				((loadProgress.totalLoaded + 1) / totalImages) * 100
			),
			totalLoaded: loadProgress.totalLoaded + 1,
			imagesLoaded: [...loadProgress.imagesLoaded, image],
			isLoading: loadProgress.totalLoaded + 1 < totalImages
		});
	}

	return [
		loadProgress,
		handleImgLoad
	];
}
