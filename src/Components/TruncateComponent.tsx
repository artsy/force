import { Box, Button } from "@artsy/palette"
import { type FC, useState } from "react"
import styled, { css } from "styled-components"

interface TruncateComponentProps {
  children: React.ReactNode
  label?: string
}

export const TruncateComponent: FC<TruncateComponentProps> = ({
  children,
  label = "View All",
}) => {
  const [mode, setMode] = useState<"Collapsed" | "Expanded">("Collapsed")

  const handleClick = () => {
    setMode("Expanded")
  }

  return (
    <Box position="relative">
      <FadeOut mode={mode}>{children}</FadeOut>

      {mode === "Collapsed" && (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="100px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={handleClick}>{label}</Button>
        </Box>
      )}
    </Box>
  )
}

const FadeOut = styled(Box)<{ mode: "Collapsed" | "Expanded" }>`
  height: 1000px;
  overflow: hidden;
  mask-image: linear-gradient(to top, transparent 0%, #fff 33%);

  ${({ mode }) =>
    mode === "Expanded" &&
    css`
      height: auto;
      mask-image: none;
      overflow: visible;
    `}
`
