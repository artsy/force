import { Avatar } from "@artsy/palette"
import { Media } from "Utils/Responsive"
import { Either } from "Utils/typeSupport"

interface LocalImagePreviewLoadedProps {
  imageUrl: string
  onLoad?: (image: React.SyntheticEvent<HTMLImageElement, Event>) => void
}

type LocalImagePreviewProps = Either<
  LocalImagePreviewLoadedProps,
  { isLoading: boolean }
>

export const LocalImagePreview: React.FC<LocalImagePreviewProps> = ({
  imageUrl,
  onLoad,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <>
        <Media lessThan="sm">
          <Avatar size="xs" mr={[1, 2]} />
        </Media>

        <Media greaterThanOrEqual="sm">
          <Avatar size="md" mr={[1, 2]} />
        </Media>
      </>
    )
  }

  return (
    <>
      <Media lessThan="sm">
        <Avatar
          onLoad={onLoad}
          style={{ objectFit: "cover" }}
          src={imageUrl}
          size="xs"
          lazyLoad
          mr={[1, 2]}
        />
      </Media>

      <Media greaterThanOrEqual="sm">
        <Avatar
          onLoad={onLoad}
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
