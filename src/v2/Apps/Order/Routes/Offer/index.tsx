import {
  BorderedRadio,
  Button,
  Flex,
  Message,
  RadioGroup,
  Spacer,
  Text,
  TextAreaChange,
} from "@artsy/palette"
import { Offer_order } from "v2/__generated__/Offer_order.graphql"
import { OfferMutation } from "v2/__generated__/OfferMutation.graphql"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import { OfferInput } from "v2/Apps/Order/Components/OfferInput"
import { OfferNote } from "v2/Apps/Order/Components/OfferNote"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { TwoColumnLayout } from "v2/Apps/Order/Components/TwoColumnLayout"
import { Dialog, injectDialog } from "v2/Apps/Order/Dialogs"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics"
import { Router } from "found"
import { Component } from "react"
import { RelayProp, createFragmentContainer, graphql } from "react-relay"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { OrderStepper, offerFlowSteps } from "../../Components/OrderStepper"
import { BuyerGuarantee } from "../../Components/BuyerGuarantee"
import { getOfferItemFromOrder } from "v2/Apps/Order/Utils/offerItemExtractor"
import { ContextModule, OwnerType } from "@artsy/cohesion"
import { isNil } from "lodash"
import { appendCurrencySymbol } from "v2/Apps/Order/Utils/currencyUtils"
import { userHasLabFeature } from "v2/Utils/user"
import { SystemContextConsumer, SystemContextProps } from "v2/System"

export interface OfferProps {
  order: Offer_order
  relay?: RelayProp
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export interface OfferState {
  offerValue: number
  offerNoteValue: TextAreaChange
  formIsDirty: boolean
  lowSpeedBumpEncountered: boolean
  highSpeedBumpEncountered: boolean
  isToggleRadio: boolean
}

const logger = createLogger("Order/Routes/Offer/index.tsx")

@track()
export class OfferRoute extends Component<
  OfferProps,
  OfferState,
  SystemContextProps
> {
  state: OfferState = {
    formIsDirty: false,
    highSpeedBumpEncountered: false,
    lowSpeedBumpEncountered: false,
    offerNoteValue: { exceedsCharacterLimit: false, value: "" },
    offerValue: 0,
    isToggleRadio: false,
  }

  @track<OfferProps>(props => ({
    action_type: Schema.ActionType.FocusedOnOfferInput,
    flow: Schema.Flow.MakeOffer,
    order_id: props.order.internalID,
  }))
  onOfferInputFocus() {
    // noop
  }

  @track<OfferProps>(props => ({
    action_type: Schema.ActionType.ViewedOfferTooLow,
    flow: Schema.Flow.MakeOffer,
    order_id: props.order.internalID,
  }))
  showLowSpeedbump() {
    this.setState({ lowSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      continueButtonText: "OK",
      message:
        "Offers within 25% of the list price are most likely to receive a response.",
      title: "Offer may be too low",
    })
  }

  @track<OfferProps>(props => ({
    action_type: Schema.ActionType.ViewedOfferHigherThanListPrice,
    flow: Schema.Flow.MakeOffer,
    order_id: props.order.internalID,
  }))
  showHighSpeedbump() {
    this.setState({ highSpeedBumpEncountered: true })
    this.props.dialog.showErrorDialog({
      continueButtonText: "OK",
      message: "You’re making an offer higher than the list price.",
      title: "Offer higher than list price",
    })
  }

  addInitialOfferToOrder(variables: OfferMutation["variables"]) {
    return this.props.commitMutation<OfferMutation>({
      // TODO: Inputs to the mutation might have changed case of the keys!
      mutation: graphql`
        mutation OfferMutation($input: CommerceAddInitialOfferToOrderInput!) {
          commerceAddInitialOfferToOrder(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                __typename
                order {
                  internalID
                  mode
                  totalListPriceCents
                  ... on CommerceOfferOrder {
                    myLastOffer {
                      internalID
                      amountCents
                      note
                    }
                  }
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

      variables,
    })
  }

  handleSubmitError(error: { code: string }) {
    logger.error(error)
    switch (error.code) {
      case "invalid_amount_cents": {
        this.props.dialog.showErrorDialog({
          message:
            "The offer amount is either missing or invalid. Please try again.",
          title: "Invalid offer",
        })
        break
      }
      default: {
        this.props.dialog.showErrorDialog()
        break
      }
    }
  }

  toggleRadio() {
    this.setState({
      isToggleRadio: true,
    })
  }

  getPriceOption() {
    // const { currencyCode } = this.props.order
    const artwork = this.props.order.lineItems?.edges?.[0]?.node?.artwork
    const listPrice = artwork?.listPrice

    const minPriceRange = listPrice?.minPrice?.major
    const maxPriceRange = listPrice?.maxPrice?.major
    const midPriceRange = (Number(minPriceRange) + Number(maxPriceRange)) / 2

    const getRangeDetails = [
      { value: minPriceRange, description: "Low-end of range" },
      { value: maxPriceRange, description: "Midpoint" },
      { value: midPriceRange, description: "Top-end of range" },
    ]

    const priceAmountRange = getRangeDetails.map(rangePrice => {
      return {
        value: rangePrice.value,
        label: rangePrice.value,
        description: rangePrice.description,
      }
    })

    const priceAmountExact = [0.2, 0.15, 0.1].map(pricePercentage => {
      if (listPrice?.major) {
        const listPriceCalculate = listPrice.major * (1 - pricePercentage)
        return {
          value: listPriceCalculate,
          label: listPriceCalculate,
          description: `${pricePercentage * 100}% below list price`,
        }
      }
    })
    const priceOptions = artwork?.isPriceRange
      ? priceAmountRange
      : priceAmountExact

    const components = priceOptions.map(({ value, label, description }) => {
      return (
        <BorderedRadio
          value={value}
          label={label}
          onSelect={() => this.setState({ offerValue: value })}
          key={`price-option-${value}`}
        >
          <Text variant="sm" color="black60">
            {description}
          </Text>
        </BorderedRadio>
      )
    })

    return <>{components}</>
  }
  onContinueButtonPressed = async () => {
    const {
      offerValue,
      offerNoteValue,
      lowSpeedBumpEncountered,
      highSpeedBumpEncountered,
    } = this.state

    if (offerValue <= 0 || offerNoteValue.exceedsCharacterLimit) {
      this.setState({ formIsDirty: true })
      return
    }

    const listPriceCents = this.props.order.totalListPriceCents
    const artworkPrice = this?.props?.order?.lineItems?.edges?.[0]?.node
      ?.artwork?.price
    const isPriceHidden = isNil(artworkPrice) || artworkPrice === ""
    const isRangeOffer = getOfferItemFromOrder(this.props.order.lineItems)
      ?.displayPriceRange

    if (
      !lowSpeedBumpEncountered &&
      offerValue * 100 < listPriceCents * 0.75 &&
      !isRangeOffer
    ) {
      this.showLowSpeedbump()
      return
    }

    if (
      !highSpeedBumpEncountered &&
      this.state.offerValue * 100 > listPriceCents &&
      !isRangeOffer &&
      !isPriceHidden
    ) {
      this.showHighSpeedbump()
      return
    }

    try {
      const orderOrError = (
        await this.addInitialOfferToOrder({
          input: {
            amountCents: offerValue * 100,
            note: this.state.offerNoteValue && this.state.offerNoteValue.value,
            orderId: this.props.order.internalID,
          },
        })
      ).commerceAddInitialOfferToOrder?.orderOrError

      if (orderOrError?.error) {
        this.handleSubmitError(orderOrError.error)
        return
      }

      this.props.router.push(`/orders/${this.props.order.internalID}/shipping`)
    } catch (error) {
      logger.error(error)
      this.props.dialog.showErrorDialog()
    }
  }

  render() {
    const { order, isCommittingMutation } = this.props

    const offerItem = getOfferItemFromOrder(order.lineItems)
    const artworkId = order.lineItems?.edges?.[0]?.node?.artwork?.slug
    const orderCurrency = order.currencyCode

    return (
      <SystemContextConsumer>
        {({ user }) => {
          return (
            <>
              <OrderStepper currentStep="Offer" steps={offerFlowSteps} />
              <TwoColumnLayout
                Content={
                  <Flex
                    flexDirection="column"
                    style={
                      isCommittingMutation ? { pointerEvents: "none" } : {}
                    }
                    id="offer-page-left-column"
                  >
                    <Text variant="lg" color="black80" marginTop={4}>
                      Select an Option
                    </Text>
                    {Boolean(offerItem?.price) && (
                      <Text my={1} variant="xs" color="black60">
                        List price:{" "}
                        {appendCurrencySymbol(
                          offerItem?.price,
                          order.currencyCode
                        )}
                      </Text>
                    )}
                    <Text
                      variant="md"
                      color="black80"
                      marginTop={4}
                      marginBottom={2}
                      textTransform="uppercase"
                    >
                      Your offer
                    </Text>
                    {user && userHasLabFeature(user, "New Offer Submissions") && (
                      <Flex flexDirection="column">
                        <OfferInput
                          id="OfferForm_offerValue"
                          showError={
                            this.state.formIsDirty && this.state.offerValue <= 0
                          }
                          onChange={offerValue => this.setState({ offerValue })}
                          onFocus={this.onOfferInputFocus.bind(this)}
                        />
                      </Flex>
                    )}
                    {user && !userHasLabFeature(user, "New Offer Submissions") && (
                      <RadioGroup>
                        {this.getPriceOption()}
                        <BorderedRadio
                          value="custom"
                          label="Different amount"
                          data-test="custom"
                          onClick={this.toggleRadio.bind(this)}
                        >
                          {/* {this.state.isToggleRadio == true ? ( */}
                          <Flex flexDirection="column">
                            <OfferInput
                              id="OfferForm_offerValue"
                              showError={
                                this.state.formIsDirty &&
                                this.state.offerValue <= 0
                              }
                              onChange={offerValue =>
                                this.setState({ offerValue })
                              }
                              onFocus={this.onOfferInputFocus.bind(this)}
                            />
                          </Flex>
                          {/* ) : (
                            ""
                          )} */}
                        </BorderedRadio>
                        <BorderedRadio />
                      </RadioGroup>
                    )}

                    {!order.isInquiryOrder && (
                      <>
                        <Spacer mb={2} />
                        <OfferNote
                          onChange={offerNoteValue =>
                            this.setState({ offerNoteValue })
                          }
                          artworkId={artworkId!}
                        />
                      </>
                    )}
                    <Spacer mb={[2, 4]} />
                    <Message p={2}>
                      Please note that all final offers are binding. If your
                      offer is accepted, your payment will be processed
                      immediately.
                      <Text mt={1}>
                        Keep in mind making an offer doesn’t guarantee you the
                        work, as the seller might be receiving competing offers.
                      </Text>
                    </Message>
                    <Spacer mb={[2, 4]} />
                    <Media greaterThan="xs">
                      <Button
                        onClick={this.onContinueButtonPressed}
                        loading={isCommittingMutation}
                        variant="primaryBlack"
                        width="100%"
                      >
                        Continue
                      </Button>
                    </Media>
                  </Flex>
                }
                Sidebar={
                  <Flex flexDirection="column">
                    <Flex flexDirection="column">
                      <ArtworkSummaryItem order={order} />
                      <TransactionDetailsSummaryItem
                        order={order}
                        offerOverride={
                          this.state.offerValue &&
                          this.state.offerValue.toLocaleString("en-US", {
                            currency: orderCurrency,
                            minimumFractionDigits: 2,
                            style: "currency",
                          })
                        }
                      />
                    </Flex>
                    <BuyerGuarantee
                      contextModule={ContextModule.ordersOffer}
                      contextPageOwnerType={OwnerType.ordersOffer}
                    />
                    <Spacer mb={[2, 4]} />
                    <Media at="xs">
                      <>
                        <Button
                          onClick={this.onContinueButtonPressed}
                          loading={isCommittingMutation}
                          variant="primaryBlack"
                          width="100%"
                        >
                          Continue
                        </Button>
                      </>
                    </Media>
                  </Flex>
                }
              />
            </>
          )
        }}
      </SystemContextConsumer>
    )
  }
}

export const OfferFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(OfferRoute)),
  {
    order: graphql`
      fragment Offer_order on CommerceOrder {
        internalID
        mode
        state
        totalListPriceCents
        currencyCode
        lineItems {
          edges {
            node {
              artwork {
                slug
                price
                isPriceRange
                listPrice {
                  ... on Money {
                    major
                    currencyCode
                  }
                  ... on PriceRange {
                    maxPrice {
                      major
                      currencyCode
                    }
                    minPrice {
                      major
                      currencyCode
                    }
                  }
                }
              }
              artworkOrEditionSet {
                __typename
                ... on Artwork {
                  price
                  displayPriceRange
                }
                ... on EditionSet {
                  price
                  displayPriceRange
                }
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          isInquiryOrder
        }
        ...ArtworkSummaryItem_order
        ...TransactionDetailsSummaryItem_order
      }
    `,
  }
)
