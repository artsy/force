import { GeneShowFragmentContainer } from "Apps/Gene/Routes/GeneShow"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { GeneShow_Test_Query } from "__generated__/GeneShow_Test_Query.graphql"
import { MockBoot } from "DevTools/MockBoot"

jest.unmock("react-relay")
jest.mock("../../Components/GeneArtworkFilter", () => ({
  GeneArtworkFilterRefetchContainer: () => <div />,
}))

const { getWrapper } = setupTestWrapper<GeneShow_Test_Query>({
  Component: props => {
    return (
      <MockBoot>
        {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
        <GeneShowFragmentContainer {...props} />
      </MockBoot>
    )
  },
  query: graphql`
    query GeneShow_Test_Query @relay_test_operation {
      gene(id: "example") {
        ...GeneShow_gene
      }
    }
  `,
})

describe("GeneShow", () => {
  it("renders correctly", () => {
    const { wrapper } = getWrapper({
      Gene: () => ({
        name: "Example Gene",
        displayName: "Display Name",
      }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Display Name")
  })

  it("renders fallback title correctly", () => {
    const { wrapper } = getWrapper({
      Gene: () => ({
        name: "Example Gene",
        displayName: "",
      }),
    })

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(wrapper.find("h1").text()).toEqual("Example Gene")
  })

  it("renders meta description and title from query", () => {
    const { wrapper } = getWrapper({
      Gene: () => ({
        meta: { description: "Gene Meta Description" },
        displayName: "Display Name",
        name: "name",
      }),
    })

    expect(wrapper.find('Meta[name="description"]').first().html()).toEqual(
      '<meta name="description" content="Gene Meta Description">'
    )

    expect(wrapper.find('Meta[name="title"]').first().html()).toEqual(
      '<meta name="title" content="Display Name | Artsy">'
    )
  })

  it("renders fallback meta description and fallback title", () => {
    const { wrapper } = getWrapper({
      Gene: () => ({
        name: "Design",
        meta: { description: null },
        displayName: "",
      }),
    })

    expect(wrapper.find('Meta[name="description"]').first().html()).toEqual(
      '<meta name="description" content="Explore Design art on Artsy. Browse works by size, price, and medium.">'
    )

    expect(wrapper.find('Meta[name="title"]').first().html()).toEqual(
      '<meta name="title" content="Design | Artsy">'
    )
  })
})
