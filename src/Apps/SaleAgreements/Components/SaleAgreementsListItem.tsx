import { Box, Separator, Text } from "@artsy/palette"
import { SaleAgreement } from "Apps/SaleAgreements/types"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"

export interface SaleAgreementListItemProps {
  saleAgreement: SaleAgreement
}

export const SaleAgreementListItem: FC<SaleAgreementListItemProps> = ({
  saleAgreement,
}) => {
  return (
    <Box>
      <RouterLink
        to={`/supplemental-cos/${saleAgreement.internalID}`}
        display="block"
        textDecoration="none"
      >
        <Text variant="sm">{saleAgreement.sale?.name}</Text>
        <Text variant="sm" color="black60">
          {saleAgreement.displayStartAt} - {saleAgreement.displayEndAt}
        </Text>
        <Separator my={4} />
      </RouterLink>
    </Box>
  )
}
