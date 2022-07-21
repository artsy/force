import { ArtworkGridExample } from "Components/ArtworkGridExample"
import { Media } from "Utils/Responsive"

export const FullArtworkGrid = props => (
  <>
    <Media at="xs">
      <ArtworkGridExample columnCount={2} {...props} />
    </Media>
    <Media at="sm">
      <ArtworkGridExample columnCount={3} {...props} />
    </Media>
    <Media greaterThanOrEqual="md">
      <ArtworkGridExample columnCount={4} {...props} />
    </Media>
  </>
)

export const ArtworkGrid = ArtworkGridExample
