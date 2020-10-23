import { ContextModule, Intent } from "@artsy/cohesion"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BorderBox,
  Clickable,
  Col,
  Collapse,
  Row,
  Sans,
} from "@artsy/palette"
import { Box, Button, Flex, Separator, Spacer } from "@artsy/palette"
import { ArtistAuctionResultItem_auctionResult } from "v2/__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { AnalyticsSchema, SystemContextProps } from "v2/Artsy"
import { SystemContext } from "v2/Artsy"
import { ModalType } from "v2/Components/Authentication/Types"
import { DateTime } from "luxon"
import React, { SFC, useContext, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { get } from "v2/Utils/get"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { Media } from "v2/Utils/Responsive"
import {
  ImageWithFallback,
  renderFallbackImage,
} from "./Components/ImageWithFallback"
import { Mediator } from "lib/mediator"

export interface Props extends SystemContextProps {
  expanded?: boolean
  auctionResult: ArtistAuctionResultItem_auctionResult
  index: number
  mediator?: Mediator
  lastChild: boolean
  filtersAtDefault: boolean
}

const FullWidthBorderBox = styled(BorderBox)`
  display: block;
  padding: 0;
  cursor: pointer;
`

const StyledImage = styled(ImageWithFallback)`
  max-height: 100%;
  max-width: 100%;
`

const Capitalize = styled.span`
  text-transform: capitalize;
`

// TODO: This whole component should be refactored to use less `Media` decisions
export const ArtistAuctionResultItem: SFC<Props> = props => {
  const { user, mediator } = useContext(SystemContext)

  const tracking = useTracking()
  const [expanded, setExpanded] = useState(false)

  const toggle = () => {
    const expand = !expanded

    setExpanded(!expanded)
    tracking.trackEvent({
      context_page: AnalyticsSchema.PageName.ArtistAuctionResults,
      action_type: AnalyticsSchema.ActionType.AuctionResultItemClicked,
      current: {
        expanded: expand,
      },
    })
  }

  return (
    <>
      <Media at="xs">
        <FullWidthBorderBox mb={1} onClick={toggle}>
          <Row height="120px" p={2}>
            <ExtraSmallAuctionItem
              {...props}
              expanded={expanded}
              mediator={mediator}
              user={user}
            />
          </Row>
          <Box>
            {renderSmallCollapse(
              { ...props, expanded },
              user,
              mediator,
              props.filtersAtDefault
            )}
          </Box>
        </FullWidthBorderBox>
      </Media>

      <Media greaterThanOrEqual="sm">
        <FullWidthBorderBox mb={1} onClick={toggle}>
          <Box p={2} minHeight="120px">
            <Row minHeight="80px">
              <LargeAuctionItem
                {...props}
                expanded={expanded}
                mediator={mediator}
                user={user}
              />
            </Row>
          </Box>
          <Box>
            {renderLargeCollapse(
              { ...props, expanded },
              user,
              mediator,
              props.filtersAtDefault
            )}
          </Box>
        </FullWidthBorderBox>
      </Media>
      <Spacer />
    </>
  )
}

const LargeAuctionItem: SFC<Props> = props => {
  const {
    expanded,
    auctionResult: {
      images,
      date_text,
      organization,
      title,
      mediumText,
      saleDate,
    },
    salePrice,
  } = getProps(props)

  const imageUrl = get(images, i => i.thumbnail.url, "")
  const dateOfSale = getDisplaySaleDate(saleDate)

  return (
    <>
      <Col sm={2}>
        <Flex
          alignItems="center"
          justifyContent="center"
          height="80px"
          width="80px"
        >
          {imageUrl ? (
            <StyledImage
              src={imageUrl}
              Fallback={() => renderFallbackImage()}
            />
          ) : (
            renderFallbackImage()
          )}
        </Flex>
      </Col>
      <Col sm={4}>
        <Flex alignItems="center" height="100%" pl={1} pr={6}>
          <div>
            <Sans size="3t" weight="medium">
              {title}
              {title && date_text && ", "}
              {date_text}
            </Sans>
            <Sans size="2" color="black60">
              <Capitalize>{mediumText}</Capitalize>
            </Sans>
            <Spacer pt={1} />
          </div>
        </Flex>
      </Col>
      <Col sm={2}>
        <Flex alignItems="center" height="100%" pr={2}>
          <div>
            <Sans size="3t" weight="medium">
              {dateOfSale}
            </Sans>
            <Sans size="2" color="black60">
              {organization}
            </Sans>
          </div>
        </Flex>
      </Col>
      <Col sm={4}>
        <Flex alignItems="center" height="100%">
          <Flex width="90%" pr="10px" justifyContent="flex-end">
            {renderPricing(
              salePrice,
              saleDate,
              props.user,
              props.mediator,
              "lg",
              props.filtersAtDefault
            )}
          </Flex>
          <Flex width="10%" justifyContent="flex-end">
            <div>{expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
          </Flex>
        </Flex>
      </Col>
    </>
  )
}

const ExtraSmallAuctionItem: SFC<Props> = props => {
  const {
    expanded,
    auctionResult: { images, date_text, title, saleDate },
    salePrice,
  } = getProps(props)
  const imageUrl = get(images, i => i.thumbnail.url, "")
  const dateOfSale = getDisplaySaleDate(saleDate)

  return (
    <Flex data-test={ContextModule.auctionResults} width="100%">
      <Flex
        alignItems="center"
        justifyContent="center"
        height="80px"
        width="80px"
      >
        {imageUrl ? (
          <StyledImage src={imageUrl} Fallback={() => renderFallbackImage()} />
        ) : (
          renderFallbackImage()
        )}
      </Flex>
      <Flex ml={2} flexDirection="column" justifyContent="center" width="100%">
        {renderPricing(
          salePrice,
          saleDate,
          props.user,
          props.mediator,
          "xs",
          props.filtersAtDefault
        )}
        <Sans size="2" weight="medium" color="black60">
          {title}
          {title && date_text && ", "}
          {date_text}
        </Sans>
        <Sans size="2" color="black60" mt="5px">
          Sold on {dateOfSale}
        </Sans>
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center" height="100%">
        <div>{expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
      </Flex>
    </Flex>
  )
}

export const AuctionResultItemFragmentContainer = createFragmentContainer(
  ArtistAuctionResultItem,
  {
    auctionResult: graphql`
      fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
        title
        dimension_text: dimensionText
        organization
        images {
          thumbnail {
            url
          }
        }
        mediumText
        categoryText
        description
        date_text: dateText
        saleDate
        price_realized: priceRealized {
          display
          cents_usd: centsUSD
        }
        estimate {
          display
        }
      }
    `,
  }
)

const FullDescriptionLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
`

FullDescriptionLink.displayName = "FullDescriptionLink"

// Helpers

const getSalePrice = price_realized => {
  const salePrice =
    price_realized.cents_usd === 0 ? null : price_realized.display
  return salePrice
}

const getProps = (props: Props) => {
  const {
    auctionResult: { estimate, price_realized },
  } = props

  const salePrice = getSalePrice(price_realized)
  const estimatedPrice = estimate.display

  return {
    ...props,
    salePrice,
    estimatedPrice,
  }
}

const getDisplaySaleDate = saleDate => {
  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED
  )
}

const renderPricing = (
  salePrice,
  saleDate,
  user,
  mediator,
  size,
  filtersAtDefault
) => {
  const textSize = size === "xs" ? "2" : "3t"

  // If user is logged in we show prices. Otherwise we show prices only when filters at default.
  if (user || filtersAtDefault) {
    const textAlign = size === "xs" ? "left" : "right"

    const dateOfSale = DateTime.fromISO(saleDate, { zone: "utc" })
    const now = DateTime.local()
    const awaitingResults = dateOfSale > now

    return (
      <Box textAlign={textAlign} mb="5px">
        {salePrice && (
          <>
            <Sans size={textSize} weight="medium" mb="2px">
              {salePrice}
            </Sans>
            {size !== "xs" && (
              <Sans size="2" color="black60">
                Realized price
              </Sans>
            )}
          </>
        )}
        {!salePrice && awaitingResults && (
          <Box textAlign={textAlign}>
            <Sans mb="2px" size={textSize} weight="medium">
              Awaiting results
            </Sans>
          </Box>
        )}
        {!salePrice && !awaitingResults && (
          <Box textAlign={textAlign}>
            <Sans mb="2px" size={textSize} weight="medium">
              Price not available
            </Sans>
          </Box>
        )}
      </Box>
    )
  } else {
    const btnSize = size === "xs" || "sm" ? "small" : "large"
    const buttonMargin = size === "xs" ? 1 : 0
    return (
      <Button
        size={btnSize}
        variant="secondaryGray"
        mb={buttonMargin}
        onClick={() => {
          mediator &&
            openAuthModal(mediator, {
              mode: ModalType.signup,
              copy: "Sign up to see full auction records — for free",
              contextModule: ContextModule.auctionResults,
              intent: Intent.seePriceAuctionRecords,
            })
        }}
      >
        Sign up to see price
      </Button>
    )
  }
}

const renderEstimate = (estimatedPrice, user, mediator) => {
  let body: JSX.Element
  if (user) {
    if (estimatedPrice) {
      body = <Sans size="2">{estimatedPrice}</Sans>
    } else {
      body = <Sans size="2">Estimate not available</Sans>
    }
  } else {
    body = (
      <Clickable
        onClick={() => {
          mediator &&
            openAuthModal(mediator, {
              mode: ModalType.signup,
              copy: "Sign up to see full auction records — for free",
              contextModule: ContextModule.auctionResults,
              intent: Intent.seeEstimateAuctionRecords,
            })
        }}
        textDecoration="underline"
      >
        <Sans size="2">Sign up to see estimate</Sans>
      </Clickable>
    )
  }

  return <Flex justifyContent="flex-start">{body}</Flex>
}

const renderRealizedPrice = (
  realizedPrice,
  user,
  mediator,
  filtersAtDefault
) => {
  // Show prices if user is logged in. Otherwise, show prices only when filters at default.
  let body: JSX.Element
  if (user || filtersAtDefault) {
    if (realizedPrice) {
      body = <Sans size="2">{realizedPrice}</Sans>
    } else {
      body = <Sans size="2">Price not available</Sans>
    }
  } else {
    body = (
      <Clickable
        onClick={() => {
          mediator &&
            openAuthModal(mediator, {
              mode: ModalType.signup,
              copy: "Sign up to see full auction records — for free",
              contextModule: ContextModule.auctionResults,
              intent: Intent.seeRealizedPriceAuctionRecords,
            })
        }}
        textDecoration="underline"
      >
        <Sans size="2">Sign up to see realized price</Sans>
      </Clickable>
    )
  }

  return <Flex justifyContent="flex-start">{body}</Flex>
}

const renderLargeCollapse = (props, user, mediator, filtersAtDefault) => {
  const {
    expanded,
    auctionResult: {
      dimension_text,
      description,
      organization,
      saleDate,
      categoryText,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)

  const dateOfSale = getDisplaySaleDate(saleDate)

  return (
    <Collapse open={expanded}>
      <Separator />
      <Box p={2}>
        <Row>
          <Col sm={2}>
            <Sans size="2" weight="medium">
              Artwork Info
            </Sans>
          </Col>
          <Col sm={4}>
            <Box pl={1} pr={6}>
              <Sans size="2">{categoryText}</Sans>
              <Sans size="2">{dimension_text}</Sans>
              <Spacer pt={1} />
            </Box>
          </Col>
          <Col sm={2}>
            <Box pr={2}>
              <Sans size="2" weight="medium">
                Estimate
              </Sans>
            </Box>
          </Col>
          <Col sm={4} pr="4.5%">
            {renderEstimate(estimatedPrice, user, mediator)}
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Sans size="2" weight="medium">
              Auction Sale
            </Sans>
          </Col>
          <Col sm={4}>
            <Box pl={1} pr={6}>
              <Sans size="2">{dateOfSale}</Sans>
              <Sans size="2">{organization}</Sans>
              <Spacer pt={1} />
            </Box>
          </Col>

          <Col sm={2}>
            <Box pr={2}>
              <Sans size="2" weight="medium">
                Realized Price
              </Sans>
            </Box>
          </Col>
          <Col sm={4} pr="4.5%">
            {renderRealizedPrice(salePrice, user, mediator, filtersAtDefault)}
          </Col>
        </Row>

        {description && (
          <Row>
            <Col sm={2}>
              <Sans size="2" weight="medium">
                Description
              </Sans>
            </Col>
            <Col sm={10} pr="4.5%">
              <Box pl={1}>
                <Sans size="2">{description}</Sans>
              </Box>
            </Col>
          </Row>
        )}
      </Box>
    </Collapse>
  )
}

const renderSmallCollapse = (props, user, mediator, filtersAtDefault) => {
  const {
    expanded,
    auctionResult: {
      dimension_text,
      description,
      organization,
      categoryText,
      mediumText,
      saleDate,
    },
    salePrice,
    estimatedPrice,
  } = getProps(props)

  const dateOfSale = getDisplaySaleDate(saleDate)

  return (
    <Collapse open={expanded}>
      <Separator />
      <Box p={2}>
        <Row mb={2}>
          <Col xs={4}>
            <Sans size="2" weight="medium">
              Artwork Info
            </Sans>
          </Col>
          <Col xs={8}>
            <Box>
              <Sans size="2">{categoryText}</Sans>
              <Sans size="2">
                <Capitalize>{mediumText}</Capitalize>
              </Sans>
              <Sans size="2">{dimension_text}</Sans>
            </Box>
          </Col>
        </Row>
        <Row mb={2}>
          <Col xs={4}>
            <Sans size="2" weight="medium">
              Estimate
            </Sans>
          </Col>
          <Col xs={8}>{renderEstimate(estimatedPrice, user, mediator)}</Col>
        </Row>

        <Row mb={2}>
          <Col xs={4}>
            <Sans size="2" weight="medium">
              Realized Price
            </Sans>
          </Col>
          <Col xs={8}>
            {renderRealizedPrice(salePrice, user, mediator, filtersAtDefault)}
          </Col>
        </Row>

        <Row mb={2}>
          <Col xs={4}>
            <Sans size="2" weight="medium">
              Auction Sale
            </Sans>
          </Col>
          <Col xs={8}>
            <Sans size="2">{dateOfSale}</Sans>
            <Sans size="2">{organization}</Sans>
          </Col>
        </Row>

        <Row mb={2}>
          <Col xs={4}>
            <Sans size="2" weight="medium">
              Description
            </Sans>
          </Col>
          <Col xs={8}>
            <Sans size="2">{description}</Sans>
          </Col>
        </Row>
      </Box>
    </Collapse>
  )
}
