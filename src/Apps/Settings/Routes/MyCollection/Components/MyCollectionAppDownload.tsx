import { Column, GridColumns, Image, ResponsiveBox, Text } from "@artsy/palette"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"
import { DownloadAppBadgesDark } from "./DownloadAppBadgesDark"

const image = resized(
  "https://files.artsy.net/images/my-coll-get-app-img.jpg",
  {
    width: 770,
    height: 652,
  }
)

const DescriptionColumn = () => (
  <>
    <Text variant={["lg", "lg", "xxl"]} mt={1}>
      Get More from My Collection on the App
    </Text>

    <Text variant="sm" mt={1} mb={4}>
      Discover all the features of My Collection on the Artsy app. Coming soon
      also on web.
    </Text>
    <DownloadAppBadgesDark />
  </>
)

const DesktopLayout: React.FC = () => {
  return (
    <GridColumns gridRowGap={4} alignItems="center">
      <Column span={6}>
        <DescriptionColumn />
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
  return (
    <GridColumns gridRowGap={4} alignItems="center">
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
        <DescriptionColumn />
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
