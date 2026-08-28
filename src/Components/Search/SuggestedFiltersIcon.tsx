import { themeGet } from "@styled-system/theme-get"
import type { FC } from "react"
import styled, { keyframes } from "styled-components"

/**
 * Two dots drifting together and apart, marking the row as a derived
 * suggestion rather than a search result.
 *
 * The static form of this mark ships in @artsy/icons as `Eclipse`, but this
 * component keeps its own paths rather than importing it, for two reasons:
 *
 *  - The two shapes animate in opposite directions, which needs them addressed
 *    individually. The generated icon renders two unlabelled <path> elements,
 *    so importing it would mean targeting `path:nth-child(n)` — silently wrong
 *    if the export order ever changes.
 *  - The viewBox has to be wider than the artwork to give the drift room; a
 *    square icon canvas clips it.
 *
 * The animation lives here rather than in the icon on purpose: SMIL inside the
 * SVG animates on web but is silently dropped on native, and it cannot be
 * disabled for prefers-reduced-motion.
 */
export const SuggestedFiltersIcon: FC = () => {
  return (
    <Eclipse
      width="26"
      height="20"
      viewBox="-4 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <Ring
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 3.5A5.5 5.5 0 1 0 11 14.5A5.5 5.5 0 1 0 11 3.5ZM11 4.9A4.1 4.1 0 1 0 11 13.1A4.1 4.1 0 1 0 11 4.9Z"
      />
      <Disc d="M7 3.5A5.5 5.5 0 1 0 7 14.5A5.5 5.5 0 1 0 7 3.5Z" />
    </Eclipse>
  )
}

const DRIFT_DURATION = "2.4s"
// The viewBox is padded by this much on each side so the drift isn't clipped
const DRIFT_OFFSET = "4px"

const driftLeft = keyframes`
  0%, 10% { transform: translateX(-${DRIFT_OFFSET}); }
  45%, 60% { transform: translateX(0); }
  100% { transform: translateX(-${DRIFT_OFFSET}); }
`

const driftRight = keyframes`
  0%, 10% { transform: translateX(${DRIFT_OFFSET}); }
  45%, 60% { transform: translateX(0); }
  100% { transform: translateX(${DRIFT_OFFSET}); }
`

const Eclipse = styled.svg`
  flex: none;
`

// transform-box/origin keep translateX relative to each shape, not the svg
const Dot = styled.path`
  fill: ${themeGet("colors.mono100")};
  transform-box: fill-box;
  transform-origin: center;
  animation-duration: ${DRIFT_DURATION};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;

  /* Hold the dots at rest rather than looping indefinitely */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translateX(0);
  }
`

const Disc = styled(Dot)`
  animation-name: ${driftLeft};
`

// A true hole rather than a background-coloured fill, so the mark works on any
// surface — and matches the asset going into @artsy/icons
const Ring = styled(Dot)`
  animation-name: ${driftRight};
`
