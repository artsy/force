import React, { useCallback } from "react"
import { Box, BoxProps, Button, Text } from "@artsy/palette"
import { useDropzone } from "react-dropzone"
import { useFormikContext } from "formik"
import { Media } from "v2/Utils/Responsive"

export interface UploadPhotosFormModel {
  photos: File[]
}

export interface UploadPhotosFormProps extends BoxProps {}

export const UploadPhotosForm: React.FC<UploadPhotosFormProps> = ({
  ...rest
}) => {
  const { setFieldValue, values } = useFormikContext<UploadPhotosFormModel>()

  const onDrop = useCallback(acceptedFiles => {
    setFieldValue("photos", [...values.photos, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: ["image/jpeg", "image/png"],
    noClick: true,
    noKeyboard: true,
    multiple: false,
  })

  return (
    <Box {...rest}>
      <Box
        data-test-id="image-dropzone"
        px={[2, 4]}
        pt={[4, 6]}
        pb={[6, 80]}
        border="1px solid"
        borderColor="black10"
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        <Media greaterThanOrEqual="sm">
          <Text variant="lg">Drag and drop photos here</Text>
        </Media>
        <Media lessThan="sm">
          <Text variant="lg">Add photos here</Text>
        </Media>

        <Text variant="md" color="black60" mt={1}>
          Files supported: JPG, PNG
        </Text>
        <Text variant="md" color="black60" mt={1}>
          Maximum size: 30 MB
        </Text>
        <Button mt={4} variant="secondaryOutline" onClick={open}>
          Add Photo
        </Button>
      </Box>
    </Box>
  )
}
