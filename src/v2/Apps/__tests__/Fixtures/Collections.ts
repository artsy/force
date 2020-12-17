import { CollectionsAppTestQueryRawResponse } from "v2/__generated__/CollectionsAppTestQuery.graphql"

export const CollectionsFixture = [
  {
    headerImage:
      "https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png",
    slug: "kaws-companions",
    title: "KAWS: Companions",
  },
  {
    headerImage:
      "http://files.artsy.net/images/pumpkinsbigartistsmallsculpture.png",
    price_guidance: 1000,
    slug: "collectible-sculptures",
    title: "Big Artists, Small Sculptures",
  },
  {
    headerImage: "http://files.artsy.net/images/minimalistprints.png",
    slug: "minimalist-prints",
    title: "Minimalist Prints",
  },
  {
    headerImage:
      "http://files.artsy.net/images/contemporarylimitededition2.png",
    slug: "contemporary-limited-editions",
    title: "Contemporary Limited Editions",
  },
  {
    headerImage: "http://files.artsy.net/images/streetartnow.png",
    price_guidance: 200,
    slug: "street-art-now",
    title: "Street Art Now",
  },
  {
    headerImage: "http://files.artsy.net/images/timelessmodernprints.png",
    slug: "timeless-modern-prints",
    title: "Timeless Modern Prints",
  },
]

export const CollectionsRailFixture = [
  {
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Jasper Johns",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
              },
            },
            title: "Flag",
          },
        },
        {
          node: {
            artist: {
              name: "Jasper Johns",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/Jyhryk2bLDdkpNflvWO0Lg/small.jpg",
              },
            },
            title: "Flag (Moratorium)",
          },
        },
        {
          node: {
            artist: {
              name: "Jasper Johns",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/gM-IwaZ9C24Y_RQTRW6F5A/small.jpg",
              },
            },
            title: "Flag I",
          },
        },
      ],
    },
    headerImage: "http://files.artsy.net/images/jasperjohnsflag.png",
    id: "54321",
    price_guidance: 1000,
    slug: "jasper-johns-flags",
    title: "Jasper Johns: Flags",
  },
  {
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Alec Monopoly",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/DSa-4s-zRJEwW6mZRgDoxQ/small.jpg",
              },
            },
            title: "Community Chest: Go To Jail",
          },
        },
        {
          node: {
            artist: {
              name: "Alec Monopoly",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/L0wx7i69h96MUFq9EgOpBQ/small.jpg",
              },
            },
            title: "DJ Monopoly",
          },
        },
        {
          node: {
            artist: {
              name: "Keith Haring",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/ZZodXz8Y7v7h0VWlQnZQCw/small.jpg",
              },
            },
            title: "Keith Haring 1982 Dolphin lithograph",
          },
        },
      ],
    },
    headerImage: "http://files.artsy.net/images/banksygirlwithballoon.png",
    price_guidance: 200,
    slug: "street-art-now",
    title: "Street Art Now",
  },
  {
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Kiki Smith",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/VzteQ4joB2Iwjek9kPUrGg/small.jpg",
              },
            },
            title: "Untitled",
          },
        },
        {
          node: {
            artist: {
              name: "Gerhard Richter",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/ZN_qyzZgvHz-DRMFW-Wrcw/small.jpg",
              },
            },
            title: "P8",
          },
        },
        {
          node: {
            artist: {
              name: "Robert Longo",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/0vJm9FeXzxzZJpBC-A-4ig/small.jpg",
              },
            },
            title: "Monsters",
          },
        },
      ],
    },
    headerImage:
      "http://files.artsy.net/images/contemporarylimitededition2.png",
    id: "65432",
    price_guidance: 1000,
    slug: "contemporary-limited-editions",
    title: "Contemporary Limited Editions",
  },
  {
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Joan Miró",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/_67k2lYpopsd-UK6LOD61g/small.jpg",
              },
            },
            title: "Migratory Bird I",
          },
        },
        {
          node: {
            artist: {
              name: "Pablo Picasso",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/mepJj80_m4NiWUJviymyBw/small.jpg",
              },
            },
            title: "Bacchanale",
          },
        },
        {
          node: {
            artist: {
              name: "Josef Albers",
            },
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/CbgUJdNK5lWvhKzziYgx7w/small.jpg",
              },
            },
            title: "Mitered Squares-Apricot ",
          },
        },
      ],
    },
    headerImage: "http://files.artsy.net/images/timelessmodernprints.png",
    price_guidance: 2500,
    slug: "timeless-modern-prints",
    title: "Timeless Modern Prints",
  },
]

export const CategoriesFixture: CollectionsAppTestQueryRawResponse["marketingCategories"] = [
  {
    collections: [
      {
        headerImage: "http://files.artsy.net/images/minimalistprints.png",
        id: "opaque-collection-id",
        slug: "minimalist-prints",
        title: "Minimalist Prints",
      },
    ],
    name: "Abstract Art",
  },
  {
    collections: [
      {
        headerImage:
          "http://files.artsy.net/images/contemporarylimitededition2.png",
        id: "opaque-collection-id",
        slug: "contemporary-limited-editions",
        title: "Contemporary Limited Editions",
      },
    ],
    name: "Contemporary Art",
  },
  {
    collections: [
      {
        headerImage: "http://files.artsy.net/images/streetartnow.png",
        id: "opaque-collection-id-street-art-now",
        slug: "street-art-now",
        title: "Street Art Now",
      },
      {
        headerImage: "http://files.artsy.net/images/streetartnow.png",
        id: "opaque-collection-id-banksy-girl-with-balloon",
        slug: "banksy-girl-with-balloon",
        title: "Banksy: Girl with Balloon",
      },
      {
        headerImage: "http://files.artsy.net/images/shepardfaireyobama.png",
        id: "opaque-collection-id-shepard-fairey-barack-obama",
        slug: "shepard-fairey-barack-obama",
        title: "Shepard Fairey: Barack Obama",
      },
      {
        headerImage: "http://files.artsy.net/images/banksyrat.png",
        id: "opaque-collection-id-banksy-rats",
        slug: "banksy-rats",
        title: "Banksy: Rats",
      },
      {
        headerImage: "http://files.artsy.net/images/banksydismaland.png",
        id: "opaque-collection-id-banksy-dismaland",
        slug: "banksy-dismaland",
        title: "Banksy: Dismaland",
      },
      {
        headerImage:
          "http://files.artsy.net/images/jeanmichelbasquiatcrowns.png",
        id: "opaque-collection-id-jean-michel-basquiat-crowns",
        slug: "jean-michel-basquiat-crowns",
        title: "Jean-Michel Basquiat: Crowns",
      },
      {
        headerImage: "http://files.artsy.net/images/popshopkeithharing.png",
        id: "opaque-collection-id-keith-haring-pop-shop",
        slug: "keith-haring-pop-shop",
        title: "Keith Haring: Pop Shop",
      },
      {
        headerImage:
          "http://files.artsy.net/images/shepardfaireywethepeople.png",
        id: "opaque-collection-id-shepard-fairey-we-the-people",
        slug: "shepard-fairey-we-the-people",
        title: "Shepard Fairey: We the People",
      },
    ],
    name: "Street Art",
  },
]

// Represents one collection hub
export const CollectionsHubLinkedCollections = {
  linkedCollections: [
    {
      groupType: "ArtistSeries",
      members: [
        {
          artworksConnection: {
            edges: [
              {
                node: {
                  artist: {
                    // null
                  },
                  image: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                  title: "A great flag from Jasper",
                },
              },
              {
                node: {
                  artist: {
                    name: "Jasper Johns",
                  },
                  image: {
                    url:
                      "https://d32dm0rp11hc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                  title: "Back to 2046",
                },
              },
              {
                node: {
                  artist: {
                    name: "Andy Warhol",
                  },
                  image: {
                    url:
                      "https://d32142dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                  title: "An Apple",
                },
              },
            ],
          },
          id: "4321",
          price_guidance: 1000,
          slug: "many-flags",
          title: "Flags unique collections",
        },
      ],
      name: "Artist Series",
    },
  ],
}

export const CollectionHubFixture = {
  headerImage:
    "https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png",
  id: "12345",
  linkedCollections: [
    {
      groupType: "OtherCollections",
      members: [
        {
          id: "123456",
          slug: "artist-posters",
          thumbnail: "http://files.artsy.net/images/posters_thumbnail.png",
          title: "Artist Posters",
        },
        {
          id: "1234567",
          slug: "artist-skateboard-decks",
          title: "Artist Skateboard Decks",
        },
        {
          id: "123457",
          slug: "kaws-bearbrick",
          thumbnail:
            "http://files.artsy.net/images/kaws-bearbrick_thumbnail.png",
          title: "KAWS: Bearbricks",
        },
      ],
      name: "Other Collections",
    },
    {
      groupType: "FeaturedCollections",
      members: [
        {
          description:
            '<p>From SpongeBob SquarePants to Snoopy, many beloved childhood cartoons have made an impact on the history of art. <a href="https://www.artsy.net/artist/roy-lichtenstein">Roy Lichtenstein</a> was the first to transform the aesthetic of comic strips into fine art when he painted fighter jets, <a href="https://www.artsy.net/collection/roy-lichtenstein-crying-girl">crying girls</a>, and kissing couples in brightly-colored dots and stripes. His Pop contemporary <a href="https://www.artsy.net/artist/andy-warhol">Andy Warhol</a> grew up obsessed with comic books and portrayed <a href="https://www.artsy.net/collection/andy-warhol-superman">Superman</a> flying through the air as an homage to his childhood hero. For contemporary artists, Walt Disney’s Mickey Mouse has been especially influential, appearing in prints by <a href="https://www.artsy.net/artist/keith-haring">Keith Haring</a>, <a href="https://www.artsy.net/artist/damien-hirst">Damien Hirst</a>, <a href="https://www.artsy.net/artist/banksy">Banksy</a>, and more. <a href="https://www.artsy.net/artist/kaws">KAWS</a> and <a href="https://www.artsy.net/artist/takashi-murakami">Takashi Murakami</a> have even invented their own versions of the classic cartoon, naming their creations <i><a href="https://www.artsy.net/collection/kaws-companions">Companion</a></i> and <i><a href="https://www.artsy.net/collection/takashi-murakami-mr-dob">Mr. DOB</a></i> respectively. Below, discover a curated selection of works inspired by cartoons, providing a new spin on some of the world’s most recognizable characters.</p>',
          id: "123450",
          price_guidance: 60,
          slug: "art-inspired-by-cartoons",
          thumbnail: "http://files.artsy.net/images/cartoons_thumbnail.png",
          title: "Art Inspired by Cartoons",
        },
        {
          description:
            '<p>Street artists have long drawn inspiration from popular culture, spray painting and wheatpasting portraits of celebrities in public spaces that encourage passersby to take a closer look at the power of today’s influencers. Below, discover takes on it-girls, A-listers, and world leaders with a street art spin—from <a href="https://www.artsy.net/artist/mr-brainwash">Mr. Brainwash</a>’s depictions of supermodel <a href="https://www.artsy.net/collection/mr-brainwash-kate-moss">Kate Moss</a> to <a href="https://www.artsy.net/artist/shepard-fairey">Shepherd Fairey</a>’s iconic posters of <a href="https://www.artsy.net/collection/shepard-fairey-barack-obama">President Barack Obama</a>.</p>',
          id: "123451",
          price_guidance: 400,
          slug: "street-art-celebrities",
          thumbnail:
            "http://files.artsy.net/images/street-art-celebrities_thumbnail.png",
          title: "Street Art: Celebrity Portraits",
        },
        {
          description:
            '<p>Whether from Marvel or DC Comics, superheroes—and villains—from all worlds have appeared in street art. With universally understood stories and recognizable faces, superheroes and classic comic book characters can often act as a vehicle for street artists to inspire or provoke the public. For example, <a href="https://www.artsy.net/artist/hebru-brantley">Hebru Brantley</a> invented his own character <a href="https://www.artsy.net/collection/hebru-brantley-fly-boys">FlyBoy</a> to increase representation among superheroes, <a href="https://www.artsy.net/artist/shepard-fairey">Shepard Fairey</a> reimagined Iron Man as an imposing Uncle Sam to critique government propaganda, and <a href="https://www.artsy.net/artist/banksy">Banksy</a> stenciled a young boy costumed as the Flash to remind viewers that not all heroes wear capes. Below, discover a selection of classic superheroes reimagined by today’s street artists.</p>',
          id: "123452",
          price_guidance: 1200,
          slug: "street-art-superheroes-and-villains",
          thumbnail:
            "http://files.artsy.net/images/street-art-superheroes_thumbnail.png",
          title: "Street Art: Superheroes and Villains",
        },
      ],
      name: "Featured Collections",
    },
  ],
  slug: "kaws-companions",
  title: "KAWS: Companions",
}
