/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistApp_Test_QueryVariables = {};
export type ArtistApp_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistApp_artist">;
    } | null;
};
export type ArtistApp_Test_Query = {
    readonly response: ArtistApp_Test_QueryResponse;
    readonly variables: ArtistApp_Test_QueryVariables;
};



/*
query ArtistApp_Test_Query {
  artist(id: "example") {
    ...ArtistApp_artist
    id
  }
}

fragment ArtistApp_artist on Artist {
  slug
  statuses {
    shows
    cv(minShowCount: 0)
    articles
    artworks
    auctionLots
  }
  counts {
    forSaleArtworks
    auctionResults
  }
  related {
    genes {
      edges {
        node {
          slug
          id
        }
      }
    }
  }
  highlights {
    artistPartnersConnection: partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
  }
  biographyBlurb(format: HTML, partnerBio: false) {
    text
  }
  ...ArtistMeta_artist
  ...ArtistHeader_artist
  ...BackLink_artist
  internalID
  name
}

fragment ArtistHeader_artist on Artist {
  ...FollowArtistButton_artist
  ...SelectedCareerAchievements_artist
  artistHighlights: highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0.0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
        id
      }
    }
  }
  image {
    cropped(width: 200, height: 200) {
      src
      srcSet
    }
  }
  internalID
  slug
  name
  formattedNationalityAndBirthday
  counts {
    follows
    forSaleArtworks
  }
  biographyBlurb(format: HTML, partnerBio: false) {
    credit
    partnerID
    text
  }
}

fragment ArtistMetaCanonicalLink_artist on Artist {
  slug
  statuses {
    shows
    cv(minShowCount: 0)
    articles
    auctionLots
    artworks
  }
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        __typename
        id
      }
    }
  }
  biographyBlurb(format: HTML, partnerBio: false) {
    text
  }
  related {
    genes {
      edges {
        node {
          __typename
          id
        }
      }
    }
  }
  insights {
    __typename
  }
}

fragment ArtistMeta_artist on Artist {
  slug
  name
  nationality
  birthday
  deathday
  gender
  href
  meta {
    description
  }
  alternate_names: alternateNames
  image {
    versions
    large: url(version: "large")
    square: url(version: "square")
  }
  counts {
    artworks
  }
  blurb
  artworks_connection: artworksConnection(first: 10, filter: IS_FOR_SALE, published: true) {
    edges {
      node {
        title
        date
        description
        category
        price_currency: priceCurrency
        listPrice {
          __typename
          ... on PriceRange {
            minPrice {
              major
              currencyCode
            }
            maxPrice {
              major
            }
          }
          ... on Money {
            major
            currencyCode
          }
        }
        availability
        href
        image {
          small: url(version: "small")
          large: url(version: "large")
        }
        partner {
          name
          href
          profile {
            image {
              small: url(version: "small")
              large: url(version: "large")
            }
            id
          }
          id
        }
        id
      }
    }
  }
  ...ArtistMetaCanonicalLink_artist
}

fragment BackLink_artist on Artist {
  name
  slug
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment SelectedCareerAchievements_artist on Artist {
  highlights {
    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: ["blue-chip", "top-established", "top-emerging"]) {
      edges {
        node {
          categories {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  insights {
    type
    label
    entities
  }
  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {
    edges {
      node {
        price_realized: priceRealized {
          display(format: "0.0a")
        }
        organization
        sale_date: saleDate(format: "YYYY")
        id
      }
    }
  }
  slug
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artworks",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v6 = [
  {
    "kind": "Literal",
    "name": "displayOnPartnerProfile",
    "value": true
  },
  (v5/*: any*/),
  {
    "kind": "Literal",
    "name": "partnerCategory",
    "value": [
      "blue-chip",
      "top-established",
      "top-emerging"
    ]
  },
  {
    "kind": "Literal",
    "name": "representedBy",
    "value": true
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerCategory",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
      "selections": [
        (v1/*: any*/),
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    (v3/*: any*/)
  ],
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PartnerArtistEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      (v7/*: any*/),
      (v3/*: any*/)
    ],
    "storageKey": null
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v12 = {
  "alias": "large",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "large"
    }
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:\"large\")"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "major",
  "storageKey": null
},
v14 = [
  (v13/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": "small",
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": "small"
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:\"small\")"
    },
    (v12/*: any*/)
  ],
  "storageKey": null
},
v16 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v18 = {
  "type": "ArtistHighlights",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v19 = {
  "type": "String",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v20 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v21 = {
  "type": "FormattedNumber",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v22 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v23 = {
  "type": "PartnerArtistConnection",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v24 = {
  "type": "PartnerArtistEdge",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v25 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v26 = {
  "type": "Partner",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v27 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v28 = {
  "type": "PartnerCategory",
  "enumValues": null,
  "plural": true,
  "nullable": true
},
v29 = {
  "type": "Money",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v30 = {
  "type": "Float",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistApp_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistApp_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "kind": "LinkedField",
            "name": "statuses",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shows",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "minShowCount",
                    "value": 0
                  }
                ],
                "kind": "ScalarField",
                "name": "cv",
                "storageKey": "cv(minShowCount:0)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "articles",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionLots",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "forSaleArtworks",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionResults",
                "storageKey": null
              },
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistRelatedData",
            "kind": "LinkedField",
            "name": "related",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "GeneConnection",
                "kind": "LinkedField",
                "name": "genes",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "GeneEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Gene",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v3/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
              {
                "alias": "artistPartnersConnection",
                "args": (v6/*: any*/),
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerArtistEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      (v3/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistInsight",
            "kind": "LinkedField",
            "name": "insights",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "label",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "entities",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              },
              {
                "kind": "Literal",
                "name": "partnerBio",
                "value": false
              }
            ],
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "partnerID",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
          },
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nationality",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "birthday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deathday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "gender",
            "storageKey": null
          },
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              (v11/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "alternate_names",
            "args": null,
            "kind": "ScalarField",
            "name": "alternateNames",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "image",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "versions",
                "storageKey": null
              },
              (v12/*: any*/),
              {
                "alias": "square",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "square"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"square\")"
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "height",
                    "value": 200
                  },
                  {
                    "kind": "Literal",
                    "name": "width",
                    "value": 200
                  }
                ],
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "src",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "srcSet",
                    "storageKey": null
                  }
                ],
                "storageKey": "cropped(height:200,width:200)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "blurb",
            "storageKey": null
          },
          {
            "alias": "artworks_connection",
            "args": [
              {
                "kind": "Literal",
                "name": "filter",
                "value": "IS_FOR_SALE"
              },
              (v5/*: any*/),
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              }
            ],
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "date",
                        "storageKey": null
                      },
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "category",
                        "storageKey": null
                      },
                      {
                        "alias": "price_currency",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "priceCurrency",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "listPrice",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "minPrice",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "maxPrice",
                                "plural": false,
                                "selections": [
                                  (v13/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "PriceRange"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v14/*: any*/),
                            "type": "Money"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "availability",
                        "storageKey": null
                      },
                      (v10/*: any*/),
                      (v15/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v10/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Profile",
                            "kind": "LinkedField",
                            "name": "profile",
                            "plural": false,
                            "selections": [
                              (v15/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "artworksConnection(filter:\"IS_FOR_SALE\",first:10,published:true)"
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": "is_followed",
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "recordsTrusted",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "PRICE_AND_DATE_DESC"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "0.0a"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": "display(format:\"0.0a\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "organization",
                        "storageKey": null
                      },
                      {
                        "alias": "sale_date",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "YYYY"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": "saleDate(format:\"YYYY\")"
                      },
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "auctionResultsConnection(first:1,recordsTrusted:true,sort:\"PRICE_AND_DATE_DESC\")"
          },
          {
            "alias": "artistHighlights",
            "args": null,
            "concreteType": "ArtistHighlights",
            "kind": "LinkedField",
            "name": "highlights",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "PartnerArtistConnection",
                "kind": "LinkedField",
                "name": "partnersConnection",
                "plural": false,
                "selections": (v8/*: any*/),
                "storageKey": "partnersConnection(displayOnPartnerProfile:true,first:10,partnerCategory:[\"blue-chip\",\"top-established\",\"top-emerging\"],representedBy:true)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "formattedNationalityAndBirthday",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "type": "Artist",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.id": (v16/*: any*/),
        "artist.counts": {
          "type": "ArtistCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.internalID": (v16/*: any*/),
        "artist.name": (v17/*: any*/),
        "artist.slug": (v16/*: any*/),
        "artist.statuses": {
          "type": "ArtistStatuses",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related": {
          "type": "ArtistRelatedData",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights": (v18/*: any*/),
        "artist.insights": {
          "type": "ArtistInsight",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.biographyBlurb": {
          "type": "ArtistBlurb",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.nationality": (v17/*: any*/),
        "artist.birthday": (v17/*: any*/),
        "artist.deathday": (v17/*: any*/),
        "artist.gender": (v17/*: any*/),
        "artist.href": (v17/*: any*/),
        "artist.meta": {
          "type": "ArtistMeta",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.alternate_names": (v19/*: any*/),
        "artist.image": (v20/*: any*/),
        "artist.blurb": (v17/*: any*/),
        "artist.artworks_connection": {
          "type": "ArtworkConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.artistHighlights": (v18/*: any*/),
        "artist.auctionResultsConnection": {
          "type": "AuctionResultConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.formattedNationalityAndBirthday": (v17/*: any*/),
        "artist.counts.forSaleArtworks": (v21/*: any*/),
        "artist.statuses.artworks": (v22/*: any*/),
        "artist.statuses.auctionLots": (v22/*: any*/),
        "artist.statuses.shows": (v22/*: any*/),
        "artist.statuses.cv": (v22/*: any*/),
        "artist.statuses.articles": (v22/*: any*/),
        "artist.counts.auctionResults": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.related.genes": {
          "type": "GeneConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights.artistPartnersConnection": (v23/*: any*/),
        "artist.insights.type": (v17/*: any*/),
        "artist.biographyBlurb.text": (v17/*: any*/),
        "artist.meta.description": (v17/*: any*/),
        "artist.image.versions": (v19/*: any*/),
        "artist.image.large": (v17/*: any*/),
        "artist.image.square": (v17/*: any*/),
        "artist.counts.artworks": (v21/*: any*/),
        "artist.artworks_connection.edges": {
          "type": "ArtworkEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.is_followed": (v22/*: any*/),
        "artist.artistHighlights.partnersConnection": (v23/*: any*/),
        "artist.auctionResultsConnection.edges": {
          "type": "AuctionResultEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.image.cropped": {
          "type": "CroppedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.counts.follows": (v21/*: any*/),
        "artist.biographyBlurb.credit": (v17/*: any*/),
        "artist.biographyBlurb.partnerID": (v17/*: any*/),
        "artist.related.genes.edges": {
          "type": "GeneEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "artist.highlights.artistPartnersConnection.edges": (v24/*: any*/),
        "artist.artworks_connection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights.partnersConnection": (v23/*: any*/),
        "artist.insights.__typename": (v25/*: any*/),
        "artist.insights.label": (v17/*: any*/),
        "artist.insights.entities": (v19/*: any*/),
        "artist.artistHighlights.partnersConnection.edges": (v24/*: any*/),
        "artist.auctionResultsConnection.edges.node": {
          "type": "AuctionResult",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.image.cropped.src": (v25/*: any*/),
        "artist.image.cropped.srcSet": (v25/*: any*/),
        "artist.related.genes.edges.node": {
          "type": "Gene",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.highlights.artistPartnersConnection.edges.node": (v26/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.id": (v27/*: any*/),
        "artist.artworks_connection.edges.node.title": (v17/*: any*/),
        "artist.artworks_connection.edges.node.date": (v17/*: any*/),
        "artist.artworks_connection.edges.node.description": (v17/*: any*/),
        "artist.artworks_connection.edges.node.category": (v17/*: any*/),
        "artist.artworks_connection.edges.node.price_currency": (v17/*: any*/),
        "artist.artworks_connection.edges.node.listPrice": {
          "type": "ListPrice",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.artworks_connection.edges.node.availability": (v17/*: any*/),
        "artist.artworks_connection.edges.node.href": (v17/*: any*/),
        "artist.artworks_connection.edges.node.image": (v20/*: any*/),
        "artist.artworks_connection.edges.node.partner": (v26/*: any*/),
        "artist.artworks_connection.edges.node.id": (v27/*: any*/),
        "artist.highlights.partnersConnection.edges": (v24/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node": (v26/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.id": (v27/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized": {
          "type": "AuctionResultPriceRealized",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.auctionResultsConnection.edges.node.organization": (v17/*: any*/),
        "artist.auctionResultsConnection.edges.node.sale_date": (v17/*: any*/),
        "artist.auctionResultsConnection.edges.node.id": (v27/*: any*/),
        "artist.related.genes.edges.node.slug": (v16/*: any*/),
        "artist.related.genes.edges.node.id": (v27/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.categories": (v28/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.id": (v27/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.__typename": (v25/*: any*/),
        "artist.artworks_connection.edges.node.image.small": (v17/*: any*/),
        "artist.artworks_connection.edges.node.image.large": (v17/*: any*/),
        "artist.artworks_connection.edges.node.partner.name": (v17/*: any*/),
        "artist.artworks_connection.edges.node.partner.href": (v17/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile": {
          "type": "Profile",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "artist.artworks_connection.edges.node.partner.id": (v27/*: any*/),
        "artist.highlights.partnersConnection.edges.__typename": (v25/*: any*/),
        "artist.highlights.partnersConnection.edges.id": (v27/*: any*/),
        "artist.highlights.partnersConnection.edges.node": (v26/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories": (v28/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.id": (v27/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v17/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.categories.slug": (v16/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.categories.id": (v27/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.minPrice": (v29/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.maxPrice": (v29/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.major": (v30/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.currencyCode": (v25/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.image": (v20/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.id": (v27/*: any*/),
        "artist.related.genes.edges.node.__typename": (v25/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories": (v28/*: any*/),
        "artist.highlights.partnersConnection.edges.node.id": (v27/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.slug": (v16/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.id": (v27/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.minPrice.major": (v30/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.minPrice.currencyCode": (v25/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.maxPrice.major": (v30/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.image.small": (v17/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.image.large": (v17/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.slug": (v16/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.id": (v27/*: any*/)
      }
    },
    "name": "ArtistApp_Test_Query",
    "operationKind": "query",
    "text": "query ArtistApp_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistApp_artist\n    id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  slug\n  statuses {\n    shows\n    cv(minShowCount: 0)\n    articles\n    artworks\n    auctionLots\n  }\n  counts {\n    forSaleArtworks\n    auctionResults\n  }\n  related {\n    genes {\n      edges {\n        node {\n          slug\n          id\n        }\n      }\n    }\n  }\n  highlights {\n    artistPartnersConnection: partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  ...BackLink_artist\n  internalID\n  name\n}\n\nfragment ArtistHeader_artist on Artist {\n  ...FollowArtistButton_artist\n  ...SelectedCareerAchievements_artist\n  artistHighlights: highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  image {\n    cropped(width: 200, height: 200) {\n      src\n      srcSet\n    }\n  }\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n    forSaleArtworks\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment ArtistMetaCanonicalLink_artist on Artist {\n  slug\n  statuses {\n    shows\n    cv(minShowCount: 0)\n    articles\n    auctionLots\n    artworks\n  }\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        __typename\n        id\n      }\n    }\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n  related {\n    genes {\n      edges {\n        node {\n          __typename\n          id\n        }\n      }\n    }\n  }\n  insights {\n    __typename\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  slug\n  name\n  nationality\n  birthday\n  deathday\n  gender\n  href\n  meta {\n    description\n  }\n  alternate_names: alternateNames\n  image {\n    versions\n    large: url(version: \"large\")\n    square: url(version: \"square\")\n  }\n  counts {\n    artworks\n  }\n  blurb\n  artworks_connection: artworksConnection(first: 10, filter: IS_FOR_SALE, published: true) {\n    edges {\n      node {\n        title\n        date\n        description\n        category\n        price_currency: priceCurrency\n        listPrice {\n          __typename\n          ... on PriceRange {\n            minPrice {\n              major\n              currencyCode\n            }\n            maxPrice {\n              major\n            }\n          }\n          ... on Money {\n            major\n            currencyCode\n          }\n        }\n        availability\n        href\n        image {\n          small: url(version: \"small\")\n          large: url(version: \"large\")\n        }\n        partner {\n          name\n          href\n          profile {\n            image {\n              small: url(version: \"small\")\n              large: url(version: \"large\")\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ArtistMetaCanonicalLink_artist\n}\n\nfragment BackLink_artist on Artist {\n  name\n  slug\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment SelectedCareerAchievements_artist on Artist {\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n    label\n    entities\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  slug\n}\n"
  }
};
})();
(node as any).hash = '599c2ad9b40231b3bbe3760a062d8963';
export default node;
