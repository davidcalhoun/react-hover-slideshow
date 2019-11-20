import { useState } from "react";
import { getPercentInt } from "./utils";

const movementTypes = ["mousemove", "touchmove"];

/**
 * React hook to determine a user cursor's x or y "progress" while passing over an element.
 * Top left corner: x: 0, y: 0
 * Bottom right corner: x: 100, y: 100
 */
const getCursorProgress = (syntheticEvent, axis, boundingClientRect) => {
	let clientX;
	let clientY;
	if (syntheticEvent.touches && syntheticEvent.touches[0]) {
		// touch event
		clientX = syntheticEvent.touches[0].clientX;
		clientY = syntheticEvent.touches[0].clientY;
	} else {
		// mouse event
		clientX = syntheticEvent.clientX;
		clientY = syntheticEvent.clientY;
	}

	return axis === "y"
		? getPercentInt(
				clientY - boundingClientRect.y,
				boundingClientRect.height
		  )
		: getPercentInt(
				clientX - boundingClientRect.x,
				boundingClientRect.width
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
		// Prevent page scroll for touch events
		const hasTouch = syntheticEvent.touches;
		if (hasTouch && syntheticEvent.preventDefault) {
			syntheticEvent.preventDefault();
		}

		if (!syntheticEvent || !movementTypes.includes(syntheticEvent.type)) {
			return;
		}

		// Note: this hits the DOM a lot, but seems performant enough.  If all images are
		// equally sized, this can possibly be cached in the future.
		const maybeCachedRect = syntheticEvent.target.getBoundingClientRect();

		setProgress({
			xProgress: getCursorProgress(syntheticEvent, "x", maybeCachedRect),
			yProgress: getCursorProgress(syntheticEvent, "y", maybeCachedRect),
			boundingClientRect: maybeCachedRect
		});
	}

	return [[xProgress, yProgress], setCursorProgress];
}
