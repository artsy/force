import { Box, BoxProps, useDidMount } from "@artsy/palette"
import styled from "styled-components"

interface FadeInProps extends BoxProps {
  duration?: number
  initialOpacity?: number
}

export const FadeInBox: React.FC<FadeInProps> = ({ children, duration }) => {
  const isMounted = useDidMount()
  const initialOpacity = isMounted ? 0 : 1

  return (
    <Wrapper duration={duration} initialOpacity={initialOpacity}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled(Box)<FadeInProps>`
  opacity: 1;
  transition: opacity ${props => props.duration ?? "250ms"};
`
