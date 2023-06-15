import { Box } from "@artsy/palette"
import { AdUnit } from "Apps/Article/Components/ArticleAd/types"
import { useArticleTracking } from "Apps/Article/useArticleTracking"
import { useSizeAndPosition } from "Utils/Hooks/useSizeAndPosition"
import { FC } from "react"
import { AdSlot } from "react-dfp"

interface ArticleAdBanerProps {
  unit: AdUnit
  width: number
  height: number
}

export const ArticleAdBaner: FC<ArticleAdBanerProps> = ({
  unit,
  width,
  height,
}) => {
  const { displayedAd } = useArticleTracking()

  // Since ads are iframed we have to calculate a value to use to scale them via transform.
  // We track the geometry of a responsive box and keep the value in sync with it.
  const { ref, ...geometry } = useSizeAndPosition()
  const scale = geometry.width / width

  return (
    <Box
      ref={ref as any}
      width="100%"
      height="100%"
      style={{
        transformOrigin: "top left",
        transform: `scale(${scale})`,
      }}
    >
      <AdSlot
        adUnit={unit}
        sizes={[[width, height]]}
        onSlotIsViewable={displayedAd}
      />
    </Box>
  )
}
