import ArtsyLogoIcon from "@artsy/icons/ArtsyLogoIcon"
import {
  Box,
  Button,
  Checkbox,
  Flex,
  ModalBase,
  ModalClose,
  Spacer,
  Text,
  useDidMount,
  useTheme,
} from "@artsy/palette"
import { useCountryCode } from "Components/AuthDialog/Hooks/useCountryCode"
import { useUpdateMyUserProfile } from "Utils/Hooks/Mutations/useUpdateMyUserProfile"
import { type FC, useEffect, useRef, useState } from "react"

interface OneTapWelcomeEmailModalProps {
  onClose: () => void
}

export const OneTapWelcomeEmailModal: FC<OneTapWelcomeEmailModalProps> = ({
  onClose,
}) => {
  const isMounted = useDidMount()
  const { theme } = useTheme()

  // Force the country lookup even though the user is now logged in — the default
  // opt-in state is region-dependent (preselected for non-GDPR, unchecked for
  // GDPR), matching the sign-up form’s behavior.
  const { isAutomaticallySubscribed, loading } = useCountryCode({ skip: false })

  const { submitUpdateMyUserProfile } = useUpdateMyUserProfile()

  const [agreedToReceiveEmails, setAgreedToReceiveEmails] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Seed the checkbox from the region default once the country resolves, without
  // clobbering a choice the user has already made.
  const initialized = useRef(false)
  useEffect(() => {
    if (loading || initialized.current) {
      return
    }

    setAgreedToReceiveEmails(isAutomaticallySubscribed)
    initialized.current = true
  }, [loading, isAutomaticallySubscribed])

  const handleClose = async () => {
    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)

    try {
      // Consent is idempotent in Gravity (agreed_to_receive_emails_at is only
      // ever set, never cleared), so we only need to write when opting in.
      if (agreedToReceiveEmails) {
        await submitUpdateMyUserProfile({ agreedToReceiveEmails: true })
      }
    } catch (err) {
      console.error(
        "[OneTapWelcomeEmailModal] Failed to save email preference",
        err,
      )
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <ModalBase
      onClose={handleClose}
      style={
        isMounted
          ? {
              backgroundColor: "rgba(229, 229, 229, 0.5)",
              transition: "background-color 250ms",
            }
          : { backgroundColor: "transparent" }
      }
      dialogProps={{ width: ["100%", 470], height: "auto" }}
    >
      <Box
        width="100%"
        position="relative"
        bg="mono0"
        p={4}
        style={{ boxShadow: theme.effects.dropShadow }}
      >
        <Flex justifyContent="space-between" alignItems="flex-start">
          <ArtsyLogoIcon width={80} height={30} />
          <ModalClose onClick={handleClose} />
        </Flex>

        <Spacer y={4} />

        <Text variant="lg-display" textAlign="center">
          Welcome to Artsy
        </Text>

        <Spacer y={2} />

        <Text variant="sm" color="mono60" textAlign="center">
          Discover emerging artists, trending shows, gallery openings, art to
          discover in cities around the world — straight to your inbox.
        </Text>

        <Spacer y={4} />

        <Checkbox
          selected={agreedToReceiveEmails}
          onSelect={setAgreedToReceiveEmails}
          data-testid="one-tap-welcome-email-checkbox"
        >
          <Text variant="xs">
            Subscribe to email to hear about our products, services, editorials,
            and other promotional content. Unsubscribe at any time.
          </Text>
        </Checkbox>

        <Spacer y={4} />

        <Button
          width="100%"
          loading={isSubmitting}
          onClick={handleClose}
          data-testid="one-tap-welcome-email-continue"
        >
          Continue
        </Button>
      </Box>
    </ModalBase>
  )
}
