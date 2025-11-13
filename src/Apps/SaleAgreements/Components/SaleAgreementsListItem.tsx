import type { SaleAgreementsListProps } from "Apps/SaleAgreements/Components/SaleAgreementsList"
import { RouterLink } from "System/Components/RouterLink"
import { Box, Separator, Text } from "@artsy/palette"
import type { FC } from "react"

export interface SaleAgreementListItemProps {
  saleAgreement: SaleAgreementsListProps["saleAgreements"][0]
}

export const SaleAgreementListItem: FC<
  React.PropsWithChildren<SaleAgreementListItemProps>
> = ({ saleAgreement }) => {
  if (!saleAgreement) return null

  return (
    <Box>
      <RouterLink
        to={`/supplemental-cos/${saleAgreement.internalID}`}
        display="block"
        textDecoration="none"
      >
        <Text variant="sm">{saleAgreement.sale?.name}</Text>
        <Text variant="sm" color="mono60">
          {saleAgreement.displayStartAt} - {saleAgreement.displayEndAt}
        </Text>
        <Separator my={4} />
      </RouterLink>
    </Box>
  )
}
