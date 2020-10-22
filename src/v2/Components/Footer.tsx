import { useSystemContext } from "v2/Artsy"
import React from "react"
import styled from "styled-components"
import { FlexDirectionProps } from "styled-system"
import { Media } from "v2/Utils/Responsive"
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
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Mediator } from "lib/mediator"

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
  mediator?: Mediator
}

export const Footer: React.FC<Props> = props => {
  const { mediator } = useSystemContext()
  return (
    <>
      <Media at="xs">
        <SmallFooter mediator={mediator} />
      </Media>

      <Media greaterThan="xs">
        <LargeFooter mediator={mediator} />
      </Media>
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
            <Link to="https://support.artsy.net/hc/en-us/categories/360003689513-Buy">
              Buying on Artsy
            </Link>
            <Link to="/consign">Consign with Artsy</Link>
          </Text>
        </Column>

        <Column>
          <Text variant="mediumText" mb={1}>
            Learn
          </Text>

          <Text variant="text">
            <Link to="/artsy-education">Education</Link>
            <Link to="/categories">The Art Genome Project</Link>
          </Text>
        </Column>

        <Column>
          <Text variant="mediumText" mb={1}>
            About us
          </Text>

          <Text variant="text">
            <Link to="/about">About</Link>
            <Link to="https://medium.com/artsy-blog">Blog</Link>
            <Link to="/about/jobs">Jobs</Link>
            <Link to="https://artsy.github.com/open-source">Open Source</Link>
            <Link to="/about/press">Press</Link>
            <Link to="/contact">Contact</Link>
            <Link to="https://support.artsy.net">Visit our Help Center</Link>
          </Text>
        </Column>

        <Column>
          <Text variant="mediumText" mb={1}>
            Partners
          </Text>

          <Text variant="text">
            <Link to="https://partners.artsy.net">Artsy for Galleries</Link>

            <Link to="/institution-partnerships">Artsy for Museums</Link>

            <Link to="/auction-partnerships">Artsy for Auctions</Link>
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
      <Text variant="caption" color="black60">
        Conditions of Sale
      </Text>
    </Link>
  </>
)
