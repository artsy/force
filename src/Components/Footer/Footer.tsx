import ArtsyMarkIcon from "@artsy/icons/ArtsyMarkIcon"
import CheckmarkStrokeIcon from "@artsy/icons/CheckmarkStrokeIcon"
import EmptyCheckCircleIcon from "@artsy/icons/EmptyCheckCircleIcon"
import FacebookIcon from "@artsy/icons/FacebookIcon"
import InstagramIcon from "@artsy/icons/InstagramIcon"
import LinkedInIcon from "@artsy/icons/LinkedInIcon"
import PinterestIcon from "@artsy/icons/PinterestIcon"
import SpotifyIcon from "@artsy/icons/SpotifyIcon"
import ThreadsIcon from "@artsy/icons/ThreadsIcon"
import TikTokIcon from "@artsy/icons/TikTokIcon"
import WeChatIcon from "@artsy/icons/WeChatIcon"
import XIcon from "@artsy/icons/XIcon"
import YouTubeIcon from "@artsy/icons/YouTubeIcon"
import {
  Box,
  type BoxProps,
  Clickable,
  Column,
  Dropdown,
  Flex,
  FullBleed,
  GridColumns,
  Image,
  Separator,
  Spacer,
  Stack,
  Text,
  boxMixin,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useCCPARequest } from "Components/CCPARequest"
import { RouterLink, type RouterLinkProps } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useDarkModeToggle } from "Utils/Hooks/useDarkModeToggle"
import { DOWNLOAD_APP_URLS, Device } from "Utils/Hooks/useDeviceDetection"
import { Media } from "Utils/Responsive"
import type * as React from "react"
import styled from "styled-components"
import { FooterDownloadAppBanner } from "./FooterDownloadAppBanner"

interface FooterProps extends BoxProps {}

export const Footer: React.FC<React.PropsWithChildren<FooterProps>> = props => {
  const { isEigen } = useSystemContext()

  if (isEigen) {
    return null
  }

  return (
    <Box {...props}>
      <FooterDownloadAppBanner />

      <Spacer y={2} />

      <FullBleed>
        <Separator />
      </FullBleed>

      <Box as="footer">
        <GridColumns pt={4} pb={6} gridRowGap={[4, 0]}>
          <Column span={3}>
            <Text variant="sm-display" fontWeight="bold" mb={2}>
              About us
            </Text>

            <Text variant="sm">
              <FooterLink my={2} to="/about">
                About
              </FooterLink>

              <FooterLink my={2} to="/jobs">
                Jobs
              </FooterLink>

              <FooterLink my={2} to="/press/press-releases">
                Press
              </FooterLink>

              <FooterLink mt={2} to="/contact">
                Contact
              </FooterLink>
            </Text>
          </Column>

          <Column span={3}>
            <Text variant="sm-display" fontWeight="bold" mb={2}>
              Resources
            </Text>

            <Text variant="sm">
              <FooterLink my={2} to="https://artsy.github.io/open-source">
                Open Source
              </FooterLink>

              <FooterLink my={2} to="https://medium.com/artsy-blog">
                Blog
              </FooterLink>

              <FooterLink my={2} to="/categories">
                The Art Genome Project
              </FooterLink>
            </Text>
          </Column>

          <Column span={3}>
            <Text variant="sm-display" fontWeight="bold" mb={2}>
              Partnerships
            </Text>

            <Text variant="sm">
              <FooterLink my={2} to="https://partners.artsy.net">
                Artsy for Galleries
              </FooterLink>

              <FooterLink my={2} to="/institution-partnerships">
                Artsy for Museums
              </FooterLink>

              <FooterLink
                mt={2}
                to="https://partners.artsy.net/auction-partnerships"
              >
                Artsy for Benefits
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
            <Text variant="sm-display" fontWeight="bold" mb={2}>
              Support
            </Text>

            <Text variant="sm">
              <FooterLink my={2} to="https://support.artsy.net">
                Visit our Help Center
              </FooterLink>

              <FooterLink
                mt={2}
                to="https://support.artsy.net/s/topic/0TO3b000000UessGAC/buy"
              >
                Buying on Artsy
              </FooterLink>
            </Text>

            <Media greaterThan="xs">
              <Text variant="sm-display" fontWeight="bold" mt={4} mb={1}>
                Get the App
              </Text>

              <Text variant="sm">
                <FooterLink mt={2} to={DOWNLOAD_APP_URLS[Device.iPhone]}>
                  iOS App
                </FooterLink>

                <FooterLink mt={2} to={DOWNLOAD_APP_URLS[Device.Android]}>
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
              <ArtsyMarkIcon title="Artsy" mr={2} />
            </Flex>
          </Media>

          <Media greaterThan="xs">
            <Flex alignItems="center">
              <Flex flexShrink={0}>
                <ArtsyMarkIcon title="Artsy" width={30} height={30} mr={2} />
              </Flex>

              <Flex flexDirection="row" flexGrow={1}>
                <PolicyLinks />
              </Flex>
            </Flex>
          </Media>

          <Flex alignItems="center">
            <Stack gap={[1, 1, 2]} flexDirection="row">
              <FooterLink
                to="https://www.instagram.com/artsy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </FooterLink>

              <FooterLink
                to="https://www.tiktok.com/@artsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon />
              </FooterLink>

              <FooterLink
                to="https://www.facebook.com/artsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </FooterLink>

              <FooterLink
                to="https://www.linkedin.com/company/artsyinc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </FooterLink>

              <FooterLink
                to="https://www.youtube.com/artsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon />
              </FooterLink>

              <FooterLink
                to="https://open.spotify.com/user/ic7ea71nb4o0dy7xpu958vx2q"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SpotifyIcon />
              </FooterLink>

              <FooterLink
                to="https://www.pinterest.com/artsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PinterestIcon />
              </FooterLink>

              <Dropdown
                dropdown={
                  <Image
                    src="https://files.artsy.net/images/wechat_qr_logo.png"
                    width={100}
                    height={100}
                    alt="Artsy WeChat QR code"
                    style={{
                      display: "block",
                      // We are intentionally setting non-themed white background
                      // to provide contrast for the QR code
                      backgroundColor: "white",
                    }}
                    m={1}
                  />
                }
                placement="top"
              >
                {({ anchorRef, anchorProps }) => {
                  return (
                    <Box ref={anchorRef as any} {...anchorProps}>
                      <FooterLink
                        to="http://weixin.qq.com/r/2CotNbbES_s0rfJW93-K"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WeChatIcon />
                      </FooterLink>
                    </Box>
                  )
                }}
              </Dropdown>

              <FooterLink
                to="https://www.threads.com/@artsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ThreadsIcon />
              </FooterLink>

              <FooterLink
                to="https://x.com/artsy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon />
              </FooterLink>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}

const ThemeSelect: React.FC<React.PropsWithChildren<unknown>> = () => {
  const { preferences, updatePreferences } = useDarkModeToggle({
    attachKeyListeners: false,
  })

  return (
    <>
      <Dropdown
        openDropdownByClick
        placement="top"
        // eslint-disable-next-line react/no-unstable-nested-components
        dropdown={({ onHide }) => {
          return (
            <Box>
              <ThemeSelectOption
                as={Clickable}
                onClick={() => {
                  updatePreferences({ theme: "light" })
                  onHide()
                }}
              >
                {preferences.theme === "light" ? (
                  <CheckmarkStrokeIcon />
                ) : (
                  <EmptyCheckCircleIcon />
                )}
                Default
              </ThemeSelectOption>

              <ThemeSelectOption
                as={Clickable}
                onClick={() => {
                  updatePreferences({ theme: "dark" })
                  onHide()
                }}
              >
                {preferences.theme === "dark" ? (
                  <CheckmarkStrokeIcon />
                ) : (
                  <EmptyCheckCircleIcon />
                )}
                Dark
              </ThemeSelectOption>
            </Box>
          )
        }}
      >
        {({ anchorRef, anchorProps }) => {
          return (
            <Clickable ref={anchorRef as any} {...anchorProps}>
              <Text variant="xs" color="mono60">
                Theme
              </Text>
            </Clickable>
          )
        }}
      </Dropdown>
    </>
  )
}

const ThemeSelectOption = styled(Text).attrs({
  variant: "xs",
  pl: 1,
  pr: 1,
  py: 0.5,
  gap: 0.5,
})`
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;

  &:hover {
    background-color: ${themeGet("colors.mono5")};
  }
`

const PolicyLinks = () => {
  const { CCPARequestComponent, showCCPARequest } = useCCPARequest()

  return (
    <>
      {CCPARequestComponent}

      <Text
        variant="xs"
        color="mono60"
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        <Flex mr={1}>© {new Date().getFullYear()} Artsy</Flex>

        <FooterLink color="mono60" mr={1} to="/terms">
          Terms and Conditions
        </FooterLink>

        <FooterLink color="mono60" mr={1} to="/supplemental-cos">
          Auction Supplement
        </FooterLink>

        <FooterLink color="mono60" mr={1} to="/buyer-guarantee">
          Buyer Guarantee
        </FooterLink>

        <FooterLink color="mono60" mr={1} to="/privacy">
          Privacy Policy
        </FooterLink>

        <FooterLink color="mono60" mr={1} to="/security">
          Security
        </FooterLink>

        <Clickable onClick={showCCPARequest} mr={1}>
          Do not sell my personal information
        </Clickable>

        <FooterLink color="mono60" mr={1} to="/artsy-accessibility-statement">
          Accessibility
        </FooterLink>

        <ThemeSelect />
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
