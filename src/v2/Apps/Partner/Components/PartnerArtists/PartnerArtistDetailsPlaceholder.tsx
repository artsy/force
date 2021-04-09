import React from "react"
import {
  Box,
  Column,
  GridColumns,
  Separator,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"

export interface PartnerArtistDetailsPlaceholderProps {
  done?: boolean
}

export const PartnerArtistDetailsPlaceholder: React.FC<PartnerArtistDetailsPlaceholderProps> = ({
  done = true,
}) => {
  return (
    <Box>
      <Separator mt={4} />
      <GridColumns gridRowGap={[2, 4]} my={4}>
        <Column span={6}>
          <GridColumns gridRowGap={2}>
            <Column span={12}>
              <SkeletonText done={done} variant="largeTitle">
                Darren Almond
              </SkeletonText>
              <SkeletonText done={done} variant="title">
                British, b. 1971
              </SkeletonText>
            </Column>
            <Column span={[12, 6]}>
              <SkeletonBox width="100%" height={40} done={done} />
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
        <Column span={12}>
          <Carousel arrowHeight={160}>
            {[...new Array(10)].map((_, i) => {
              return (
                <Box key={i}>
                  <SkeletonBox width={220} height={160} mb={1} done={done} />

                  <SkeletonText variant="mediumText" done={done}>
                    Darren Almond
                  </SkeletonText>

                  <SkeletonText variant="text" done={done}>
                    Cristal Baroque, 1959
                  </SkeletonText>

                  <SkeletonText variant="text" done={done}>
                    White Cube
                  </SkeletonText>

                  <SkeletonText variant="text" done={done}>
                    Contact For Price
                  </SkeletonText>
                </Box>
              )
            })}
          </Carousel>
        </Column>
      </GridColumns>
    </Box>
  )
}
