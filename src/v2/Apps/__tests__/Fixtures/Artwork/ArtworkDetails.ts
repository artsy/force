import { ArtworkDetails_Test_QueryRawResponse } from "v2/__generated__/ArtworkDetails_Test_Query.graphql"

export const ArtworkDetailsFixture: ArtworkDetails_Test_QueryRawResponse["artwork"] = {
  id: "richard-prince-untitled-fashion",
  description: "Artist designed towel for WOW. --*Courtesy of EHC Fine Art*",
  additional_information: "<p>Here is some addition info for this work</p>\n",
  canRequestLotConditionsReport: false,
  internalID: "4e259f0a3453450001006a56",
  partner: {
    id: "salon-94",
    internalID: "4e259f0a9441930001006a25",
    slug: "salon-94",
    href: "/salon-94",
    is_default_profile_public: true,
    type: "Gallery",
    name: "Salon 94",
    initials: "S9",
    locations: [
      { id: "asdf1", city: "New York" },
      { id: "asdf2", city: "Kharkov" },
      { id: "asdf3", city: "New York" },
      { id: "asdf4", city: "Paris" },
      { id: "asdf5", city: "Berlin" },
      { id: "asdf6", city: "" },
    ],
    profile: {
      id: "$54321",
      name: "Salon 94",
      internalID: "54321",
      slug: "salon-94",
      is_followed: false,
      icon: { url: "https://profile_url" },
    },
  },
  framed: { label: "Framed", details: "" },
  signatureInfo: {
    label: "Signed",
    details: "Hand-signed by the artist, stamped by artist’s estate.",
  },
  conditionDescription: {
    label: "Condition details",
    details:
      "Slight discoloration from sun exposure, light abrasion in lower left.",
  },
  certificateOfAuthenticity: {
    label: "Certificate of authenticity",
    details: "Not included",
  },
  category: "Painting",
  series: "Lorem Ipsum Dolor",
  publisher: "Factory Editions, New York",
  manufacturer: "Mfg Group",
  provenance: "Peter Freeman Inc., New York",
  image_rights: "Courtesy of Chiswick Auctions",
  articles: [
    {
      author: { id: "asdfsdf", name: "Artsy Editorial" },
      href: "/article/artsy-editorial-the-most-iconic-artists-of-the-1980s",
      id: "sfds",
      slug: "article1",
      published_at: "Aug 17th, 2015",
      thumbnail_image: {
        resized: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=width&width=300&quality=80&src=https%3A%2F%2Fartsy-media-uploads.s3.amazonaws.com%2FDOdbp-Vj_cXRKQhnZFhq0g%252Flarger-5.jpg",
        },
      },
      thumbnail_title: "The Most Iconic Artists of the 1980s",
    },
  ],
  literature: "Some literature info goes here",
  exhibition_history: "And the work was so excibited!",
  sale: null,
}
