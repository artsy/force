export const CollectionsRailFixture = [
  {
    id: "54321",
    slug: "jasper-johns-flags",
    headerImage: "https://files.artsy.net/images/jasperjohnsflag.png",
    title: "Jasper Johns: Flags",
    price_guidance: 1000,
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Jasper Johns",
            },
            title: "Flag",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Jasper Johns",
            },
            title: "Flag (Moratorium)",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/Jyhryk2bLDdkpNflvWO0Lg/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Jasper Johns",
            },
            title: "Flag I",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/gM-IwaZ9C24Y_RQTRW6F5A/small.jpg",
              },
            },
          },
        },
      ],
    },
  },
  {
    slug: "street-art-now",
    headerImage: "https://files.artsy.net/images/banksygirlwithballoon.png",
    title: "Street Art Now",
    price_guidance: 200,
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Alec Monopoly",
            },
            title: "Community Chest: Go To Jail",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/DSa-4s-zRJEwW6mZRgDoxQ/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Alec Monopoly",
            },
            title: "DJ Monopoly",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/L0wx7i69h96MUFq9EgOpBQ/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Keith Haring",
            },
            title: "Keith Haring 1982 Dolphin lithograph",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/ZZodXz8Y7v7h0VWlQnZQCw/small.jpg",
              },
            },
          },
        },
      ],
    },
  },
  {
    id: "65432",
    slug: "contemporary-limited-editions",
    headerImage:
      "https://files.artsy.net/images/contemporarylimitededition2.png",
    title: "Contemporary Limited Editions",
    price_guidance: 1000,
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Kiki Smith",
            },
            title: "Untitled",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/VzteQ4joB2Iwjek9kPUrGg/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Gerhard Richter",
            },
            title: "P8",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/ZN_qyzZgvHz-DRMFW-Wrcw/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Robert Longo",
            },
            title: "Monsters",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/0vJm9FeXzxzZJpBC-A-4ig/small.jpg",
              },
            },
          },
        },
      ],
    },
  },
  {
    slug: "timeless-modern-prints",
    headerImage: "https://files.artsy.net/images/timelessmodernprints.png",
    title: "Timeless Modern Prints",
    price_guidance: 2500,
    artworksConnection: {
      edges: [
        {
          node: {
            artist: {
              name: "Joan Miró",
            },
            title: "Migratory Bird I",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/_67k2lYpopsd-UK6LOD61g/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Pablo Picasso",
            },
            title: "Bacchanale",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/mepJj80_m4NiWUJviymyBw/small.jpg",
              },
            },
          },
        },
        {
          node: {
            artist: {
              name: "Josef Albers",
            },
            title: "Mitered Squares-Apricot ",
            image: {
              resized: {
                url:
                  "https://d32dm0rphc51dk.cloudfront.net/CbgUJdNK5lWvhKzziYgx7w/small.jpg",
              },
            },
          },
        },
      ],
    },
  },
]

// Represents one collection hub
export const CollectionsHubLinkedCollections = {
  linkedCollections: [
    {
      groupType: "ArtistSeries",
      name: "Artist Series",
      members: [
        {
          slug: "many-flags",
          id: "4321",
          title: "Flags unique collections",
          price_guidance: 1000,
          artworksConnection: {
            edges: [
              {
                node: {
                  artist: {
                    // null
                  },
                  title: "A great flag from Jasper",
                  image: {
                    url:
                      "https://d32dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                },
              },
              {
                node: {
                  artist: {
                    name: "Jasper Johns",
                  },
                  title: "Back to 2046",
                  image: {
                    url:
                      "https://d32dm0rp11hc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                },
              },
              {
                node: {
                  artist: {
                    name: "Andy Warhol",
                  },
                  title: "An Apple",
                  image: {
                    url:
                      "https://d32142dm0rphc51dk.cloudfront.net/4izTOpDv-ew-g1RFXeREcQ/small.jpg",
                  },
                },
              },
            ],
          },
        },
      ],
    },
  ],
}

export const CollectionHubFixture = {
  title: "KAWS: Companions",
  slug: "kaws-companions",
  id: "12345",
  headerImage:
    "https://artsy-vanity-files-production.s3.amazonaws.com/images/kaws2.png",
  linkedCollections: [
    {
      groupType: "OtherCollections",
      name: "Other Collections",
      members: [
        {
          id: "123456",
          slug: "artist-posters",
          thumbnail: "https://files.artsy.net/images/posters_thumbnail.png",
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
            "https://files.artsy.net/images/kaws-bearbrick_thumbnail.png",
          title: "KAWS: Bearbricks",
        },
      ],
    },
    {
      groupType: "FeaturedCollections",
      name: "Featured Collections",
      members: [
        {
          id: "123450",
          description:
            '<p>From SpongeBob SquarePants to Snoopy, many beloved childhood cartoons have made an impact on the history of art. <a href="https://www.artsy.net/artist/roy-lichtenstein">Roy Lichtenstein</a> was the first to transform the aesthetic of comic strips into fine art when he painted fighter jets, <a href="https://www.artsy.net/collection/roy-lichtenstein-crying-girl">crying girls</a>, and kissing couples in brightly-colored dots and stripes. His Pop contemporary <a href="https://www.artsy.net/artist/andy-warhol">Andy Warhol</a> grew up obsessed with comic books and portrayed <a href="https://www.artsy.net/collection/andy-warhol-superman">Superman</a> flying through the air as an homage to his childhood hero. For contemporary artists, Walt Disney’s Mickey Mouse has been especially influential, appearing in prints by <a href="https://www.artsy.net/artist/keith-haring">Keith Haring</a>, <a href="https://www.artsy.net/artist/damien-hirst">Damien Hirst</a>, <a href="https://www.artsy.net/artist/banksy">Banksy</a>, and more. <a href="https://www.artsy.net/artist/kaws">KAWS</a> and <a href="https://www.artsy.net/artist/takashi-murakami">Takashi Murakami</a> have even invented their own versions of the classic cartoon, naming their creations <i><a href="https://www.artsy.net/collection/kaws-companions">Companion</a></i> and <i><a href="https://www.artsy.net/collection/takashi-murakami-mr-dob">Mr. DOB</a></i> respectively. Below, discover a curated selection of works inspired by cartoons, providing a new spin on some of the world’s most recognizable characters.</p>',
          price_guidance: 60,
          slug: "art-inspired-by-cartoons",
          thumbnail: "https://files.artsy.net/images/cartoons_thumbnail.png",
          title: "Art Inspired by Cartoons",
        },
        {
          id: "123451",
          description:
            '<p>Street artists have long drawn inspiration from popular culture, spray painting and wheatpasting portraits of celebrities in public spaces that encourage passersby to take a closer look at the power of today’s influencers. Below, discover takes on it-girls, A-listers, and world leaders with a street art spin—from <a href="https://www.artsy.net/artist/mr-brainwash">Mr. Brainwash</a>’s depictions of supermodel <a href="https://www.artsy.net/collection/mr-brainwash-kate-moss">Kate Moss</a> to <a href="https://www.artsy.net/artist/shepard-fairey">Shepherd Fairey</a>’s iconic posters of <a href="https://www.artsy.net/collection/shepard-fairey-barack-obama">President Barack Obama</a>.</p>',
          price_guidance: 400,
          slug: "street-art-celebrities",
          thumbnail:
            "https://files.artsy.net/images/street-art-celebrities_thumbnail.png",
          title: "Street Art: Celebrity Portraits",
        },
        {
          id: "123452",
          description:
            '<p>Whether from Marvel or DC Comics, superheroes—and villains—from all worlds have appeared in street art. With universally understood stories and recognizable faces, superheroes and classic comic book characters can often act as a vehicle for street artists to inspire or provoke the public. For example, <a href="https://www.artsy.net/artist/hebru-brantley">Hebru Brantley</a> invented his own character <a href="https://www.artsy.net/collection/hebru-brantley-fly-boys">FlyBoy</a> to increase representation among superheroes, <a href="https://www.artsy.net/artist/shepard-fairey">Shepard Fairey</a> reimagined Iron Man as an imposing Uncle Sam to critique government propaganda, and <a href="https://www.artsy.net/artist/banksy">Banksy</a> stenciled a young boy costumed as the Flash to remind viewers that not all heroes wear capes. Below, discover a selection of classic superheroes reimagined by today’s street artists.</p>',
          price_guidance: 1200,
          slug: "street-art-superheroes-and-villains",
          thumbnail:
            "https://files.artsy.net/images/street-art-superheroes_thumbnail.png",
          title: "Street Art: Superheroes and Villains",
        },
      ],
    },
  ],
}
