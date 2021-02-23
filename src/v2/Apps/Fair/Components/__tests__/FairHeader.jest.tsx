import { FairHeaderFragmentContainer } from "../FairHeader"
import { graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairHeaderFragmentContainer,
  query: graphql`
    query FairHeader_Test_Query {
      fair(id: "example") {
        ...FairHeader_fair
      }
    }
  `,
})

describe("FairHeader", () => {
  it("displays basic information about the fair", () => {
    const wrapper = getWrapper({
      Fair: () => ({ name: "Miart 2020", summary: "This is the summary." }),
    })

    expect(wrapper.text()).toContain("Miart 2020")
    expect(wrapper.text()).toContain("This is the summary.")
  })

  it("displays the about content if there is no summary", () => {
    const wrapper = getWrapper({
      Fair: () => ({ about: "This is the about.", summary: "" }),
    })

    expect(wrapper.text()).toContain("This is the about.")
  })

  it("displays a link to see more info about the fair", () => {
    const wrapper = getWrapper({
      Fair: () => ({ name: "Miart 2020", slug: "miart-2020" }),
    })

    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")

    expect(MoreInfoButton.length).toEqual(1)
    expect(MoreInfoButton.first().prop("to")).toEqual("/fair/miart-2020/info")
  })

  it("doesn't display the More info link if there is no info", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        about: "",
        tagline: "",
        location: null,
        ticketsLink: "",
        hours: "",
        links: "",
        tickets: "",
        contact: "",
        summary: "",
      }),
    })

    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")

    expect(MoreInfoButton.length).toEqual(0)
  })

  it("displays the More info link as long as there is some information", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        about: "",
        tagline: "I have a tagline",
        location: null,
        ticketsLink: "",
        hours: "",
        links: "",
        tickets: "",
        contact: "",
        summary: "",
      }),
    })

    const MoreInfoButton = wrapper
      .find(RouterLink)
      .filterWhere(t => t.text() === "More info")

    expect(MoreInfoButton.length).toEqual(1)
  })

  it("displays the relevant timing info", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        startAt: "2020-08-19T08:00:00+00:00",
        endAt: "2020-09-19T08:00:00+00:00",
      }),
    })

    expect(wrapper.text()).toContain("Closed")
  })
})
