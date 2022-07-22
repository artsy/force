import { Box, Column, GridColumns, SkeletonText } from "@artsy/palette"
import { PartnerArtistListContainer } from "./PartnerArtistList"

const names = [
  "xxxxxxxxxxxxxxx",
  "xxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxx",
  "xxxxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxx",
  "xxxxxxxxxxxxxx",
  "xxxxxxxxxxx",
  "xxxxxxxxxxxxxxxxx",
  "xxxxxxxxxxx",
  "xxxxxxxxxxxxxxx",
  "xxxxxxxxxx",
  "xxxxxxxxxxxxx",
]

function getName(i: number) {
  return names[i % names.length]
}

export const PartnerArtistListPlaceholder: React.FC = () => (
  <PartnerArtistListContainer>
    <GridColumns minWidth={[1100, "auto"]} pr={[2, 0]} gridColumnGap={1}>
      <Column span={12}>
        <SkeletonText variant="sm-display">Represented Artists</SkeletonText>

        <Box style={{ columnCount: 6 }} mt={2}>
          {[...new Array(60)].map((_, i) => {
            return (
              <SkeletonText key={i} mb={1}>
                {getName(i)}
              </SkeletonText>
            )
          })}
        </Box>
      </Column>
    </GridColumns>
  </PartnerArtistListContainer>
)
