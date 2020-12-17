import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import Artwork from "../Artwork"

describe("Artwork", () => {
  it("renders correctly", () => {
    const artworkProps = {
      artists: [
        {
          id: "mikael-olson",
          name: "Mikael Olson",
        },
      ],
      date: "2015",
      href: "/artwork/mikael-olson-some-kind-of-dinosaur",
      id: "mikael-olson-some-kind-of-dinosaur",
      image: {
        aspect_ratio: 0.74,
        placeholder: 200,
        url: "artsy.net/image-url",
      },
      is_in_auction: false,
      partner: {
        name: "Gallery 1261",
      },
      sale_message: "$875",
      title: "Some Kind of Dinosaur",
    }

    const artwork = renderer
      .create(<Artwork artwork={artworkProps as any} />)
      .toJSON()
    expect(artwork).toMatchSnapshot()
  })
})
