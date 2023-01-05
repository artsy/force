import { Box, Button, Flex, SettingsIcon, Spacer, Text } from "@artsy/palette"
import { CollectorProfileHeaderAvatarFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderAvatar"
import { CollectorProfileHeaderInfoFragmentContainer } from "Apps/CollectorProfile/Components/CollectorProfileHeader/Components/CollectorProfileHeaderInfo"
import { LocalImagePreview } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileImage/Components/LocalImagePreview"
import { useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { getProfileLocalImage, LocalImage } from "Utils/localImagesHelpers"
import { Media } from "Utils/Responsive"
import { CollectorProfileHeader_me$data } from "__generated__/CollectorProfileHeader_me.graphql"

interface CollectorProfileHeaderProps {
  me: CollectorProfileHeader_me$data
}

const CollectorProfileHeader: React.FC<CollectorProfileHeaderProps> = ({
  me,
}) => {
  const [isLoading, setLoading] = useState(true)
  const [localImage, setLocalImage] = useState<LocalImage>()
  const { name, createdAt, bio } = me

  useEffect(() => {
    getProfileLocalImage()
      .then(image => {
        if (image) {
          setLocalImage(image)
        }
      })
      .catch(error => console.error("Error getting local profile image", error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Spacer y={[2, 4]} />

      <Flex>
        {isLoading ? (
          <LocalImagePreview isLoading={isLoading} />
        ) : localImage ? (
          <LocalImagePreview imageUrl={localImage.data} />
        ) : (
          <CollectorProfileHeaderAvatarFragmentContainer me={me} />
        )}

        <Flex flex={1} flexDirection="column" justifyContent="center">
          <Text variant={["md", "xl"]}>{name}</Text>
          {!!createdAt && (
            <Text variant={["xs", "sm-display"]} color="black60">
              {`Member since ${new Date(createdAt).getFullYear()}`}
            </Text>
          )}
        </Flex>

        <Media lessThan="sm">
          <RouterLink to="/settings/edit-profile">
            <SettingsIcon height={24} width={24} />
          </RouterLink>
        </Media>

        <Media greaterThanOrEqual="sm">
          <Button
            // @ts-ignore
            as={RouterLink}
            to="/settings/edit-profile"
            variant="secondaryBlack"
            size="large"
          >
            Settings
          </Button>
        </Media>
      </Flex>

      <Spacer y={2} />

      <Box mb={2}>
        {!!bio && (
          <Text mb={[1, 2]} variant={["xs", "sm-display"]}>
            {bio}
          </Text>
        )}

        <CollectorProfileHeaderInfoFragmentContainer me={me} />
      </Box>
    </>
  )
}

export const CollectorProfileHeaderFragmentContainer = createFragmentContainer(
  CollectorProfileHeader,
  {
    me: graphql`
      fragment CollectorProfileHeader_me on Me {
        ...CollectorProfileHeaderAvatar_me
        ...CollectorProfileHeaderInfo_me
        name
        bio
        createdAt
      }
    `,
  }
)
