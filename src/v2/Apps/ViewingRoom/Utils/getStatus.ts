export const getStatus = ({
  status,
  distanceToOpen,
  distanceToClose,
}: {
  status: string
  distanceToOpen: string | null
  distanceToClose: string | null
}): string | null => {
  switch (status) {
    case "closed":
      return "Closed"
    case "live":
      return distanceToClose ? `${distanceToClose} left` : null
    case "scheduled":
      return distanceToOpen ? `Opens in ${distanceToOpen}` : null
    default:
      return null
  }
}
