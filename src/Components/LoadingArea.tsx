import { Box, BoxProps, Spinner } from "@artsy/palette"
import { Sticky } from "Components/Sticky"
import { ReactNode, FC } from "react"

interface LoadingAreaProps extends BoxProps {
  isLoading: boolean
  children: ReactNode
}
/**
 * Use this component when a content skeleton is inappropriate: for example,
 * when paginating contents, a skeleton would likely cause the UI to shift
 */
export const LoadingArea: FC<LoadingAreaProps> = ({
  isLoading,
  children,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {isLoading && (
        <Sticky>
          <Box
            height={300}
            position="absolute"
            display="flex"
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner />
          </Box>
        </Sticky>
      )}

      <Box
        style={{
          opacity: isLoading ? 0.25 : 1,
          transition: "opacity 250ms",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
