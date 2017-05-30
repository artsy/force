export function getRedirectActionUrl (bidderStatus, artwork, auction) {
  if (bidderStatus === 'logged-out' || bidderStatus === 'qualified-to-bid') {
    return `/auction/${auction.id}/bid/${artwork.id}`
  } else {
    return `/artwork/${artwork.id}`
  }
}
