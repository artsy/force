import { validateSegmentResponse } from "./validateSegmentResponse"

export async function fetchDestinationForWriteKey(writeKey) {
  console.log("fetchDestinationForWriteKey called")

  try {
    const res = await window.fetch(
      `https://cdn.segment.com/v1/projects/${writeKey}/integrations`
    )

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`)
    }

    const destinations = await res.json()

    if (!validateSegmentResponse(destinations)) {
      throw new Error("Segment integrations API endpoint returned invalid data")
    }

    // Rename creationName to id to abstract the weird data model
    for (const destination of destinations) {
      destination.id = destination.creationName
      delete destination.creationName
    }

    return destinations
  } catch (error) {
    console.error("Error: fetching Segment destinations resulted in: ", error)
    return []
  }
}
