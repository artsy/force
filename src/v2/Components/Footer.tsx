import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import {
  ArtsyMarkIcon,
  FacebookIcon,
  Flex,
  Image,
  InstagramIcon,
  Separator,
  Spacer,
  Text,
  TwitterIcon,
  WeChatIcon,
  breakpoints,
  space,
  Box,
  color,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"
import { CCPARequest } from "./CCPARequest"
import { LazyLoadComponent } from "react-lazy-load-image-component"

const Column = styled(Flex).attrs({
  flex: 1,
  flexDirection: "column",
  mr: 2,
  mb: 3,
})``
interface Props {
  flushWithContent?: boolean
}

const DownloadAppBanner = () => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="center"
      borderBottom={`1px solid ${color("black10")}`}
      mb={3}
      overflow="hidden"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        maxWidth={breakpoints.xl}
      >
        <Box pr={6}>
          <Box minWidth={[160, 183]}>
            <Text variant="largeTitle" mb={1}>
              Get the Artsy iOS app
            </Text>
            <Text variant="subtitle" color="black60" mb={2}>
              Discover, buy, and sell art by the world’s leading artists
            </Text>
          </Box>
          <Flex flexDirection="row" alignItems="center">
            <Image
              src="https://files.artsy.net/download-app-qr-code.png"
              mr={2}
            />
            <Text color="black60">
              To download, scan this code with your phone’s camera
            </Text>
          </Flex>
        </Box>
        <Box height={320} width="100%" textAlign="center">
          <Image
            height={320}
            width="102%"
            src="https://files.artsy.net/consign/banner-large.jpg"
            mr={2}
            style={{
              objectFit: "cover",
            }}
          />
        </Box>
      </Flex>
    </Flex>
  )
}

export const Footer: React.FC<Props> = props => {
  const { flushWithContent } = props

  return (
    <Box
      mt={flushWithContent ? 0 : 6}
      borderTop={flushWithContent ? "" : `1px solid ${color("black10")}`}
    >
      <Media greaterThan="xs">
        <Box id="download-app-banner"></Box>
        <LazyLoadComponent threshold={1000}>
          <DownloadAppBanner />
        </LazyLoadComponent>
      </Media>
      <footer>
        <Flex
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          width="100%"
          maxWidth={breakpoints.xl}
          m="auto"
        >
          <Media at="xs">
            <Column>
              <Text variant="mediumText" mb={1} mt={2}>
                Get the iOS app
              </Text>
              <DownloadAppBadge contextModule={ContextModule.footer} />
            </Column>
          </Media>

          <Column>
            <Text variant="mediumText" mb={1}>
              About us
            </Text>

            <Text variant="text">
              <Link to="/about">About</Link>
              <Link to="/about/jobs">Jobs</Link>
              <Link to="/about/press">Press</Link>
              <Link to="/contact">Contact</Link>
            </Text>
          </Column>

          <Column>
            <Text variant="mediumText" mb={1}>
              Resources
            </Text>
            <Text variant="text">
              <Link to="https://artsy.github.com/open-source">Open Source</Link>
              <Link to="https://medium.com/artsy-blog">Blog</Link>
              <Link to="/categories">The Art Genome Project</Link>
              <Link to="/artsy-education">Education</Link>
            </Text>
          </Column>

          <Column>
            <Text variant="mediumText" mb={1}>
              Partnerships
            </Text>

            <Text variant="text">
              <Link to="https://partners.artsy.net">Artsy for Galleries</Link>
              <Link to="/institution-partnerships">Artsy for Museums</Link>
              <Link to="/auction-partnerships">Artsy for Auctions</Link>
            </Text>
          </Column>

          <Column>
            <Text variant="mediumText" mb={1}>
              Support
            </Text>
            <Text variant="text">
              <Link to="https://support.artsy.net">Visit our Help Center</Link>
              <Link to="https://support.artsy.net/hc/en-us/categories/360003689513-Buy">
                Buying on Artsy
              </Link>
            </Text>
            <Media greaterThan="xs">
              <Text variant="mediumText" mb={1} mt={3}>
                Get the iOS app
              </Text>
              <DownloadAppBadge contextModule={ContextModule.footer} />
            </Media>
          </Column>

          <Media at="xs">
            <Flex mb={1} flexWrap="wrap">
              <PolicyLinks />
            </Flex>
          </Media>
        </Flex>

        <Separator />

        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          maxWidth={breakpoints.xl}
          m="auto"
          py={2}
        >
          <Flex>
            <Media at="xs">
              <Flex>
                <ArtsyMarkIcon width="20px" height="20px" mr={2} />
              </Flex>
            </Media>

            <Media greaterThan="xs">
              <Flex flexDirection="row">
                <ArtsyMarkIcon width="30px" height="30px" mr={2} />

                <Spacer mr={1} />

                <Flex flexDirection="row">
                  <PolicyLinks />
                </Flex>
              </Flex>
            </Media>
          </Flex>

          <Flex alignItems="center">
            <WeChat>
              <WeChatIcon width={space(2)} height={space(2)} mr={1} />
            </WeChat>

            <Link to="https://twitter.com/artsy">
              <TwitterIcon width={space(2)} height={space(2)} mr={1} />
            </Link>

            <Link to="https://www.facebook.com/artsy">
              <FacebookIcon width={space(2)} height={space(2)} mr={1} />
            </Link>

            <Link to="https://www.instagram.com/artsy/">
              <InstagramIcon width={space(2)} height={space(2)} />
            </Link>
          </Flex>
        </Flex>
      </footer>
    </Box>
  )
}

const WeChat = styled(Flex)`
  > a {
    display: flex;
  }
`

const Link = styled(RouterLink)`
  display: flex;
  text-decoration: none;
  align-items: center;
  padding: ${space(1)}px 0;
`
const CCPAWrapper = styled(Flex)`
  text-decoration: none;
`

const PolicyLinks = () => (
  <>
    <Text
      display="flex"
      alignItems="center"
      variant="caption"
      color="black60"
      mr={1}
    >
      © {new Date().getFullYear()} Artsy
    </Text>

    <Link to="/terms">
      <Text variant="caption" color="black60" mr={1}>
        Terms of Use
      </Text>
    </Link>

    <Link to="/privacy">
      <Text variant="caption" color="black60" mr={1}>
        Privacy Policy
      </Text>
    </Link>

    <Link to="/security">
      <Text variant="caption" color="black60" mr={1}>
        Security
      </Text>
    </Link>

    <Link to="/conditions-of-sale">
      <Text variant="caption" color="black60" mr={1}>
        Conditions of Sale
      </Text>
    </Link>

    <Link to="/page/artsy-curated-auctions-listing-agreement">
      <Text variant="caption" color="black60" mr={1}>
        ACA Seller’s Agreement
      </Text>
    </Link>

    <CCPAWrapper py={1} justifyContent="center">
      <CCPARequest />
    </CCPAWrapper>
  </>
)
