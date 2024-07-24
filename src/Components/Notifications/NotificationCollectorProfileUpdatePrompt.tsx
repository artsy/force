import { Box, Button, Image, ResponsiveBox, Stack, Text } from "@artsy/palette"
import { FC, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { NotificationCollectorProfileUpdatePrompt_notification$key } from "__generated__/NotificationCollectorProfileUpdatePrompt_notification.graphql"
import { NOTIFICATION_MAX_WIDTH } from "Components/Notifications/Notification"
import { CompleteProfileCollectionDialog } from "Components/CompleteProfile/CompleteProfileCollectionDialog"
import { CompleteProfileInformationDialog } from "Components/CompleteProfile/CompleteProfileInformationDialog"
import { resized } from "Utils/resized"

interface NotificationCollectorProfileUpdatePromptProps {
  notification: NotificationCollectorProfileUpdatePrompt_notification$key
}

const CONFIG = {
  profile: {
    title: "Tell us a little bit more about you.",
    description:
      "By completing your profile, you’re more likely to receive quick responses from galleries.",
    label: "Complete Your Profile",
    image: {
      src:
        "https://files.artsy.net/images/collector-profile_information_trimmed.jpg",
      width: 1248,
      height: 1525,
    },
  },
  collection: {
    title: "Tell us about the artists in your collection.",
    description: "Show off your collection and make a great impression.",
    label: "Add Artists to My Collection",
    image: {
      src:
        "https://files.artsy.net/images/collector-profile_collection_trimmed.jpg",
      width: 1248,
      height: 1525,
    },
  },
}

export const NotificationCollectorProfileUpdatePrompt: FC<NotificationCollectorProfileUpdatePromptProps> = ({
  notification: _notification,
}) => {
  const notification = useFragment(FRAGMENT, _notification)

  const [mode, setMode] = useState<"Idle" | "Open">("Idle")

  const handleClose = () => {
    setMode("Idle")
  }

  const hasArtistsInCollection =
    (notification.item?.me?.userInterestsConnection?.totalCount ?? 0) > 0

  const config = hasArtistsInCollection ? CONFIG.profile : CONFIG.collection
  const img = resized(config.image.src, { width: 450 })

  return (
    <>
      <Stack gap={4}>
        <Text variant="xs">
          <strong>Artsy Message</strong> • Today
        </Text>

        <Stack gap={2} width="100%" maxWidth={NOTIFICATION_MAX_WIDTH} m="auto">
          <Stack gap={0} textAlign="center">
            <Text variant="lg">{config.title}</Text>

            <Text variant="sm">{config.description}</Text>
          </Stack>

          <Box bg="black5" display="flex" p={4}>
            <ResponsiveBox
              aspectWidth={config.image.width}
              aspectHeight={config.image.height}
              maxWidth={450}
              m="auto"
            >
              <Image {...img} width="100%" height="100%" alt="" />
            </ResponsiveBox>
          </Box>

          <Button
            size="large"
            m="auto"
            onClick={() => {
              setMode("Open")
            }}
          >
            {config.label}
          </Button>
        </Stack>
      </Stack>

      {mode === "Open" && !hasArtistsInCollection && (
        <CompleteProfileCollectionDialog onClose={handleClose} />
      )}

      {mode === "Open" && hasArtistsInCollection && (
        <CompleteProfileInformationDialog onClose={handleClose} />
      )}
    </>
  )
}

const FRAGMENT = graphql`
  fragment NotificationCollectorProfileUpdatePrompt_notification on Notification {
    item {
      ... on CollectorProfileUpdatePromptNotificationItem {
        me {
          userInterestsConnection(interestType: ARTIST, first: 1) {
            totalCount
          }
        }
      }
    }
  }
`
