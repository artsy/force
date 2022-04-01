export const SingleFollowedArtist = {
  id: "opaque-artwork-id",
  artists: [
    {
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      internalID: "artist_id",
      slug: "josef-albers",
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: { follows: 9346 },
      related: null,
      avatar: { cropped: { src: "example.jpg", srcSet: "example.jpg 1x" } },
      formattedNationalityAndBirthday: "formattedNationalityAndBirthday",
    },
  ],
  cultural_maker: "American 18th Century",
}

export const SingleNonFollowedArtist = {
  artists: [
    {
      internalID: "artist_id",
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      slug: "josef-albers",
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: { follows: 9346 },
      related: null,
    },
  ],
  cultural_maker: "American 18th Century",
}

export const MultipleArtists = {
  id: "opaque-artwork-id",
  artists: [
    {
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      internalID: "artist_0_id",
      slug: "josef-albers",
      name: "Josef Albers",
      href: "/artist/josef-albers",
      is_followed: false,
      counts: { follows: 9346 },
      related: null,
      avatar: { cropped: { src: "example.jpg", srcSet: "example.jpg 1x" } },
      formattedNationalityAndBirthday: "formattedNationalityAndBirthday",
    },
    {
      id: "QXJ0aXN0OmVkLXJ1c2NoYQ==",
      internalID: "artist_1_id",
      slug: "ed-ruscha",
      name: "Ed Ruscha",
      href: "/artist/ed-ruscha",
      is_followed: false,
      counts: { follows: 15431 },
      related: null,
      avatar: { cropped: { src: "example.jpg", srcSet: "example.jpg 1x" } },
      formattedNationalityAndBirthday: "formattedNationalityAndBirthday",
    },
  ],
  cultural_maker: "American 18th Century",
}

export const CulturalMakerWork = {
  id: "opaque-artwork-id",
  artists: [],
  cultural_maker: "American 18th Century",
}
