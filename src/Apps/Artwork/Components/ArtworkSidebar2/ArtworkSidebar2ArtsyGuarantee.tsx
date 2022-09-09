import {
  CertificateIcon,
  Flex,
  IconProps,
  LockIcon,
  Spacer,
  Text,
  VerifiedIcon,
} from "@artsy/palette"
import { useTranslation } from "react-i18next"
import { RouterLink } from "System/Router/RouterLink"

export const ArtworkSidebar2ArtsyGuarantee: React.FC<{}> = () => {
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
          <LockIcon {...iconProps} />
          <Text>{t("artworkPage.sidebar.artsyGuarantee.securePayment")}</Text>
        </Flex>
        <Spacer mt={1} />
        <Flex flexDirection="row" alignItems="center">
          <VerifiedIcon {...iconProps} />
          <Text>{t("artworkPage.sidebar.artsyGuarantee.moneyBack")}</Text>
        </Flex>
        <Spacer mt={1} />
        <Flex flexDirection="row" alignItems="center">
          <CertificateIcon {...iconProps} />
          <Text>{t("artworkPage.sidebar.artsyGuarantee.authenticity")}</Text>
        </Flex>
        <Spacer mt={1} />
      </Text>
      <RouterLink
        to={"/buyer-guarantee"}
        textDecoration="underline"
        display="block"
      >
        <Text variant="xs" color="black60">
          {t("artworkPage.sidebar.artsyGuarantee.learnMore")}
        </Text>
      </RouterLink>
    </>
  )
}
