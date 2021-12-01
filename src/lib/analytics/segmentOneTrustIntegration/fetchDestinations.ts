import { fetchDestinationForWriteKey } from "./fetchDestinationForWriteKey"

export async function fetchDestinations(writeKey) {
  console.log("fetchDestinations called")

  let destinations = await fetchDestinationForWriteKey(writeKey)

  destinations = [
    ...destinations
      .reduce((map, item) => {
        if (item.id === "Repeater") return map // remove Segment Repeater destinations
        map.has(item["id"]) || map.set(item["id"], item)
        return map
      }, new Map()) // return object
      .values(),
  ]

  return destinations
}
