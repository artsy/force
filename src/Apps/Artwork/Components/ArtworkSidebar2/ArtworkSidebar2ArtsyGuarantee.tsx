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
import { RouterLink } from "System/Router/RouterLink"
import { themeGet } from "@styled-system/theme-get"
import styled from "styled-components"

const GuaranteeIconBlue = styled(GuaranteeIcon)`
  .guarantee-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`
const SecureLockIconBlue = styled(SecureLockIcon)`
  .securelock-opening {
    fill: ${themeGet("colors.brand")};
  }
`
const VerifiedIconBlue = styled(VerifiedIcon)`
  .verified-checkmark {
    fill: ${themeGet("colors.brand")};
  }
`

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
          <SecureLockIconBlue {...iconProps} />
          <Text>{t("artworkPage.sidebar.artsyGuarantee.securePayment")}</Text>
        </Flex>
        <Spacer mt={1} />
        <Flex flexDirection="row" alignItems="center">
          <Flex
            mr={1}
            alignItems="center"
            justifyContent="center"
            height={24}
            width={24}
          >
            <GuaranteeIconBlue height={18} width={18} />
          </Flex>
          <Text>{t("artworkPage.sidebar.artsyGuarantee.moneyBack")}</Text>
        </Flex>
        <Spacer mt={1} />
        <Flex flexDirection="row" alignItems="center">
          <VerifiedIconBlue {...iconProps} />
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
