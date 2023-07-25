"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Slider = ({ min, max, steps }) => {
  const sliderHandle = useRef(null);
  const trackHandle = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [offSet, setOffSet] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [displayValue, setDisplayValue] = useState(min);

  useEffect(() => {
    const trackMax = 100;
    const step = trackMax / (steps - 1);

    const handleMouseMove = (e) => {
      if (mouseDown) {
        const trackWidth = trackHandle.current.offsetWidth;
        let pos = ((e.clientX - offSet) / trackWidth) * 100;
        pos = Math.max(0, Math.min(pos, trackMax));
        const snappingPos = Math.round(pos / step) * step;
        setCurrentPosition(steps > 2 ? snappingPos : pos);
        const displayValue =
          steps > 2
            ? min + (Math.round(snappingPos / step) * (max - min)) / (steps - 1)
            : min + (pos / trackMax) * (max - min);
        setDisplayValue(Math.round(displayValue));
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (mouseDown) {
        const touch = e.touches[0];
        const trackWidth = trackHandle.current.offsetWidth;
        let pos = ((touch.clientX - offSet) / trackWidth) * 100;
        pos = Math.max(0, Math.min(pos, trackMax));
        const snappingPos = Math.round(pos / step) * step;
        setCurrentPosition(steps > 2 ? snappingPos : pos);
        const displayValue =
          steps > 2
            ? min + (Math.round(snappingPos / step) * (max - min)) / (steps - 1)
            : min + (pos / trackMax) * (max - min);
        setDisplayValue(Math.round(displayValue));
      }
    };

    const endMouseAction = () => {
      setMouseDown(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", endMouseAction);
    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    window.addEventListener("touchend", endMouseAction);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", endMouseAction);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", endMouseAction);
    };
  }, [mouseDown, max, min, offSet, steps]);

  const handleMouseDown = (e) => {
    const trackHandleRect = trackHandle.current.getBoundingClientRect();
    const sliderHandleRect = sliderHandle.current.getBoundingClientRect();
    const initialOffset =
      e.clientX -
      (sliderHandleRect.left - trackHandleRect.left) -
      sliderHandleRect.width / 2;
    setOffSet(initialOffset);
    setMouseDown(true);
  };

  const handleTouchStart = useCallback((e) => {
    const trackHandleRect = trackHandle.current.getBoundingClientRect();
    const sliderHandleRect = sliderHandle.current.getBoundingClientRect();
    const touch = e.touches[0];
    const initialOffset =
      touch.clientX -
      (sliderHandleRect.left - trackHandleRect.left) -
      sliderHandleRect.width / 2;
    setOffSet(initialOffset);
    setMouseDown(true);
  }, []);

  const handleResize = useCallback(() => {
    const trackMax = 100;
    const step = trackMax / (steps - 1);
    let pos = currentPosition;

    if (pos > trackMax) {
      pos = trackMax;
    } else if (pos < 0) {
      pos = 0;
    }

    const snappingPos = Math.round(pos / step) * step;
    setCurrentPosition(steps > 2 ? snappingPos : pos);
    const displayValue =
      steps > 2
        ? min + (Math.round(snappingPos / step) * (max - min)) / (steps - 1)
        : min + (pos / trackMax) * (max - min);
    setDisplayValue(Math.round(displayValue));
  }, [currentPosition, max, min, steps]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  //-----------------------------------------------------------------------------------------------------------------------------------------

  // const sliderHandle = useRef(null);
  // const trackHandle = useRef(null);
  // const [currentVal, setCurrentVal] = useState(0);
  // const [offSet, setOffSet] = useState(0);
  // const [displayValue, setDisplayValue] = useState(min);

  // const handleMouseDown = useCallback(
  //   (e) => {
  //     const start = e.screenX;
  //     const initialOffset = offSet;
  //     const trackMax = trackHandle.current.offsetWidth - 64;

  //     const handleMouseMove = (e) => {
  //       console.log(trackMax);
  //       const relativeMovement = e.screenX - start;
  //       let newOffset = initialOffset + relativeMovement;
  //       newOffset = Math.max(0, Math.min(newOffset, trackMax));
  //       setCurrentVal(newOffset);
  //       setOffSet(newOffset);
  //     };

  //     const handleMouseEnd = (e) => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //     };

  //     window.addEventListener("mousemove", handleMouseMove);
  //     window.addEventListener("mouseup", handleMouseEnd);

  //     return () => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //       window.removeEventListener("mouseup", handleMouseEnd);
  //     };
  //   },
  //   [offSet]
  // );

  // const handleResize = useCallback(
  // )

  // const handleTouchStart = useCallback(
  //   (e) => {
  //     const start = e.touches[0].screenX;
  //     const initialOffset = offSet;
  //     const trackMax = trackHandle.current.offsetWidth - 64;

  //     const handleTouchMove = (e) => {
  //       e.preventDefault();
  //       const relativeMovement = e.touches[0].screenX - start;
  //       let newOffset = initialOffset + relativeMovement;
  //       newOffset = Math.max(0, Math.min(newOffset, trackMax));
  //       setCurrentVal(newOffset);
  //       setOffSet(newOffset);
  //     };

  //     const handleTouchEnd = (e) => {
  //       window.removeEventListener("touchmove", handleTouchMove, {
  //         passive: false,
  //       });
  //     };

  //     window.addEventListener("touchmove", handleTouchMove, { passive: false });
  //     window.addEventListener("touchend", handleTouchEnd, { once: true });

  //     return () => {
  //       window.removeEventListener("touchmove", handleTouchMove, {
  //         passive: false,
  //       });
  //       window.removeEventListener("touchend", handleTouchEnd, { once: true });
  //     };
  //   },
  //   [offSet]
  // );

  return (
    <div className="flex flex-col justify-center items-center w-full md:p-8 p-10">
      <br />
      <br />
      <div
        ref={trackHandle}
        className="relative flex-grow h-1 w-full w-2/3 md:w-[480px] bg-black"
      >
        <div
          ref={sliderHandle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`absolute rounded-full h-16 w-16 -top-[31px] z-10 bg-white active:bg-figmablue border-black active:border-figmablue border-4 cursor-grab active:drop-shadow-lg flex content-center justify-center flex-wrap select-none	text-black active:text-white`}
          style={{ left: `calc(${currentPosition}% - 2em)` }}
        >
          {displayValue}
        </div>
        <div
          className="absolute h-1 bg-figmablue "
          style={{ width: `${currentPosition}%` }}
        ></div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
};

export default Slider;
