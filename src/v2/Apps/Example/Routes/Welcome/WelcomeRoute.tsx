import { useState } from "react"
import * as React from "react"
import { Box, Button, Dialog, Text } from "@artsy/palette"
import { useAnalyticsContext, useTracking } from "v2/System"
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
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_slug: contextPageOwnerSlug,
        context_page_owner_id: contextPageOwnerId,
        subject: e.currentTarget.textContent,
      })
    )
  }

  return (
    <Box>
      <Text variant="title">Welcome to the Example app!</Text>

      <Button onClick={onClick} my={1}>
        Fire a tracking event
      </Button>

      <Dialog
        show={showDialog}
        title="The button was clicked"
        detail="Open your browser console to see the details of the tracking event"
        primaryCta={{
          action: () => setShowDialog(!showDialog),
          text: "Ok",
        }}
      />
    </Box>
  )
}
