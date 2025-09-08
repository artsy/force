import { ContextModule } from "@artsy/cohesion"
import {
  Button,
  Column,
  GridColumns,
  Image,
  Spacer,
  Text,
} from "@artsy/palette"
import { useAuthDialog } from "Components/AuthDialog"
import { DownloadAppBadge } from "Components/DownloadAppBadges/DownloadAppBadge"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  DOWNLOAD_APP_URLS,
  Device,
  useDeviceDetection,
} from "Utils/Hooks/useDeviceDetection"
import { Media } from "Utils/Responsive"
import { resized } from "Utils/resized"

const IGNORE_PATHS = ["/meet-your-new-art-advisor", "/about"]

const APP_BANNER_SRC =
  "https://files.artsy.net/images/new-works-for-you-footer.jpg"

export const FooterDownloadAppBanner = () => {
  const { match } = useRouter()

  const { device, downloadAppUrl } = useDeviceDetection()
  const { showAuthDialog } = useAuthDialog()
  const { isLoggedIn } = useSystemContext()

  if (
    IGNORE_PATHS.includes(match.location.pathname) ||
    match.location.search?.includes("utm_content=artwork-gallery-share")
  ) {
    return null
  }

  const desktopCoverImage = resized(APP_BANNER_SRC, { width: 1220 })
  const mobileCoverImage = resized(APP_BANNER_SRC, { width: 725 })

  return (
    <>
      <GridColumns gridColumnGap={0} gridRowGap={0} bg="mono5">
        <Column
          span={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          order={[2, 1]}
          px={[2, 4]}
          py={[6, 2]}
        >
          <Text variant="xl" textAlign="center" style={{ textWrap: "balance" }}>
            Discover and Buy Art that Moves You
          </Text>

          <Media at="xs">
            <Spacer y={1} />

            <Text variant="sm-display" textAlign="center">
              Get the app. Get the art.
            </Text>

            <Spacer y={2} />

            <DownloadAppBadge
              contextModule={ContextModule.footer}
              device={device ?? Device.iPhone}
              downloadAppUrl={
                downloadAppUrl ?? DOWNLOAD_APP_URLS[Device.iPhone]
              }
            />
          </Media>

          <Media greaterThan="xs">
            <Spacer y={2} />

            {isLoggedIn ? (
              <Button
                variant="secondaryBlack"
                minWidth={[0, 0, 200, 250]}
                // @ts-ignore
                as={RouterLink}
                to="/meet-your-new-art-advisor"
              >
                Get the app
              </Button>
            ) : (
              <Button
                variant="secondaryBlack"
                minWidth={[0, 0, 200, 250]}
                onClick={() => {
                  showAuthDialog({
                    analytics: {
                      contextModule: ContextModule.footer,
                    },
                  })
                }}
              >
                Sign Up
              </Button>
            )}
          </Media>
        </Column>

        <Column span={8} position="relative" order={[1, 2]}>
          <Media at="xs">
            <Image
              src={mobileCoverImage.src}
              srcSet={mobileCoverImage.srcSet}
              height={325}
              width="100%"
              lazyLoad
              alt=""
              style={{ objectFit: "cover" }}
            />
          </Media>

          <Media greaterThan="xs">
            <Image
              src={desktopCoverImage.src}
              srcSet={desktopCoverImage.srcSet}
              height={350}
              width="100%"
              lazyLoad
              alt=""
              style={{ objectFit: "cover" }}
            />
          </Media>
        </Column>
      </GridColumns>
    </>
  )
}
