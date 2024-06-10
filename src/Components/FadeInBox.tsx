import { Box, BoxProps, useDidMount } from "@artsy/palette"
import styled from "styled-components"

interface FadeInBoxProps extends BoxProps {
  opacity?: number
}

export const FadeInBox: React.FC<FadeInBoxProps> = ({ children }) => {
  const isMounted = useDidMount()

  return <FadeInWrapper opacity={isMounted ? 1 : 0}>{children}</FadeInWrapper>
}

const FadeInWrapper = styled(Box)<FadeInBoxProps>`
  opacity: ${props => props.opacity};
  transition: opacity 250ms;
`
