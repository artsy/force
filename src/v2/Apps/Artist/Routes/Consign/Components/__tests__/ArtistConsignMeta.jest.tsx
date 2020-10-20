import { MockBoot } from "v2/DevTools"
import { mount } from "enzyme"
import React from "react"
import { ArtistConsignMeta } from "../ArtistConsignMeta"

jest.mock("v2/Utils/getENV", () => ({
  getENV: () => "https://artsy.net",
}))

describe("ArtistConsignMeta", () => {
  const props = {
    artist: {
      name: "Alex Katz",
      href: "/artist/alex-katz",
      targetSupply: {
        microfunnel: {
          artworks: [
            {
              artwork: {
                image: {
                  imageURL: "path/to/image.jpg",
                },
              },
            },
          ],
        },
      },
    },
  }
  const getWrapper = (passedProps = {}) => {
    return mount(
      <MockBoot>
        <ArtistConsignMeta {...(props as any)} {...passedProps} />
      </MockBoot>
    )
  }

  it("outputs correct title tags", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("Title").debug()).toContain(props.artist.name) // use `debug` to assert on component tree, vs html tree
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:title")
        .debug()
    ).toContain(props.artist.name)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:title")
        .debug()
    ).toContain(props.artist.name)
  })

  it("outputs correct description tags", () => {
    const wrapper = getWrapper()
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().name === "description")
        .debug()
    ).toContain(props.artist.name)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "twitter:description")
        .debug()
    ).toContain(props.artist.name)
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:description")
        .debug()
    ).toContain(props.artist.name)
  })

  it("outputs correct URL tags", () => {
    const consignHref = `https://artsy.net${props.artist.href}/consign`
    const wrapper = getWrapper()
    expect(
      wrapper
        .find("Meta")
        .findWhere(c => c.props().property === "og:url")
        .debug()
    ).toContain(consignHref)
  })

  describe("image tags", () => {
    it("doesn't blow up if no images", () => {
      const wrapper = getWrapper({
        artist: {
          targetSupply: {
            microfunnel: {
              artworks: null,
            },
          },
        },
      })
      expect(
        wrapper.find("Meta").findWhere(c => c.props().name === "thumbnail")
          .length
      ).toEqual(0)
    })

    it("does not output image tag if image not available", () => {
      const wrapper = getWrapper({
        artist: {
          targetSupply: {
            microfunnel: {
              artworks: [
                {
                  artwork: {
                    image: {
                      imageURL: null,
                    },
                  },
                },
              ],
            },
          },
        },
      })
      expect(
        wrapper.find("Meta").findWhere(c => c.props().name === "thumbnail")
          .length
      ).toEqual(0)
    })

    it("outputs correct image tags if available", () => {
      const wrapper = getWrapper()
      expect(
        wrapper
          .find("Meta")
          .findWhere(c => c.props().name === "thumbnail")
          .debug()
      ).toContain("path/to/image.jpg")
    })
  })
})
