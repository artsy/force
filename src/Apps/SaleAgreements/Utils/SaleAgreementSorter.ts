import { SaleAgreements } from "Apps/SaleAgreements/types"

export const saleAgreementSorter = (saleAgreements: SaleAgreements) => {
  const activeAuctions: SaleAgreements = []
  const pastBenefitsAuctions: SaleAgreements = []
  const pastArtsyAuctions: SaleAgreements = []
  const pastCommercialAuctions: SaleAgreements = []

  for (const saleAgreement of saleAgreements) {
    const {
      sale: isBenefit,
      sale: isArtsyLicensed,
      sale: isAuction,
      status,
    } = saleAgreement

    if (status === "CURRENT") {
      activeAuctions.push(saleAgreement)
    } else if (status === "PAST" && isBenefit) {
      pastBenefitsAuctions.push(saleAgreement)
    } else if (status === "PAST" && isArtsyLicensed) {
      pastArtsyAuctions.push(saleAgreement)
    } else if (status === "PAST" && isAuction) {
      pastCommercialAuctions.push(saleAgreement)
    }
  }

  return {
    activeAuctions,
    pastBenefitsAuctions,
    pastArtsyAuctions,
    pastCommercialAuctions,
  }
}
