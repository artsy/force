import { Avatar } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const LocalImagePreview: React.FC<{ imageUrl: string }> = ({
  imageUrl,
}) => {
  return (
    <>
      <Media lessThan="sm">
        <Avatar
          style={{ objectFit: "cover" }}
          src={imageUrl}
          size="xs"
          lazyLoad
          mr={[1, 2]}
        />
      </Media>

      <Media greaterThanOrEqual="sm">
        <Avatar
          style={{ objectFit: "cover" }}
          src={imageUrl}
          size="md"
          lazyLoad
          mr={[1, 2]}
        />
      </Media>
    </>
  )
}
