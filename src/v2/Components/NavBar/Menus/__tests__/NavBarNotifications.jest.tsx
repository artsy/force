import { useTracking } from "v2/System/Analytics/useTracking"
import { mount } from "enzyme"
import { NavBarNotifications } from "../NavBarNotifications"

jest.mock("v2/System/Analytics/useTracking")

describe("NavBarNotifications", () => {
  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  const getWrapper = (props = NotificationMenuFixture) => {
    // @ts-ignore
    return mount(<NavBarNotifications {...props} />)
  }

  it("renders the correct number of menu items", () => {
    const wrapper = getWrapper()
    expect(wrapper.find("a").length).toEqual(5)
  })

  it("renders the correct data", () => {
    const wrapper = getWrapper()
    const menuItem = wrapper.find("a").first()
    expect(menuItem.find("Image").length).toEqual(1)
    expect(menuItem.html()).toContain("1 work added")
    expect(menuItem.html()).toContain("David Hockney")
    expect(wrapper.find("a").last().html()).toContain("View all")
    expect(wrapper.find("a").last().prop("href")).toContain("/works-for-you")
  })

  it("renders proper zerostate", () => {
    const wrapper = getWrapper({} as any)
    expect(wrapper.html()).toContain("No new works")
  })
})

const NotificationMenuFixture = {
  me: {
    unreadNotificationsCount: 0,
    followsAndSaves: {
      notifications: {
        edges: [
          {
            node: {
              href: "/artist/david-hockney",
              summary: "1 work added",
              artists: "David Hockney",
              published_at: "May 02",
              image: {
                thumb: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=40&height=40&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FkCJVZo7bcqVrjnQ22QHhvg%2Flarge.jpg",
                },
              },
              id:
                "Rm9sbG93ZWRBcnRpc3RzQXJ0d29ya3NHcm91cDo1Y2NiNzU3Y2Y5M2JmNjFmOWYxYjcyMDQ=",
              __typename: "FollowedArtistsArtworksGroup",
            },
            cursor: "YXJyYXljb25uZWN0aW9uOjA=",
          },
          {
            node: {
              href: "/artist/pablo-picasso",
              summary: "1 work added",
              artists: "Pablo Picasso",
              published_at: "May 02",
              image: {
                thumb: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=40&height=27&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2Fi3rCA3IaKE-cLBnc-U5swQ%2Flarge.jpg",
                },
              },
              id:
                "Rm9sbG93ZWRBcnRpc3RzQXJ0d29ya3NHcm91cDo1Y2NiNjRmZWQ3ZjI2YjU5MTJlNWJlODc=",
              __typename: "FollowedArtistsArtworksGroup",
            },
            cursor: "YXJyYXljb25uZWN0aW9uOjE=",
          },
          {
            node: {
              href: "/artist/jasper-johns",
              summary: "7 works added",
              artists: "Jasper Johns",
              published_at: "May 02",
              image: {
                thumb: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=40&height=40&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FjLg7Y6inxaSUpVS9kYHwcg%2Flarge.jpg",
                },
              },
              id:
                "Rm9sbG93ZWRBcnRpc3RzQXJ0d29ya3NHcm91cDo1YjBmMTFkN2IyMDJhMzRkZmY3MjE2MWI=",
              __typename: "FollowedArtistsArtworksGroup",
            },
            cursor: "YXJyYXljb25uZWN0aW9uOjI=",
          },
          {
            node: {
              href: "/artist/damien-hirst",
              summary: "1 work added",
              artists: "Damien Hirst",
              published_at: "May 02",
              image: {
                thumb: {
                  url:
                    "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=39&height=40&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FTLj5ypujA8_sBmcjWw6cRw%2Flarge.jpg",
                },
              },
              id:
                "Rm9sbG93ZWRBcnRpc3RzQXJ0d29ya3NHcm91cDo1Y2NiMjUzNjljZGQ4MDY0YzE3MWQ1Mzk=",
              __typename: "FollowedArtistsArtworksGroup",
            },
            cursor: "YXJyYXljb25uZWN0aW9uOjk=",
          },
        ],
        pageInfo: { endCursor: "YXJyYXljb25uZWN0aW9uOjk=", hasNextPage: true },
      },
    },
    id: "TWU6NTg4MjhiMWU5YzE4ZGIzMGYzMDAyZmJh",
  },
}
