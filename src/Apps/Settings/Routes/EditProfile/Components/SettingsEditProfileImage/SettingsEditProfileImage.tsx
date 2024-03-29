import { Flex, Text } from "@artsy/palette"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import { EditProfileFormModel } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"
import { LocalImagePreview } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileImage/Components/LocalImagePreview"
import { useFormikContext } from "formik"
import { ChangeEvent, forwardRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import {
  PROFILE_IMAGE_KEY,
  storeLocalImage,
  useLocalImageStorage,
} from "Utils/localImageHelpers"
import { SettingsEditProfileImage_me$data } from "__generated__/SettingsEditProfileImage_me.graphql"

interface SettingsEditProfileImageProps {
  me: SettingsEditProfileImage_me$data
}

export interface SettingsEditProfileImageRef {
  storeImageLocally: () => Promise<void>
}

const SettingsEditProfileImage = forwardRef<
  SettingsEditProfileImageRef,
  SettingsEditProfileImageProps
>(({ me }, ref) => {
  const { setFieldValue } = useFormikContext<EditProfileFormModel>()
  const localImage = useLocalImageStorage(PROFILE_IMAGE_KEY)

  const [localImageBase64, setLocalImageBase64] = useState<string | null>(null)

  const convertFileToBase64 = (file: File) => {
    // convert file to base64
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      const base64data = reader.result
      setLocalImageBase64(base64data as string)
    }
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const newImage = event.target.files[0]

    // Convert file to base64 and save it to state to store it in local storage
    convertFileToBase64(newImage)

    setFieldValue("photo", newImage)
  }

  const handleImageLoad = (
    image: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const {
      naturalHeight: height,
      naturalWidth: width,
      currentSrc,
    } = image.target as any

    if (currentSrc.startsWith("data:image")) {
      // Save the image dimensions as well as local path to the localImages array
      storeLocalImage(PROFILE_IMAGE_KEY, { data: currentSrc, width, height })
    }
  }

  const renderProfileImage = () => {
    if (localImage || !!localImageBase64) {
      return (
        <LocalImagePreview
          onLoad={handleImageLoad}
          // the order here is important, localImageBase64 (local preview) should take precedence
          imageUrl={localImageBase64 || localImage?.data!}
        />
      )
    } else {
      return <CollectorProfileHeaderAvatarFragmentContainer me={me} />
    }
  }

  return (
    <>
      <FileInput
        id="file"
        type="file"
        onChange={handleChange}
        accept={"image/jpeg, image/png"}
      />

      <Flex alignItems="center">
        {renderProfileImage()}

        <Text
          as="label"
          // @ts-ignore
          htmlFor="file"
          variant="sm"
          color="black60"
          ml={[1, 0]}
          style={{ cursor: "pointer" }}
        >
          <u>Choose an Image</u>
        </Text>
      </Flex>
    </>
  )
})

export const SettingsEditProfileImageFragmentContainer = createFragmentContainer(
  SettingsEditProfileImage,
  {
    me: graphql`
      fragment SettingsEditProfileImage_me on Me {
        ...CollectorProfileHeaderAvatar_me
      }
    `,
  }
)

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
