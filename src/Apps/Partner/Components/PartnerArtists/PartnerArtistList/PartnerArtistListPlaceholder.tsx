import { Box, SkeletonText } from "@artsy/palette"

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

export const PartnerArtistListPlaceholder: React.FC = () => (
  <>
    <SkeletonText variant="sm-display">Represented Artists</SkeletonText>

    <Box style={{ columnCount: 6 }} mt={2}>
      {[...new Array(60)].map((_, i) => {
        return (
          <SkeletonText key={i} mb={1}>
            {names[i % names.length]}
          </SkeletonText>
        )
      })}
    </Box>
  </>
)
