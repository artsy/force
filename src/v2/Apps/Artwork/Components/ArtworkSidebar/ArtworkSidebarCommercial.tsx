import { Intent, ContextModule } from "@artsy/cohesion"
import {
  Box,
  Button,
  Flex,
  FlexProps,
  Radio,
  RadioGroup,
  Sans,
  Separator,
  Serif,
  Spacer,
} from "@artsy/palette"
import { ArtworkSidebarCommercial_artwork } from "v2/__generated__/ArtworkSidebarCommercial_artwork.graphql"
import { ArtworkSidebarCommercialOfferOrderMutation } from "v2/__generated__/ArtworkSidebarCommercialOfferOrderMutation.graphql"
import { ArtworkSidebarCommercialOrderMutation } from "v2/__generated__/ArtworkSidebarCommercialOrderMutation.graphql"
import { Mediator, SystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { ModalType } from "v2/Components/Authentication/Types"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import currency from "currency.js"
import { Router } from "found"
import React, { FC, useContext } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { ErrorWithMetadata } from "v2/Utils/errors"
import { get } from "v2/Utils/get"
import createLogger from "v2/Utils/logger"
import { openAuthModal } from "v2/Utils/openAuthModal"
import { ArtworkSidebarSizeInfoFragmentContainer as SizeInfo } from "./ArtworkSidebarSizeInfo"

type EditionSet = ArtworkSidebarCommercial_artwork["edition_sets"][0]

export interface ArtworkSidebarCommercialContainerProps
  extends ArtworkSidebarCommercialProps {
  mediator: Mediator
  router?: Router
  user: User
  EXPERIMENTAL_APP_SHELL?: boolean
}

export interface ArtworkSidebarCommercialContainerState {
  isCommittingCreateOrderMutation: boolean
  isCommittingCreateOfferOrderMutation: boolean
  isErrorModalOpen: boolean
  selectedEditionSet: EditionSet
}

const Row: React.SFC<FlexProps> = ({ children, ...others }) => (
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

    return editionSets.find(editionSet => {
      return editionSet.is_acquireable || editionSet.is_offerable
    })
  }

  renderSaleMessage(saleMessage: string) {
    return (
      <Serif size="5t" weight="semibold" data-test="SaleMessage">
        {saleMessage}
      </Serif>
    )
  }

  renderEditionSet(editionSet: EditionSet, includeSelectOption: boolean) {
    const editionEcommerceAvailable =
      editionSet.is_acquireable || editionSet.is_offerable

    const editionFragment = (
      <>
        <SizeInfo piece={editionSet} />
        <Serif ml="auto" size="2" data-test="SaleMessage">
          {editionSet.sale_message}
        </Serif>
      </>
    )
    if (includeSelectOption) {
      return (
        <Row>
          <Radio
            mr="1"
            onSelect={e => {
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

    const editionSetsFragment = editionSets.map((editionSet, index) => {
      return (
        <React.Fragment key={editionSet.id}>
          <Box py={3}>
            {this.renderEditionSet(editionSet, includeSelectOption)}
          </Box>
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
        price: currency(props.artwork.listPrice.display).value,
      },
    ],
  }))
  handleCreateOrder() {
    const { user, mediator } = this.props
    if (user && user.id) {
      this.setState({ isCommittingCreateOrderMutation: true }, () => {
        if (get(this.props, props => props.relay.environment)) {
          commitMutation<ArtworkSidebarCommercialOrderMutation>(
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

                      // FIXME: Remove once A/B test completes
                      if (this.props.EXPERIMENTAL_APP_SHELL) {
                        this.props.router.push(url)
                      } else {
                        window.location.assign(url)
                      }
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
        if (get(this.props, props => props.relay.environment)) {
          commitMutation<ArtworkSidebarCommercialOfferOrderMutation>(
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

                      // FIXME: Remove once A/B test completes
                      if (this.props.EXPERIMENTAL_APP_SHELL) {
                        this.props.router.push(url)
                      } else {
                        window.location.assign(url)
                      }
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
    const artworkEcommerceAvailable =
      artwork.is_acquireable || artwork.is_offerable

    if (!artwork.sale_message && !artwork.is_inquireable) {
      return <Separator />
    }

    return (
      <Box textAlign="left">
        {artwork.sale_message && <Separator />}

        {artwork.edition_sets.length < 2 ? (
          artwork.sale_message && (
            <>
              <Spacer mb={3} />
              {this.renderSaleMessage(artwork.sale_message)}
            </>
          )
        ) : (
            <>
              {this.renderEditionSets(artworkEcommerceAvailable)}
              {selectedEditionSet && (
                <>
                  <Separator mb={3} />
                  {this.renderSaleMessage(selectedEditionSet.sale_message)}
                </>
              )}
            </>
          )}

        {artworkEcommerceAvailable &&
          (artwork.shippingOrigin || artwork.shippingInfo) && <Spacer mt={1} />}
        {artworkEcommerceAvailable && artwork.shippingOrigin && (
          <Sans size="2" color="black60">
            Ships from {artwork.shippingOrigin}
          </Sans>
        )}
        {artworkEcommerceAvailable && artwork.shippingInfo && (
          <Sans size="2" color="black60">
            {artwork.shippingInfo}
          </Sans>
        )}
        {artworkEcommerceAvailable && artwork.priceIncludesTaxDisplay && (
          <Sans size="2" color="black60">
            {artwork.priceIncludesTaxDisplay}
          </Sans>
        )}

        {artwork.is_inquireable ||
          artwork.is_acquireable ||
          artwork.is_offerable ? (
            artwork.sale_message && <Spacer mb={3} />
          ) : (
            <Separator mb={3} mt={3} />
          )}
        {artwork.is_acquireable && (
          <Button
            width="100%"
            size="large"
            loading={isCommittingCreateOrderMutation}
            onClick={this.handleCreateOrder.bind(this)}
          >
            Buy now
          </Button>
        )}
        {artwork.is_offerable && (
          <>
            <Spacer mb={2} />
            <Button
              variant={
                artwork.is_acquireable ? "secondaryOutline" : "primaryBlack"
              }
              width="100%"
              size="large"
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
              size="large"
              onClick={this.handleInquiry.bind(this)}
            >
              Contact gallery
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
  const { mediator, router, user, EXPERIMENTAL_APP_SHELL } = useContext(
    SystemContext
  )

  return (
    <ArtworkSidebarCommercialContainer
      {...props}
      mediator={mediator}
      router={router}
      user={user}
      EXPERIMENTAL_APP_SHELL={EXPERIMENTAL_APP_SHELL}
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
