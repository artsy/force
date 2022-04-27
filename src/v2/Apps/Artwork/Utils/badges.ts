interface Artwork {
  hasCertificateOfAuthenticity?: boolean | null
  is_biddable?: boolean | null
  is_acquireable?: boolean | null
  is_offerable?: boolean | null
  partner?: {
    isVerifiedSeller?: boolean | null
  } | null
}

export const shouldRenderAuthenticityCertificate = (artwork: Artwork) => {
  return artwork.hasCertificateOfAuthenticity && !artwork.is_biddable
}

export const shouldRenderVerifiedSeller = (artwork: Artwork) => {
  return !artwork.is_biddable && artwork.partner?.isVerifiedSeller
}

export const shouldRenderBuyerGuaranteeAndSecurePayment = artwork => {
  return artwork.is_acquireable || artwork.is_offerable
}
