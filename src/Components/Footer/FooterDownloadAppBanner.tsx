import {
  Button,
  Column,
  GridColumns,
  Image,
  Spacer,
  Text,
} from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { RouterLink } from "System/Components/RouterLink"
import { FooterDownloadAppBannerQuery } from "__generated__/FooterDownloadAppBannerQuery.graphql"
import {
  DOWNLOAD_APP_URLS,
  Device,
  useDeviceDetection,
} from "Utils/Hooks/useDeviceDetection"
import { DownloadAppBadge } from "Components/DownloadAppBadges/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"
import { useRouter } from "System/Hooks/useRouter"
import { useEffect, useState } from "react"
import { fetchQuery, graphql } from "react-relay"
import { useSystemContext } from "System/Hooks/useSystemContext"

const IGNORE_PATHS = ["/meet-your-new-art-advisor"]

const APP_BANNER_SRC =
  "https://files.artsy.net/images/universal-footer_april-14_cropped.jpg"

export const FooterDownloadAppBanner = () => {
  const { relayEnvironment } = useSystemContext()
  const { match } = useRouter()
  const [isVisible, setIsVisible] = useState(true)

  const { device, downloadAppUrl } = useDeviceDetection()

  useEffect(() => {
    const checkIfPrivateArtwork = async () => {
      const artworkSlug = match?.params?.artworkID
      if (!artworkSlug) {
        return
      }
      const data = await fetchQuery<FooterDownloadAppBannerQuery>(
        relayEnvironment,
        graphql`
          query FooterDownloadAppBannerQuery($slug: String!) {
            artwork(id: $slug) {
              isUnlisted
            }
          }
        `,
        {
          slug: artworkSlug,
        }
      ).toPromise()

      if (data?.artwork?.isUnlisted) {
        setIsVisible(false)
      }
    }

    checkIfPrivateArtwork()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (IGNORE_PATHS.includes(match.location.pathname)) {
    return null
  }

  if (!isVisible) {
    return null
  }

  const desktopCoverImage = resized(APP_BANNER_SRC, { width: 1220 })
  const mobileCoverImage = resized(APP_BANNER_SRC, { width: 725 })

  return (
    <>
      <GridColumns gridColumnGap={0} gridRowGap={0} bg="black5">
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
          <Text variant="xl" textAlign="center">
            Meet your new art advisor.
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

            <Button
              variant="secondaryBlack"
              // @ts-ignore
              as={RouterLink}
              to="/meet-your-new-art-advisor"
              minWidth={[0, 0, 200, 250]}
            >
              Discover Artsy
            </Button>
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
