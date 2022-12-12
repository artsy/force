import {
  Flex,
  GuaranteeIcon,
  IconProps,
  Spacer,
  SecureLockIcon,
  Text,
  VerifiedIcon,
} from "@artsy/palette"
import { useTranslation } from "react-i18next"

export const ArtworkSidebarArtsyGuarantee: React.FC<{}> = () => {
  const { t } = useTranslation()

  const iconProps: IconProps = {
    height: 24,
    width: 24,
    mr: 1,
  }

  return (
    <>
      <Text variant="sm" color="black60">
        <Flex flexDirection="row" alignItems="center">
          <SecureLockIcon {...iconProps} />
          <Text>{t("artworkPage.sidebar.artsyGuarantee.secureCheckout")}</Text>
        </Flex>
        <Spacer y={1} />
        <Flex flexDirection="row" alignItems="center">
          <Flex
            mr={1}
            alignItems="center"
            justifyContent="center"
            height={24}
            width={24}
          >
            <GuaranteeIcon height={18} width={18} />
          </Flex>
          <Text>{t("artworkPage.sidebar.artsyGuarantee.moneyBack")}</Text>
        </Flex>
        <Spacer y={1} />
        <Flex flexDirection="row" alignItems="center">
          <VerifiedIcon {...iconProps} />
          <Text>{t("artworkPage.sidebar.artsyGuarantee.authenticity")}</Text>
        </Flex>
        <Spacer y={1} />
      </Text>
      <a
        href="https://artsy.net/buyer-guarantee"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text variant="xs" color="black60">
          {t("artworkPage.sidebar.artsyGuarantee.learnMore")}
        </Text>
      </a>
    </>
  )
}
