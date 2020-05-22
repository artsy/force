import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Artwork from "../Artwork"

describe("Artwork", () => {
  it("renders correctly", () => {
    const artworkProps = {
      id: "mikael-olson-some-kind-of-dinosaur",
      title: "Some Kind of Dinosaur",
      date: "2015",
      sale_message: "$875",
      is_in_auction: false,
      image: {
        placeholder: 200,
        url: "artsy.net/image-url",
        aspect_ratio: 0.74,
      },
      artists: [
        {
          id: "mikael-olson",
          name: "Mikael Olson",
        },
      ],
      partner: {
        name: "Gallery 1261",
      },
      href: "/artwork/mikael-olson-some-kind-of-dinosaur",
    }

    const artwork = renderer
      .create(<Artwork artwork={artworkProps as any} />)
      .toJSON()
    expect(artwork).toMatchSnapshot()
  })
})
