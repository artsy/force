import { ActionType } from "@artsy/cohesion"
import { SavedCookieConsentPreferences } from "@artsy/cohesion/dist/Schema/Events/CookieConsent"
import {
  Box,
  Button,
  Checkbox,
  Expandable,
  Flex,
  Join,
  Label,
  ModalDialog,
  ReadMore,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  CategoryPreferences,
  Destination,
} from "@segment/consent-manager/types/types"
import {
  ALLOW_ALL_PREFERENCES,
  CATEGORIES,
  REJECT_ALL_PREFERENCES,
} from "Components/CookieConsentManager/categories"
import { RouterLink } from "System/Components/RouterLink"
import { useMode } from "Utils/Hooks/useMode"
import { FC } from "react"
import { useTracking } from "react-tracking"

interface CookieConsentManagerDialogProps {
  destinations: Destination[]
  onClose: () => void
  preferences: CategoryPreferences
  setPreferences: (newPreferences: CategoryPreferences) => void
  saveConsent: (
    newPreferences?: boolean | CategoryPreferences,
    shouldReload?: boolean
  ) => void
}

export const CookieConsentManagerDialog: FC<CookieConsentManagerDialogProps> = ({
  destinations,
  onClose,
  preferences,
  setPreferences,
  saveConsent,
}) => {
  const { trackEvent } = useTracking()

  const [mode, setMode] = useMode<"Idle" | "Allowing" | "Rejecting" | "Saving">(
    "Idle"
  )

  const handleAllowAll = () => {
    setMode("Allowing")

    saveConsent(ALLOW_ALL_PREFERENCES)

    const payload: SavedCookieConsentPreferences = {
      action: ActionType.savedCookieConsentPreferences,
      value: ALLOW_ALL_PREFERENCES,
    }

    trackEvent(payload)
    onClose()
  }

  const handleRejectAll = () => {
    setMode("Rejecting")

    saveConsent(REJECT_ALL_PREFERENCES)

    const payload: SavedCookieConsentPreferences = {
      action: ActionType.savedCookieConsentPreferences,
      value: REJECT_ALL_PREFERENCES,
    }

    trackEvent(payload)
    onClose()
  }

  const handleSave = () => {
    setMode("Saving")

    saveConsent()

    const payload: SavedCookieConsentPreferences = {
      action: ActionType.savedCookieConsentPreferences,
      value: preferences,
    }

    trackEvent(payload)
    onClose()
  }

  return (
    <ModalDialog
      width={550}
      hasLogo
      title="Cookie Preference Center"
      onClose={onClose}
    >
      <Join separator={<Spacer y={2} />}>
        <Text variant="sm">
          <ReadMore
            maxChars={300}
            content="When you visit our website, we store cookies on your browser to collect information. The information collected might relate to you, your preferences or your device, and is mostly used to make the site work as you expect it to and to provide a more personalized web experience. However, you can choose not to allow certain types of cookies, which may impact your experience of the site and the services we are able to offer. Click on the different category headings to find out more and change our default settings according to your preference. You cannot opt-out of our First Party Strictly Necessary Cookies as they are deployed in order to ensure the proper functioning of our website (such as prompting the cookie banner and remembering your settings, to log into your account, to redirect you when you log out, etc.)."
          />
        </Text>

        <Text variant="sm">
          <RouterLink to="/privacy#cookie-policy">
            For details, please see our Cookie Policy.
          </RouterLink>
        </Text>

        <Button
          loading={mode === "Allowing"}
          width="100%"
          onClick={handleAllowAll}
        >
          Allow All
        </Button>

        <Separator />

        <Text variant="lg-display">Manage Consent Preferences</Text>

        <Box>
          <Join separator={<Spacer y={1} />}>
            {CATEGORIES.map(({ key, name, description }) => {
              const disabled = key === "necessary"

              const categoryDestinations = destinations.filter(destination => {
                return destination.category === key
              })

              const isActive = Boolean(preferences[key])

              return (
                <Expandable
                  key={key}
                  label={
                    <Flex
                      flex={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text variant="sm-display">{name}</Text>

                      {isActive ? (
                        <Label variant="brand">Active</Label>
                      ) : (
                        <Label>Inactive</Label>
                      )}
                    </Flex>
                  }
                >
                  <Text variant="sm" color="black60">
                    {description}
                  </Text>

                  {categoryDestinations.length > 0 && (
                    <>
                      <Spacer y={1} />

                      <Text variant="xs" color="black60">
                        Example:{" "}
                        {categoryDestinations
                          .map(destination => destination.name)
                          .join(", ")}
                      </Text>

                      <Spacer y={2} />
                    </>
                  )}

                  {!disabled && (
                    <>
                      <Spacer y={2} />

                      <Checkbox
                        disabled={disabled}
                        selected={isActive}
                        onSelect={() =>
                          setPreferences({ [key]: !preferences[key] })
                        }
                      >
                        Enable {name}
                      </Checkbox>
                    </>
                  )}

                  <Spacer y={4} />
                </Expandable>
              )
            })}
          </Join>
        </Box>

        <Flex>
          <Button
            flex={1}
            loading={mode === "Rejecting"}
            variant="secondaryBlack"
            onClick={handleRejectAll}
          >
            Reject All
          </Button>

          <Spacer x={2} />

          <Button flex={1} loading={mode === "Saving"} onClick={handleSave}>
            Confirm My Choices
          </Button>
        </Flex>
      </Join>
    </ModalDialog>
  )
}
