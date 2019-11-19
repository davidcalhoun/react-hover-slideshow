# react-hover-slideshow
Iterates through an image slideshow based on cursor position.

![Hover slideshow preview](https://raw.githubusercontent.com/davidcalhoun/react-hover-slideshow/master/static/preview.gif)

# Live demo
See the [Storybook examples](https://davidcalhoun.github.io/react-hover-slideshow/index.html)

# Installation
`react-hover-slideshow` is distributed via [npm](https://www.npmjs.com/) which comes with [Node](https://nodejs.org/).  To install it as a dependency of your project, simply run:

* `npm i --save react-hover-slideshow`

This module also depends on your project already having `react` and `prop-types` as peer dependencies.  If you don't yet have those, you can install them with this:

* `npm i --save react prop-types`

# Usage
The simplest way to use `react-hover-slideshow` is to use the `HoverSlideshow` component:

```js
import React from "react";
import { HoverSlideshow } from "react-hover-slideshow";

export default function MyContainerElement(props) {
	const imageURLs = [
		"https://example.com/1.jpg",
		"https://example.com/2.jpg",
		"https://example.com/3.jpg"
	];

	return (
		<div>
			<h3>My photo album</h3>
			<HoverSlideshow
				aria-label="My pretty picture slideshow"
				images={imageURLs}
				style={{ width: "400px", height: "400px" }}
			/>
		</div>
	)
}
```

Alternatively you can use `HoverSlideshowAnimated` with the same interface, which will give you a nice crossfade effect.  Note that this animated variation depends on the peer dependency `react-transition-group`, which you can add you your project with the following:

* `npm i --save react-transition-group`

# Advanced usage with hooks
Behind the scenes, the helper components above use the hook `useHoverSlideshow`.  If you wish for more control over the image component markup and CSS, I recommend making a copy of `/src/HoverSlideshow.js` and making this small change:

```diff
import React from "react";
import PropTypes from "prop-types";
-import useHoverSlideshow from "./useHoverSlideshow";
+import { useHoverSlideshow } from "react-hover-slideshow";
```

The hook is used as follows:

```js
let [
	// Current image href, which will update on mousemove/touchmove
	{ currentImage },
	// Update will recompute currentImage based on the user's cursor
	// Reset assumes the user is no longer interacting, so it will return to the first (default) image
	{ updateHoverSlideshow, resetHoverSlideshow }
] = useHoverSlideshow(images, axis);
```

# Local development
1. Clone this repo: `git clone git@github.com:davidcalhoun/react-hover-slideshow.git`
1. Install dev dependencies: `npm i`
1. Check the `scripts` section in `package.json` for a list of available dev commands.
