import {
  Button,
  Column,
  GridColumns,
  Shelf,
  SkeletonText,
} from "@artsy/palette"
import { ShelfArtworkPlaceholder } from "Components/Artwork/ShelfArtwork"

export const PartnerArtistDetailsPlaceholder: React.FC = () => {
  return (
    <GridColumns gridRowGap={[2, 4]}>
      <Column span={6}>
        <GridColumns gridRowGap={2}>
          <Column span={12}>
            <SkeletonText variant="xl">Artist name</SkeletonText>

            <SkeletonText variant="lg-display">Artist brief info</SkeletonText>
          </Column>

          <Column span={[12, 6]}>
            <Button variant="secondaryBlack" width="100%" disabled>
              —
            </Button>
          </Column>
        </GridColumns>
      </Column>

      <Column span={6}>
        <SkeletonText variant="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          lacinia varius neque ac rhoncus. Phasellus cursus finibus aliquam. Nam
          congue eget erat faucibus scelerisque. Nulla elementum aliquet
          hendrerit. Nullam eleifend sit amet lacus ac venenatis. In at dolor
          magna. Curabitur auctor, felis eget tristique rutrum, elit mauris
          ullamcorper nunc.
        </SkeletonText>
      </Column>

      <Column span={12}>
        <Shelf>
          {[...new Array(10)].map((_, i) => {
            return <ShelfArtworkPlaceholder key={i} index={i} />
          })}
        </Shelf>
      </Column>
    </GridColumns>
  )
}
