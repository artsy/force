import React from "react"
import {
  BuyerGuaranteeIndexFragmentContainer,
  BuyerGuaranteeIndex,
} from "../BuyerGuaranteeIndex"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { BuyerGuaranteeIndex_Test_Query } from "v2/__generated__/BuyerGuaranteeIndex_Test_Query.graphql"
import { BuyerGuaranteeIndexNonAdmin_Test_Query } from "v2/__generated__/BuyerGuaranteeIndexNonAdmin_Test_Query.graphql"
import { MockBoot } from "v2/DevTools"

jest.unmock("react-relay")

describe("BuyerGuaranteeIndex when admin", () => {
  const { getWrapper } = setupTestWrapper<BuyerGuaranteeIndex_Test_Query>({
    Component: props => {
      return (
        <MockBoot context={{ user: { roles: ["admin"] } }}>
          <BuyerGuaranteeIndexFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query BuyerGuaranteeIndex_Test_Query {
        headerImage: artwork(id: "any-id1") {
          ...BuyerGuaranteeIndex_headerImage
        }
        authenticityImage: artwork(id: "any-id2") {
          ...BuyerGuaranteeIndex_authenticityImage
        }
        moneyBackGuaranteeImage: artwork(id: "any-id3") {
          ...BuyerGuaranteeIndex_moneyBackGuaranteeImage
        }
        securePaymentImage: artwork(id: "any-id4") {
          ...BuyerGuaranteeIndex_securePaymentImage
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()

    const html = wrapper.html()

    expect(wrapper.find("h1")).toHaveLength(1)
    expect(html).toContain("The Artsy Guarantee")
  })
})

describe("BuyerGuaranteeIndex when non-admin", () => {
  const { getWrapper } = setupTestWrapper<
    BuyerGuaranteeIndexNonAdmin_Test_Query
  >({
    Component: props => {
      return (
        <MockBoot context={{ user: { roles: ["user"] } }}>
          <BuyerGuaranteeIndexFragmentContainer {...props} />
        </MockBoot>
      )
    },
    query: graphql`
      query BuyerGuaranteeIndexNonAdmin_Test_Query {
        headerImage: artwork(id: "any-id1") {
          ...BuyerGuaranteeIndex_headerImage
        }
        authenticityImage: artwork(id: "any-id2") {
          ...BuyerGuaranteeIndex_authenticityImage
        }
        moneyBackGuaranteeImage: artwork(id: "any-id3") {
          ...BuyerGuaranteeIndex_moneyBackGuaranteeImage
        }
        securePaymentImage: artwork(id: "any-id4") {
          ...BuyerGuaranteeIndex_securePaymentImage
        }
      }
    `,
  })

  it("renders correctly", () => {
    const wrapper = getWrapper()
    const comp = wrapper.find(BuyerGuaranteeIndex).html()

    expect(wrapper.find("h1")).toHaveLength(0)
    expect(comp).toBeNull()
  })
})
