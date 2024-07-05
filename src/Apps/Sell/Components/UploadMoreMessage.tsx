import { Message, Text } from "@artsy/palette"
import { PhotosFormValues } from "Apps/Sell/Routes/PhotosRoute"
import { FadeInBox } from "Components/FadeInBox"
import { useFormikContext } from "formik"

export const UploadMoreMessage: React.FC = () => {
  const {
    values: { photos },
  } = useFormikContext<PhotosFormValues>()

  const photosCount = photos.length || 0

  if (photosCount != 1 && photosCount != 2) return null

  return (
    <FadeInBox>
      <Message variant="success" title="Increase your chance of selling" mt={2}>
        <Text variant="sm-display">
          Make sure to include images of the back, corners, frame and any other
          details if you can.
        </Text>
      </Message>
    </FadeInBox>
  )
}
