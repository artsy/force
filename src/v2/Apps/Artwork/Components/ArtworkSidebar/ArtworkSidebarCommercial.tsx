import { ContextModule, Intent } from "@artsy/cohesion"
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Radio,
  RadioGroup,
  Separator,
  Spacer,
  Text,
} from "@artsy/palette"
import { ArtworkSidebarCommercial_artwork } from "v2/__generated__/ArtworkSidebarCommercial_artwork.graphql"
import { ArtworkSidebarCommercialOfferOrderMutation } from "v2/__generated__/ArtworkSidebarCommercialOfferOrderMutation.graphql"
import { ArtworkSidebarCommercialOrderMutation } from "v2/__generated__/ArtworkSidebarCommercialOrderMutation.graphql"
import { SystemContext } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { ModalType } from "v2/Components/Authentication/Types"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import currency from "currency.js"
import { Router } from "found"
import React, { FC, useContext } from "react"
import {
  RelayProp,
  commitMutation,
  createFragmentContainer,
  graphql,
} from "react-relay"
import { ErrorWithMetadata } from "v2/Utils/errors"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"
import { Mediator } from "lib/mediator"

// @ts-expect-error STRICT_NULL_CHECK
type EditionSet = ArtworkSidebarCommercial_artwork["edition_sets"][0]

export interface ArtworkSidebarCommercialContainerProps
  extends ArtworkSidebarCommercialProps {
  mediator: Mediator
  router?: Router
  user: User
}

export interface ArtworkSidebarCommercialContainerState {
  isCommittingCreateOrderMutation: boolean
  isCommittingCreateOfferOrderMutation: boolean
  isErrorModalOpen: boolean
  selectedEditionSet: EditionSet
}

const Row: React.FC<FlexProps> = ({ children, ...others }) => (
  <Flex justifyContent="left" {...others}>
    {children}
  </Flex>
)

const logger = createLogger(
  "Artwork/Components/ArtworkSidebar/ArtworkSidebarCommercial.tsx"
)

@track()
export class ArtworkSidebarCommercialContainer extends React.Component<
  ArtworkSidebarCommercialContainerProps,
  ArtworkSidebarCommercialContainerState
> {
  state: ArtworkSidebarCommercialContainerState = {
    isCommittingCreateOrderMutation: false,
    isCommittingCreateOfferOrderMutation: false,
    isErrorModalOpen: false,
    selectedEditionSet: this.firstAvailableEcommerceEditionSet(),
  }

  firstAvailableEcommerceEditionSet(): EditionSet {
    const editionSets = this.props.artwork.edition_sets

    // @ts-expect-error STRICT_NULL_CHECK
    return editionSets.find(editionSet => {
      // @ts-expect-error STRICT_NULL_CHECK
      return editionSet.is_acquireable || editionSet.is_offerable
    })
  }

  renderSaleMessage(saleMessage: string) {
    return (
      <Text variant="lg" data-test="SaleMessage">
        {saleMessage === "Contact For Price"
          ? "Contact for Price"
          : saleMessage}
      </Text>
    )
  }

  renderEditionSet(editionSet: EditionSet, includeSelectOption: boolean) {
    const editionEcommerceAvailable =
      editionSet.is_acquireable || editionSet.is_offerable

    const editionFragment = (
      <Flex justifyContent="space-between" flex={1}>
        <SizeInfo piece={editionSet} />

        <Text ml={1} variant="xs" data-test="SaleMessage">
          {editionSet.sale_message}
        </Text>
      </Flex>
    )
    if (includeSelectOption) {
      return (
        <Row>
          <Radio
            flex={1}
            onSelect={() => {
              this.setState({ selectedEditionSet: editionSet })
            }}
            selected={this.state.selectedEditionSet === editionSet}
            disabled={!editionEcommerceAvailable}
            label={editionFragment}
          />
        </Row>
      )
    } else {
      return <Row>{editionFragment}</Row>
    }
  }

  renderEditionSets(includeSelectOption: boolean) {
    const editionSets = this.props.artwork.edition_sets

    // @ts-expect-error STRICT_NULL_CHECK
    const editionSetsFragment = editionSets.map((editionSet, index) => {
      return (
        // @ts-expect-error STRICT_NULL_CHECK
        <React.Fragment key={editionSet.id}>
          <Box py={2}>
            {this.renderEditionSet(editionSet, includeSelectOption)}
          </Box>
          {/* @ts-expect-error STRICT_NULL_CHECK */}
          {index !== editionSets.length - 1 && <Separator />}
        </React.Fragment>
      )
    })

    return <RadioGroup>{editionSetsFragment}</RadioGroup>
  }

  onMutationError = (error: ErrorWithMetadata) => {
    logger.error(error)
    this.setState({
      isCommittingCreateOrderMutation: false,
      isErrorModalOpen: true,
    })
  }

  onCloseModal = () => {
    this.setState({ isErrorModalOpen: false })
  }

  @track<ArtworkSidebarCommercialContainerProps>(props => ({
    context_module: Schema.ContextModule.Sidebar,
    action_type: Schema.ActionType.ClickedContactGallery,
    subject: Schema.Subject.ContactGallery,
    artwork_id: props.artwork.internalID,
    artwork_slug: props.artwork.slug,
  }))
  handleInquiry() {
    get(this.props, props => props.mediator.trigger) &&
      this.props.mediator.trigger("launchInquiryFlow", {
        artworkId: this.props.artwork.internalID,
      })
  }

  @track<ArtworkSidebarCommercialContainerProps>((props, state, args) => ({
    action_type: Schema.ActionType.ClickedBuyNow,
    flow: Schema.Flow.BuyNow,
    type: Schema.Type.Button,
    artwork_id: props.artwork.internalID,
    artwork_slug: props.artwork.slug,
    products: [
      {
        product_id: props.artwork.internalID,
        quantity: 1,
        // @ts-expect-error STRICT_NULL_CHECK
        price: currency(props.artwork.listPrice.display).value,
      },
    ],
  }))
  handleCreateOrder() {
    const { user, mediator } = this.props
    if (user && user.id) {
      this.setState({ isCommittingCreateOrderMutation: true }, () => {
        // @ts-expect-error STRICT_NULL_CHECK
        if (get(this.props, props => props.relay.environment)) {
          commitMutation<ArtworkSidebarCommercialOrderMutation>(
            // @ts-expect-error STRICT_NULL_CHECK
            this.props.relay.environment,
            {
              // TODO: Inputs to the mutation might have changed case of the keys!
              mutation: graphql`
                mutation ArtworkSidebarCommercialOrderMutation(
                  $input: CommerceCreateOrderWithArtworkInput!
                ) {
                  commerceCreateOrderWithArtwork(input: $input) {
                    orderOrError {
                      ... on CommerceOrderWithMutationSuccess {
                        __typename
                        order {
                          internalID
                          mode
                        }
                      }
                      ... on CommerceOrderWithMutationFailure {
                        error {
                          type
                          code
                          data
                        }
                      }
                    }
                  }
                }
              `,
              variables: {
                input: {
                  artworkId: this.props.artwork.internalID,
                  editionSetId: get(
                    this.state,
                    state => state.selectedEditionSet.internalID
                  ),
                },
              },
              onCompleted: data => {
                this.setState(
                  { isCommittingCreateOrderMutation: false },
                  () => {
                    const {
                      // @ts-expect-error STRICT_NULL_CHECK
                      commerceCreateOrderWithArtwork: { orderOrError },
                    } = data
                    if (orderOrError.error) {
                      this.onMutationError(
                        new ErrorWithMetadata(
                          orderOrError.error.code,
                          orderOrError.error
                        )
                      )
                    } else {
                      const url = `/orders/${orderOrError.order.internalID}`
                      // @ts-expect-error STRICT_NULL_CHECK
                      this.props.router.push(url)
                    }
                  }
                )
              },
              onError: this.onMutationError,
            }
          )
        }
      })
    } else {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        redirectTo: location.href,
        contextModule: ContextModule.artworkSidebar,
        intent: Intent.buyNow,
      })
    }
  }

  @track<ArtworkSidebarCommercialContainerProps>((props, state, args) => ({
    action_type: Schema.ActionType.ClickedMakeOffer,
    flow: Schema.Flow.MakeOffer,
    type: Schema.Type.Button,
    artwork_id: props.artwork.internalID,
    artwork_slug: props.artwork.slug,
  }))
  handleCreateOfferOrder() {
    const { user, mediator } = this.props
    if (user && user.id) {
      this.setState({ isCommittingCreateOfferOrderMutation: true }, () => {
        // @ts-expect-error STRICT_NULL_CHECK
        if (get(this.props, props => props.relay.environment)) {
          commitMutation<ArtworkSidebarCommercialOfferOrderMutation>(
            // @ts-expect-error STRICT_NULL_CHECK
            this.props.relay.environment,
            {
              // TODO: Inputs to the mutation might have changed case of the keys!
              mutation: graphql`
                mutation ArtworkSidebarCommercialOfferOrderMutation(
                  $input: CommerceCreateOfferOrderWithArtworkInput!
                ) {
                  commerceCreateOfferOrderWithArtwork(input: $input) {
                    orderOrError {
                      ... on CommerceOrderWithMutationSuccess {
                        __typename
                        order {
                          internalID
                          mode
                        }
                      }
                      ... on CommerceOrderWithMutationFailure {
                        error {
                          type
                          code
                          data
                        }
                      }
                    }
                  }
                }
              `,
              variables: {
                input: {
                  artworkId: this.props.artwork.internalID,
                  editionSetId: get(
                    this.state,
                    state => state.selectedEditionSet.internalID
                  ),
                },
              },
              onCompleted: data => {
                this.setState(
                  { isCommittingCreateOfferOrderMutation: false },
                  () => {
                    const {
                      // @ts-expect-error STRICT_NULL_CHECK
                      commerceCreateOfferOrderWithArtwork: { orderOrError },
                    } = data
                    if (orderOrError.error) {
                      this.onMutationError(
                        new ErrorWithMetadata(
                          orderOrError.error.code,
                          orderOrError.error
                        )
                      )
                    } else {
                      const url = `/orders/${orderOrError.order.internalID}/offer`
                      // @ts-expect-error STRICT_NULL_CHECK
                      this.props.router.push(url)
                    }
                  }
                )
              },
              onError: this.onMutationError,
            }
          )
        }
      })
    } else {
      openAuthModal(mediator, {
        mode: ModalType.signup,
        redirectTo: location.href,
        contextModule: ContextModule.artworkSidebar,
        intent: Intent.makeOffer,
      })
    }
  }

  render() {
    const { artwork } = this.props

    const {
      isCommittingCreateOrderMutation,
      isCommittingCreateOfferOrderMutation,
      selectedEditionSet,
    } = this.state

    const artworkEcommerceAvailable = !!(
      artwork.is_acquireable || artwork.is_offerable
    )

    if (!artwork.sale_message && !artwork.is_inquireable) {
      return <Separator />
    }

    return (
      <Box textAlign="left">
        {artwork.sale_message && <Separator />}

        {(artwork.edition_sets?.length ?? 0) < 2 ? (
          artwork.sale_message && (
            <>
              <Spacer mt={2} />
              {this.renderSaleMessage(artwork.sale_message)}
            </>
          )
        ) : (
          <>
            {this.renderEditionSets(artworkEcommerceAvailable)}

            {selectedEditionSet && (
              <>
                <Separator mb={2} />
                {this.renderSaleMessage(selectedEditionSet.sale_message)}
              </>
            )}
          </>
        )}

        {artworkEcommerceAvailable &&
          (artwork.shippingOrigin || artwork.shippingInfo) && <Spacer mt={1} />}

        {artworkEcommerceAvailable && artwork.shippingOrigin && (
          <Text variant="xs" color="black60">
            Ships from {artwork.shippingOrigin}
          </Text>
        )}

        {artworkEcommerceAvailable && artwork.shippingInfo && (
          <Text variant="xs" color="black60">
            {artwork.shippingInfo}
          </Text>
        )}

        {artworkEcommerceAvailable && artwork.priceIncludesTaxDisplay && (
          <Text variant="xs" color="black60">
            {artwork.priceIncludesTaxDisplay}
          </Text>
        )}

        {artwork.is_inquireable ||
        artwork.is_acquireable ||
        artwork.is_offerable ? (
          artwork.sale_message && <Spacer mt={2} />
        ) : (
          <Separator my={2} />
        )}

        {artwork.is_acquireable && (
          <Button
            width="100%"
            size="medium"
            loading={isCommittingCreateOrderMutation}
            onClick={this.handleCreateOrder.bind(this)}
          >
            Buy now
          </Button>
        )}
        {artwork.is_offerable && (
          <>
            <Spacer mt={2} />
            <Button
              variant={
                artwork.is_acquireable ? "secondaryOutline" : "primaryBlack"
              }
              width="100%"
              size="medium"
              loading={isCommittingCreateOfferOrderMutation}
              onClick={this.handleCreateOfferOrder.bind(this)}
            >
              Make offer
            </Button>
          </>
        )}
        {artwork.is_inquireable &&
          !artwork.is_acquireable &&
          !artwork.is_offerable && (
            <Button
              width="100%"
              size="medium"
              onClick={this.handleInquiry.bind(this)}
            >
              Contact Gallery
            </Button>
          )}

        <ErrorModal
          onClose={this.onCloseModal}
          show={this.state.isErrorModalOpen}
          contactEmail="orders@artsy.net"
        />
      </Box>
    )
  }
}

interface ArtworkSidebarCommercialProps {
  artwork: ArtworkSidebarCommercial_artwork
  relay?: RelayProp
}

export const ArtworkSidebarCommercial: FC<ArtworkSidebarCommercialProps> = props => {
  const { mediator, router, user } = useContext(SystemContext)

  return (
    // @ts-expect-error STRICT_NULL_CHECK
    <ArtworkSidebarCommercialContainer
      {...props}
      mediator={mediator}
      router={router}
      user={user}
    />
  )
}

export const ArtworkSidebarCommercialFragmentContainer = createFragmentContainer(
  ArtworkSidebarCommercial,
  {
    artwork: graphql`
      fragment ArtworkSidebarCommercial_artwork on Artwork {
        slug
        internalID
        is_for_sale: isForSale
        is_acquireable: isAcquireable
        is_inquireable: isInquireable
        is_offerable: isOfferable
        listPrice {
          ... on PriceRange {
            display
          }
          ... on Money {
            display
          }
        }
        priceIncludesTaxDisplay
        sale_message: saleMessage
        shippingInfo
        shippingOrigin
        edition_sets: editionSets {
          internalID
          id
          is_acquireable: isAcquireable
          is_offerable: isOfferable
          sale_message: saleMessage
          ...ArtworkSidebarSizeInfo_piece
        }
      }
    `,
  }
)
