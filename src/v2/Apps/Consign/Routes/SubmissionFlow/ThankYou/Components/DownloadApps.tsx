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
import { Media } from "v2/Utils/Responsive"
import { DownloadAppBadges } from "v2/Components/DownloadAppBadges/DownloadAppBadges"
import { resized } from "v2/Utils/resized"
import styled from "styled-components"

const DESKTOP_COVER_IMAGE = resized(
  "https://files.artsy.net/images/artsy_app-download-footer_2x_max.jpg",
  { width: 1220, quality: 50 }
)

const MOBILE_COVER_IMAGE = resized(
  "https://files.artsy.net/images/artsy_app-download-footer_2x_max.jpg",
  { width: 725, quality: 50 }
)

const BANNER_FRONT_PART = resized(
  "https://files.artsy.net/images/artsy_app-swa-download-mobile.png",
  {
    width: 432,
    quality: 50,
  }
)

const BannerFrontPartStyledImage = styled(Image)`
  object-fit: contain;
  position: absolute;
  width: 432px;
  height: 334px;
  top: -94px;
  transform: translate(-50%, 0);
  left: 50%;
  background-color: transparent;

  ${media.xs`
    top: -55px;
    width: 184px;
    height: 195px;
  `};
`

export const DownloadApps: React.FC<BoxProps> = props => {
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
          <Spacer mt={2} />
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
              src={MOBILE_COVER_IMAGE.src}
              srcSet={MOBILE_COVER_IMAGE.srcSet}
              height={140}
              width="100%"
              lazyLoad
              alt=""
              mt="90px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            <BannerFrontPartStyledImage
              src={BANNER_FRONT_PART.src}
              srcSet={BANNER_FRONT_PART.srcSet}
              lazyLoad
              alt=""
            />
          </Box>
        </Media>

        <Media greaterThan="xs">
          <Box position="relative" mr={[-2, -4]}>
            <Image
              src={DESKTOP_COVER_IMAGE.src}
              srcSet={DESKTOP_COVER_IMAGE.srcSet}
              height={240}
              width="100%"
              lazyLoad
              alt=""
              mt={12}
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />

            <BannerFrontPartStyledImage
              src={BANNER_FRONT_PART.src}
              srcSet={BANNER_FRONT_PART.srcSet}
              lazyLoad
              alt=""
            />
          </Box>
        </Media>
      </Column>
    </GridColumns>
  )
}
