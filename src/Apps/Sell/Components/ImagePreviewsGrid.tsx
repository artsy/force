import { Flex, Spacer } from "@artsy/palette"
import { ImagePreviewItem } from "Apps/Sell/Components/ImagePreviewItem"
import type { PhotosFormValues } from "Apps/Sell/Routes/PhotosRoute"
import { useFormikContext } from "formik"

export const ImagePreviewsGrid: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const {
    values: { photos },
  } = useFormikContext<PhotosFormValues>()

  if (!photos) return null

  return (
    <>
      <Spacer y={2} />

      <Flex gap={1} flexWrap="wrap">
        {/* Displaying the images in reverse order to ensure the most recent image is visible. */}
        {[...photos].reverse().map(photo => (
          <ImagePreviewItem key={photo.id} photo={photo} />
        ))}
      </Flex>
    </>
  )
}
