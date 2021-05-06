import React, { useCallback, useMemo, useState } from "react";
import ReactScrollbarsCustom from "react-scrollbars-custom";

const AutoHideScrollbar = ({ children, autoHide = true, ...props }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const isShow = isScrolling || isMouseOver;

  const onScrollStart = useCallback(() => {
    setIsScrolling(true);
  }, []);
  const onScrollStop = useCallback(() => {
    setIsScrolling(false);
  }, []);
  const onMouseEnter = useCallback(() => {
    setIsMouseOver(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsMouseOver(false);
  }, []);

  const trackProps = useMemo(
    () => ({
      renderer: ({ elementRef, style, ...restProps }) => (
        <span
          {...restProps}
          ref={elementRef}
          style={{
            ...style,
            background: "rgba(255,255,255,0.0)",
            opacity: !autoHide || isShow ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ),
    }),
    [isShow, onMouseEnter, onMouseLeave, autoHide]
  );

  const thumbProps = {
    renderer: ({ elementRef, style, ...restProps }) => (
      <span
        {...restProps}
        ref={elementRef}
        className="sc-thumb"
        style={{
          ...style,
          background: null,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    ),
  };

  return (
    <ReactScrollbarsCustom
      {...props}
      wrapperProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div {...restProps} ref={elementRef} style={{ ...style, right: 0 }} />
        ),
      }}
      trackXProps={trackProps}
      trackYProps={trackProps}
      thumbXProps={thumbProps}
      thumbYProps={thumbProps}
      onScrollStart={onScrollStart}
      onScrollStop={onScrollStop}
      scrollDetectionThreshold={500} // ms
    >
      {children}
    </ReactScrollbarsCustom>
  );
};

export default AutoHideScrollbar;
