import { useState } from "react"
import * as React from "react"
import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"
import { ContextModule, clickedShowMore } from "@artsy/cohesion"

export const WelcomeRoute: React.FC = () => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()

  const [showDialog, setShowDialog] = useState(false)

  const onClick = e => {
    setShowDialog(!showDialog)

    trackEvent(
      clickedShowMore({
        context_module: ContextModule.promoSpace,
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_slug: contextPageOwnerSlug,
        context_page_owner_id: contextPageOwnerId,
        subject: e.currentTarget.textContent,
      })
    )
  }

  return (
    <>
      <Text variant="xl">Welcome to the Example app!</Text>
      <Button onClick={onClick} my={1}>
        Fire a tracking event
      </Button>

      {showDialog && (
        <ModalDialog
          title="The button was clicked"
          onClose={() => setShowDialog(!showDialog)}
        >
          <Flex flexGrow={1}>
            <Text>
              Open your browser console to see the details of the tracking event
            </Text>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}
