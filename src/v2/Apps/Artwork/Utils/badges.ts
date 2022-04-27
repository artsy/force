export const shouldRenderAuthenticityCertificate = artwork => {
  return artwork.hasCertificateOfAuthenticity && !artwork.is_biddable
}

export const shouldRenderVerifiedSeller = artwork => {
  return !artwork.is_biddable && artwork.partner?.isVerifiedSeller
}

export const shouldRenderGuarantee = artwork => {
  return artwork.is_acquireable || artwork.is_offerable
}
