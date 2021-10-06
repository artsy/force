export const getCardStatus = (
  status: string,
  distanceToOpen: string | null,
  distanceToClose: string | null
): string | null => {
  switch (status) {
    case "closed":
      return "Closed"
    case "live":
      return distanceToClose ? `${distanceToClose} left` : null
    case "scheduled":
      return distanceToOpen ? "Opening soon" : null
    default:
      return null
  }
}
