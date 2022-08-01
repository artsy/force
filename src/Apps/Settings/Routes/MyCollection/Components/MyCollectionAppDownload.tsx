import {
  Box,
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { Media } from "Utils/Responsive"

const image = resized(
  "https://files.artsy.net/images/my-collection-get-app-img.jpg",
  {
    width: 910,
    height: 652,
  }
)

const AppStoreBadges = () => (
  <Flex>
    <RouterLink
      to="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
      target="_blank"
    >
      <Box width={120} height={40}>
        <Image
          src="https://files.artsy.net/images/download-ios-app.svg"
          width="100%"
          height="100%"
          alt="ios app store button"
          loading="lazy"
        />
      </Box>
    </RouterLink>

    <Spacer ml={2} />

    <RouterLink
      to={"https://play.google.com/store/apps/details?id=net.artsy.app"}
      target="_blank"
    >
      <Box width={120} height={40}>
        <Image
          src="https://files.artsy.net/images/download-android-app.svg"
          width="100%"
          height="100%"
          alt="android play store button"
          loading="lazy"
        />
      </Box>
    </RouterLink>
  </Flex>
)

const Title = () => {
  const title = "Get More from My Collection on the App"
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <Text variant="xxl" mt={1}>
          {title}
        </Text>
      </Media>
      <Media lessThan="lg">
        <Text variant="lg" mt={1}>
          {title}
        </Text>
      </Media>
    </>
  )
}

const DesktopLayout: React.FC = () => {
  return (
    <GridColumns gridRowGap={4} alignItems="center">
      <Column span={6}>
        <Title />

        <Text variant="sm" mt={1} mb={4}>
          Discover all the features of My Collection on the Artsy app. Coming
          soon: The full range of features will also be available on the
          website.
        </Text>

        <AppStoreBadges />
      </Column>

      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={910} maxWidth="100%">
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
    </GridColumns>
  )
}

const MobileLayout: React.FC = () => {
  return (
    <GridColumns gridRowGap={4} alignItems="center">
      <Column span={6}>
        <ResponsiveBox aspectHeight={652} aspectWidth={910} maxWidth="100%">
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
        <Title />

        <Text variant="sm" mt={1} mb={4}>
          Discover all the features of My Collection on the Artsy app. Coming
          soon: The full range of features will also be available on the
          website.
        </Text>
        <AppStoreBadges />
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
