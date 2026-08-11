import type { FC } from "react"

interface AISparklesIconProps {
  width?: number
  height?: number
  fill?: string
}

/**
 * Two four-point sparkles. `@artsy/icons` doesn't ship a standalone sparkle
 * glyph, so this is a local SVG. Uses `currentColor` so it can be tinted by the
 * parent's `color`.
 */
export const AISparklesIcon: FC<AISparklesIconProps> = ({
  width = 18,
  height = 18,
  fill = "currentColor",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      display="block"
    >
      <path
        d="M7 1.5 8.28 5.22 12 6.5 8.28 7.78 7 11.5 5.72 7.78 2 6.5l3.72-1.28L7 1.5Z"
        fill={fill}
      />
      <path
        d="M13.25 10 14 12l2 .75-2 .75-.75 2-.75-2-2-.75 2-.75.75-2Z"
        fill={fill}
      />
    </svg>
  )
}
