import { CurrentEvent_Test_QueryRawResponse } from "v2/__generated__/CurrentEvent_Test_Query.graphql"

export const CurrentEventFixture: CurrentEvent_Test_QueryRawResponse["artist"] = {
  currentEvent: {
    details: "Live bidding begins soon",
    event: {
      __typename: "Sale",
      id: "opaque-sale-id",
    },
    href: "/auction/catty-art-sale",
    image: null,
    name: "Catty Art Sale",
    partner: null,
    status: "Currently at auction",
  },
  id: "opaque-event-id",
}
