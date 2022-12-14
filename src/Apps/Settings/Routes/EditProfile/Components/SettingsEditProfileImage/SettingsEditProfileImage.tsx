import { Flex, Text } from "@artsy/palette"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import { EditProfileFormModel } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"
import { LocalImagePreview } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileImage/Components/LocalImagePreview"
import { useFormikContext } from "formik"
import { ChangeEvent, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { SettingsEditProfileImage_me$data } from "__generated__/SettingsEditProfileImage_me.graphql"

interface SettingsEditProfileImageProps {
  me: SettingsEditProfileImage_me$data
}

const SettingsEditProfileImage: React.FC<SettingsEditProfileImageProps> = ({
  me,
}) => {
  const [localImage, setlocalImage] = useState<string>("")
  const { setFieldValue } = useFormikContext<EditProfileFormModel>()

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return

    const newImage = event.target.files[0]
    const imagePreview = URL.createObjectURL(newImage)

    setlocalImage(imagePreview)
    setFieldValue("photo", newImage)
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
        {localImage ? (
          <LocalImagePreview imageUrl={localImage} />
        ) : (
          <CollectorProfileHeaderAvatarFragmentContainer me={me} />
        )}

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
}

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
