export const shouldRenderAuthenticityCertificate = artwork => {
  return artwork.hasCertificateOfAuthenticity && !artwork.isBiddable
}

export const shouldRenderVerifiedSeller = artwork => {
  return !artwork.isBiddable && artwork.partner?.isVerifiedSeller
}

export const shouldRenderGuarantee = artwork => {
  return artwork.isAcquireable || artwork.isOfferable
}
