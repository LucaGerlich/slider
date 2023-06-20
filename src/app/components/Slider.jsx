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
  const foo = useRef(null);

  useEffect(() => {
    const trackMax = trackHandle.current.offsetWidth - 64;
    const step = trackMax / (steps - 1);

    const handleMouseMove = (e) => {
      console.log("sdfgsdfgdsfg");
      if (mouseDown) {
        let pos = e.clientX - offSet;
        pos = Math.max(0, Math.min(pos, trackMax));
        const snappingPos = Math.round(pos / step) * step;
        setCurrentPosition(steps > 2 ? snappingPos : pos);
        const displayValue =
          steps > 2
            ? min + (Math.round(snappingPos / step) * (max - min)) / (steps - 1)
            : min + pos / (trackMax / (max - min));
        setDisplayValue(Math.round(displayValue));
      }
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (mouseDown) {
        const touch = e.touches[0];
        let pos = touch.clientX - offSet;
        pos = Math.max(0, Math.min(pos, trackMax));
        const snappingPos = Math.round(pos / step) * step;
        setCurrentPosition(steps > 2 ? snappingPos : pos);
        const displayValue =
          steps > 2
            ? min + (Math.round(snappingPos / step) * (max - min)) / (steps - 1)
            : min + pos / (trackMax / (max - min));
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
  }, [mouseDown]);

  const handleMouseDown = (e) => {
    const initalOffset = e.clientX - sliderHandle?.current?.offsetLeft;
    setOffSet(initalOffset - currentPosition);
    setMouseDown(true);
  };

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    // const initalOffset = touch.clientX - sliderHandle?.current?.offsetLeft;
    setOffSet((old) => old - currentPosition);
    setMouseDown(true);
  }, []);

  console.log(handleTouchStart === foo.current ? "matches" : "does not match");

  foo.current = handleTouchStart;

  // const sliderHandle = useRef(null);
  // const trackHandle = useRef(null);
  // const [currentVal, setCurrentVal] = useState(0);

  // const handleTouchStart = useCallback((e) => {
  //   const start = e.touches[0].screenX;

  //   const handleTouchMove = (e) => {
  //     e.preventDefault();
  //     const relativeMovement = e.touches[0].screenX - start;
  //   };

  //   const handleTouchEnd = (e) => {
  //     window.removeEventListener("touchmove", handleTouchMove, {
  //       passive: false,
  //     });
  //   };

  //   window.addEventListener("touchmove", handleTouchMove, { passive: false });
  //   window.addEventListener("touchend", handleTouchEnd, { once: true });

  //   return () => {
  //     window.removeEventListener("touchmove", handleTouchMove, {
  //       passive: false,
  //     });
  //     window.removeEventListener("touchend", handleTouchEnd, { once: true });
  //   };
  // }, []);

  return (
    <div>
      <div>
        Slider: min:{min} max:{max} steps:{steps} currentPOS:
        {Math.round(currentPosition)}
      </div>
      <br />
      <br />
      <div ref={trackHandle} className="relative h-1 w-[550px] bg-black">
        <div
          ref={sliderHandle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={`absolute rounded-full h-16 w-16 -top-[31px] bg-white active:bg-figmablue border-black active:border-figmablue border-4 cursor-grab active:drop-shadow-lg flex content-center justify-center flex-wrap select-none	text-black active:text-white`}
          style={{ transform: `translatex(${currentPosition}px)` }}
        >
          {displayValue}
        </div>
        <div
          className="absolute h-1 bg-figmablue"
          style={{ width: `${currentPosition}px` }}
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
