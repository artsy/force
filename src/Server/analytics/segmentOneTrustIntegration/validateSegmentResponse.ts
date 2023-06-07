export function validateSegmentResponse(destinations) {
  if (!Array.isArray(destinations)) {
    return false
  }

  for (const destination of destinations) {
    if (!("creationName" in destination)) {
      return false
    }

    if (typeof destination.creationName !== "string") {
      return false
    }
  }

  return true
}
