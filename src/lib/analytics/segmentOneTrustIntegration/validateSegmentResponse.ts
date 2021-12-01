export function validateSegmentResponse(destinations) {
  console.log("validateSegmentResponse called")

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
