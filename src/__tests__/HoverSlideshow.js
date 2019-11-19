import React from "react";
import { render, fireEvent } from "@testing-library/react";

import HoverSlideshow from "../HoverSlideshow";

const imageSet1 = [
  "01.jpg",
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg"
];
imageSet1.name = "imageSet1";

const imageSet2 = [
  "a.jpg",
  "b.jpg",
  "c.jpg",
  "d.jpg",
  "e.jpg",
  "f.jpg",
  "g.jpg"
];
imageSet2.name = "imageSet2";

const axes = ["horizontal", "vertical"];
const imageSets = [imageSet1, imageSet2];
const dimensions = [100, 200, 233];

dimensions.forEach(pixels => {
  describe(`${ pixels } pixels`, () => {
    imageSets.forEach(images => {
      describe(`${images.name}`, () => {
        axes.forEach(axis => {
          describe(`${axis} axis`, () => {
            const percentages = [0, 20, 50, 100];

            percentages.forEach(percent => {
              test(`${percent} percent`, async () => {
                const { container, getByLabelText } = render(
                  <HoverSlideshow axis={axis} images={images} aria-label="Test slideshow" />
                );

                const slideshow = getByLabelText("Test slideshow");

                slideshow.getBoundingClientRect = () => {
                  return {
                    width: pixels,
                    height: pixels,
                    x: 0,
                    y: 0
                  };
                };

                const mouseMoveProps =
                  axis === "horizontal"
                    ? { clientX: pixels * (percent / 100) }
                    : { clientY: pixels * (percent / 100) };

                fireEvent.mouseMove(slideshow, mouseMoveProps);

                expect(container).toMatchSnapshot();
              });
            });
          });
        });
      });
    });
  });
});
