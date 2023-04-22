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
		setLoadProgress((prevLoadProgress) => {
			return {
				percent: parseInt(
					((prevLoadProgress.totalLoaded + 1) / totalImages) * 100
				),
				totalLoaded: prevLoadProgress.totalLoaded + 1,
				imagesLoaded: [...prevLoadProgress.imagesLoaded, image],
				isLoading: prevLoadProgress.totalLoaded + 1 < totalImages
			}
		});
	}

	return [
		loadProgress,
		handleImgLoad
	];
}
