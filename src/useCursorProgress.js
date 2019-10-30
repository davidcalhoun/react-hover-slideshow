import { useState } from "react";
import { getPercentInt } from "./utils";

const movementTypes = ["mousemove", "touchmove"];

/**
 * React hook to determine a user's x,y "progress" over an element.
 * Top left corner: 0, 0
 * Bottom right corner: 100, 100
 */
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
		if (!syntheticEvent || !movementTypes.includes(syntheticEvent.type)) {
			return;
		}

		// Note: this hits the DOM a lot, but seems performant enough.  If all images are
		// equally sized, this can possibly be cached in the future.
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
	}

	return [[xProgress, yProgress], setCursorProgress];
}

