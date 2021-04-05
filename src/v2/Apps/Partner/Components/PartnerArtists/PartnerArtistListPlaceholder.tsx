import React from "react"
import { Column, GridColumns, SkeletonBox, SkeletonText } from "@artsy/palette"
import { CssColumns, PartnerArtistListContainer } from "./PartnerArtistList"

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
        <CssColumns columnCount={6} mt={2}>
          {[...new Array(60)].map((_, i) => {
            return (
              <SkeletonBox key={i} mb={1} done={done}>
                <SkeletonText></SkeletonText>
              </SkeletonBox>
            )
          })}
        </CssColumns>
      </Column>
    </GridColumns>
  </PartnerArtistListContainer>
)
