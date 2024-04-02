import { graphql, useFragment } from "react-relay"
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
import { FC, useCallback, useEffect, useState } from "react"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { ErrorWithMetadata } from "Utils/errors"
import { logger } from "@sentry/utils"
import { useSystemContext } from "System/useSystemContext"
import { ArtworkSidebarCommercialButtons_artwork$key } from "__generated__/ArtworkSidebarCommercialButtons_artwork.graphql"
import { ArtworkSidebarCommercialButtons_me$key } from "__generated__/ArtworkSidebarCommercialButtons_me.graphql"
import { ArtworkSidebarCommercialButtonsOrderMutation } from "__generated__/ArtworkSidebarCommercialButtonsOrderMutation.graphql"
import { ArtworkSidebarCommercialButtonsOfferOrderMutation } from "__generated__/ArtworkSidebarCommercialButtonsOfferOrderMutation.graphql"
import { useTracking } from "react-tracking"
import { ContextModule, Intent } from "@artsy/cohesion"
import currency from "currency.js"
import { useTranslation } from "react-i18next"
import { useAuthDialog } from "Components/AuthDialog"
import { useRouter } from "System/Router/useRouter"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { usePartnerOfferCheckoutMutation } from "Apps/PartnerOffer/Routes/Mutations/UsePartnerOfferCheckoutMutation"
import { useMutation } from "Utils/Hooks/useMutation"
import { useTimer } from "Utils/Hooks/useTimer"
import { useFeatureFlag } from "System/useFeatureFlag"
import { extractNodes } from "Utils/extractNodes"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"

interface SaleMessageProps {
  saleMessage: string | null | undefined
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
  artwork: ArtworkSidebarCommercialButtons_artwork$key
  me: ArtworkSidebarCommercialButtons_me$key
}

const THE_PAST = new Date(0).toISOString()

export const ArtworkSidebarCommercialButtons: React.FC<ArtworkSidebarCommercialButtonsProps> = props => {
  const artwork = useFragment(ARTWORK_FRAGMENT, props.artwork)
  const me = useFragment(ME_FRAGMENT, props.me)

  const partnerOfferVisibilityEnabled = useFeatureFlag(
    "emerald_partner-offers-to-artwork-page"
  )

  // Get the first not-ended partner offer, if available
  const partnerOffer =
    (partnerOfferVisibilityEnabled &&
      me?.partnerOffersConnection &&
      extractNodes(me.partnerOffersConnection)[0]) ||
    null

  // Fall back to a definitely past value because the timer hook doesn't like nulls
  const partnerOfferTimer = useTimer(partnerOffer?.endAt || THE_PAST)

  const activePartnerOffer =
    (!partnerOfferTimer.hasEnded && partnerOffer) || null

  const { router, user } = useSystemContext()
  const { match } = useRouter()

  const { t } = useTranslation()

  const tracking = useTracking()

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false)

  const createPartnerOfferCheckout = usePartnerOfferCheckoutMutation()

  const createOrder = useCreateOrderMutation()
  const createOfferOrder = useCreateOfferOrderMutation()

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
    showInquiry({ enableCreateAlert: true })
  }

  const handleCreatePartnerOfferOrder = async () => {
    if (!activePartnerOffer?.internalID) {
      throw new ErrorWithMetadata(
        "handleCreatePartnerOfferOrder: no active partner offer"
      )
    }

    try {
      setIsCommitingCreateOrderMutation(true)
      const response = await createPartnerOfferCheckout.submitMutation({
        variables: {
          input: {
            partnerOfferId: activePartnerOffer.internalID,
          },
        },
      })

      let redirectUrl = "/"
      let orderOrError = response.commerceCreatePartnerOfferOrder?.orderOrError

      if (orderOrError?.error) {
        const errorCode = orderOrError.error.code
        const errorData = JSON.parse(orderOrError.error.data?.toString() ?? "")

        switch (errorCode) {
          // TODO: these cases are unlikely from the artwork page, copied from the special create route
          case "expired_partner_offer":
            redirectUrl = `/artwork/${errorData.artwork_id}?expired_offer=true`
            break
          case "not_acquireable":
            redirectUrl = `/artwork/${errorData.artwork_id}?unavailable=true`
            break
          default:
            throw new ErrorWithMetadata(errorCode, orderOrError.error)
        }
      } else {
        redirectUrl = `/orders/${orderOrError?.order?.internalID}`
      }
      setIsCommitingCreateOrderMutation(false)
      router?.push(redirectUrl)
    } catch (error) {
      onMutationError(error)
    }
  }

  const handleCreateOrder = async () => {
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
      try {
        setIsCommitingCreateOrderMutation(true)
        const data = await createOrder.submitMutation({
          variables: {
            input: {
              artworkId: artwork.internalID,
              editionSetId: selectedEditionSet?.internalID,
            },
          },
        })
        setIsCommitingCreateOrderMutation(false)
        const {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          commerceCreateOrderWithArtwork: { orderOrError },
        } = data
        if (orderOrError.error) {
          throw new ErrorWithMetadata(
            orderOrError.error.code,
            orderOrError.error
          )
        } else {
          const url = `/orders/${orderOrError.order.internalID}`

          router?.push(url)
        }
      } catch (e) {
        onMutationError(e)
      }
    } else {
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to buy art with ease`
          },
          afterAuthAction: {
            action: "buyNow",
            kind: "artworks",
            objectId: artwork.internalID,
            secondaryObjectId: selectedEditionSet?.internalID,
          },
          redirectTo: `${match?.location?.pathname}?creating_order=true`,
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.buyNow,
        },
      })
    }
  }

  const handleCreateOfferOrder = async () => {
    tracking.trackEvent({
      action_type: DeprecatedSchema.ActionType.ClickedMakeOffer,
      flow: DeprecatedSchema.Flow.MakeOffer,
      type: DeprecatedSchema.Type.Button,
      artwork_id: artwork.internalID,
      artwork_slug: artwork.slug,
    })

    if (!!user?.id) {
      try {
        setIsCommitingCreateOfferOrderMutation(true)
        const data = await createOfferOrder.submitMutation({
          variables: {
            input: {
              artworkId: artwork.internalID,
              editionSetId: selectedEditionSet?.internalID,
            },
          },
        })

        setIsCommitingCreateOfferOrderMutation(false)

        const {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          commerceCreateOfferOrderWithArtwork: { orderOrError },
        } = data
        if (orderOrError.error) {
          throw new ErrorWithMetadata(
            orderOrError.error.code,
            orderOrError.error
          )
        } else {
          const url = `/orders/${orderOrError.order.internalID}/offer`
          router?.push(url)
        }
      } catch (error) {
        onMutationError(error)
      }
    } else {
      showAuthDialog({
        mode: "SignUp",
        options: {
          title: mode => {
            const action = mode === "SignUp" ? "Sign up" : "Log in"
            return `${action} to make an offer`
          },
          afterAuthAction: {
            action: "makeOffer",
            kind: "artworks",
            objectId: artwork.internalID,
            secondaryObjectId: selectedEditionSet?.internalID,
          },
          redirectTo: `${match?.location?.pathname}?creating_order=true`,
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
    artwork.isEligibleToCreateAlert && artwork.isSold
  const isSecondaryContactGalleryButton =
    artwork.isOfferable || isCreateAlertAvailable

  const AlertSwitch: FC = () => {
    if (!isCreateAlertAvailable) {
      return null
    }

    return (
      <ProgressiveOnboardingAlertCreateSimple>
        <CreateAlertButton width="100%" size="large" />
      </ProgressiveOnboardingAlertCreateSimple>
    )
  }

  const buyNowOrPartnerOfferAvailable = !!(
    artwork.isAcquireable || activePartnerOffer
  )

  const SaleMessageOrOfferDisplay: FC = () => {
    if (partnerOffer) {
      return (
        <>
          <Spacer y={2} />
          <Flex>
            <Text
              variant="xs"
              color="blue100"
              backgroundColor="blue10"
              px={0.5}
            >
              Limited-Time Offer
            </Text>
          </Flex>

          <Spacer y={0.5} />

          <Flex
            flexDirection={["column", "row"]}
            width="100%"
            justifyContent="start"
          >
            <SaleMessage
              saleMessage={partnerOffer.priceWithDiscount?.display}
            />
            <Spacer x={1} />
            <Text variant="md" color="black60" style={{ whiteSpace: "nowrap" }}>
              (List price: {artwork.priceListedDisplay})
            </Text>
          </Flex>

          <Spacer y={0.5} />

          <ExpiresInTimer
            expiresAt={partnerOffer.endAt}
            available={partnerOffer.isAvailable}
          />
          <Spacer y={2} />
        </>
      )
    }

    return (
      <>
        <SaleMessage saleMessage={artwork.saleMessage} />
        {!!isCreateAlertAvailable && <Spacer y={1} />}
      </>
    )
  }

  return (
    <>
      {inquiryComponent}

      {(artwork?.editionSets?.length ?? 0) < 2 ? (
        <SaleMessageOrOfferDisplay />
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
          <AlertSwitch />
          {buyNowOrPartnerOfferAvailable && (
            <Button
              width="100%"
              size="large"
              loading={isCommitingCreateOrderMutation}
              onClick={
                // TODO: make sure the timer will reset the active partner offer
                activePartnerOffer
                  ? handleCreatePartnerOfferOrder
                  : handleCreateOrder
              }
            >
              {t("artworkPage.sidebar.commercialButtons.buyNow")}
            </Button>
          )}
          {artwork.isOfferable && (
            <Button
              variant={
                buyNowOrPartnerOfferAvailable
                  ? "secondaryBlack"
                  : "primaryBlack"
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

const useCreateOrderMutation = () => {
  return useMutation<ArtworkSidebarCommercialButtonsOrderMutation>({
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
  })
}

const useCreateOfferOrderMutation = () => {
  return useMutation<ArtworkSidebarCommercialButtonsOfferOrderMutation>({
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
  })
}

const ARTWORK_FRAGMENT = graphql`
  fragment ArtworkSidebarCommercialButtons_artwork on Artwork {
    ...ArtworkSidebarEditionSets_artwork
    isEligibleToCreateAlert
    artists {
      internalID
    }
    attributionClass {
      internalID
    }
    internalID
    slug
    saleMessage
    isInquireable
    isAcquireable
    isOfferable
    isSold
    priceListedDisplay
    listPrice {
      ... on PriceRange {
        display
      }
      ... on Money {
        display
      }
    }
    mediumType {
      filterGene {
        slug
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
`

const ME_FRAGMENT = graphql`
  fragment ArtworkSidebarCommercialButtons_me on Me
    @argumentDefinitions(artworkID: { type: "String!" }) {
    partnerOffersConnection(artworkID: $artworkID, first: 1) {
      edges {
        node {
          endAt
          internalID
          isAvailable
          priceWithDiscount {
            display
          }
        }
      }
    }
  }
`
