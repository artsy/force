import Articles from "desktop/collections/articles"
import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "desktop/apps/auction/components/layout/Footer"

const { Footer } = test

describe.skip("auction/components/layout/Footer.test", () => {
  describe("<Footer />", () => {
    let article

    beforeEach(() => {
      article = {
        slug: "artsy-editorial-fight-art",
        thumbnail_title: "The Fight to Own Art",
        thumbnail_image: {
          url:
            "https://artsy-media-uploads.s3.amazonaws.com/e6rsZcv5h7zCL7gU_4cjXw%2Frose.jpg",
        },
        tier: 1,
        published_at: "2017-01-26T00:26:57.928Z",
        channel_id: "5759e3efb5989e6f98f77993",
        author: {
          id: "54cfdab872616972546e0400",
          name: "Artsy Editorial",
        },
        contributing_authors: [
          {
            id: "abc124",
            name: "Abigail C",
          },
          {
            id: "def456",
            name: "Anna S",
          },
        ],
      }
    })

    it("no articles", () => {
      const { wrapper } = renderTestComponent({
        Component: Footer,
        data: {
          app: {
            articles: [],
          },
        },
        props: { sd: {} },
      })

      wrapper.find(".auction-Footer").length.should.eql(0)
    })

    describe("articles, not auction promo", () => {
      it("(clientside) shows the articles and the extra footer item", () => {
        const { wrapper } = renderTestComponent({
          Component: Footer,
          data: {
            app: {
              articles: [article],
            },
          },
          props: {
            articles: new Articles([article]),
            showArticles: true,
            sd: {
              sd: {
                ARTSY_EDITORIAL_CHANNEL: "foo",
              },
            },
          },
        })

        wrapper.html().should.containEql("The Fight to Own Art")
        wrapper.html().should.containEql("Artsy Editorial")
        wrapper.html().should.containEql("By Abigail C and Anna S")
        wrapper
          .find(".auction-Footer__auction-app-promo-wrapper")
          .length.should.equal(1)
        wrapper.html().should.containEql("Bid from your phone")
      })

      it("(serverside) shows the articles and the extra footer item", () => {
        const { wrapper } = renderTestComponent({
          Component: Footer,
          data: {
            app: {
              articles: [article],
            },
          },
          props: {
            articles: new Articles([article]),
            showArticles: true,
            sd: {
              sd: {
                ARTSY_EDITORIAL_CHANNEL: "foo",
              },
            },
          },
        })

        wrapper.html().should.containEql("The Fight to Own Art")
        wrapper.html().should.containEql("Artsy Editorial")
        wrapper.html().should.containEql("By Abigail C and Anna S")
        wrapper
          .find(".auction-Footer__auction-app-promo-wrapper")
          .length.should.equal(1)
        wrapper.html().should.containEql("Bid from your phone")
      })
    })
  })
})
