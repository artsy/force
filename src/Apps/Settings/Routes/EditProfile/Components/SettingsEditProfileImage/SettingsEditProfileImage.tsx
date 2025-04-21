import {
  Avatar,
  Box,
  Clickable,
  Flex,
  Spinner,
  Text,
  Tooltip,
  useToasts,
} from "@artsy/palette"
import {
  normalizePhoto,
  uploadPhotoToS3,
} from "Components/PhotoUpload/Utils/fileUtils"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useMutation } from "Utils/Hooks/useMutation"
import { usePoll } from "Utils/Hooks/usePoll"
import { Media } from "Utils/Responsive"
import type { SettingsEditProfileImageMutation } from "__generated__/SettingsEditProfileImageMutation.graphql"
import type { SettingsEditProfileImage_me$data } from "__generated__/SettingsEditProfileImage_me.graphql"
import { type ChangeEvent, type FC, useState } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import styled from "styled-components"

interface SettingsEditProfileImageProps {
  me: SettingsEditProfileImage_me$data
  relay: RelayRefetchProp
}

const SettingsEditProfileImage: FC<
  React.PropsWithChildren<SettingsEditProfileImageProps>
> = ({ me, relay }) => {
  const { sendToast } = useToasts()

  const [mode, setMode] = useState<"Idle" | "Uploading">("Idle")
  const [progress, setProgress] = useState(0)

  const { relayEnvironment } = useSystemContext()

  const { submitMutation } = useMutation<SettingsEditProfileImageMutation>({
    mutation: MUTATION,
  })

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setMode("Uploading")

    try {
      const photo = normalizePhoto(file)
      const uploadUrl = await uploadPhotoToS3(
        relayEnvironment,
        photo,
        setProgress,
      )

      await submitMutation({ variables: { input: { iconUrl: uploadUrl } } })

      sendToast({
        message: "Profile image uploaded successfully",
      })
    } catch (error) {
      console.error(error)

      sendToast({
        variant: "error",
        message: "Failed to update profile image",
      })
    }

    setMode("Idle")
  }

  const isProcessing = me.icon?.internalID && me.icon?.versions?.length === 0

  usePoll({
    key: me.icon?.internalID ?? "SettingsEditProfileImage",
    intervalTime: 2000,
    clearWhen: !isProcessing,
    callback: () => {
      relay.refetch({}, null, {}, { force: true })
    },
  })

  return (
    <>
      <FileInput
        id="file"
        type="file"
        onChange={handleChange}
        accept="image/jpeg, image/png"
        disabled={mode === "Uploading"}
      />

      <Clickable
        as="label"
        // @ts-ignore
        htmlFor="file"
      >
        <Flex alignItems="center" gap={[1, 2]}>
          {isProcessing ? (
            <Tooltip
              content="Your image is being processed. It will be available shortly."
              placement="right"
            >
              <Box
                position="relative"
                display="flex"
                border="1px solid"
                borderColor="mono10"
                borderRadius="50%"
                size={[70, 100]}
              >
                <Spinner />
              </Box>
            </Tooltip>
          ) : (
            <>
              <Media greaterThan="xs">
                <Avatar
                  size="md"
                  initials={me.initials ?? "U"}
                  src={me.icon?.cropped?.src}
                  srcSet={me.icon?.cropped?.srcSet}
                  border="1px solid"
                  borderColor="mono10"
                />
              </Media>

              <Media at="xs">
                <Avatar
                  size="sm"
                  initials={me.initials ?? "U"}
                  src={me.icon?.cropped?.src}
                  srcSet={me.icon?.cropped?.srcSet}
                  border="1px solid"
                  borderColor="mono10"
                />
              </Media>
            </>
          )}

          <Text variant="sm" color="mono60">
            {mode === "Idle" ? (
              <u>Choose an Image</u>
            ) : isProcessing ? (
              "Processing"
            ) : (
              `Uploading %${Math.round(progress)}`
            )}
          </Text>
        </Flex>
      </Clickable>
    </>
  )
}

const FRAGMENT = graphql`
  fragment SettingsEditProfileImage_me on Me {
    ...CollectorProfileHeaderAvatar_me
    initials
    icon {
      internalID
      versions
      cropped(height: 100, width: 100) {
        src
        srcSet
      }
    }
  }
`

const QUERY = graphql`
  query SettingsEditProfileImageQuery {
    me {
      ...SettingsEditProfileImage_me
    }
  }
`

const MUTATION = graphql`
  mutation SettingsEditProfileImageMutation($input: UpdateMyProfileInput!) {
    updateMyUserProfile(input: $input) {
      me {
        ...SettingsEditProfileImage_me
      }
    }
  }
`

export const SettingsEditProfileImageRefetchContainer = createRefetchContainer(
  SettingsEditProfileImage,
  { me: FRAGMENT },
  QUERY,
)

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
