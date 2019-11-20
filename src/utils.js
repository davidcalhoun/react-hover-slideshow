/* https://stackoverflow.com/a/2117523/214017 */
export const uuidv4 = () => {
	if (window.crypto) {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		);
	} else {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
			c
		) {
			const r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	}
};

export const getPercentInt = (num, total) => {
	// Check for division by zero.
	if (total <= 0) {
		return 0;
	}

	return Math.floor((num / total) * 100);
};

/**
 * Determines a zeroth index based on progress 0-100.
 * Example:
 * getIndexFromProgress(10, 2); // 0
 */
export const getIndexFromProgress = (progress, total) => {
	const index = Math.ceil(total * (progress / 100));
	const zeroIndex = index !== 0 ? index - 1 : index;

	return zeroIndex;
};

/**
 * Example:
 * createNumberedArray({length: 3});  // ['1', '2', '3']
 * createNumberedArray({length: 3, prefix: "foo/"});   // ['foo/1', 'foo/2', 'foo/3']
 * createNumberedArray({length: 3, intOutput: true});  // [1, 2, 3]
 */
export const createNumberedArray = ({
	length,
	zeroIndexed = false,
	targetValLength = `${length}`.length,
	prefix = "",
	suffix = "",
	intOutput = false
}) => {
	const baseArr = [...Array(length).keys()];
	const incrementer = zeroIndexed ? 0 : 1;

	return baseArr.map((val, index) => {
		const num = `${index + incrementer}`.padStart(targetValLength, "0");
		return intOutput ? parseInt(num) : `${prefix}${num}${suffix}`;
	});
};
