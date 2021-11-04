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
  Text,
} from "@artsy/palette"
import { Box, Button, Flex, Separator, Spacer } from "@artsy/palette"
import { ArtistAuctionResultItem_auctionResult } from "v2/__generated__/ArtistAuctionResultItem_auctionResult.graphql"
import { AnalyticsSchema, SystemContextProps } from "v2/System"
import { SystemContext } from "v2/System"
import { ModalType } from "v2/Components/Authentication/Types"
import { DateTime, LocaleOptions } from "luxon"
import { FC, useContext, useState } from "react"
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
import { AuctionResultPerformance } from "v2/Components/AuctionResultPerformance"

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
export const ArtistAuctionResultItem: FC<Props> = props => {
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

const LargeAuctionItem: FC<Props> = props => {
  const {
    expanded,
    auctionResult: {
      images,
      currency,
      date_text,
      organization,
      title,
      mediumText,
      saleDate,
      boughtIn,
      performance,
    },
    salePrice,
    salePriceUSD,
  } = getProps(props)

  // @ts-expect-error STRICT_NULL_CHECK
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
        <Flex
          flexDirection="row"
          alignItems="center"
          height="100%"
          pl={1}
          pr={6}
        >
          <Box>
            <Text variant="md" fontWeight="bold">
              {title}
              {title && date_text && ", "}
              {date_text}
            </Text>
            <Text variant="xs" color="black60">
              <Capitalize>{mediumText}</Capitalize>
            </Text>
          </Box>
        </Flex>
      </Col>
      <Col sm={2}>
        <Flex alignItems="center" height="100%" pr={2}>
          <Box>
            <Text variant="md" fontWeight="bold">
              {dateOfSale}
            </Text>
            <Text variant="xs" color="black60">
              {organization}
            </Text>
          </Box>
        </Flex>
      </Col>
      <Col sm={4}>
        <Flex alignItems="center" height="100%">
          <Flex width="90%" pr="10px" justifyContent="flex-end">
            {renderPricing(
              currency,
              salePrice,
              salePriceUSD,
              saleDate,
              props.user,
              props.mediator,
              "lg",
              props.filtersAtDefault,
              boughtIn,
              performance?.mid ?? null
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

const ExtraSmallAuctionItem: FC<Props> = props => {
  const {
    expanded,
    auctionResult: {
      images,
      date_text,
      title,
      currency,
      saleDate,
      boughtIn,
      performance,
    },
    salePrice,
    salePriceUSD,
  } = getProps(props)
  // @ts-expect-error STRICT_NULL_CHECK
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
          <StyledImage
            src={imageUrl}
            Fallback={() => renderFallbackImage()}
            key={imageUrl}
          />
        ) : (
          renderFallbackImage()
        )}
      </Flex>
      <Flex ml={2} flexDirection="column" justifyContent="center" width="100%">
        <Text variant="xs" color="black100">
          {title}
          {title && date_text && ", "}
          {date_text}
        </Text>
        <Text variant="xs" color="black60">
          Sold on {dateOfSale}
        </Text>
        <Spacer mt="1" />
        {renderPricing(
          currency,
          salePrice,
          salePriceUSD,
          saleDate,
          props.user,
          props.mediator,
          "xs",
          props.filtersAtDefault,
          boughtIn,
          performance?.mid ?? null
        )}
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center" height="100%">
        <div>{expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}</div>
      </Flex>
    </Flex>
  )
}

export const ArtistAuctionResultItemFragmentContainer = createFragmentContainer(
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
        date_text: dateText
        saleDate
        boughtIn
        currency
        price_realized: priceRealized {
          display
          display_usd: displayUSD
          cents_usd: centsUSD
        }
        performance {
          mid
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

const getSalePrice = price_realized =>
  price_realized.cents_usd === 0 ? null : price_realized.display

const getSalePriceUSD = price_realized =>
  price_realized.cents_usd === 0 ? null : price_realized.display_usd

const getProps = (props: Props) => {
  const {
    auctionResult: { estimate, price_realized },
  } = props

  const salePrice = getSalePrice(price_realized)
  const salePriceUSD = getSalePriceUSD(price_realized)

  const estimatedPrice = estimate?.display

  return {
    ...props,
    salePrice,
    salePriceUSD,
    estimatedPrice,
  }
}

const getDisplaySaleDate = saleDate => {
  return DateTime.fromISO(saleDate, { zone: "utc" }).toLocaleString(
    DateTime.DATE_MED as LocaleOptions
  )
}

const renderPricing = (
  currency,
  salePrice,
  salePriceUSD,
  saleDate,
  user,
  mediator,
  size,
  filtersAtDefault,
  boughtIn,
  performance: string | null
) => {
  // If user is logged in we show prices. Otherwise we show prices only when filters at default.
  if (user || filtersAtDefault) {
    const textAlign = size === "xs" ? "left" : "right"

    const dateOfSale = DateTime.fromISO(saleDate, { zone: "utc" })
    const now = DateTime.local()
    const awaitingResults = dateOfSale > now

    const showPriceUSD = salePriceUSD && currency !== "USD"

    return (
      <Box textAlign={textAlign} mb={0.5} mr={0.5}>
        {salePrice && (
          <>
            <Flex
              alignItems="flex-end"
              justifyContent={size === "xs" ? undefined : "flex-end"}
            >
              <Text variant="md" fontWeight="bold">
                {salePrice}
              </Text>
              {!!showPriceUSD && (
                <Text variant="xs" color="black60" ml={0.5}>
                  {salePriceUSD}
                </Text>
              )}
            </Flex>
            <Text variant="xs" color="black60">
              Realized price
            </Text>
            <AuctionResultPerformance
              value={performance}
              align={size === "xs" ? "left" : "right"}
            />
          </>
        )}
        {!salePrice && boughtIn && (
          <Box textAlign={textAlign}>
            <Text variant="md" fontWeight="bold">
              Bought in
            </Text>
          </Box>
        )}
        {!salePrice && awaitingResults && (
          <Box textAlign={textAlign}>
            <Text variant="md" fontWeight="bold">
              Awaiting results
            </Text>
          </Box>
        )}
        {!salePrice && !awaitingResults && !boughtIn && (
          <Box textAlign={textAlign}>
            <Text variant="md" fontWeight="bold">
              Price not available
            </Text>
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
        <Text variant="sm">Sign up to see realized price</Text>
      </Clickable>
    )
  }

  return <Flex justifyContent="flex-start">{body}</Flex>
}

const renderLargeCollapse = (props, user, mediator, filtersAtDefault) => {
  const {
    expanded,
    auctionResult: { dimension_text, organization, saleDate, categoryText },
    salePrice,
    estimatedPrice,
  } = getProps(props)

  const dateOfSale = getDisplaySaleDate(saleDate)

  return (
    // @ts-expect-error STRICT_NULL_CHECK
    <Collapse open={expanded}>
      <Separator />
      <Box p={2}>
        <Row>
          <Col sm={2}>
            <Text variant="xs" fontWeight="bold">
              Artwork Info
            </Text>
          </Col>
          <Col sm={4}>
            <Box pl={1} pr={6}>
              <Text variant="xs">{categoryText}</Text>
              <Text variant="xs">{dimension_text}</Text>
            </Box>
          </Col>
          <Col sm={2}>
            <Box pr={2}>
              <Text variant="xs" fontWeight="bold">
                Estimate
              </Text>
            </Box>
          </Col>
          <Col sm={4} pr="4.5%">
            {renderEstimate(estimatedPrice, user, mediator)}
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <Text variant="xs" fontWeight="bold">
              Auction Sale
            </Text>
          </Col>
          <Col sm={4}>
            <Box pl={1} pr={6}>
              <Text variant="xs">{dateOfSale}</Text>
              <Text variant="xs">{organization}</Text>
            </Box>
          </Col>

          <Col sm={2}>
            <Box pr={2}>
              <Text variant="xs" fontWeight="bold">
                Realized Price
              </Text>
            </Box>
          </Col>
          <Col sm={4} pr="4.5%">
            {renderRealizedPrice(salePrice, user, mediator, filtersAtDefault)}
          </Col>
        </Row>
      </Box>
    </Collapse>
  )
}

const renderSmallCollapse = (props, user, mediator, filtersAtDefault) => {
  const {
    expanded,
    auctionResult: {
      dimension_text,
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
    // @ts-expect-error STRICT_NULL_CHECK
    <Collapse open={expanded}>
      <Separator />
      <Box p={2}>
        <Row mb={2}>
          <Col xs={4}>
            <Text variant="xs" fontWeight="bold">
              Artwork Info
            </Text>
          </Col>
          <Col xs={8}>
            <Box>
              <Text variant="xs">{categoryText}</Text>
              <Text variant="xs">
                <Capitalize>{mediumText}</Capitalize>
              </Text>
              <Text variant="xs">{dimension_text}</Text>
            </Box>
          </Col>
        </Row>
        <Row mb={2}>
          <Col xs={4}>
            <Text variant="xs" fontWeight="bold">
              Estimate
            </Text>
          </Col>
          <Col xs={8}>{renderEstimate(estimatedPrice, user, mediator)}</Col>
        </Row>

        <Row mb={2}>
          <Col xs={4}>
            <Text variant="xs" fontWeight="bold">
              Realized Price
            </Text>
          </Col>
          <Col xs={8}>
            {renderRealizedPrice(salePrice, user, mediator, filtersAtDefault)}
          </Col>
        </Row>

        <Row mb={2}>
          <Col xs={4}>
            <Text variant="xs" fontWeight="bold">
              Auction Sale
            </Text>
          </Col>
          <Col xs={8}>
            <Text variant="xs">{dateOfSale}</Text>
            <Text variant="xs">{organization}</Text>
          </Col>
        </Row>
      </Box>
    </Collapse>
  )
}
