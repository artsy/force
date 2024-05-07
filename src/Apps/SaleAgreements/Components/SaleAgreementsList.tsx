import { FC } from "react"
import { SaleAgreementListItem } from "Apps/SaleAgreements/Components/SaleAgreementsListItem"
import { SaleAgreementsFilter_viewer$data } from "__generated__/SaleAgreementsFilter_viewer.graphql"
import { sortBy } from "lodash"

export interface SaleAgreementsListProps {
  saleAgreements: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          SaleAgreementsFilter_viewer$data
        >["saleAgreementsConnection"]
      >["edges"]
    >[0]
  >["node"][]
}

export const SaleAgreementsList: FC<SaleAgreementsListProps> = ({
  saleAgreements,
}) => {
  const sortedSaleAgreements = sortBy(saleAgreements, ["sale.name"])

  return (
    <>
      {sortedSaleAgreements.map(saleAgreement => {
        if (!saleAgreement) return null
        return (
          <SaleAgreementListItem
            key={saleAgreement.internalID}
            saleAgreement={saleAgreement}
          />
        )
      })}
    </>
  )
}
