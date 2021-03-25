import React from "react"
import { graphql } from "relay-runtime"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MyBidsBidHeaderFragmentContainer } from "../MyBidsBidHeader"

jest.unmock("react-relay")

describe("MyBidsBidHeaderFragmentContainer", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <MyBidsBidHeaderFragmentContainer sale={props.sale} />
    },
    query: graphql`
      query MyBidsBidHeader_Test_Query {
        sale(id: "foo") {
          ...MyBidsBidHeader_sale
        }
      }
    `,
  })

  it("renders correct components and data", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        coverImage: {
          resized: {
            src: "coverImageResizedSrc",
            srcSet: "coverImageResizedSrcSet",
          },
        },
        formattedStartDateTime: "formattedStartDateTime",
        name: "saleName",
        partner: {
          name: "partnerName",
        },
        slug: "saleSlug",
      }),
    })

    expect(wrapper.find("RouterLink")).toBeDefined()
    expect(wrapper.find("RouterLink").props().to).toBe("/auction/saleSlug")
    expect(wrapper.find("CalendarIcon")).toBeDefined()
    expect(wrapper.find("Image")).toBeDefined()
    expect(wrapper.find("Image").props().src).toEqual("coverImageResizedSrc")
    expect(wrapper.find("Image").props().srcSet).toEqual(
      "coverImageResizedSrcSet"
    )

    const text = wrapper.text()
    expect(text).toContain("partnerName")
    expect(text).toContain("saleName")
    expect(text).toContain("formattedStartDateTime")
  })
})
