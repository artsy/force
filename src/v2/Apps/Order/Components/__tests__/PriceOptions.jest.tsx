import { PriceOptionsFragmentContainer } from "../PriceOptions"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { BorderedRadio } from "@artsy/palette"

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    Modal: ({ children }) => children,
  }
})

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL({
  Component: PriceOptionsFragmentContainer,
  query: graphql`
    query PriceOptions_Test_Query {
      artwork(id: "xxx") {
        ...PriceOptions_order
      }
    }
  `,
})

describe("PriceOptions", () => {
  it("has all radio options", () => {
    const radio = findAllBy(BorderedRadio)
    expect(radio).toHaveLength(4)
  })
})
