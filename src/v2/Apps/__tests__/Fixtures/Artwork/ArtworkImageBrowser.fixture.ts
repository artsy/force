import { ArtworkImageBrowser_Test_QueryRawResponse } from "v2/__generated__/ArtworkImageBrowser_Test_Query.graphql"
import { ArtworkActionsFixture } from "./ArtworkActions.fixture"

export const ArtworkImageBrowserFixture: ArtworkImageBrowser_Test_QueryRawResponse = {
  artwork: {
    ...ArtworkActionsFixture.artwork,
    href: "/artwork/andy-warhol-lenin-fs-ii-dot-402-1",
    id: "QXJ0d29yazphbmR5LXdhcmhvbC1sZW5pbi1mcy1paS1kb3QtNDAyLTE=",
    image_alt: "Andy Warhol, ‘LENIN FS II.402’, 1987, Gallery Art",
    images: [
      {
        aspectRatio: 0.69,
        internalID: "5ba674c17cc3c01fe843281a",
        deepZoom: {
          Image: {
            Url:
              "https://d32dm0rphc51dk.cloudfront.net/xqsNp6x9eJVhM6pnqL_daQ/dztiles/",
            Format: "jpg",
            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            Overlap: 0,
            Size: { Height: 3826, Width: 2650 },
            TileSize: 512,
          },
        },
        is_default: true,
        is_zoomable: true,
        placeholder: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=20&height=29&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FxqsNp6x9eJVhM6pnqL_daQ%2Fsmall.jpg",
        },
        uri: "hmm",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/xqsNp6x9eJVhM6pnqL_daQ/larger.jpg",
      },
      {
        aspectRatio: 0.71,
        internalID: "5ba67628068a02634b44f101",
        deepZoom: {
          Image: {
            Url:
              "https://d32dm0rphc51dk.cloudfront.net/Hywp9kybFtHZnghRm4diWw/dztiles/",
            Format: "jpg",
            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            Overlap: 0,
            Size: { Height: 4106, Width: 2922 },
            TileSize: 512,
          },
        },
        is_default: false,
        is_zoomable: true,
        placeholder: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=21&height=30&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FHywp9kybFtHZnghRm4diWw%2Fsmall.jpg",
        },
        uri: "hmmmm",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/Hywp9kybFtHZnghRm4diWw/larger.jpg",
      },
      {
        aspectRatio: 1.33,
        internalID: "5ba676248126a07fc1601799",
        deepZoom: {
          Image: {
            Url:
              "https://d32dm0rphc51dk.cloudfront.net/okxS9YRwv5B7mlU9g2Wifw/dztiles/",
            Format: "jpg",
            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            Overlap: 0,
            Size: { Height: 3024, Width: 4032 },
            TileSize: 512,
          },
        },
        is_default: false,
        is_zoomable: true,
        placeholder: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=30&height=22&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FokxS9YRwv5B7mlU9g2Wifw%2Fsmall.jpg",
        },
        uri: "hmmmm",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/okxS9YRwv5B7mlU9g2Wifw/larger.jpg",
      },
      {
        aspectRatio: 1.17,
        internalID: "5ba67624d7e8867fc2aa12d2",
        deepZoom: {
          Image: {
            Url:
              "https://d32dm0rphc51dk.cloudfront.net/556ER3g_ki0pyOEZO0k0ag/dztiles/",
            Format: "jpg",
            xmlns: "http://schemas.microsoft.com/deepzoom/2008",
            Overlap: 0,
            Size: { Height: 2432, Width: 2854 },
            TileSize: 512,
          },
        },
        is_default: false,
        is_zoomable: true,
        placeholder: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=30&height=25&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2F556ER3g_ki0pyOEZO0k0ag%2Fsmall.jpg",
        },
        uri: "oof",
        url:
          "https://d32dm0rphc51dk.cloudfront.net/556ER3g_ki0pyOEZO0k0ag/larger.jpg",
      },
    ],
    is_saved: false,
    slug: "andy-warhol-lenin-fs-ii-dot-402-1",
    title: "LENIN FS II.402",
  },
}
