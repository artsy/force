import {
  Text,
  Column,
  GridColumns,
  Image,
  Spacer,
  Box,
  BoxProps,
  media,
} from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { Media } from "Utils/Responsive"
import { DownloadAppBadges } from "Components/DownloadAppBadges/DownloadAppBadges"
import { resized } from "Utils/resized"
import styled from "styled-components"

const BannerFrontPartStyledImage = styled(Image)`
  position: absolute;
  width: 432px;
  height: 334px;
  top: -94px;
  transform: translate(-50%, 0);
  left: 50%;
  background-color: transparent;

  ${media.md`
    width: 300px;
  `}
  ${media.xs`
    top: -55px;
    width: 184px;
    height: 195px;
  `}
`

export const DownloadApp: React.FC<BoxProps> = props => {
  const desktopBackgroundImage = resized(
    "https://files.artsy.net/images/consign_thank_you_page_banner_background.png",
    { width: 1220, quality: 50 }
  )

  const mobileBackgroundImage = resized(
    "https://files.artsy.net/images/consign_thank_you_page_banner_background.png",
    { width: 725, quality: 50 }
  )

  const bannerForeground = resized(
    "https://files.artsy.net/images/consign_thank_you_page_banner_foreground.png",
    {
      width: 432,
    }
  )

  return (
    <GridColumns {...props}>
      <Column
        span={5}
        display="flex"
        flexDirection="column"
        alignItems="left"
        justifyContent="center"
        order={[2, 1]}
        px={0}
        py={[4, 2]}
      >
        <Box mt={[-1, 12]}>
          <Text variant="xl" mb={1}>
            View&nbsp;My&nbsp;Collection on the Artsy&nbsp;App
          </Text>
          <Spacer y={2} />
          <DownloadAppBadges
            contextModule={ContextModule.consignSubmissionFlow}
            justifyContent="flex-start"
            mx={-0.5}
          />
        </Box>
      </Column>

      <Column span={7} position="relative" order={[1, 2]}>
        <Media at="xs">
          <Box position="relative" mx={[-2, -4]}>
            <Image
              src={mobileBackgroundImage.src}
              srcSet={mobileBackgroundImage.srcSet}
              height={140}
              width="100%"
              lazyLoad
              alt=""
              mt="90px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            <BannerFrontPartStyledImage
              src={bannerForeground.src}
              srcSet={bannerForeground.srcSet}
              lazyLoad
              alt=""
              style={{ objectPosition: "top", objectFit: "cover" }}
            />
          </Box>
        </Media>

        <Media greaterThan="xs">
          <Box position="relative" mr={[-2, -4]}>
            <Image
              src={desktopBackgroundImage.src}
              srcSet={desktopBackgroundImage.srcSet}
              height={240}
              width="100%"
              lazyLoad
              alt=""
              mt={12}
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            <BannerFrontPartStyledImage
              src={bannerForeground.src}
              srcSet={bannerForeground.srcSet}
              lazyLoad
              alt=""
              style={{ objectPosition: "top", objectFit: "cover" }}
            />
          </Box>
        </Media>
      </Column>
    </GridColumns>
  )
}
