import { Box, BoxProps, useDidMount } from "@artsy/palette"

interface FadeInBoxProps extends BoxProps {}

export const FadeInBox: React.FC<FadeInBoxProps> = ({ children, ...rest }) => {
  const isMounted = useDidMount()

  return (
    <Box
      opacity={isMounted ? 1 : 0}
      style={{
        transition: "opacity 250ms",
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}
