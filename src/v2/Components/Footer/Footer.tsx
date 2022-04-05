import * as React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import {
  ArtsyMarkIcon,
  Box,
  boxMixin,
  BoxProps,
  Clickable,
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
import { useCCPARequest } from "../CCPARequest"
import { FooterDownloadAppBanner } from "./FooterDownloadAppBanner"
import { RouterLink, RouterLinkProps } from "v2/System/Router/RouterLink"

interface FooterProps extends BoxProps {}

export const Footer: React.FC<FooterProps> = props => {
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
    <Box
      id="download-app-banner"
      mt={6}
      borderTop="1px solid"
      borderColor="black10"
      {...props}
    >
      <FooterDownloadAppBanner />

      <footer>
        <GridColumns pt={tokens.pt} pb={tokens.pb} gridRowGap={[4, 0]}>
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

              <FooterLink
                mt={2}
                to="https://partners.artsy.net/artsy-fair-partnerships/"
              >
                Artsy for Fairs
              </FooterLink>
            </Text>
          </Column>

          <Column span={3} wrap>
            <Text variant={tokens.header} fontWeight="bold" mb={2}>
              Support
            </Text>

            <Text variant={tokens.body}>
              <FooterLink my={2} to="/meet-the-specialists">
                Talk to a Specialist
              </FooterLink>

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

  const { CCPARequestComponent, showCCPARequest } = useCCPARequest()

  return (
    <>
      {CCPARequestComponent}

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

        <FooterLink color="black60" mr={1} to="/buyer-guarantee">
          Buyer Guarantee
        </FooterLink>

        <Clickable onClick={showCCPARequest}>
          Do not sell my personal information
        </Clickable>
      </Text>
    </>
  )
}

export const FooterLink = styled(RouterLink)<RouterLinkProps & BoxProps>`
  display: flex;
  text-decoration: none;
  white-space: nowrap;
  ${boxMixin}
`

FooterLink.displayName = "FooterLink"
