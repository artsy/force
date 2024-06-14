import { Flex, Spacer, Text } from "@artsy/palette"
import { ArtworkSidebarArtsyGuarantee_artwork$key } from "__generated__/ArtworkSidebarArtsyGuarantee_artwork.graphql"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Components/RouterLink"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import LockIcon from "@artsy/icons/LockIcon"
import MoneyBackIcon from "@artsy/icons/MoneyBackIcon"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"
import { ActionType, ClickedOnLearnMore } from "@artsy/cohesion"

interface ArtworkSidebarArtsyGuaranteeProps {
  artwork: ArtworkSidebarArtsyGuarantee_artwork$key
}

export const ArtworkSidebarArtsyGuarantee: React.FC<ArtworkSidebarArtsyGuaranteeProps> = ({
  artwork,
}) => {
  const data = useFragment(
    graphql`
      fragment ArtworkSidebarArtsyGuarantee_artwork on Artwork {
        isUnlisted
      }
    `,
    artwork
  )
  const { t } = useTranslation()
  const { trackEvent } = useTracking()

  if (data.isUnlisted) {
    return (
      <>
        <Text variant="xs" color="black60">
          {t`artworkPage.sidebar.artsyGuarantee.expandableLabel`}{" "}
          <RouterLink
            inline
            to="/buyer-guarantee"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const payload: ClickedOnLearnMore = {
                action: ActionType.clickedOnLearnMore,
                context_module: "Sidebar",
                subject: "Learn more",
                type: "Link",
                flow: "Artsy Guarantee",
              }

              trackEvent(payload)
            }}
          >
            <Text variant="xs">
              {t("artworkPage.sidebar.artsyGuarantee.learnMore")}
            </Text>
          </RouterLink>
        </Text>
      </>
    )
  }

  return (
    <>
      <Text variant="sm" color="black60">
        <Flex flexDirection="row" alignItems="center">
          <LockIcon mr={1} height={24} width={24} />

          <Text>{t("artworkPage.sidebar.artsyGuarantee.secureCheckout")}</Text>
        </Flex>

        <Spacer y={1} />

        <Flex flexDirection="row" alignItems="center">
          <MoneyBackIcon mr={1} height={24} width={24} />

          <Text>{t("artworkPage.sidebar.artsyGuarantee.moneyBack")}</Text>
        </Flex>

        <Spacer y={1} />

        <Flex flexDirection="row" alignItems="center">
          <VerifiedIcon mr={1} height={24} width={24} />

          <Text>{t("artworkPage.sidebar.artsyGuarantee.authenticity")}</Text>
        </Flex>
      </Text>

      <Spacer y={1} />

      <RouterLink
        inline
        to="/buyer-guarantee"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text variant="xs">
          {t("artworkPage.sidebar.artsyGuarantee.learnMore")}
        </Text>
      </RouterLink>
    </>
  )
}
