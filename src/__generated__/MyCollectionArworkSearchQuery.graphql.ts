/**
 * @generated SignedSource<<4f2a78cce148c209fdc27cfd38e3da37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ARTIST_SERIES" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "IMPORT_SOURCE" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type FilterArtworksInput = {
  acquireable?: boolean | null | undefined;
  additionalGeneIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  after?: string | null | undefined;
  aggregationPartnerCities?: ReadonlyArray<string | null | undefined> | null | undefined;
  aggregations?: ReadonlyArray<ArtworkAggregation | null | undefined> | null | undefined;
  artistID?: string | null | undefined;
  artistIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  artistNationalities?: ReadonlyArray<string | null | undefined> | null | undefined;
  artistSeriesID?: string | null | undefined;
  artistSeriesIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  artworkIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  atAuction?: boolean | null | undefined;
  attributionClass?: ReadonlyArray<string | null | undefined> | null | undefined;
  availability?: string | null | undefined;
  before?: string | null | undefined;
  categories?: ReadonlyArray<string | null | undefined> | null | undefined;
  color?: string | null | undefined;
  colors?: ReadonlyArray<string | null | undefined> | null | undefined;
  completenessTier?: ReadonlyArray<string | null | undefined> | null | undefined;
  dimensionRange?: string | null | undefined;
  disableNotForSaleSorting?: boolean | null | undefined;
  excludeArtworkIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  extraAggregationGeneIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  first?: number | null | undefined;
  forSale?: boolean | null | undefined;
  framed?: boolean | null | undefined;
  geneID?: string | null | undefined;
  geneIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  height?: string | null | undefined;
  importSources?: ReadonlyArray<string | null | undefined> | null | undefined;
  includeAllJSON?: boolean | null | undefined;
  includeArtworksByFollowedArtists?: boolean | null | undefined;
  includeMediumFilterInAggregation?: boolean | null | undefined;
  includeUnpublished?: boolean | null | undefined;
  inquireableOnly?: boolean | null | undefined;
  keyword?: string | null | undefined;
  keywordMatchExact?: boolean | null | undefined;
  last?: number | null | undefined;
  locationCities?: ReadonlyArray<string | null | undefined> | null | undefined;
  majorPeriods?: ReadonlyArray<string | null | undefined> | null | undefined;
  marketable?: boolean | null | undefined;
  marketingCollectionID?: string | null | undefined;
  materialsTerms?: ReadonlyArray<string | null | undefined> | null | undefined;
  medium?: string | null | undefined;
  offerable?: boolean | null | undefined;
  page?: number | null | undefined;
  partnerCities?: ReadonlyArray<string | null | undefined> | null | undefined;
  partnerID?: string | null | undefined;
  partnerIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  period?: string | null | undefined;
  periods?: ReadonlyArray<string | null | undefined> | null | undefined;
  priceRange?: string | null | undefined;
  published?: boolean | null | undefined;
  saleID?: string | null | undefined;
  showID?: string | null | undefined;
  signed?: boolean | null | undefined;
  size?: number | null | undefined;
  sizes?: ReadonlyArray<ArtworkSizes | null | undefined> | null | undefined;
  sold?: boolean | null | undefined;
  sort?: string | null | undefined;
  tagID?: string | null | undefined;
  visibilityLevel?: string | null | undefined;
  width?: string | null | undefined;
};
export type MyCollectionArworkSearchQuery$variables = {
  artistID: string;
  input?: FilterArtworksInput | null | undefined;
};
export type MyCollectionArworkSearchQuery$data = {
  readonly artist: {
    readonly filterArtworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly category: string | null | undefined;
          readonly date: string | null | undefined;
          readonly depth: string | null | undefined;
          readonly editionNumber: string | null | undefined;
          readonly editionSize: string | null | undefined;
          readonly height: string | null | undefined;
          readonly id: string;
          readonly images: ReadonlyArray<{
            readonly height: number | null | undefined;
            readonly internalID: string | null | undefined;
            readonly isDefault: boolean | null | undefined;
            readonly url: string | null | undefined;
            readonly width: number | null | undefined;
          } | null | undefined> | null | undefined;
          readonly internalID: string;
          readonly isEdition: boolean | null | undefined;
          readonly medium: string | null | undefined;
          readonly metric: string | null | undefined;
          readonly title: string | null | undefined;
          readonly width: string | null | undefined;
          readonly " $fragmentSpreads": FragmentRefs<"GridItem_artwork">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type MyCollectionArworkSearchQuery = {
  response: MyCollectionArworkSearchQuery$data;
  variables: MyCollectionArworkSearchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 40
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "medium",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depth",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionSize",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionNumber",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "images",
  "plural": true,
  "selections": [
    (v8/*: any*/),
    (v9/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefault",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "version",
          "value": [
            "main",
            "normalized",
            "larger",
            "large",
            "medium",
            "small"
          ]
        }
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"main\",\"normalized\",\"larger\",\"large\",\"medium\",\"small\"])"
    },
    (v10/*: any*/)
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isEdition",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "metric",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v19 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v20 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v23 = [
  (v21/*: any*/),
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArworkSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v9/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v10/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "GridItem_artwork"
                      }
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
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MyCollectionArworkSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
                      (v9/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "includeAll",
                            "value": false
                          }
                        ],
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "placeholder",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "larger",
                                  "large"
                                ]
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:[\"larger\",\"large\"])"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "versions",
                            "storageKey": null
                          }
                        ],
                        "storageKey": "image(includeAll:false)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
                      (v17/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CollectorSignals",
                        "kind": "LinkedField",
                        "name": "collectorSignals",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "primaryLabel",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AuctionCollectorSignals",
                            "kind": "LinkedField",
                            "name": "auction",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidCount",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotClosesAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "liveBiddingStarted",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "registrationEndsAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "onlineBiddingExtended",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerOfferToCollector",
                            "kind": "LinkedField",
                            "name": "partnerOffer",
                            "plural": false,
                            "selections": [
                              (v18/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Money",
                                "kind": "LinkedField",
                                "name": "priceWithDiscount",
                                "plural": false,
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              },
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "sale_message",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      {
                        "alias": "cultural_maker",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "culturalMaker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v20/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artist",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtistTargetSupply",
                            "kind": "LinkedField",
                            "name": "targetSupply",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isP1",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v12/*: any*/)
                        ],
                        "storageKey": "artist(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkPriceInsights",
                        "kind": "LinkedField",
                        "name": "marketPriceInsights",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "demandRank",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v20/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v12/*: any*/),
                          (v17/*: any*/),
                          (v21/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": "collecting_institution",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "collectingInstitution",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v20/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v21/*: any*/),
                          (v17/*: any*/),
                          (v12/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          (v18/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cascadingEndTimeIntervalMinutes",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "extendedBiddingIntervalMinutes",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "startAt",
                            "storageKey": null
                          },
                          {
                            "alias": "is_auction",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAuction",
                            "storageKey": null
                          },
                          {
                            "alias": "is_closed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v12/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOpen",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "sale_artwork",
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "saleArtwork",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "lotLabel",
                            "storageKey": null
                          },
                          (v18/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "extendedBiddingEndAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "formattedEndDateTime",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "bidder_positions",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidderPositions",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "highest_bid",
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "kind": "LinkedField",
                            "name": "highestBid",
                            "plural": false,
                            "selections": (v19/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v19/*: any*/),
                            "storageKey": null
                          },
                          (v12/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "saleArtwork",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          (v12/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AttributionClass",
                        "kind": "LinkedField",
                        "name": "attributionClass",
                        "plural": false,
                        "selections": (v23/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkMedium",
                        "kind": "LinkedField",
                        "name": "mediumType",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Gene",
                            "kind": "LinkedField",
                            "name": "filterGene",
                            "plural": false,
                            "selections": (v23/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isUnlisted",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "976b36d12632935a66e457922e4f1427",
    "id": null,
    "metadata": {},
    "name": "MyCollectionArworkSearchQuery",
    "operationKind": "query",
    "text": "query MyCollectionArworkSearchQuery(\n  $artistID: String!\n  $input: FilterArtworksInput\n) {\n  artist(id: $artistID) {\n    filterArtworksConnection(first: 40, input: $input) {\n      edges {\n        node {\n          medium\n          date\n          depth\n          editionSize\n          editionNumber\n          height\n          images {\n            height\n            internalID\n            isDefault\n            url(version: [\"main\", \"normalized\", \"larger\", \"large\", \"medium\", \"small\"])\n            width\n          }\n          id\n          internalID\n          isEdition\n          category\n          metric\n          title\n          width\n          ...GridItem_artwork\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4be2f2ffc9e99017e1bd0f08c23f7911";

export default node;
