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

  const handleResize = useCallback(() => {
    const trackMax = trackHandle.current.offsetWidth - 64;
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
        : min + pos / (trackMax / (max - min));
    setDisplayValue(Math.round(displayValue));
  }, [currentPosition]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  console.log(handleTouchStart === foo.current ? "matches" : "does not match");

  foo.current = handleTouchStart;

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
    <div className="flex flex-col justify-center items-center w-full md:p-8 p-2">
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
