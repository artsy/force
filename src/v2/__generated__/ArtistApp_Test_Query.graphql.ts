/**
 * @generated SignedSource<<b3ad301e39804d6921b26407005de826>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistApp_Test_Query$variables = {};
export type ArtistApp_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistApp_artist">;
  } | null;
};
export type ArtistApp_Test_Query = {
  variables: ArtistApp_Test_Query$variables;
  response: ArtistApp_Test_Query$data;
};

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
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtistHighlights"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PartnerArtistConnection"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnerArtistEdge"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnerCategory"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
    "type": "Query",
    "abstractKey": null
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
                            "type": "PriceRange",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v14/*: any*/),
                            "type": "Money",
                            "abstractKey": null
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
    "cacheID": "6d83ae5f23417b9293e13dcfabf28f81",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.alternate_names": (v16/*: any*/),
        "artist.artistHighlights": (v17/*: any*/),
        "artist.artistHighlights.partnersConnection": (v18/*: any*/),
        "artist.artistHighlights.partnersConnection.edges": (v19/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.id": (v20/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node": (v21/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories": (v22/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.id": (v20/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.categories.slug": (v20/*: any*/),
        "artist.artistHighlights.partnersConnection.edges.node.id": (v20/*: any*/),
        "artist.artworks_connection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "artist.artworks_connection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "artist.artworks_connection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artist.artworks_connection.edges.node.availability": (v23/*: any*/),
        "artist.artworks_connection.edges.node.category": (v23/*: any*/),
        "artist.artworks_connection.edges.node.date": (v23/*: any*/),
        "artist.artworks_connection.edges.node.description": (v23/*: any*/),
        "artist.artworks_connection.edges.node.href": (v23/*: any*/),
        "artist.artworks_connection.edges.node.id": (v20/*: any*/),
        "artist.artworks_connection.edges.node.image": (v24/*: any*/),
        "artist.artworks_connection.edges.node.image.large": (v23/*: any*/),
        "artist.artworks_connection.edges.node.image.small": (v23/*: any*/),
        "artist.artworks_connection.edges.node.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "artist.artworks_connection.edges.node.listPrice.__typename": (v25/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.currencyCode": (v25/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.major": (v26/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.maxPrice": (v27/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.maxPrice.major": (v26/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.minPrice": (v27/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.minPrice.currencyCode": (v25/*: any*/),
        "artist.artworks_connection.edges.node.listPrice.minPrice.major": (v26/*: any*/),
        "artist.artworks_connection.edges.node.partner": (v21/*: any*/),
        "artist.artworks_connection.edges.node.partner.href": (v23/*: any*/),
        "artist.artworks_connection.edges.node.partner.id": (v20/*: any*/),
        "artist.artworks_connection.edges.node.partner.name": (v23/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "artist.artworks_connection.edges.node.partner.profile.id": (v20/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.image": (v24/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.image.large": (v23/*: any*/),
        "artist.artworks_connection.edges.node.partner.profile.image.small": (v23/*: any*/),
        "artist.artworks_connection.edges.node.price_currency": (v23/*: any*/),
        "artist.artworks_connection.edges.node.title": (v23/*: any*/),
        "artist.auctionResultsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultConnection"
        },
        "artist.auctionResultsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AuctionResultEdge"
        },
        "artist.auctionResultsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResult"
        },
        "artist.auctionResultsConnection.edges.node.id": (v20/*: any*/),
        "artist.auctionResultsConnection.edges.node.organization": (v23/*: any*/),
        "artist.auctionResultsConnection.edges.node.price_realized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionResultPriceRealized"
        },
        "artist.auctionResultsConnection.edges.node.price_realized.display": (v23/*: any*/),
        "artist.auctionResultsConnection.edges.node.sale_date": (v23/*: any*/),
        "artist.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "artist.biographyBlurb.credit": (v23/*: any*/),
        "artist.biographyBlurb.partnerID": (v23/*: any*/),
        "artist.biographyBlurb.text": (v23/*: any*/),
        "artist.birthday": (v23/*: any*/),
        "artist.blurb": (v23/*: any*/),
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.artworks": (v28/*: any*/),
        "artist.counts.auctionResults": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "artist.counts.follows": (v28/*: any*/),
        "artist.counts.forSaleArtworks": (v28/*: any*/),
        "artist.deathday": (v23/*: any*/),
        "artist.formattedNationalityAndBirthday": (v23/*: any*/),
        "artist.gender": (v23/*: any*/),
        "artist.highlights": (v17/*: any*/),
        "artist.highlights.artistPartnersConnection": (v18/*: any*/),
        "artist.highlights.artistPartnersConnection.edges": (v19/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.id": (v20/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node": (v21/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.categories": (v22/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.categories.id": (v20/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.categories.slug": (v20/*: any*/),
        "artist.highlights.artistPartnersConnection.edges.node.id": (v20/*: any*/),
        "artist.highlights.partnersConnection": (v18/*: any*/),
        "artist.highlights.partnersConnection.edges": (v19/*: any*/),
        "artist.highlights.partnersConnection.edges.__typename": (v25/*: any*/),
        "artist.highlights.partnersConnection.edges.id": (v20/*: any*/),
        "artist.highlights.partnersConnection.edges.node": (v21/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories": (v22/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.id": (v20/*: any*/),
        "artist.highlights.partnersConnection.edges.node.categories.slug": (v20/*: any*/),
        "artist.highlights.partnersConnection.edges.node.id": (v20/*: any*/),
        "artist.href": (v23/*: any*/),
        "artist.id": (v20/*: any*/),
        "artist.image": (v24/*: any*/),
        "artist.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "artist.image.cropped.src": (v25/*: any*/),
        "artist.image.cropped.srcSet": (v25/*: any*/),
        "artist.image.large": (v23/*: any*/),
        "artist.image.square": (v23/*: any*/),
        "artist.image.versions": (v16/*: any*/),
        "artist.insights": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtistInsight"
        },
        "artist.insights.__typename": (v25/*: any*/),
        "artist.insights.entities": (v16/*: any*/),
        "artist.insights.label": (v23/*: any*/),
        "artist.insights.type": (v23/*: any*/),
        "artist.internalID": (v20/*: any*/),
        "artist.is_followed": (v29/*: any*/),
        "artist.meta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistMeta"
        },
        "artist.meta.description": (v23/*: any*/),
        "artist.name": (v23/*: any*/),
        "artist.nationality": (v23/*: any*/),
        "artist.related": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistRelatedData"
        },
        "artist.related.genes": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "GeneConnection"
        },
        "artist.related.genes.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "GeneEdge"
        },
        "artist.related.genes.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "artist.related.genes.edges.node.__typename": (v25/*: any*/),
        "artist.related.genes.edges.node.id": (v20/*: any*/),
        "artist.related.genes.edges.node.slug": (v20/*: any*/),
        "artist.slug": (v20/*: any*/),
        "artist.statuses": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistStatuses"
        },
        "artist.statuses.articles": (v29/*: any*/),
        "artist.statuses.artworks": (v29/*: any*/),
        "artist.statuses.auctionLots": (v29/*: any*/),
        "artist.statuses.cv": (v29/*: any*/),
        "artist.statuses.shows": (v29/*: any*/)
      }
    },
    "name": "ArtistApp_Test_Query",
    "operationKind": "query",
    "text": "query ArtistApp_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistApp_artist\n    id\n  }\n}\n\nfragment ArtistApp_artist on Artist {\n  slug\n  statuses {\n    shows\n    cv(minShowCount: 0)\n    articles\n    artworks\n    auctionLots\n  }\n  counts {\n    forSaleArtworks\n    auctionResults\n  }\n  related {\n    genes {\n      edges {\n        node {\n          slug\n          id\n        }\n      }\n    }\n  }\n  highlights {\n    artistPartnersConnection: partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n  ...ArtistMeta_artist\n  ...ArtistHeader_artist\n  ...BackLink_artist\n  internalID\n  name\n}\n\nfragment ArtistHeader_artist on Artist {\n  ...FollowArtistButton_artist\n  ...SelectedCareerAchievements_artist\n  artistHighlights: highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  image {\n    cropped(width: 200, height: 200) {\n      src\n      srcSet\n    }\n  }\n  internalID\n  slug\n  name\n  formattedNationalityAndBirthday\n  counts {\n    follows\n    forSaleArtworks\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    credit\n    partnerID\n    text\n  }\n}\n\nfragment ArtistMetaCanonicalLink_artist on Artist {\n  slug\n  statuses {\n    shows\n    cv(minShowCount: 0)\n    articles\n    auctionLots\n    artworks\n  }\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        __typename\n        id\n      }\n    }\n  }\n  biographyBlurb(format: HTML, partnerBio: false) {\n    text\n  }\n  related {\n    genes {\n      edges {\n        node {\n          __typename\n          id\n        }\n      }\n    }\n  }\n  insights {\n    __typename\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  slug\n  name\n  nationality\n  birthday\n  deathday\n  gender\n  href\n  meta {\n    description\n  }\n  alternate_names: alternateNames\n  image {\n    versions\n    large: url(version: \"large\")\n    square: url(version: \"square\")\n  }\n  counts {\n    artworks\n  }\n  blurb\n  artworks_connection: artworksConnection(first: 10, filter: IS_FOR_SALE, published: true) {\n    edges {\n      node {\n        title\n        date\n        description\n        category\n        price_currency: priceCurrency\n        listPrice {\n          __typename\n          ... on PriceRange {\n            minPrice {\n              major\n              currencyCode\n            }\n            maxPrice {\n              major\n            }\n          }\n          ... on Money {\n            major\n            currencyCode\n          }\n        }\n        availability\n        href\n        image {\n          small: url(version: \"small\")\n          large: url(version: \"large\")\n        }\n        partner {\n          name\n          href\n          profile {\n            image {\n              small: url(version: \"small\")\n              large: url(version: \"large\")\n            }\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  ...ArtistMetaCanonicalLink_artist\n}\n\nfragment BackLink_artist on Artist {\n  name\n  slug\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment SelectedCareerAchievements_artist on Artist {\n  highlights {\n    partnersConnection(first: 10, displayOnPartnerProfile: true, representedBy: true, partnerCategory: [\"blue-chip\", \"top-established\", \"top-emerging\"]) {\n      edges {\n        node {\n          categories {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  insights {\n    type\n    label\n    entities\n  }\n  auctionResultsConnection(recordsTrusted: true, first: 1, sort: PRICE_AND_DATE_DESC) {\n    edges {\n      node {\n        price_realized: priceRealized {\n          display(format: \"0.0a\")\n        }\n        organization\n        sale_date: saleDate(format: \"YYYY\")\n        id\n      }\n    }\n  }\n  slug\n}\n"
  }
};
})();

(node as any).hash = "599c2ad9b40231b3bbe3760a062d8963";

export default node;
