import { CellPartnerPlaceholder } from "Components/Cells/CellPartner"
import { Box, type BoxProps, Shelf, SkeletonText } from "@artsy/palette"

export interface NearbyGalleriesRailPlaceholderProps extends BoxProps {
  count: number
}

export const NearbyGalleriesRailPlaceholder: React.FC<
  React.PropsWithChildren<NearbyGalleriesRailPlaceholderProps>
> = ({ count, ...rest }) => {
  return (
    <Box {...rest}>
      <SkeletonText variant="lg-display" mb={4}>
        Nearby Galleries
      </SkeletonText>

      <Shelf>
        {[...Array(count)].map((_, _i) => {
          return <CellPartnerPlaceholder />
        })}
      </Shelf>
    </Box>
  )
}
