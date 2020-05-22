import { CurrentEvent_Test_QueryRawResponse } from "v2/__generated__/CurrentEvent_Test_Query.graphql"
import { CurrentEventFixture } from "v2/Apps/__tests__/Fixtures/Artist/Routes/Overview/CurrentEvent"
import { CurrentEventFragmentContainer as CurrentEvent } from "v2/Apps/Artist/Routes/Overview/Components/CurrentEvent"
import { renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "v2/Utils/Responsive"

jest.unmock("react-relay")

describe("CurrentEvent", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: CurrentEvent,
      query: graphql`
        query CurrentEvent_Test_Query @raw_response_type {
          artist(id: "pablo-picasso") {
            ...CurrentEvent_artist
          }
        }
      `,
      mockData: {
        artist: CurrentEventFixture,
      } as CurrentEvent_Test_QueryRawResponse,
    })
  }

  it("renders the current event information", async () => {
    wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Currently at auction")
    expect(html).toContain("Live bidding begins soon")
    expect(html).toContain("/auction/catty-art-sale")
  })
})
