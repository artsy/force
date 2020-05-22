import { CurrentEvent_Test_QueryRawResponse } from "v2/__generated__/CurrentEvent_Test_Query.graphql"

export const CurrentEventFixture: CurrentEvent_Test_QueryRawResponse["artist"] = {
  id: "opaque-event-id",
  currentEvent: {
    name: "Catty Art Sale",
    status: "Currently at auction",
    href: "/auction/catty-art-sale",
    details: "Live bidding begins soon",
    event: {
      __typename: "Sale",
      id: "opaque-sale-id",
    },
    image: null,
    partner: null,
  },
}
