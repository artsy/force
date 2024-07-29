import { Box, Button, Clickable, Stack, Text, useTheme } from "@artsy/palette"
import { FC } from "react"
import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import { useDeviceDetection } from "Utils/Hooks/useDeviceDetection"
import { Z } from "Apps/Components/constants"
import CloseIcon from "@artsy/icons/CloseIcon"

interface AppDownloadFooterProps {}

export const AppDownloadFooter: FC<AppDownloadFooterProps> = () => {
  const { theme } = useTheme()
  const { downloadAppUrl } = useDeviceDetection()

  return (
    <Stack
      gap={2}
      p={2}
      bg="white100"
      position="fixed"
      right={0}
      bottom={0}
      left={0}
      zIndex={Z.appDownloadFooter}
      style={{ boxShadow: theme.effects.dropShadow }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={1}
      >
        <Stack gap={1} flexDirection="row">
          <Box bg="black100" color="white100" p={0.5} borderRadius={3}>
            <ArtsyMarkIcon width={30} height={30} />
          </Box>

          <Text variant="sm-display">
            Meet your new Art Advisor —<br />
            <strong>Get the App. Get the Art.</strong>
          </Text>
        </Stack>

        <Clickable>
          <CloseIcon />
        </Clickable>
      </Box>

      <Button
        variant="primaryBlack"
        width="100%"
        size="small"
        // @ts-ignore
        as="a"
        href={downloadAppUrl}
      >
        Download Artsy
      </Button>
    </Stack>
  )
}
