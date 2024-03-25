import { Box, StackableBorderBox, Text } from "@artsy/palette"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"

interface SaleAgreementsListItemProps {
  term: {
    internalID: string
    sale:
      | {
          name: string | null | undefined
          startAt: string | null | undefined
        }
      | null
      | undefined
  }
}

export const SaleAgreementsListItem: FC<SaleAgreementsListItemProps> = ({
  term,
}) => {
  return (
    <Box>
      <RouterLink
        to={`/conditions-of-sale/supplemental/${term.internalID}`}
        display="block"
        textDecoration="none"
      >
        <StackableBorderBox>
          <Text variant="sm">{term.sale?.name}</Text>
          <Text variant="sm" color="black60">
            {term.sale?.startAt}
          </Text>
        </StackableBorderBox>
      </RouterLink>
    </Box>
  )
}
