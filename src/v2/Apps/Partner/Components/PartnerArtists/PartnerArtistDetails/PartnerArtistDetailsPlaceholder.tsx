import * as React from "react";
import {
  Box,
  Column,
  GridColumns,
  Separator,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"

export const PartnerArtistDetailsPlaceholder: React.FC = () => {
  return (
    <Box>
      <Separator id="jump--PartnerArtistDetails" mt={4} />
      <GridColumns gridRowGap={[2, 4]} my={4}>
        <Column span={6}>
          <GridColumns gridRowGap={2}>
            <Column span={12}>
              <SkeletonText variant="largeTitle">Artist name</SkeletonText>
              <SkeletonText variant="title">Artist brief info</SkeletonText>
            </Column>
            <Column span={[12, 6]}>
              <SkeletonBox width="100%" height={40} />
            </Column>
          </GridColumns>
        </Column>
        <Column span={6}>
          <SkeletonText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            lacinia varius neque ac rhoncus. Phasellus cursus finibus aliquam.
            Nam congue eget erat faucibus scelerisque. Nulla elementum aliquet
            hendrerit. Nullam eleifend sit amet lacus ac venenatis. In at dolor
            magna. Curabitur auctor, felis eget tristique rutrum, elit mauris
            ullamcorper nunc.
          </SkeletonText>
        </Column>
        <Column span={12} maxWidth="100%">
          <Carousel arrowHeight={160}>
            {[...new Array(10)].map((_, i) => {
              return <PartnerArtistArtworkCarouselItemPlaceholder key={i} />
            })}
          </Carousel>
        </Column>
      </GridColumns>
    </Box>
  )
}

export const PartnerArtistArtworkCarouselItemPlaceholder: React.FC = () => (
  <Box>
    <SkeletonBox width={220} height={160} mb={1} />

    <SkeletonText variant="mediumText">Artist name</SkeletonText>

    <SkeletonText variant="text">Artwork name</SkeletonText>

    <SkeletonText variant="text">Partner name</SkeletonText>

    <SkeletonText variant="text">Contact For Price</SkeletonText>
  </Box>
)
