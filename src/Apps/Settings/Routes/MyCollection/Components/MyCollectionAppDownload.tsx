import { Column, GridColumns, Image, ResponsiveBox, Text } from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { DownloadAppBadgesDark } from "./DownloadAppBadgesDark"

const DesktopLayout: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/my-coll-get-app-img.jpg",
    {
      width: 770,
      height: 652,
    }
  )

  return (
    <GridColumns mb={12} gridRowGap={4} alignItems="center">
      <Column span={6}>
        <Text variant="xxl">Get More from My Collection on the App</Text>

        <Text variant="sm" mt={2} mb={6}>
          Discover all the features of My Collection on the Artsy app. Coming
          soon also on web.
        </Text>

        <DownloadAppBadgesDark />
      </Column>

      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={770} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt="Screenshot of My Collection sample screen on the App against a painting background"
          />
        </ResponsiveBox>
      </Column>
    </GridColumns>
  )
}

const MobileLayout: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/my-coll-get-app-img.jpg",
    {
      width: 770,
      height: 652,
    }
  )

  return (
    <GridColumns gridRowGap={2} alignItems="center">
      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={770} maxWidth="100%">
          <Image
            src={image.src}
            width="100%"
            height="100%"
            srcSet={image.srcSet}
            lazyLoad
            alt="My Collection app hero image"
          />
        </ResponsiveBox>
      </Column>

      <Column span={6}>
        <DownloadAppBadgesDark justifyContent="center" />

        <Text variant="xl" mt={2}>
          Get More from My Collection on the App
        </Text>

        <Text variant="sm" mt={0.5}>
          Discover all the features of My Collection on the Artsy app. Coming
          soon also on web.
        </Text>
      </Column>
    </GridColumns>
  )
}

export const MyCollectionAppDownload: React.FC = () => {
  return (
    <>
      <Media at="xs">
        <MobileLayout />
      </Media>
      <Media greaterThan="xs">
        <DesktopLayout />
      </Media>
    </>
  )
}
