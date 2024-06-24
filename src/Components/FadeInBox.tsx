import { Box, BoxProps, useDidMount } from "@artsy/palette"

interface FadeInBoxProps extends BoxProps {
  isLoading?: boolean
}

export const FadeInBox: React.FC<FadeInBoxProps> = ({
  children,
  isLoading = false,
}) => {
  const isMounted = useDidMount()

  return (
    <Box
      opacity={isMounted || isLoading ? 1 : 0}
      style={{
        transition: "opacity 250ms",
      }}
    >
      {children}
    </Box>
  )
}
