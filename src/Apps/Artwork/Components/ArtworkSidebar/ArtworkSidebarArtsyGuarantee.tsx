import { Flex, Spacer, Text } from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Router/RouterLink"
import VerifiedIcon from "@artsy/icons/VerifiedIcon"
import LockIcon from "@artsy/icons/LockIcon"
import MoneyBackIcon from "@artsy/icons/MoneyBackIcon"

export const ArtworkSidebarArtsyGuarantee: React.FC = () => {
  const { t } = useTranslation()

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
