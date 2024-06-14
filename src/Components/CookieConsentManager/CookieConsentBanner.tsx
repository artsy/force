import {
  Box,
  Button,
  Clickable,
  Column,
  GridColumns,
  Spacer,
  Text,
  useTheme,
} from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { HorizontalPadding } from "Apps/Components/HorizontalPadding"
import { Z } from "Apps/Components/constants"
import { RouterLink } from "System/Components/RouterLink"
import { FC } from "react"

interface CookieConsentBannerProps {
  onManage: () => void
  onAccept: () => void
}

export const CookieConsentBanner: FC<CookieConsentBannerProps> = ({
  onManage,
  onAccept,
}) => {
  const { theme } = useTheme()

  return (
    <Box
      position="fixed"
      right={0}
      bottom={0}
      left={0}
      bg="white100"
      borderTop="1px solid"
      borderColor="black10"
      py={[2, 4]}
      zIndex={Z.globalNav}
      style={{ boxShadow: theme.effects.dropShadow }}
    >
      <AppContainer>
        <HorizontalPadding>
          <GridColumns>
            <Column span={[12, 6, 8]}>
              <Text
                variant={["sm-display", "lg-display"]}
                fontWeight={["bold", "normal"]}
                textAlign={["center", "left"]}
              >
                Cookie Consent
              </Text>

              <Spacer y={1} />

              <Text variant="sm">
                We use cookies to improve your experience and personalize
                marketing. By clicking “Accept All,” you agree to our{" "}
                <RouterLink to="/privacy#cookie-policy" inline>
                  cookie policy.
                </RouterLink>
              </Text>
            </Column>

            <Column
              span={[12, 6, 4]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Clickable
                textDecoration="underline"
                onClick={onManage}
                flex={1}
                textAlign="center"
              >
                <Text variant="sm-display">Manage Cookies</Text>
              </Clickable>

              <Spacer x={4} />

              <Button size="large" onClick={onAccept} flex={1}>
                Accept All
              </Button>
            </Column>
          </GridColumns>
        </HorizontalPadding>
      </AppContainer>
    </Box>
  )
}
