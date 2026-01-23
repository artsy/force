import {
  ActionType,
  type ClickedBuyNow,
  type ClickedContactGallery,
  type ClickedMakeOffer,
  ContextModule,
  Intent,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Button,
  Flex,
  Image,
  Join,
  Separator,
  Spacer,
  Text,
  useTheme,
  useToasts,
} from "@artsy/palette"
import { logger } from "@sentry/utils"
import { useInquiry } from "Components/Inquiry/useInquiry"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { ErrorWithMetadata } from "Utils/errors"
import type { ArtworkSidebarCommercialButtonsOfferOrderMutation } from "__generated__/ArtworkSidebarCommercialButtonsOfferOrderMutation.graphql"
import type { ArtworkSidebarCommercialButtonsOrderMutation } from "__generated__/ArtworkSidebarCommercialButtonsOrderMutation.graphql"
import type { ArtworkSidebarCommercialButtons_artwork$key } from "__generated__/ArtworkSidebarCommercialButtons_artwork.graphql"
import type { ArtworkSidebarCommercialButtons_me$key } from "__generated__/ArtworkSidebarCommercialButtons_me.graphql"
import { useCallback, useEffect, useState } from "react"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import {
  ArtworkSidebarEditionSetFragmentContainer,
  type EditionSet,
} from "./ArtworkSidebarEditionSets"

import { useSelectedEditionSetContext } from "Apps/Artwork/Components/SelectedEditionSetContext"
import { usePartnerOfferCheckoutMutation } from "Apps/PartnerOffer/Routes/Mutations/UsePartnerOfferCheckoutMutation"
import { CreateAlertButton } from "Components/Alert/Components/CreateAlertButton"
import { useAuthDialog } from "Components/AuthDialog"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { ProgressiveOnboardingAlertCreateSimple } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertCreateSimple"
import { useRouter } from "System/Hooks/useRouter"
import { useMutation } from "Utils/Hooks/useMutation"
import { useTimer } from "Utils/Hooks/useTimer"
import { extractNodes } from "Utils/extractNodes"
import { getSignalLabel, signalsToArray } from "Utils/getSignalLabel"
import type { ResponsiveValue } from "styled-system"

interface ArtworkSidebarCommercialButtonsProps {
  artwork: ArtworkSidebarCommercialButtons_artwork$key
  me: ArtworkSidebarCommercialButtons_me$key
  showPrice?: boolean
  showButtonActions?: boolean
}

const THE_PAST = new Date(0).toISOString()

export const ArtworkSidebarCommercialButtons: React.FC<
  React.PropsWithChildren<ArtworkSidebarCommercialButtonsProps>
> = ({ showPrice = true, showButtonActions = true, ...props }) => {
  const { theme } = useTheme()

  const artwork = useFragment(ARTWORK_FRAGMENT, props.artwork)
  const me = useFragment(ME_FRAGMENT, props.me)

  const signals = signalsToArray(artwork.collectorSignals)

  // Get the first partner offer
  const partnerOffer =
    (me?.partnerOffersConnection &&
      extractNodes(me.partnerOffersConnection)[0]) ||
    null

  // Fall back to a definitely past value because the timer hook doesn't like nulls
  const partnerOfferTimer = useTimer(partnerOffer?.endAt || THE_PAST)
  const partnerIcon = artwork.partner?.profile?.icon?.url

  const activePartnerOffer =
    (!partnerOfferTimer.hasEnded && partnerOffer) || null

  const { router, user } = useSystemContext()
  const { match } = useRouter()

  const { trackEvent } = useTracking()

  const { sendToast } = useToasts()

  const createPartnerOfferCheckout = usePartnerOfferCheckoutMutation()

  const createOrder = useCreateOrderMutation()
  const createOfferOrder = useCreateOfferOrderMutation()

  const [isCommitingCreateOrderMutation, setIsCommitingCreateOrderMutation] =
    useState(false)

  const [
    isCommittingCreateOfferOrderMutation,
    setIsCommitingCreateOfferOrderMutation,
  ] = useState(false)

  const { inquiryComponent, showInquiry } = useInquiry({
    artworkID: artwork.internalID,
  })

  const { showAuthDialog } = useAuthDialog()

  const onMutationError = (error: ErrorWithMetadata) => {
    logger.error(error)

    sendToast({
      variant: "error",
      message:
        "Something went wrong. Please try again or contact orders@artsy.net.",
    })
  }

  const handleInquiry = () => {
    const event: ClickedContactGallery = {
      action: ActionType.clickedContactGallery,
      context_owner_type: OwnerType.artwork,
      context_owner_slug: artwork.slug,
      context_owner_id: artwork.internalID,
      signal_label: getSignalLabel({ signals }) ?? "",
    }
    trackEvent(event)

    showInquiry({ enableCreateAlert: true })
  }

  const handleCreatePartnerOfferOrder = async () => {
    const event: ClickedBuyNow = {
      action: ActionType.clickedBuyNow,
      context_owner_type: OwnerType.artwork,
      context_owner_id: artwork.internalID,
      context_owner_slug: artwork.slug,
      flow: "Partner offer",
      signal_label: getSignalLabel({ signals }) ?? "",
    }

    trackEvent(event)

    if (!activePartnerOffer?.internalID) {
      throw new ErrorWithMetadata(
        "handleCreatePartnerOfferOrder: no active partner offer",
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
      const orderOrError =
        response.commerceCreatePartnerOfferOrder?.orderOrError

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
    const event: ClickedBuyNow = {
      action: ActionType.clickedBuyNow,
      context_owner_type: OwnerType.artwork,
      context_owner_id: artwork.internalID,
      context_owner_slug: artwork.slug,
      flow: "Buy now",
      signal_label: getSignalLabel({ signals }) ?? "",
    }

    trackEvent(event)

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
            orderOrError.error,
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
        options: {
          title: "Sign up or log in to buy art with ease",
          afterAuthAction: {
            action: "buyNow",
            kind: "artworks",
            objectId: artwork.internalID,
            secondaryObjectId: selectedEditionSet?.internalID,
          },
          redirectTo: `${match?.location?.pathname}?creating_order=true`,
          image: artwork.image,
        },
        analytics: {
          contextModule: ContextModule.artworkSidebar,
          intent: Intent.buyNow,
        },
      })
    }
  }

  const handleCreateOfferOrder = async () => {
    const event: ClickedMakeOffer = {
      action: ActionType.clickedMakeOffer,
      context_owner_type: OwnerType.artwork,
      context_owner_id: artwork.internalID,
      context_owner_slug: artwork.slug,
      flow: activePartnerOffer ? "Partner offer" : "Make offer",
      signal_label: getSignalLabel({ signals }) ?? "",
    }

    trackEvent(event)

    if (!!user?.id) {
      try {
        setIsCommitingCreateOfferOrderMutation(true)
        const data = await createOfferOrder.submitMutation({
          variables: {
            input: {
              artworkId: artwork.internalID,
              editionSetId: selectedEditionSet?.internalID,
              partnerOfferId: activePartnerOffer?.internalID,
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
            orderOrError.error,
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
        options: {
          title: "Sign up or log in to make an offer",
          afterAuthAction: {
            action: "makeOffer",
            kind: "artworks",
            objectId: artwork.internalID,
            secondaryObjectId: selectedEditionSet?.internalID,
          },
          redirectTo: `${match?.location?.pathname}?creating_order=true`,
          imageUrl: artwork.image?.url,
          image: { blurhash: artwork.image?.blurhash },
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
      editionSet => editionSet?.isAcquireable || editionSet?.isOfferable,
    )
  }, [artwork])

  const [selectedEditionSet, setSelectedEditionSet] = useState(
    firstAvailableEcommerceEditionSet(),
  )
  const { setSelectedEditionSet: setSelectedEditionSetInContext } =
    useSelectedEditionSetContext()

  useEffect(() => {
    setSelectedEditionSet(firstAvailableEcommerceEditionSet())
    setSelectedEditionSetInContext(
      firstAvailableEcommerceEditionSet() as EditionSet,
    )
  }, [firstAvailableEcommerceEditionSet, setSelectedEditionSetInContext])

  const isCreateAlertAvailable =
    artwork.isEligibleToCreateAlert && artwork.isSold

  const renderButtons: {
    buyNow?: ResponsiveValue<"primaryBlack" | "secondaryBlack">
    makeOffer?: ResponsiveValue<"primaryBlack" | "secondaryBlack">
    contactGallery?: ResponsiveValue<"primaryBlack" | "secondaryBlack">
  } = {}
  if (artwork.isAcquireable || activePartnerOffer?.isAvailable) {
    renderButtons.buyNow = "primaryBlack"
  }
  if (artwork.isOfferable && !(activePartnerOffer && artwork.isInquireable)) {
    renderButtons.makeOffer =
      Object.keys(renderButtons).length === 0
        ? "primaryBlack"
        : "secondaryBlack"
  }
  if (artwork.isInquireable && Object.keys(renderButtons).length < 2) {
    renderButtons.contactGallery =
      Object.keys(renderButtons).length > 0 || isCreateAlertAvailable
        ? "secondaryBlack"
        : "primaryBlack"
  }

  const hasEditions = (artwork?.editionSets?.length ?? 0) > 1

  return (
    <>
      {inquiryComponent}

      {showPrice &&
        (hasEditions ? (
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
        ) : (
          <>
            {activePartnerOffer && partnerOffer?.isAvailable ? (
              <OfferDisplay
                originalPrice={artwork.priceListedDisplay}
                offerPrice={partnerOffer.priceWithDiscount?.display}
                endAt={partnerOffer.endAt}
                isAvailable={partnerOffer.isAvailable}
              />
            ) : (
              <>
                <SaleMessage saleMessage={artwork.saleMessage} />
                {!!isCreateAlertAvailable && <Spacer y={1} />}
              </>
            )}
          </>
        ))}

      {showButtonActions && (
        <>
          {Object.keys(renderButtons).length > 0 && <Spacer y={2} />}

          <Flex flexDirection={["column", "column", "column", "column", "row"]}>
            <Join separator={<Spacer x={1} y={1} />}>
              {isCreateAlertAvailable && (
                <ProgressiveOnboardingAlertCreateSimple>
                  <CreateAlertButton width="100%" size="large" />
                </ProgressiveOnboardingAlertCreateSimple>
              )}

              {renderButtons.buyNow && (
                <Button
                  variant={renderButtons.buyNow}
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
                  Purchase
                </Button>
              )}
              {renderButtons.makeOffer && (
                <Button
                  variant={renderButtons.makeOffer}
                  width="100%"
                  size="large"
                  loading={isCommittingCreateOfferOrderMutation}
                  onClick={handleCreateOfferOrder}
                >
                  Make an Offer
                </Button>
              )}
              {renderButtons.contactGallery && (
                <Button
                  variant={renderButtons.contactGallery}
                  width="100%"
                  size="large"
                  onClick={handleInquiry}
                >
                  Contact Gallery
                </Button>
              )}
            </Join>
          </Flex>
          {activePartnerOffer && partnerOffer?.note && (
            <>
              <Spacer y={2} />
              <Box
                backgroundColor={"mono5"}
                padding={2}
                width="100%"
                display={"flex"}
                gap={1}
              >
                {partnerIcon && (
                  <Box>
                    <Image
                      borderRadius={"50%"}
                      src={partnerIcon}
                      width={30}
                      height={30}
                      style={{
                        border: `1px solid ${theme.colors.mono30}`,
                      }}
                    />
                  </Box>
                )}
                <Box flex={1}>
                  <Text variant="sm" color="mono100" fontWeight={"bold"}>
                    Note from the gallery
                  </Text>
                  <Text variant="sm" color="mono100">
                    "{partnerOffer.note}"
                  </Text>
                </Box>
              </Box>
            </>
          )}
          <Spacer y={4} />
        </>
      )}
    </>
  )
}

interface SaleMessageProps {
  saleMessage: string | null | undefined
}

const SaleMessage: React.FC<React.PropsWithChildren<SaleMessageProps>> = ({
  saleMessage,
}) => {
  if (!saleMessage) {
    return null
  }

  return (
    <Text variant="lg-display" color="mono100" data-test="SaleMessage">
      {saleMessage}
    </Text>
  )
}

interface OfferDisplayProps {
  originalPrice: string | null | undefined
  offerPrice: string | null | undefined
  endAt?: string | null
  isAvailable?: boolean | null
}

const OfferDisplay: React.FC<React.PropsWithChildren<OfferDisplayProps>> = ({
  originalPrice,
  offerPrice,
  endAt,
  isAvailable,
}) => {
  if (!offerPrice) {
    return null
  }

  return (
    <>
      <Spacer y={2} />
      <Flex>
        <Text
          variant="xs"
          color="blue100"
          backgroundColor="blue10"
          px={0.5}
          borderRadius={3}
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
        <SaleMessage saleMessage={offerPrice} />
        <Spacer x={1} />
        <Text variant="md" color="mono60" style={{ whiteSpace: "nowrap" }}>
          (List price: {originalPrice})
        </Text>
      </Flex>

      <Spacer y={0.5} />

      <ExpiresInTimer expiresAt={endAt} available={isAvailable} />
      <Spacer y={1} />
    </>
  )
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
    artists(shallow: true) {
      internalID
    }
    attributionClass {
      internalID
    }
    internalID
    slug
    saleMessage
    image {
      url(version: "main")
      aspectRatio
      blurhash
    }
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
      dimensions {
        in
        cm
      }
    }
    partner {
      profile {
        icon {
          url(version: "square140")
        }
      }
    }
    collectorSignals {
      partnerOffer {
        endAt
      }
      increasedInterest
      curatorsPick
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
          note
          priceWithDiscount {
            display
          }
        }
      }
    }
  }
`
