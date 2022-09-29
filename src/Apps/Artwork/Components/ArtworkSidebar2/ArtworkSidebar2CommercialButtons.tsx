import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import {
  ArtworkSidebar2EditionSetFragmentContainer,
  EditionSet,
} from "./ArtworkSidebar2EditionSets"
import {
  Button,
  Flex,
  Separator,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useCallback, useEffect, useState } from "react"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "../ArtworkSidebar/ArtworkSidebarCreateAlertButton"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { ErrorWithMetadata } from "Utils/errors"
import { logger } from "@sentry/utils"
import { useSystemContext } from "System"
import { ArtworkSidebar2CommercialButtons_artwork } from "__generated__/ArtworkSidebar2CommercialButtons_artwork.graphql"
import { ArtworkSidebar2CommercialButtonsOrderMutation } from "__generated__/ArtworkSidebar2CommercialButtonsOrderMutation.graphql"
import { ArtworkSidebar2CommercialButtonsOfferOrderMutation } from "__generated__/ArtworkSidebar2CommercialButtonsOfferOrderMutation.graphql"
import { useTracking } from "react-tracking"
import { ModalType } from "Components/Authentication/Types"
import { ContextModule, Intent } from "@artsy/cohesion"
import { openAuthModal } from "Utils/openAuthModal"
import currency from "currency.js"

interface SaleMessageProps {
  saleMessage: string | null
}

const SaleMessage: React.FC<SaleMessageProps> = ({ saleMessage }) => {
  if (!saleMessage) {
    return null
  }

  return (
    <Text variant="lg-display" color="black100">
      {saleMessage}
    </Text>
  )
}

interface ArtworkSidebar2CommercialButtonsProps {
  artwork: ArtworkSidebar2CommercialButtons_artwork
}

const ArtworkSidebar2CommerialButtons: React.FC<ArtworkSidebar2CommercialButtonsProps> = ({
  artwork,
}) => {
  const { relayEnvironment, mediator, router, user } = useSystemContext()

  const tracking = useTracking()
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)
  const [
    isCommitingCreateOrderMutation,
    setIsCommitingCreateOrderMutation,
  ] = useState(false)
  const [
    isCommittingCreateOfferOrderMutation,
    setIsCommitingCreateOfferOrderMutation,
  ] = useState(false)
  const { inquiryComponent, showInquiry } = useInquiry({
    artworkID: artwork.internalID,
  })

  const onCloseModal = () => {
    setIsErrorModalVisible(false)
  }

  const onMutationError = (error: ErrorWithMetadata) => {
    logger.error(error)

    setIsErrorModalVisible(true)
  }

  const handleInquiry = () => {
    tracking.trackEvent({
      context_module: DeprecatedSchema.ContextModule.Sidebar,
      action_type: DeprecatedSchema.ActionType.ClickedContactGallery,
      subject: DeprecatedSchema.Subject.ContactGallery,
      artwork_id: artwork.internalID,
      artwork_slug: artwork.slug,
    })
    showInquiry()
  }

  const handleCreateOrder = () => {
    // console.log("I am here!")
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.ClickedBuyNow,
      flow: DeprecatedSchema.Flow.BuyNow,
      type: DeprecatedSchema.Type.Button,
      artwork_id: artwork.internalID,
      artwork_slug: artwork.slug,
      products: [
        {
          product_id: artwork.internalID,
          quantity: 1,
          price: currency(artwork?.listPrice?.display ?? "").value,
        },
      ],
    })
    if (!!user?.id) {
      setIsCommitingCreateOrderMutation(true)
      commitMutation<ArtworkSidebar2CommercialButtonsOrderMutation>(
        relayEnvironment!,
        {
          mutation: graphql`
            mutation ArtworkSidebar2CommercialButtonsOrderMutation(
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
              artworkId: artwork.internalID,
              editionSetId: selectedEditionSet?.internalID,
            },
          },
          onCompleted: data => {
            setIsCommitingCreateOrderMutation(false)
            const {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              commerceCreateOrderWithArtwork: { orderOrError },
            } = data

            if (orderOrError.error) {
              onMutationError(
                new ErrorWithMetadata(
                  orderOrError.error.code,
                  orderOrError.error
                )
              )
            } else {
              const url = `/orders/${orderOrError.order.internalID}`

              router?.push(url)
            }
          },
          onError: onMutationError,
        }
      )
    } else {
      openAuthModal(mediator!, {
        mode: ModalType.signup,
        redirectTo: location.href,
        contextModule: ContextModule.artworkSidebar,
        intent: Intent.buyNow,
        copy: "Sign up to buy art with ease",
      })
    }
  }

  const handleCreateOfferOrder = () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.ClickedMakeOffer,
      flow: DeprecatedSchema.Flow.MakeOffer,
      type: DeprecatedSchema.Type.Button,
      artwork_id: artwork.internalID,
      artwork_slug: artwork.slug,
    })

    if (!!user?.id) {
      setIsCommitingCreateOfferOrderMutation(true)
      commitMutation<ArtworkSidebar2CommercialButtonsOfferOrderMutation>(
        relayEnvironment!,
        {
          mutation: graphql`
            mutation ArtworkSidebar2CommercialButtonsOfferOrderMutation(
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
              artworkId: artwork.internalID,
              editionSetId: selectedEditionSet?.internalID,
            },
          },
          onCompleted: data => {
            setIsCommitingCreateOfferOrderMutation(false)

            const {
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              commerceCreateOfferOrderWithArtwork: { orderOrError },
            } = data
            if (orderOrError.error) {
              onMutationError(
                new ErrorWithMetadata(
                  orderOrError.error.code,
                  orderOrError.error
                )
              )
            } else {
              const url = `/orders/${orderOrError.order.internalID}/offer`
              router?.push(url)
            }
          },
          onError: onMutationError,
        }
      )
    } else {
      openAuthModal(mediator!, {
        mode: ModalType.signup,
        redirectTo: location.href,
        contextModule: ContextModule.artworkSidebar,
        intent: Intent.makeOffer,
        copy: "Sign up to make an offer",
      })
    }
  }

  const firstAvailableEcommerceEditionSet = useCallback(() => {
    const { editionSets } = artwork

    if (!editionSets) {
      return undefined
    }

    return editionSets?.find(
      editionSet => editionSet?.isAcquireable || editionSet?.isOfferable
    )
  }, [artwork])

  const [selectedEditionSet, setSelectedEditionSet] = useState(
    firstAvailableEcommerceEditionSet()
  )

  useEffect(() => {
    setSelectedEditionSet(firstAvailableEcommerceEditionSet())
  }, [artwork.editionSets, firstAvailableEcommerceEditionSet])

  const artworkEcommerceAvailable = !!(
    artwork.isAcquireable || artwork.isOfferable
  )
  const shouldRenderButtons =
    artworkEcommerceAvailable || !!artwork.isInquireable

  const createAlertAvailable =
    artwork.isSold && (artwork?.artists?.length ?? 0) > 0
  const isSecondaryContactGalleryButton =
    artwork.isOfferable || createAlertAvailable

  const renderCreateAlertButton = () => {
    if (artwork.artists?.length === 0) {
      return null
    }

    return (
      <>
        <Spacer mt={2} />
        <ArtworkSidebarCreateAlertButtonFragmentContainer artwork={artwork} />
      </>
    )
  }

  return (
    <>
      {inquiryComponent}

      {(artwork?.editionSets?.length ?? 0) < 2 ? (
        <SaleMessage saleMessage={artwork.saleMessage} />
      ) : (
        <>
          <ArtworkSidebar2EditionSetFragmentContainer
            artwork={artwork}
            selectedEditionSet={selectedEditionSet as EditionSet}
            onSelectEditionSet={setSelectedEditionSet}
          />

          {!!selectedEditionSet && (
            <>
              <Separator />
              <Spacer mt={4} />
              <SaleMessage saleMessage={selectedEditionSet.saleMessage} />
            </>
          )}
        </>
      )}

      {shouldRenderButtons && (
        <>
          <Spacer mt={2} />
        </>
      )}

      <Flex>
        {artwork.isSold && renderCreateAlertButton()}
        {artwork.isAcquireable && (
          <Button
            width="100%"
            size="large"
            loading={isCommitingCreateOrderMutation}
            onClick={handleCreateOrder}
          >
            Purchase
          </Button>
        )}
        {artwork.isOfferable && (
          <>
            <Spacer ml={artwork.isAcquireable ? 1 : 0} />
            <Button
              variant={
                artwork.isAcquireable ? "secondaryBlack" : "primaryBlack"
              }
              width="100%"
              size="large"
              loading={isCommittingCreateOfferOrderMutation}
              onClick={handleCreateOfferOrder}
            >
              Make an Offer
            </Button>
          </>
        )}
        {artwork.isInquireable && (
          <>
            <Spacer ml={isSecondaryContactGalleryButton ? 1 : 0} />
            <Button
              width="100%"
              size="large"
              onClick={handleInquiry}
              variant={
                isSecondaryContactGalleryButton
                  ? "secondaryBlack"
                  : "primaryBlack"
              }
            >
              Contact Gallery
            </Button>
          </>
        )}
      </Flex>

      <Spacer mt={4} />
      <ErrorToast onClose={onCloseModal} show={isErrorModalVisible} />
    </>
  )
}

const ErrorToast: React.FC<{ onClose(): void; show: boolean }> = ({
  show,
  onClose,
}) => {
  const { sendToast } = useToasts()

  useEffect(() => {
    if (!show) return

    sendToast({
      variant: "error",
      message:
        "Something went wrong. Please try again or contact orders@artsy.net.",
      onClose,
    })
  }, [onClose, sendToast, show])

  return null
}

export const ArtworkSidebar2CommercialButtonsFragmentContainer = createFragmentContainer(
  ArtworkSidebar2CommerialButtons,
  {
    artwork: graphql`
      fragment ArtworkSidebar2CommercialButtons_artwork on Artwork {
        ...ArtworkSidebar2EditionSets_artwork
        ...ArtworkSidebarCreateAlertButton_artwork
        artists {
          internalID
        }
        internalID
        slug
        saleMessage
        isInquireable
        isAcquireable
        isOfferable
        isSold
        listPrice {
          ... on PriceRange {
            display
          }
          ... on Money {
            display
          }
        }
        editionSets {
          id
          internalID
          isAcquireable
          isOfferable
          saleMessage
        }
      }
    `,
  }
)
