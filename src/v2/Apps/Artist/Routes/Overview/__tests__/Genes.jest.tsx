import { Genes_Test_QueryRawResponse } from "v2/__generated__/Genes_Test_Query.graphql"
import { GenesFixture } from "v2/Apps/__tests__/Fixtures/Artist/Routes/Overview/Genes"
import { renderRelayTree } from "v2/DevTools"
import { ReactWrapper } from "enzyme"
import { graphql } from "react-relay"
import { Breakpoint } from "v2/Utils/Responsive"
import { GenesFragmentContainer as Genes } from "../Components/Genes"

jest.unmock("react-relay")

describe("Genes", () => {
  let wrapper: ReactWrapper

  const getWrapper = async (breakpoint: Breakpoint = "xl") => {
    return await renderRelayTree({
      Component: Genes,
      query: graphql`
        query Genes_Test_Query @raw_response_type {
          artist(id: "pablo-picasso") {
            ...Genes_artist
          }
        }
      `,
      mockData: {
        artist: GenesFixture,
      } as Genes_Test_QueryRawResponse,
    })
  }

  it("renders the related genes", async () => {
    wrapper = await getWrapper()
    const html = wrapper.html()
    expect(html).toContain("Catty Art")
    expect(html).toContain("/gene/catty-art")
  })
})
