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
import { resized } from "Utils/resized"

export const MyCollectionAppDownload: React.FC = () => {
  const image = resized(
    "https://files.artsy.net/images/my-collection-get-app-img.jpg",
    {
      width: 910,
      height: 652,
    }
  )

  return (
    <GridColumns gridRowGap={4} alignItems="center">
      <Column span={6}>
        <Text variant="xxl" mt={1}>
          Get More from My Collection on the App
        </Text>

        <Text variant="sm" mt={1} mb={4}>
          Discover all the features of My Collection on the Artsy app. Coming
          soon: The full range of features will also be available on the
          website.
        </Text>

        <Flex>
          <Box
            width={120}
            height={40}
            as="a"
            // @ts-ignore
            href="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://files.artsy.net/images/download-ios-app.svg"
              width="100%"
              height="100%"
              alt="ios app store button"
              loading="lazy"
            />
          </Box>

          <Spacer ml={2} />

          <Box
            width={120}
            height={40}
            as="a"
            // @ts-ignore
            href="https://play.google.com/store/apps/details?id=net.artsy.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://files.artsy.net/images/download-android-app.svg"
              width="100%"
              height="100%"
              alt="android play store button"
              loading="lazy"
            />
          </Box>
        </Flex>
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
