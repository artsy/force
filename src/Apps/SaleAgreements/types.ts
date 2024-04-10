export type SaleAgreement = {
  content: string | null | undefined
  displayEndAt: string | null | undefined
  displayStartAt: string | null | undefined
  internalID: string
  published: boolean
  sale:
    | {
        internalID: string
        isArtsyLicensed: boolean
        isAuction: boolean | null | undefined
        isBenefit: boolean | null | undefined
        name: string | null | undefined
      }
    | null
    | undefined
  status: "CURRENT" | "PAST" | "ARCHIVED" | "%future added value"
}

export type SaleAgreements = SaleAgreement[]
