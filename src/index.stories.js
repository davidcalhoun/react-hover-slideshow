import React from 'react';
import HoverSlideshow from './';
import HoverSlideshowAnimated from './animated';

export default { title: 'HoverSlideshow' };

const images = [
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190918-IMG_8701-me-katahdin-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190504-IMG_4002-pa-worthington-state-forest-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190520-IMG_4562-ny-east-fishkill-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190603-IMG_5185-ma-tyringham-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190718-IMG_6481-vt-killington-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190806-IMG_7290-nh-white-mountains-towards-mt-eisenhower-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190903-IMG_8183-me-bigelows-view-sm.jpg",
	"https://www.davidbcalhoun.com/wp-content/uploads/2019/20190409-IMG_2462-md-washington-monument-state-park-sm.jpg"
];

export const withNormal = () => <HoverSlideshow images={ images } />;
export const withAnimation = () => <HoverSlideshowAnimated images={ images } />;