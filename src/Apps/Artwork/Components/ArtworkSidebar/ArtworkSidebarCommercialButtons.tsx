import { commitMutation, createFragmentContainer, graphql } from "react-relay"
import {
  ArtworkSidebarEditionSetFragmentContainer,
  EditionSet,
} from "./ArtworkSidebarEditionSets"
import {
  Button,
  Flex,
  Join,
  Separator,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useCallback, useEffect, useState } from "react"
import { ArtworkSidebarCreateAlertButtonFragmentContainer } from "./ArtworkSidebarCreateAlertButton"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { ErrorWithMetadata } from "Utils/errors"
import { logger } from "@sentry/utils"
import { useSystemContext } from "System/useSystemContext"
import { ArtworkSidebarCommercialButtons_artwork$data } from "__generated__/ArtworkSidebarCommercialButtons_artwork.graphql"
import { ArtworkSidebarCommercialButtonsOrderMutation } from "__generated__/ArtworkSidebarCommercialButtonsOrderMutation.graphql"
import { ArtworkSidebarCommercialButtonsOfferOrderMutation } from "__generated__/ArtworkSidebarCommercialButtonsOfferOrderMutation.graphql"
import { useTracking } from "react-tracking"
import { ContextModule, Intent } from "@artsy/cohesion"
import currency from "currency.js"
import { useTranslation } from "react-i18next"
import { useAuthDialog } from "Components/AuthDialog"

interface SaleMessageProps {
  saleMessage: string | null
}

const SaleMessage: React.FC<SaleMessageProps> = ({ saleMessage }) => {
  if (!saleMessage) {
    return null
  }

  return (
    <Text variant="lg-display" color="black100" data-test="SaleMessage">
      {saleMessage}
    </Text>
  )
}

interface ArtworkSidebarCommercialButtonsProps {
  artwork: ArtworkSidebarCommercialButtons_artwork$data
}

const ArtworkSidebarCommerialButtons: React.FC<ArtworkSidebarCommercialButtonsProps> = ({
  artwork,
}) => {
  const { relayEnvironment, router, user } = useSystemContext()

  const { t } = useTranslation()

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

  const { showAuthDialog } = useAuthDialog()

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
      commitMutation<ArtworkSidebarCommercialButtonsOrderMutation>(
        relayEnvironment!,
        {
          mutation: graphql`
            mutation ArtworkSidebarCommercialButtonsOrderMutation(
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
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to buy art with ease`
          },
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.buyNow,
        },
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
      commitMutation<ArtworkSidebarCommercialButtonsOfferOrderMutation>(
        relayEnvironment!,
        {
          mutation: graphql`
            mutation ArtworkSidebarCommercialButtonsOfferOrderMutation(
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
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to make an offer`
          },
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.makeOffer,
        },
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

  const isCreateAlertAvailable =
    artwork.isSold && (artwork?.artists?.length ?? 0) > 0
  const isSecondaryContactGalleryButton =
    artwork.isOfferable || isCreateAlertAvailable

  return (
    <>
      {inquiryComponent}

      {(artwork?.editionSets?.length ?? 0) < 2 ? (
        <>
          <SaleMessage saleMessage={artwork.saleMessage} />
          {!!isCreateAlertAvailable && <Spacer y={1} />}
        </>
      ) : (
        <>
          <Separator />
          <ArtworkSidebarEditionSetFragmentContainer
            artwork={artwork}
            selectedEditionSet={selectedEditionSet as EditionSet}
            onSelectEditionSet={setSelectedEditionSet}
          />

          {!!selectedEditionSet && (
            <>
              <Separator />
              <Spacer y={4} />
              <SaleMessage saleMessage={selectedEditionSet.saleMessage} />
            </>
          )}
        </>
      )}

      {shouldRenderButtons && <Spacer y={2} />}

      <Flex flexDirection={["column", "column", "column", "column", "row"]}>
        <Join separator={<Spacer x={1} y={1} />}>
          {!!isCreateAlertAvailable && (
            <ArtworkSidebarCreateAlertButtonFragmentContainer
              artwork={artwork}
            />
          )}
          {artwork.isAcquireable && (
            <Button
              width="100%"
              size="large"
              loading={isCommitingCreateOrderMutation}
              onClick={handleCreateOrder}
            >
              {t("artworkPage.sidebar.commercialButtons.buyNow")}
            </Button>
          )}
          {artwork.isOfferable && (
            <Button
              variant={
                artwork.isAcquireable ? "secondaryBlack" : "primaryBlack"
              }
              width="100%"
              size="large"
              loading={isCommittingCreateOfferOrderMutation}
              onClick={handleCreateOfferOrder}
            >
              {t("artworkPage.sidebar.commercialButtons.makeOffer")}
            </Button>
          )}
          {artwork.isInquireable && (
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
              {t("artworkPage.sidebar.commercialButtons.contactGallery")}
            </Button>
          )}
        </Join>
      </Flex>

      <Spacer y={4} />
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

export const ArtworkSidebarCommercialButtonsFragmentContainer = createFragmentContainer(
  ArtworkSidebarCommerialButtons,
  {
    artwork: graphql`
      fragment ArtworkSidebarCommercialButtons_artwork on Artwork {
        ...ArtworkSidebarEditionSets_artwork
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
