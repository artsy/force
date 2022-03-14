import { FC, memo } from "react"
import { AdSlot, DFPSlotsProvider } from "react-dfp"
import { Box, BoxProps, ResponsiveBox, Text } from "@artsy/palette"
import { AdUnit, AdSize } from "./types"
import { useSizeAndPosition } from "v2/Utils/Hooks/useSizeAndPosition"

export interface ArticleAdProps extends BoxProps {
  unit: AdUnit
  size: AdSize
}

export const ArticleAd: FC<ArticleAdProps> = memo(({ unit, size, ...rest }) => {
  const [width, height] = size.split("x").map(n => parseInt(n, 10))

  // Since ads are iframed we have to calculate a value to use to scale them via transform.
  // We track the geometry of a responsive box and keep the value in sync with it.
  const { ref, ...geometry } = useSizeAndPosition({ debounce: 50 })
  const scale = geometry.width / width

  return (
    <Box {...rest}>
      <ResponsiveBox
        aspectWidth={width}
        aspectHeight={height}
        maxWidth={width}
        maxHeight={height}
        mx="auto"
        bg="black10"
      >
        <Box
          ref={ref as any}
          width="100%"
          height="100%"
          style={{
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <AdSlot adUnit={unit} sizes={[[width, height]]} />
        </Box>
      </ResponsiveBox>

      <Text variant="xs" textAlign="center" mx="auto" mt={1} color="black30">
        Advertisement
      </Text>
    </Box>
  )
})

ArticleAd.displayName = "ArticleAd"

export const ArticleAdProvider: FC = ({ children }) => {
  return (
    <DFPSlotsProvider dfpNetworkId="21805539690" lazyLoad>
      {children}
    </DFPSlotsProvider>
  )
}
