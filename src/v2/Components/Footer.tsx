import { PageName, useAnalyticsContext, useSystemContext } from "v2/Artsy"
import React from "react"
import styled from "styled-components"
import { FlexDirectionProps } from "styled-system"
import { Media } from "v2/Utils/Responsive"
import {
  ArtsyMarkIcon,
  Box,
  FacebookIcon,
  Flex,
  InstagramIcon,
  Link,
  Separator,
  Spacer,
  Text,
  TwitterIcon,
  WeChatIcon,
  breakpoints,
  space,
} from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Mediator } from "lib/mediator"
import track, { useTracking } from "react-tracking"
import { clickedAppDownload, ContextModule } from "@artsy/cohesion"
import Events from "v2/Utils/Events"

const Column = styled(Flex).attrs({
  flex: 1,
  flexDirection: "column",
  mr: 2,
  mb: 3,
})``
interface Props {
  mediator?: Mediator
  omitSeparator?: boolean
}

export const Footer: React.FC<Props> = props => {
  const { mediator } = useSystemContext()
  return (
    <>
      <Media at="xs">
        <SmallFooter mediator={mediator} {...props} />
      </Media>

      <Media greaterThan="xs">
        <LargeFooter mediator={mediator} {...props} />
      </Media>
    </>
  )
}

export const LargeFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="row" {...props} />
)

export const SmallFooter = (props: Props) => (
  <FooterContainer
    mediator={props.mediator}
    flexDirection="column"
    {...props}
  />
)

const FooterContainer: React.FC<FlexDirectionProps & Props> = props => {
  const { omitSeparator } = props

  return (
    <>
      {!omitSeparator && <Separator as="hr" mt={6} mb={3} />}
      <footer>
        <Flex
          flexDirection={props.flexDirection}
          justifyContent="space-between"
          width="100%"
          maxWidth={breakpoints.xl}
          m="auto"
        >
          <Media at="xs">
            <Column>
              <Text variant="mediumText" mb={1}>
                Get the iOS app
              </Text>
              <DownloadAppBadge />
            </Column>
          </Media>

          <Column>
            <Text variant="mediumText" mb={1}>
              About us
            </Text>

            <Text variant="text">
              <StyledFooterLink to="/about">About</StyledFooterLink>
              <StyledFooterLink to="/about/jobs">Jobs</StyledFooterLink>
              <StyledFooterLink to="/about/press">Press</StyledFooterLink>
              <StyledFooterLink to="/contact">Contact</StyledFooterLink>
            </Text>
          </Column>

          <Column>
            <Text variant="mediumText" mb={1}>
              Resources
            </Text>
            <Text variant="text">
              <StyledFooterLink to="https://artsy.github.com/open-source">
                Open Source
              </StyledFooterLink>
              <StyledFooterLink to="https://medium.com/artsy-blog">
                Blog
              </StyledFooterLink>
              <StyledFooterLink to="/categories">
                The Art Genome Project
              </StyledFooterLink>
              <StyledFooterLink to="/artsy-education">
                Education
              </StyledFooterLink>
            </Text>
          </Column>

          <Column>
            <Text variant="mediumText" mb={1}>
              Partnerships
            </Text>

            <Text variant="text">
              <StyledFooterLink to="https://partners.artsy.net">
                Artsy for Galleries
              </StyledFooterLink>
              <StyledFooterLink to="/institution-partnerships">
                Artsy for Museums
              </StyledFooterLink>
              <StyledFooterLink to="/auction-partnerships">
                Artsy for Auctions
              </StyledFooterLink>
            </Text>
          </Column>

          <Column>
            <Text variant="mediumText" mb={1}>
              Support
            </Text>
            <Text variant="text">
              <StyledFooterLink to="https://support.artsy.net">
                Visit our Help Center
              </StyledFooterLink>
              <StyledFooterLink to="https://support.artsy.net/hc/en-us/categories/360003689513-Buy">
                Buying on Artsy
              </StyledFooterLink>
              <Media greaterThan="xs">
                <Text variant="mediumText" mb={1} mt={3}>
                  Get the iOS app
                </Text>
                <DownloadAppBadge />
              </Media>
            </Text>
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

            <StyledFooterLink to="https://twitter.com/artsy">
              <TwitterIcon width={space(2)} height={space(2)} mr={1} />
            </StyledFooterLink>

            <StyledFooterLink to="https://www.facebook.com/artsy">
              <FacebookIcon width={space(2)} height={space(2)} mr={1} />
            </StyledFooterLink>

            <StyledFooterLink to="https://www.instagram.com/artsy/">
              <InstagramIcon width={space(2)} height={space(2)} />
            </StyledFooterLink>
          </Flex>
        </Flex>
      </footer>
    </>
  )
}

const WeChat = styled(Flex)`
  > a {
    display: flex;
  }
`

const StyledFooterLink = styled(RouterLink)`
  display: flex;
  text-decoration: none;
  align-items: center;
  padding: ${space(1)}px 0;
`

const DownloadAppBadge: React.FC = track(
  {},
  {
    dispatch: data => Events.postEvent(data),
  }
)(() => {
  const tracking = useTracking()
  const downloadAppUrl =
    "https://apps.apple.com/us/app/artsy-buy-sell-original-art/id703796080"
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const trackClickedDownloadAppBadge = () => {
    tracking.trackEvent(
      clickedAppDownload({
        context_module: ContextModule.footer,
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_slug: contextPageOwnerSlug,
        context_page_owner_id: contextPageOwnerId,
        destination_path: downloadAppUrl,
        subject: "Download on the App Store",
      })
    )
  }
  return (
    <Box width={120} height={40}>
      <Link
        padding={0}
        href={downloadAppUrl}
        onClick={trackClickedDownloadAppBadge}
      >
        <DownloadAppBadgeSVG />
      </Link>
    </Box>
  )
})

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

    <StyledFooterLink to="/terms">
      <Text variant="caption" color="black60" mr={1}>
        Terms of Use
      </Text>
    </StyledFooterLink>

    <StyledFooterLink to="/privacy">
      <Text variant="caption" color="black60" mr={1}>
        Privacy Policy
      </Text>
    </StyledFooterLink>

    <StyledFooterLink to="/security">
      <Text variant="caption" color="black60" mr={1}>
        Security
      </Text>
    </StyledFooterLink>

    <StyledFooterLink to="/conditions-of-sale">
      <Text variant="caption" color="black60">
        Conditions of Sale
      </Text>
    </StyledFooterLink>
  </>
)

const DownloadAppBadgeSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="119.664"
    height="40"
    viewBox="0 0 119.664 40"
  >
    <path
      fill="#a6a6a6"
      d="M110.135 0H9.535c-.367 0-.73 0-1.095.002-.306.002-.61.008-.919.013A13.215 13.215 0 005.517.19a6.665 6.665 0 00-1.9.627 6.438 6.438 0 00-1.62 1.18A6.258 6.258 0 00.82 3.617a6.601 6.601 0 00-.625 1.903 12.993 12.993 0 00-.179 2.002c-.01.307-.01.615-.015.921V31.56c.005.31.006.61.015.921a12.992 12.992 0 00.18 2.002 6.588 6.588 0 00.624 1.905A6.208 6.208 0 001.998 38a6.274 6.274 0 001.618 1.179 6.7 6.7 0 001.901.63 13.455 13.455 0 002.004.177c.31.007.613.011.919.011.366.002.728.002 1.095.002h100.6c.36 0 .724 0 1.084-.002.304 0 .617-.004.922-.01a13.279 13.279 0 002-.178 6.804 6.804 0 001.908-.63A6.277 6.277 0 00117.666 38a6.395 6.395 0 001.182-1.614 6.604 6.604 0 00.619-1.905 13.506 13.506 0 00.185-2.002c.004-.31.004-.61.004-.921.008-.364.008-.725.008-1.094V9.536c0-.366 0-.73-.008-1.092 0-.306 0-.614-.004-.92a13.507 13.507 0 00-.185-2.003 6.618 6.618 0 00-.62-1.903 6.466 6.466 0 00-2.798-2.8 6.768 6.768 0 00-1.908-.627 13.044 13.044 0 00-2-.176c-.305-.005-.618-.011-.922-.013-.36-.002-.725-.002-1.084-.002z"
    ></path>
    <path d="M8.445 39.125c-.305 0-.602-.004-.904-.01a12.687 12.687 0 01-1.87-.164 5.884 5.884 0 01-1.656-.548 5.406 5.406 0 01-1.397-1.016 5.32 5.32 0 01-1.02-1.397 5.722 5.722 0 01-.544-1.657 12.414 12.414 0 01-.166-1.875c-.007-.21-.015-.913-.015-.913v-23.1s.009-.692.015-.895a12.37 12.37 0 01.165-1.872 5.755 5.755 0 01.544-1.662 5.373 5.373 0 011.015-1.398 5.565 5.565 0 011.402-1.023 5.823 5.823 0 011.653-.544A12.586 12.586 0 017.543.887l.902-.012h102.769l.913.013a12.385 12.385 0 011.858.162 5.938 5.938 0 011.671.548 5.594 5.594 0 012.415 2.42 5.763 5.763 0 01.535 1.649 12.995 12.995 0 01.174 1.887c.003.283.003.588.003.89.008.375.008.732.008 1.092v20.929c0 .363 0 .718-.008 1.075 0 .325 0 .623-.004.93a12.731 12.731 0 01-.17 1.853 5.739 5.739 0 01-.54 1.67 5.48 5.48 0 01-1.016 1.386 5.413 5.413 0 01-1.4 1.022 5.862 5.862 0 01-1.668.55 12.542 12.542 0 01-1.869.163c-.293.007-.6.011-.897.011l-1.084.002z"></path>
    <g data-name="&lt;Group&gt;">
      <g data-name="&lt;Group&gt;">
        <g fill="#fff" data-name="&lt;Group&gt;">
          <path
            d="M24.769 20.3a4.949 4.949 0 012.356-4.151 5.066 5.066 0 00-3.99-2.158c-1.68-.176-3.308 1.005-4.164 1.005-.872 0-2.19-.988-3.608-.958a5.315 5.315 0 00-4.473 2.728c-1.934 3.348-.491 8.269 1.361 10.976.927 1.325 2.01 2.805 3.428 2.753 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.852 1.489-.025 2.426-1.332 3.32-2.67a10.962 10.962 0 001.52-3.092 4.782 4.782 0 01-2.92-4.4z"
            data-name="&lt;Path&gt;"
          ></path>
          <path
            d="M22.037 12.21a4.872 4.872 0 001.115-3.49 4.957 4.957 0 00-3.208 1.66A4.636 4.636 0 0018.8 13.74a4.1 4.1 0 003.237-1.53z"
            data-name="&lt;Path&gt;"
          ></path>
        </g>
      </g>
      <g fill="#fff">
        <path d="M42.302 27.14H37.57l-1.137 3.356h-2.005l4.484-12.418h2.083l4.483 12.418h-2.039zm-4.243-1.55h3.752l-1.85-5.446h-.051zM55.16 25.97c0 2.813-1.506 4.62-3.779 4.62a3.07 3.07 0 01-2.848-1.583h-.043v4.484H46.63V21.442h1.8v1.506h.033a3.212 3.212 0 012.883-1.6c2.298 0 3.813 1.816 3.813 4.622zm-1.91 0c0-1.833-.948-3.038-2.393-3.038-1.42 0-2.375 1.23-2.375 3.038 0 1.824.955 3.046 2.375 3.046 1.445 0 2.393-1.197 2.393-3.046zM65.125 25.97c0 2.813-1.506 4.62-3.779 4.62a3.07 3.07 0 01-2.848-1.583h-.043v4.484h-1.859V21.442h1.799v1.506h.034a3.212 3.212 0 012.883-1.6c2.298 0 3.813 1.816 3.813 4.622zm-1.91 0c0-1.833-.948-3.038-2.393-3.038-1.42 0-2.375 1.23-2.375 3.038 0 1.824.955 3.046 2.375 3.046 1.445 0 2.392-1.197 2.392-3.046zM71.71 27.036c.138 1.232 1.334 2.04 2.97 2.04 1.566 0 2.693-.808 2.693-1.919 0-.964-.68-1.54-2.29-1.936l-1.609-.388c-2.28-.55-3.339-1.617-3.339-3.348 0-2.142 1.867-3.614 4.519-3.614 2.624 0 4.423 1.472 4.483 3.614h-1.876c-.112-1.239-1.136-1.987-2.634-1.987s-2.521.757-2.521 1.858c0 .878.654 1.395 2.255 1.79l1.368.336c2.548.603 3.606 1.626 3.606 3.443 0 2.323-1.85 3.778-4.793 3.778-2.754 0-4.614-1.42-4.734-3.667zM83.346 19.3v2.142h1.722v1.472h-1.722v4.991c0 .776.345 1.137 1.102 1.137a5.808 5.808 0 00.611-.043v1.463a5.104 5.104 0 01-1.032.086c-1.833 0-2.548-.689-2.548-2.445v-5.189h-1.316v-1.472h1.316V19.3zM86.065 25.97c0-2.849 1.678-4.639 4.294-4.639 2.625 0 4.295 1.79 4.295 4.639 0 2.856-1.661 4.638-4.295 4.638-2.633 0-4.294-1.782-4.294-4.638zm6.695 0c0-1.954-.895-3.108-2.401-3.108s-2.4 1.162-2.4 3.108c0 1.962.894 3.106 2.4 3.106s2.401-1.144 2.401-3.106zM96.186 21.442h1.773v1.541h.043a2.16 2.16 0 012.177-1.635 2.866 2.866 0 01.637.069v1.738a2.598 2.598 0 00-.835-.112 1.873 1.873 0 00-1.937 2.083v5.37h-1.858zM109.384 27.837c-.25 1.643-1.85 2.771-3.898 2.771-2.634 0-4.269-1.764-4.269-4.595 0-2.84 1.644-4.682 4.19-4.682 2.506 0 4.08 1.72 4.08 4.466v.637h-6.394v.112a2.358 2.358 0 002.436 2.564 2.048 2.048 0 002.09-1.273zm-6.282-2.702h4.526a2.177 2.177 0 00-2.22-2.298 2.292 2.292 0 00-2.306 2.298z"></path>
      </g>
    </g>
    <g data-name="&lt;Group&gt;">
      <g fill="#fff">
        <path d="M37.826 8.731a2.64 2.64 0 012.808 2.965c0 1.906-1.03 3.002-2.808 3.002h-2.155V8.73zm-1.228 5.123h1.125a1.876 1.876 0 001.967-2.146 1.881 1.881 0 00-1.967-2.134h-1.125zM41.68 12.444a2.133 2.133 0 114.248 0 2.134 2.134 0 11-4.247 0zm3.334 0c0-.976-.439-1.547-1.208-1.547-.773 0-1.207.571-1.207 1.547 0 .984.434 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55zM51.573 14.698h-.922l-.93-3.317h-.07l-.927 3.317h-.913l-1.242-4.503h.902l.806 3.436h.067l.926-3.436h.852l.926 3.436h.07l.803-3.436h.889zM53.854 10.195h.855v.715h.066a1.348 1.348 0 011.344-.802 1.465 1.465 0 011.559 1.675v2.915h-.889v-2.692c0-.724-.314-1.084-.972-1.084a1.033 1.033 0 00-1.075 1.141v2.635h-.888zM59.094 8.437h.888v6.26h-.888zM61.218 12.444a2.133 2.133 0 114.247 0 2.134 2.134 0 11-4.247 0zm3.333 0c0-.976-.439-1.547-1.208-1.547-.773 0-1.207.571-1.207 1.547 0 .984.434 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55zM66.4 13.424c0-.81.604-1.278 1.676-1.344l1.22-.07v-.389c0-.475-.315-.744-.922-.744-.497 0-.84.182-.939.5h-.86c.09-.773.818-1.27 1.84-1.27 1.128 0 1.765.563 1.765 1.514v3.077h-.855v-.633h-.07a1.515 1.515 0 01-1.353.707 1.36 1.36 0 01-1.501-1.348zm2.895-.384v-.377l-1.1.07c-.62.042-.9.253-.9.65 0 .405.351.64.834.64a1.062 1.062 0 001.166-.983zM71.348 12.444c0-1.423.732-2.324 1.87-2.324a1.484 1.484 0 011.38.79h.067V8.437h.888v6.26h-.851v-.71h-.07a1.563 1.563 0 01-1.415.785c-1.145 0-1.869-.901-1.869-2.328zm.918 0c0 .955.45 1.53 1.203 1.53.75 0 1.212-.583 1.212-1.526 0-.938-.468-1.53-1.212-1.53-.748 0-1.203.58-1.203 1.526zM79.23 12.444a2.133 2.133 0 114.247 0 2.134 2.134 0 11-4.247 0zm3.333 0c0-.976-.438-1.547-1.208-1.547-.772 0-1.207.571-1.207 1.547 0 .984.435 1.55 1.207 1.55.77 0 1.208-.57 1.208-1.55zM84.67 10.195h.855v.715h.066a1.348 1.348 0 011.344-.802 1.465 1.465 0 011.559 1.675v2.915h-.889v-2.692c0-.724-.314-1.084-.972-1.084a1.033 1.033 0 00-1.075 1.141v2.635h-.889zM93.515 9.074v1.141h.976v.749h-.976v2.315c0 .472.194.679.637.679a2.967 2.967 0 00.339-.021v.74a2.916 2.916 0 01-.484.046c-.988 0-1.381-.348-1.381-1.216v-2.543h-.715v-.749h.715V9.074zM95.705 8.437h.88v2.481h.07a1.386 1.386 0 011.374-.806 1.483 1.483 0 011.55 1.679v2.907h-.889V12.01c0-.72-.335-1.084-.963-1.084a1.052 1.052 0 00-1.134 1.142v2.63h-.888zM104.761 13.482a1.828 1.828 0 01-1.95 1.303 2.045 2.045 0 01-2.081-2.325 2.077 2.077 0 012.076-2.352c1.253 0 2.009.856 2.009 2.27v.31h-3.18v.05a1.19 1.19 0 001.2 1.29 1.08 1.08 0 001.07-.546zm-3.126-1.451h2.275a1.086 1.086 0 00-1.109-1.167 1.152 1.152 0 00-1.166 1.167z"></path>
      </g>
    </g>
  </svg>
)
