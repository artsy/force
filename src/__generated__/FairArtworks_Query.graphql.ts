/**
 * @generated SignedSource<<ff319c034e15d54e3db521fe99484ada>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ARTIST_SERIES" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "SIMPLE_PRICE_HISTOGRAM" | "TOTAL" | "%future added value";
export type FairArtworks_Query$variables = {
  slug: string;
};
export type FairArtworks_Query$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"FairArtworks_fair">;
  } | null | undefined;
};
export type FairArtworks_Query$rawResponse = {
  readonly fair: {
    readonly filtered_artworks: {
      readonly __isArtworkConnectionInterface: "FilterArtworksConnection";
      readonly counts: {
        readonly followedArtists: any | null | undefined;
        readonly total: any | null | undefined;
      } | null | undefined;
      readonly edges: ReadonlyArray<{
        readonly __typename?: string;
        readonly __isNode?: string;
        readonly id?: string;
        readonly node: {
          readonly artist?: {
            readonly id: string;
            readonly targetSupply: {
              readonly isP1: boolean | null | undefined;
            };
          } | null | undefined;
          readonly artistNames?: string | null | undefined;
          readonly artists?: ReadonlyArray<{
            readonly href: string | null | undefined;
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined> | null | undefined;
          readonly attributionClass?: {
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly collecting_institution?: string | null | undefined;
          readonly cultural_maker?: string | null | undefined;
          readonly date?: string | null | undefined;
          readonly href?: string | null | undefined;
          readonly id: string;
          readonly image?: {
            readonly aspectRatio: number;
            readonly blurhashDataURL: string | null | undefined;
            readonly internalID: string | null | undefined;
            readonly placeholder: string | null | undefined;
            readonly resized: {
              readonly height: number | null | undefined;
              readonly src: string;
              readonly srcSet: string;
              readonly width: number | null | undefined;
            } | null | undefined;
            readonly url: string | null | undefined;
            readonly versions: ReadonlyArray<string | null | undefined> | null | undefined;
          } | null | undefined;
          readonly imageTitle?: string | null | undefined;
          readonly image_title?: string | null | undefined;
          readonly internalID?: string;
          readonly isSaved?: boolean | null | undefined;
          readonly isSavedToList?: boolean;
          readonly isUnlisted?: boolean;
          readonly is_biddable?: boolean | null | undefined;
          readonly marketPriceInsights?: {
            readonly demandRank: number | null | undefined;
          } | null | undefined;
          readonly mediumType?: {
            readonly filterGene: {
              readonly id: string;
              readonly name: string | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly partner?: {
            readonly href: string | null | undefined;
            readonly id: string;
            readonly name: string | null | undefined;
          } | null | undefined;
          readonly preview?: {
            readonly url: string | null | undefined;
          } | null | undefined;
          readonly sale?: {
            readonly cascadingEndTimeIntervalMinutes: number | null | undefined;
            readonly display_timely_at: string | null | undefined;
            readonly endAt: string | null | undefined;
            readonly extendedBiddingIntervalMinutes: number | null | undefined;
            readonly extendedBiddingPeriodMinutes: number | null | undefined;
            readonly id: string;
            readonly is_auction: boolean | null | undefined;
            readonly is_closed: boolean | null | undefined;
            readonly is_preview: boolean | null | undefined;
            readonly startAt: string | null | undefined;
          } | null | undefined;
          readonly saleArtwork?: {
            readonly endAt: string | null | undefined;
            readonly extendedBiddingEndAt: string | null | undefined;
            readonly id: string;
            readonly lotID: string | null | undefined;
          } | null | undefined;
          readonly sale_artwork?: {
            readonly counts: {
              readonly bidder_positions: any | null | undefined;
            } | null | undefined;
            readonly endAt: string | null | undefined;
            readonly extendedBiddingEndAt: string | null | undefined;
            readonly formattedEndDateTime: string | null | undefined;
            readonly highest_bid: {
              readonly display: string | null | undefined;
            } | null | undefined;
            readonly id: string;
            readonly lotID: string | null | undefined;
            readonly lotLabel: string | null | undefined;
            readonly opening_bid: {
              readonly display: string | null | undefined;
            } | null | undefined;
          } | null | undefined;
          readonly sale_message?: string | null | undefined;
          readonly slug?: string;
          readonly title?: string | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
      readonly id: string;
      readonly pageCursors: {
        readonly around: ReadonlyArray<{
          readonly cursor: string;
          readonly isCurrent: boolean;
          readonly page: number;
        }>;
        readonly first: {
          readonly cursor: string;
          readonly isCurrent: boolean;
          readonly page: number;
        } | null | undefined;
        readonly last: {
          readonly cursor: string;
          readonly isCurrent: boolean;
          readonly page: number;
        } | null | undefined;
        readonly previous: {
          readonly cursor: string;
          readonly page: number;
        } | null | undefined;
      };
      readonly pageInfo: {
        readonly endCursor: string | null | undefined;
        readonly hasNextPage: boolean;
      };
    } | null | undefined;
    readonly id: string;
    readonly internalID: string;
    readonly sidebarAggregations: {
      readonly aggregations: ReadonlyArray<{
        readonly counts: ReadonlyArray<{
          readonly count: number;
          readonly name: string;
          readonly value: string;
        } | null | undefined> | null | undefined;
        readonly slice: ArtworkAggregation | null | undefined;
      } | null | undefined> | null | undefined;
      readonly id: string;
    } | null | undefined;
    readonly slug: string;
  } | null | undefined;
};
export type FairArtworks_Query = {
  rawResponse: FairArtworks_Query$rawResponse;
  response: FairArtworks_Query$data;
  variables: FairArtworks_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v9 = [
  (v5/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v11 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v12 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v16 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v17 = [
  (v4/*: any*/),
  (v5/*: any*/)
],
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
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
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FairArtworks_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairArtworks_fair"
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
    "name": "FairArtworks_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": "sidebarAggregations",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:1)"
          },
          {
            "alias": "filtered_artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "followedArtists",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "0,0"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": "total(format:\"0,0\")"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v8/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v10/*: any*/),
                          (v3/*: any*/),
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "aspectRatio",
                                "storageKey": null
                              },
                              (v3/*: any*/),
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
                                  (v11/*: any*/)
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:[\"larger\",\"large\"])"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "versions",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "blurhashDataURL",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  (v11/*: any*/),
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 445
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
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
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "width",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "height",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                              }
                            ],
                            "storageKey": "image(includeAll:false)"
                          },
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
                            "name": "imageTitle",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
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
                            "args": (v12/*: any*/),
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
                              (v5/*: any*/)
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
                            "args": (v12/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v5/*: any*/),
                              (v10/*: any*/),
                              (v4/*: any*/)
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
                            "args": (v12/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              (v10/*: any*/),
                              (v5/*: any*/)
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
                              (v13/*: any*/),
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
                              (v5/*: any*/),
                              {
                                "alias": "is_preview",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isPreview",
                                "storageKey": null
                              },
                              {
                                "alias": "display_timely_at",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayTimelyAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingPeriodMinutes",
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
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v13/*: any*/),
                              (v15/*: any*/),
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
                                "selections": (v16/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v16/*: any*/),
                                "storageKey": null
                              },
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
                            "storageKey": null
                          },
                          {
                            "alias": "preview",
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
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
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSavedToList",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v17/*: any*/),
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
                                "selections": (v17/*: any*/),
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
                          },
                          {
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
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
                              (v13/*: any*/),
                              (v15/*: any*/),
                              (v14/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "image_title",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageTitle",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v9/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ArtworkConnectionInterface",
                "abstractKey": "__isArtworkConnectionInterface"
              }
            ],
            "storageKey": "filterArtworksConnection(first:30)"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "57393fe903401a44e1953fd122ef3987",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "fair.filtered_artworks": (v18/*: any*/),
        "fair.filtered_artworks.__isArtworkConnectionInterface": (v19/*: any*/),
        "fair.filtered_artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "fair.filtered_artworks.counts.followedArtists": (v20/*: any*/),
        "fair.filtered_artworks.counts.total": (v20/*: any*/),
        "fair.filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "fair.filtered_artworks.edges.__isNode": (v19/*: any*/),
        "fair.filtered_artworks.edges.__typename": (v19/*: any*/),
        "fair.filtered_artworks.edges.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "fair.filtered_artworks.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "fair.filtered_artworks.edges.node.artist.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "fair.filtered_artworks.edges.node.artist.targetSupply.isP1": (v22/*: any*/),
        "fair.filtered_artworks.edges.node.artistNames": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "fair.filtered_artworks.edges.node.artists.href": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.artists.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.artists.name": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "fair.filtered_artworks.edges.node.attributionClass.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.attributionClass.name": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.collecting_institution": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.cultural_maker": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.date": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.href": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.image": (v24/*: any*/),
        "fair.filtered_artworks.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "fair.filtered_artworks.edges.node.image.blurhashDataURL": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "fair.filtered_artworks.edges.node.image.placeholder": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "fair.filtered_artworks.edges.node.image.resized.height": (v25/*: any*/),
        "fair.filtered_artworks.edges.node.image.resized.src": (v19/*: any*/),
        "fair.filtered_artworks.edges.node.image.resized.srcSet": (v19/*: any*/),
        "fair.filtered_artworks.edges.node.image.resized.width": (v25/*: any*/),
        "fair.filtered_artworks.edges.node.image.url": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "fair.filtered_artworks.edges.node.imageTitle": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.image_title": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.internalID": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.isSaved": (v22/*: any*/),
        "fair.filtered_artworks.edges.node.isSavedToList": (v26/*: any*/),
        "fair.filtered_artworks.edges.node.isUnlisted": (v26/*: any*/),
        "fair.filtered_artworks.edges.node.is_biddable": (v22/*: any*/),
        "fair.filtered_artworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "fair.filtered_artworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "fair.filtered_artworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "fair.filtered_artworks.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "fair.filtered_artworks.edges.node.mediumType.filterGene.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.mediumType.filterGene.name": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "fair.filtered_artworks.edges.node.partner.href": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.partner.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.partner.name": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.preview": (v24/*: any*/),
        "fair.filtered_artworks.edges.node.preview.url": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "fair.filtered_artworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v25/*: any*/),
        "fair.filtered_artworks.edges.node.sale.display_timely_at": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale.endAt": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale.extendedBiddingIntervalMinutes": (v25/*: any*/),
        "fair.filtered_artworks.edges.node.sale.extendedBiddingPeriodMinutes": (v25/*: any*/),
        "fair.filtered_artworks.edges.node.sale.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.sale.is_auction": (v22/*: any*/),
        "fair.filtered_artworks.edges.node.sale.is_closed": (v22/*: any*/),
        "fair.filtered_artworks.edges.node.sale.is_preview": (v22/*: any*/),
        "fair.filtered_artworks.edges.node.sale.startAt": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.saleArtwork": (v27/*: any*/),
        "fair.filtered_artworks.edges.node.saleArtwork.endAt": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.saleArtwork.extendedBiddingEndAt": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.saleArtwork.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.saleArtwork.lotID": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork": (v27/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "fair.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v20/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.endAt": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.extendedBiddingEndAt": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.formattedEndDateTime": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "fair.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.id": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.lotID": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.lotLabel": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "fair.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.sale_message": (v23/*: any*/),
        "fair.filtered_artworks.edges.node.slug": (v21/*: any*/),
        "fair.filtered_artworks.edges.node.title": (v23/*: any*/),
        "fair.filtered_artworks.id": (v21/*: any*/),
        "fair.filtered_artworks.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "fair.filtered_artworks.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "fair.filtered_artworks.pageCursors.around.cursor": (v19/*: any*/),
        "fair.filtered_artworks.pageCursors.around.isCurrent": (v26/*: any*/),
        "fair.filtered_artworks.pageCursors.around.page": (v28/*: any*/),
        "fair.filtered_artworks.pageCursors.first": (v29/*: any*/),
        "fair.filtered_artworks.pageCursors.first.cursor": (v19/*: any*/),
        "fair.filtered_artworks.pageCursors.first.isCurrent": (v26/*: any*/),
        "fair.filtered_artworks.pageCursors.first.page": (v28/*: any*/),
        "fair.filtered_artworks.pageCursors.last": (v29/*: any*/),
        "fair.filtered_artworks.pageCursors.last.cursor": (v19/*: any*/),
        "fair.filtered_artworks.pageCursors.last.isCurrent": (v26/*: any*/),
        "fair.filtered_artworks.pageCursors.last.page": (v28/*: any*/),
        "fair.filtered_artworks.pageCursors.previous": (v29/*: any*/),
        "fair.filtered_artworks.pageCursors.previous.cursor": (v19/*: any*/),
        "fair.filtered_artworks.pageCursors.previous.page": (v28/*: any*/),
        "fair.filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "fair.filtered_artworks.pageInfo.endCursor": (v23/*: any*/),
        "fair.filtered_artworks.pageInfo.hasNextPage": (v26/*: any*/),
        "fair.id": (v21/*: any*/),
        "fair.internalID": (v21/*: any*/),
        "fair.sidebarAggregations": (v18/*: any*/),
        "fair.sidebarAggregations.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworksAggregationResults"
        },
        "fair.sidebarAggregations.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "fair.sidebarAggregations.aggregations.counts.count": (v28/*: any*/),
        "fair.sidebarAggregations.aggregations.counts.name": (v19/*: any*/),
        "fair.sidebarAggregations.aggregations.counts.value": (v19/*: any*/),
        "fair.sidebarAggregations.aggregations.slice": {
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ARTIST_SERIES",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "INSTITUTION",
            "LOCATION_CITY",
            "MAJOR_PERIOD",
            "MATERIALS_TERMS",
            "MEDIUM",
            "MERCHANDISABLE_ARTISTS",
            "PARTNER",
            "PARTNER_CITY",
            "PERIOD",
            "PRICE_RANGE",
            "SIMPLE_PRICE_HISTOGRAM",
            "TOTAL"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtworkAggregation"
        },
        "fair.sidebarAggregations.id": (v21/*: any*/),
        "fair.slug": (v21/*: any*/)
      }
    },
    "name": "FairArtworks_Query",
    "operationKind": "query",
    "text": "query FairArtworks_Query(\n  $slug: String!\n) {\n  fair(id: $slug) {\n    ...FairArtworks_fair\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks_3QDGWC\n}\n\nfragment ArtworkGrid_artworks_3QDGWC on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_3QDGWC\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FairArtworks_fair on Fair {\n  slug\n  internalID\n  sidebarAggregations: filterArtworksConnection(first: 1) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    counts {\n      followedArtists\n      total(format: \"0,0\")\n    }\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment FlatGridItem_artwork_3QDGWC on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "b499cf72d9cc5f896f58124ab131fd7a";

export default node;
