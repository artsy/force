import React from "react"
import {
  Box,
  Column,
  GridColumns,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import { PartnerArtistListContainer } from "./PartnerArtistList"

interface PartnerArtistListPlaceholderProps {
  done?: boolean
}

export const PartnerArtistListPlaceholder: React.FC<PartnerArtistListPlaceholderProps> = ({
  done = true,
}) => (
  <PartnerArtistListContainer>
    <GridColumns minWidth={[1100, "auto"]} pr={[2, 0]} gridColumnGap={1}>
      <Column span={12}>
        <SkeletonText variant="mediumText" done={done}>
          Represented Artists
        </SkeletonText>
        <Box style={{ columnCount: 6 }} mt={2}>
          {[...new Array(60)].map((_, i) => {
            return (
              <SkeletonBox key={i} mb={1} done={done}>
                <SkeletonText></SkeletonText>
              </SkeletonBox>
            )
          })}
        </Box>
      </Column>
    </GridColumns>
  </PartnerArtistListContainer>
)
