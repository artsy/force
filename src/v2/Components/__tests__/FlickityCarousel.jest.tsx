import { MockBoot } from "v2/DevTools/MockBoot"
import { mount } from "enzyme"
import React from "react"
import { Carousel, LargeCarousel, SmallCarousel } from "../FlickityCarousel"

describe("Carousel", () => {
  beforeAll(() => {
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const small = mount(
      <MockBoot breakpoint="xs">
        <Carousel
          data={[{ name: "foo" }]}
          render={() => {
            return <div />
          }}
        />
      </MockBoot>
    )
    expect(small.find(SmallCarousel).length).toEqual(1)

    const large = mount(
      <MockBoot breakpoint="lg">
        <Carousel
          data={[{ name: "foo" }]}
          render={() => {
            return <div />
          }}
        />
      </MockBoot>
    )
    expect(large.find(LargeCarousel).length).toEqual(1)
  })

  it("renders any kind of react element and iterates over data", async () => {
    const Foo = ({ name }) => <div>hello {name} how are you</div>

    const wrapper = await mount(
      <MockBoot>
        <Carousel
          data={[{ name: "name1" }, { name: "name2" }]}
          render={props => {
            return <Foo {...props} />
          }}
        />
      </MockBoot>
    ).renderUntil(n => {
      return n.html().search("is-selected") > 0
    })

    expect(wrapper.find(Foo).length).toEqual(2)
    expect(wrapper.find(Foo).first().html()).toContain(
      "hello name1 how are you"
    )
  })
})
