import CloseIcon from "@artsy/icons/CloseIcon"
import { Box, Clickable, useTheme } from "@artsy/palette"
import { SKIPPABLE_VIEWS, type View } from "Components/Inquiry/config"
import type * as React from "react"
import { InquiryBackdrop } from "./Components/InquiryBackdrop"
import {
  InquiryContextContextQueryRenderer,
  InquiryProvider,
  useInquiryContext,
} from "./Hooks/useInquiryContext"

interface InquiryProps {
  artworkID: string
  askSpecialist?: boolean
  enableCreateAlert?: boolean
  onClose(): void
}

export const Inquiry: React.FC<React.PropsWithChildren<InquiryProps>> = ({
  artworkID,
  askSpecialist,
  enableCreateAlert,
  onClose,
}) => {
  return (
    <InquiryProvider
      artworkID={artworkID}
      askSpecialist={askSpecialist}
      enableCreateAlert={enableCreateAlert}
      onClose={onClose}
    >
      <InquiryBackdrop>
        <InquiryContextContextQueryRenderer>
          <InquiryDialog />
        </InquiryContextContextQueryRenderer>
      </InquiryBackdrop>
    </InquiryProvider>
  )
}

const InquiryDialog: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { onClose, next, current, View } = useInquiryContext()

  const { theme } = useTheme()

  const isSkippable = SKIPPABLE_VIEWS.includes(current as View)

  return (
    <Box
      position="relative"
      bg="mono0"
      // FIXME: Not a good pattern
      width={["100vw", current === "Confirmation" ? 450 : 550]}
      height={["100vh", current === "ArtistsInCollection" ? 700 : "100%"]}
      p={2}
      style={{ boxShadow: theme.effects.dropShadow }}
    >
      <Clickable
        position="absolute"
        right={0}
        top={0}
        pt={2}
        px={1}
        mx={0.5}
        onClick={isSkippable ? next : onClose}
        aria-label={isSkippable ? "Skip" : "Close"}
      >
        <CloseIcon fill="mono100" display="block" />
      </Clickable>

      <View />
    </Box>
  )
}
