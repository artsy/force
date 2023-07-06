import { FC, memo } from "react"
import { DFPSlotsProvider } from "react-dfp"
import { Box, BoxProps, Clickable, ResponsiveBox, Text } from "@artsy/palette"
import { AdUnit, AdSize } from "./types"
import { useCookieConsentManager } from "Components/CookieConsentManager/CookieConsentManagerContext"
import { ArticleAdBaner } from "Apps/Article/Components/ArticleAd/ArticleAdBanner"

export interface ArticleAdProps extends BoxProps {
  unit: AdUnit
  size: AdSize
}

export const ArticleAd: FC<ArticleAdProps> = memo(({ unit, size, ...rest }) => {
  const {
    isDestinationAllowed,
    openConsentManager,
    ready,
  } = useCookieConsentManager()

  const [width, height] = size.split("x").map(n => parseInt(n, 10))

  return (
    <Box {...rest}>
      <ResponsiveBox
        aspectWidth={width}
        aspectHeight={height}
        maxWidth={width}
        maxHeight={height}
        mx="auto"
        bg="black10"
      >
        {ready && (
          <>
            {isDestinationAllowed("Google Ads") ? (
              <ArticleAdBaner unit={unit} width={width} height={height} />
            ) : (
              <Clickable
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={2}
                color="black60"
                onClick={openConsentManager}
              >
                <Text variant="xs">Manage Cookies</Text>
              </Clickable>
            )}
          </>
        )}
      </ResponsiveBox>

      <Text variant="xs" textAlign="center" mx="auto" mt={1} color="black30">
        Advertisement
      </Text>
    </Box>
  )
})

ArticleAd.displayName = "ArticleAd"

export const ArticleAdProvider: FC = ({ children }) => {
  return (
    <DFPSlotsProvider dfpNetworkId="21805539690">{children}</DFPSlotsProvider>
  )
}
