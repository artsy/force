import { SystemContextProvider } from "v2/Artsy"
import { mount } from "enzyme"
import React from "react"
import { QueryRenderer as _QueryRenderer } from "react-relay"
import { NotificationsBadge } from "../NotificationsBadge"

jest.mock("react-relay", () => {
  return {
    QueryRenderer: jest.fn(),
    createRefetchContainer: jest.fn(),
  }
})

jest.mock("Artsy/Analytics/useTracking", () => ({
  useTracking: () => ({
    trackEvent: x => x,
  }),
}))

describe("NotificationsBadge", () => {
  const QueryRenderer: any = _QueryRenderer

  it("returns null when theres an error", () => {
    QueryRenderer.mockImplementation(props => {
      return props.render({
        error: true,
      })
    })

    const wrapper = mount(<NotificationsBadge />)
    expect(wrapper.html()).toEqual(null)
  })

  it("returns a cookie-cached circular count when fetching", () => {
    QueryRenderer.mockImplementation(props => {
      return props.render({
        foo: true,
      })
    })

    const wrapper = mount(
      <SystemContextProvider notificationCount={45}>
        <NotificationsBadge />
      </SystemContextProvider>
    )

    const count = wrapper.find("CircularCount")
    expect(count.length).toEqual(1)
    expect(count.find("Sans").text()).toEqual("45")
  })

  it("returns the fetched notification count", () => {
    QueryRenderer.mockImplementation(props => {
      return props.render({
        props: {
          me: {
            unreadNotificationsCount: 55,
            followsAndSaves: {
              notifications: {
                edges: new Array(55).map(x => x),
              },
            },
          },
        },
      })
    })

    const wrapper = mount(
      <SystemContextProvider>
        <NotificationsBadge />
      </SystemContextProvider>
    )

    const count = wrapper.find("CircularCount")
    expect(count.length).toEqual(1)
    expect(count.find("Sans").text()).toEqual("55")
  })

  it("sets notification counts greater than 100 to '99+'", () => {
    QueryRenderer.mockImplementation(props => {
      return props.render({
        props: {
          me: {
            unreadNotificationsCount: 200,
            followsAndSaves: {
              notifications: {
                edges: new Array(200).map(x => x),
              },
            },
          },
        },
      })
    })

    const wrapper = mount(
      <SystemContextProvider>
        <NotificationsBadge />
      </SystemContextProvider>
    )

    const count = wrapper.find("CircularCount")
    expect(count.length).toEqual(1)
    expect(count.find("Sans").text()).toEqual("99+")
  })
})
