import { useState } from "react";

const getPercentInt = (num, total) => {
	// Check for division by zero.
	if (total < 1) {
		return 0;
	}

	return Math.floor((num / total) * 100);
}

const getCursorProgress = (syntheticEvent, axis, boundingClientRect) => {
	return axis === "x"
		? getPercentInt(
				syntheticEvent.clientX - boundingClientRect.x,
				boundingClientRect.width
		  )
		: getPercentInt(
				syntheticEvent.clientY - boundingClientRect.y,
				boundingClientRect.height
		  );
};

export default function useCursorProgress() {
	const initialState = {
		xProgress: 0,
		yProgress: 0,
		boundingClientRect: null
	};
	let [{ xProgress, yProgress, boundingClientRect }, setProgress] = useState(
		initialState
	);

	function setCursorProgress(syntheticEvent) {
		if (syntheticEvent && syntheticEvent.type === "mousemove") {
			// Use cached boundingClientRect when available to avoid DOM hits.
			// const maybeCachedRect =
			// 	boundingClientRect ||
			// 	syntheticEvent.target.getBoundingClientRect();

			// TODO: needs to be updated constantly if images are not the same size.
			const maybeCachedRect = syntheticEvent.target.getBoundingClientRect();

			setProgress({
				xProgress: getCursorProgress(
					syntheticEvent,
					"x",
					maybeCachedRect
				),
				yProgress: getCursorProgress(
					syntheticEvent,
					"y",
					maybeCachedRect
				),
				boundingClientRect: maybeCachedRect
			});
		} else {
			//setProgress(initialState);
		}
	}

	return [[xProgress, yProgress], setCursorProgress];
}

