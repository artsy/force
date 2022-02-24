import { themeGet } from "@styled-system/theme-get"
import { Range as RCRange, RangeProps } from "rc-slider"
import styled from "styled-components"

const BORDER_RADIUS_BASE = 6
export const RANGE_DOT_SIZE = 16

// TODO: Add styles for vertical mode, tooltip
export const Range: React.FC<RangeProps> = props => {
  return <StyledRange {...props} />
}

const StyledRange = styled(RCRange)`
  position: relative;
  height: ${RANGE_DOT_SIZE}px;
  width: 100%;
  touch-action: none;

  .rc-slider-rail {
    width: 100%;
    background-color: ${themeGet("colors.black30")};
    border-radius: ${BORDER_RADIUS_BASE}px;
  }

  .rc-slider-track {
    left: 0;
    border-radius: ${BORDER_RADIUS_BASE}px;
    background-color: ${themeGet("colors.blue100")};
  }

  .rc-slider-rail,
  .rc-slider-track,
  .rc-slider-step {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 2px;
  }

  .rc-slider-handle {
    position: absolute;
    width: ${RANGE_DOT_SIZE}px;
    height: ${RANGE_DOT_SIZE}px;
    cursor: pointer;
    cursor: -webkit-grab;
    cursor: grab;
    border-radius: 50%;
    background-color: ${themeGet("colors.white100")};
    touch-action: pan-x;
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
    border: solid 1px ${themeGet("colors.black10")};

    &:focus {
      outline: none;
    }
  }

  .rc-slider-mark {
    position: absolute;
    top: 18px;
    left: 0;
    width: 100%;
    font-size: 12px;
  }

  .rc-slider-mark-text {
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    cursor: pointer;
    color: #999;

    .rc-slider-active {
      color: #666;
    }
  }

  .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 2px;
    background: transparent;
  }

  .rc-slider-dot {
    position: absolute;
    bottom: -2px;
    margin-left: -4px;
    width: 8px;
    height: 8px;
    background-color: brown;
    cursor: pointer;
    border-radius: 50%;
    vertical-align: middle;
  }

  .rc-slider-dot-active {
    background-color: yellow;
  }

  .rc-slider-dot-reverse {
    margin-right: -4px;
  }

  &.rc-slider-disabled {
    .rc-slider-track,
    .rc-slider-handle,
    .rc-slider-dot {
      background-color: ${themeGet("colors.black30")};
    }

    .rc-slider-handle,
    .rc-slider-dot {
      box-shadow: none;
      cursor: not-allowed;
    }

    .rc-slider-mark-text,
    .rc-slider-dot {
      cursor: not-allowed !important;
    }
  }

  &,
  & * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(
      0,
      0,
      0,
      0
    ); //  remove tap highlight color for mobile safari
  }
`
