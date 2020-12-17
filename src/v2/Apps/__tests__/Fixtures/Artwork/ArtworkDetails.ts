import { ArtworkDetails_Test_QueryRawResponse } from "v2/__generated__/ArtworkDetails_Test_Query.graphql"

export const ArtworkDetailsFixture: ArtworkDetails_Test_QueryRawResponse["artwork"] = {
  additional_information: "<p>Here is some addition info for this work</p>\n",
  canRequestLotConditionsReport: false,
  category: "Painting",
  certificateOfAuthenticity: {
    details: "Not included",
    label: "Certificate of authenticity",
  },
  conditionDescription: {
    details:
      "Slight discoloration from sun exposure, light abrasion in lower left.",
    label: "Condition details",
  },
  description: "Artist designed towel for WOW. --*Courtesy of EHC Fine Art*",
  framed: { details: "", label: "Framed" },
  id: "richard-prince-untitled-fashion",
  articles: [
    {
      author: { id: "asdfsdf", name: "Artsy Editorial" },
      href: "/article/artsy-editorial-the-most-iconic-artists-of-the-1980s",
      id: "sfds",
      published_at: "Aug 17th, 2015",
      slug: "article1",
      thumbnail_image: {
        resized: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FDOdbp-Vj_cXRKQhnZFhq0g%252Flarger-5.jpg",
        },
      },
      thumbnail_title: "The Most Iconic Artists of the 1980s",
    },
  ],
  image_rights: "Courtesy of Chiswick Auctions",
  exhibition_history: "And the work was so excibited!",
  internalID: "4e259f0a3453450001006a56",
  literature: "Some literature info goes here",
  manufacturer: "Mfg Group",
  partner: {
    id: "salon-94",
    internalID: "4e259f0a9441930001006a25",
    href: "/salon-94",
    slug: "salon-94",
    is_default_profile_public: true,
    name: "Salon 94",
    type: "Gallery",
    initials: "S9",
    locations: [
      { city: "New York", id: "asdf1" },
      { city: "Kharkov", id: "asdf2" },
      { city: "New York", id: "asdf3" },
      { city: "Paris", id: "asdf4" },
      { city: "Berlin", id: "asdf5" },
      { city: "", id: "asdf6" },
    ],
    profile: {
      id: "$54321",
      internalID: "54321",
      name: "Salon 94",
      is_followed: false,
      slug: "salon-94",
      icon: { url: "https://profile_url" },
    },
  },
  provenance: "Peter Freeman Inc., New York",
  publisher: "Factory Editions, New York",
  signatureInfo: {
    label: "Signed",
    details: "Hand-signed by the artist, stamped by artist’s estate.",
  },
  sale: null,
  series: "Lorem Ipsum Dolor",
}
