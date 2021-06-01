import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import {
  ArtsyMarkIcon,
  Box,
  boxMixin,
  BoxProps,
  Column,
  FacebookIcon,
  Flex,
  GridColumns,
  InstagramIcon,
  Separator,
  Text,
  TextVariant,
  TwitterIcon,
  useThemeConfig,
  WeChatIcon,
} from "@artsy/palette"
import { DownloadAppBadge } from "v2/Components/DownloadAppBadge"
import { ContextModule } from "@artsy/cohesion"
import { CCPARequest } from "../CCPARequest"
import { FooterDownloadAppBanner } from "./FooterDownloadAppBanner"
import { RouterLink, RouterLinkProps } from "v2/Artsy/Router/RouterLink"
import { Device, useDeviceDetection } from "v2/Utils/Hooks/useDeviceDetection"

interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = props => {
  const { device, downloadAppUrl } = useDeviceDetection()

  const tokens = useThemeConfig({
    v2: {
      header: "mediumText" as TextVariant,
      body: "text" as TextVariant,
      pt: 2,
      pb: 4,
    },
    v3: {
      header: "md" as TextVariant,
      body: "sm" as TextVariant,
      pt: 4,
      pb: 6,
    },
  })

  return (
    <Box mt={6} borderTop="1px solid" borderColor="black10" {...props}>
      <Box id="download-app-banner"></Box>
      <FooterDownloadAppBanner />

      <footer>
        <GridColumns pt={tokens.pt} pb={tokens.pb} gridRowGap={[4, 0]}>
          <Column span={12} display={["block", "none"]}>
            <Text variant={tokens.header} fontWeight="bold" mb={2}>
              Get the App
            </Text>
            <DownloadAppBadge
              contextModule={ContextModule.footer}
              device={device}
              downloadAppUrl={downloadAppUrl}
            />
          </Column>

          <Column span={3}>
            <Text variant={tokens.header} fontWeight="bold" mb={2}>
              About us
            </Text>

            <Text variant={tokens.body}>
              <FooterLink my={2} to="/about">
                About
              </FooterLink>

              <FooterLink my={2} to="/about/jobs">
                Jobs
              </FooterLink>

              <FooterLink my={2} to="/about/press">
                Press
              </FooterLink>

              <FooterLink mt={2} to="/contact">
                Contact
              </FooterLink>
            </Text>
          </Column>

          <Column span={3}>
            <Text variant={tokens.header} fontWeight="bold" mb={2}>
              Resources
            </Text>

            <Text variant={tokens.body}>
              <FooterLink my={2} to="https://artsy.github.io/open-source">
                Open Source
              </FooterLink>

              <FooterLink my={2} to="https://medium.com/artsy-blog">
                Blog
              </FooterLink>

              <FooterLink my={2} to="/categories">
                The Art Genome Project
              </FooterLink>

              <FooterLink mt={2} to="/artsy-education">
                Education
              </FooterLink>
            </Text>
          </Column>

          <Column span={3}>
            <Text variant={tokens.header} fontWeight="bold" mb={2}>
              Partnerships
            </Text>

            <Text variant={tokens.body}>
              <FooterLink my={2} to="https://partners.artsy.net">
                Artsy for Galleries
              </FooterLink>

              <FooterLink my={2} to="/institution-partnerships">
                Artsy for Museums
              </FooterLink>

              <FooterLink mt={2} to="/auction-partnerships">
                Artsy for Auctions
              </FooterLink>
            </Text>
          </Column>

          <Column span={3} wrap>
            <Text variant={tokens.header} fontWeight="bold" mb={2}>
              Support
            </Text>

            <Text variant={tokens.body}>
              <FooterLink my={2} to="https://support.artsy.net">
                Visit our Help Center
              </FooterLink>

              <FooterLink
                mt={2}
                to="https://support.artsy.net/hc/en-us/categories/360003689513-Buy"
              >
                Buying on Artsy
              </FooterLink>
            </Text>

            <Media greaterThan="xs">
              <Text variant={tokens.header} fontWeight="bold" mt={4} mb={1}>
                Get the App
              </Text>

              <Text variant={tokens.body}>
                <FooterLink
                  mt={2}
                  to="https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
                >
                  iOS App
                </FooterLink>

                <FooterLink
                  mt={2}
                  to="https://play.google.com/store/apps/details?id=net.artsy.app"
                >
                  Android App
                </FooterLink>
              </Text>
            </Media>
          </Column>

          <Column span={12} display={["flex", "none"]} flexWrap="wrap">
            <PolicyLinks />
          </Column>
        </GridColumns>

        <Separator />

        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          m="auto"
          py={2}
        >
          <Media at="xs">
            <Flex flexShrink={0}>
              <ArtsyMarkIcon title="Artsy" width={20} height={20} mr={2} />
            </Flex>
          </Media>

          <Media greaterThan="xs">
            <Flex alignItems="center">
              <Flex flexShrink={0}>
                <ArtsyMarkIcon title="Artsy" width={30} height={30} mr={2} />
              </Flex>

              <Flex flexDirection="row">
                <PolicyLinks />
              </Flex>
            </Flex>
          </Media>

          <Flex alignItems="center">
            <WeChat>
              <WeChatIcon width={20} height={20} mr={2} />
            </WeChat>

            <FooterLink to="https://twitter.com/artsy">
              <TwitterIcon width={20} height={20} mr={2} />
            </FooterLink>

            <FooterLink to="https://www.facebook.com/artsy">
              <FacebookIcon width={20} height={20} mr={2} />
            </FooterLink>

            <FooterLink to="https://www.instagram.com/artsy/">
              <InstagramIcon width={20} height={20} />
            </FooterLink>
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

const PolicyLinks = () => {
  const tokens = useThemeConfig({
    v2: {
      variant: "caption" as TextVariant,
    },
    v3: {
      variant: "xs" as TextVariant,
    },
  })

  return (
    <Text
      variant={tokens.variant}
      color="black60"
      display="flex"
      alignItems="center"
      flexWrap="wrap"
    >
      <Flex mr={1}>© {new Date().getFullYear()} Artsy</Flex>

      <FooterLink color="black60" mr={1} to="/terms">
        Terms of Use
      </FooterLink>

      <FooterLink color="black60" mr={1} to="/privacy">
        Privacy Policy
      </FooterLink>

      <FooterLink color="black60" mr={1} to="/security">
        Security
      </FooterLink>

      <FooterLink color="black60" mr={1} to="/conditions-of-sale">
        Conditions of Sale
      </FooterLink>

      <FooterLink
        color="black60"
        mr={1}
        to="/page/artsy-curated-auctions-listing-agreement"
      >
        ACA Seller’s Agreement
      </FooterLink>

      <Flex mr={1}>
        <CCPARequest />
      </Flex>
    </Text>
  )
}

export const FooterLink = styled(RouterLink)<RouterLinkProps & BoxProps>`
  display: flex;
  text-decoration: none;
  white-space: nowrap;
  ${boxMixin}
`

FooterLink.displayName = "FooterLink"
