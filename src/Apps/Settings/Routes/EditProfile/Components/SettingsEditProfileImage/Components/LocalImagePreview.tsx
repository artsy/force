import { Avatar } from "@artsy/palette"
import { Media } from "Utils/Responsive"

export const LocalImagePreview: React.FC<{ imageUrl: string }> = ({
  imageUrl: imageUrl,
}) => {
  return (
    <>
      <Media lessThan="sm">
        <Avatar src={imageUrl} size="xs" lazyLoad mr={[1, 2]} />
      </Media>

      <Media greaterThanOrEqual="sm">
        <Avatar src={imageUrl} size="md" lazyLoad mr={[1, 2]} />
      </Media>
    </>
  )
}
