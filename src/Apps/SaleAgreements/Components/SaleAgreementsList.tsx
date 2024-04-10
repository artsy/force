import { FC } from "react"
import { SaleAgreementListItem } from "Apps/SaleAgreements/Components/SaleAgreementsListItem"
import { SaleAgreements } from "Apps/SaleAgreements/types"

interface SaleAgreementsListProps {
  saleAgreements: SaleAgreements
}

export const SaleAgreementsList: FC<SaleAgreementsListProps> = ({
  saleAgreements,
}) => {
  return (
    <>
      {saleAgreements.map(saleAgreement => (
        <SaleAgreementListItem
          key={saleAgreement.internalID}
          saleAgreement={saleAgreement}
        />
      ))}
    </>
  )
}
