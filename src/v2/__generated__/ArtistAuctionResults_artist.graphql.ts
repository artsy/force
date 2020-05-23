/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResults_artist = {
    readonly slug: string;
    readonly auctionResultsConnection: {
        readonly createdYearRange: {
            readonly startAt: number | null;
            readonly endAt: number | null;
        } | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"Pagination_pageCursors">;
        };
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly title: string | null;
                readonly dimension_text: string | null;
                readonly images: {
                    readonly thumbnail: {
                        readonly url: string | null;
                    } | null;
                } | null;
                readonly description: string | null;
                readonly date_text: string | null;
                readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
            } | null;
        } | null> | null;
        readonly " $fragmentRefs": FragmentRefs<"AuctionResultsCount_results">;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionResultHeader_artist">;
    readonly " $refType": "ArtistAuctionResults_artist";
};
export type ArtistAuctionResults_artist$data = ArtistAuctionResults_artist;
export type ArtistAuctionResults_artist$key = {
    readonly " $data"?: ArtistAuctionResults_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistAuctionResults_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "sort",
      "type": "AuctionResultSorts",
      "defaultValue": "DATE_DESC"
    },
    {
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int",
      "defaultValue": 10
    },
    {
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "before",
      "type": "String",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "organizations",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "categories",
      "type": "[String]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "sizes",
      "type": "[ArtworkSizes]",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "createdAfterYear",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "createdBeforeYear",
      "type": "Int",
      "defaultValue": null
    },
    {
      "kind": "LocalArgument",
      "name": "allowEmptyCreatedDates",
      "type": "Boolean",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "auctionResultsConnection",
      "storageKey": null,
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "allowEmptyCreatedDates",
          "variableName": "allowEmptyCreatedDates"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        {
          "kind": "Variable",
          "name": "categories",
          "variableName": "categories"
        },
        {
          "kind": "Variable",
          "name": "earliestCreatedYear",
          "variableName": "createdAfterYear"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        },
        {
          "kind": "Variable",
          "name": "latestCreatedYear",
          "variableName": "createdBeforeYear"
        },
        {
          "kind": "Variable",
          "name": "organizations",
          "variableName": "organizations"
        },
        {
          "kind": "Variable",
          "name": "sizes",
          "variableName": "sizes"
        },
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "createdYearRange",
          "storageKey": null,
          "args": null,
          "concreteType": "YearRange",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "startAt",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endAt",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageInfo",
          "storageKey": null,
          "args": null,
          "concreteType": "PageInfo",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "hasNextPage",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "endCursor",
              "args": null,
              "storageKey": null
            }
          ]
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "pageCursors",
          "storageKey": null,
          "args": null,
          "concreteType": "PageCursors",
          "plural": false,
          "selections": [
            {
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors",
              "args": null
            }
          ]
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "totalCount",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "AuctionResultEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "AuctionResult",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": "dimension_text",
                  "name": "dimensionText",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "images",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "AuctionLotImages",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "thumbnail",
                      "storageKey": null,
                      "args": null,
                      "concreteType": "Image",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "url",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "description",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": "date_text",
                  "name": "dateText",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ArtistAuctionResultItem_auctionResult",
                  "args": null
                }
              ]
            }
          ]
        },
        {
          "kind": "FragmentSpread",
          "name": "AuctionResultsCount_results",
          "args": null
        }
      ]
    },
    {
      "kind": "FragmentSpread",
      "name": "AuctionResultHeader_artist",
      "args": null
    }
  ]
};
(node as any).hash = '64781867ff4cd19aac913f6c8a5c8dec';
export default node;
