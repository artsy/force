// import { Mediator, useSystemContext } from "v2/Artsy"
import React from "react"
import styled from "styled-components"
import { FlexDirectionProps } from "styled-system"
// import { Media } from "v2/Utils/Responsive"
import {
  ArtsyMarkIcon,
  FacebookIcon,
  Flex,
  InstagramIcon,
  Separator,
  Spacer,
  Text,
  TwitterIcon,
  WeChatIcon,
  breakpoints,
  space,
} from "@artsy/palette"
// import { RouterLink } from "v2/Artsy/Router/RouterLink"

const RouterLink = ({ children, href }) => children

const Column = styled(Flex).attrs({
  flex: 1,
  flexDirection: "column",
  mr: 2,
  mb: 3,
})`
  a {
    padding: ${space(1)}px 0;
  }
`

interface Props {
  mediator?: any
}

export const Footer: React.FC<Props> = props => {
  return (
    <>
      <LargeFooter />
    </>
  )
}

export const LargeFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="row" />
)

export const SmallFooter = (props: Props) => (
  <FooterContainer mediator={props.mediator} flexDirection="column" />
)

const FooterContainer: React.FC<FlexDirectionProps & Props> = props => {
  return (
    <footer>
      <Flex
        flexDirection={props.flexDirection}
        justifyContent="space-between"
        width="100%"
        maxWidth={breakpoints.xl}
        m="auto"
      >
        <Column>
          <Text variant="mediumText" mb={1}>
            Buy
          </Text>
          <Text variant="text">
            <Link href="https://support.artsy.net/hc/en-us/categories/360003689513-Buy">
              Buying on Artsy
            </Link>
            <Link href="/consign">Consign with Artsy</Link>
          </Text>
        </Column>

        <Column>
          <Text variant="mediumText" mb={1}>
            Learn
          </Text>

          <Text variant="text">
            <Link href="/artsy-education">Education</Link>
            <Link href="/categories">The Art Genome Project</Link>
          </Text>
        </Column>

        <Column>
          <Text variant="mediumText" mb={1}>
            About us
          </Text>

          <Text variant="text">
            <Link href="/about">About</Link>
            <Link href="https://medium.com/artsy-blog">Blog</Link>
            <Link href="/about/jobs">Jobs</Link>
            <Link href="https://artsy.github.com/open-source">Open Source</Link>
            <Link href="/about/press">Press</Link>
            <Link href="/contact">Contact</Link>
            <Link href="https://support.artsy.net">Visit our Help Center</Link>
          </Text>
        </Column>

        <Column>
          <Text variant="mediumText" mb={1}>
            Partners
          </Text>

          <Text variant="text">
            <Link href="https://partners.artsy.net">Artsy for Galleries</Link>

            <Link href="/institution-partnerships">Artsy for Museums</Link>

            <Link href="/auction-partnerships">Artsy for Auctions</Link>
          </Text>
        </Column>
      </Flex>

      <Separator />

      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        py={2}
      >
        <Flex>
          <Flex flexDirection="row">
            <ArtsyMarkIcon width="30px" height="30px" mr={2} />

            <Spacer mr={1} />

            <Flex flexDirection="row">
              <PolicyLinks />
            </Flex>
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <WeChat>
            <WeChatIcon width={space(2)} height={space(2)} mr={1} />
          </WeChat>

          <Link href="https://twitter.com/artsy">
            <TwitterIcon width={space(2)} height={space(2)} mr={1} />
          </Link>

          <Link href="https://www.facebook.com/artsy">
            <FacebookIcon width={space(2)} height={space(2)} mr={1} />
          </Link>

          <Link href="https://www.instagram.com/artsy/">
            <InstagramIcon width={space(2)} height={space(2)} />
          </Link>
        </Flex>
      </Flex>
    </footer>
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

    <Link href="/terms">
      <Text variant="caption" color="black60" mr={1}>
        Terms of Use
      </Text>
    </Link>

    <Link href="/privacy">
      <Text variant="caption" color="black60" mr={1}>
        Privacy Policy
      </Text>
    </Link>

    <Link href="/security">
      <Text variant="caption" color="black60" mr={1}>
        Security
      </Text>
    </Link>

    <Link href="/conditions-of-sale">
      <Text variant="caption" color="black60">
        Conditions of Sale
      </Text>
    </Link>
  </>
)
