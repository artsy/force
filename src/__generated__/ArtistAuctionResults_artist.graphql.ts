/**
 * @generated SignedSource<<8a9607adefbe2f2cb52077053dec3d5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResults_artist$data = {
  readonly auctionResultsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly isUpcoming: boolean | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
    };
    readonly pageInfo: {
      readonly endCursor: string | null | undefined;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly meta: {
    readonly description: string;
    readonly title: string;
  };
  readonly name: string | null | undefined;
  readonly pastAuctionResults: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly statuses: {
    readonly auctionLots: boolean | null | undefined;
  } | null | undefined;
  readonly upcomingAuctionResults: {
    readonly totalCount: number | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistAuctionResults_artist";
};
export type ArtistAuctionResults_artist$key = {
  readonly " $data"?: ArtistAuctionResults_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResults_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "allowEmptyCreatedDates",
  "variableName": "allowEmptyCreatedDates"
},
v1 = {
  "kind": "Variable",
  "name": "allowUnspecifiedSaleDates",
  "variableName": "allowUnspecifiedSaleDates"
},
v2 = {
  "kind": "Variable",
  "name": "categories",
  "variableName": "categories"
},
v3 = {
  "kind": "Variable",
  "name": "currency",
  "variableName": "currency"
},
v4 = {
  "kind": "Variable",
  "name": "earliestCreatedYear",
  "variableName": "createdAfterYear"
},
v5 = {
  "kind": "Variable",
  "name": "includeEstimateRange",
  "variableName": "includeEstimateRange"
},
v6 = {
  "kind": "Variable",
  "name": "includeUnknownPrices",
  "variableName": "includeUnknownPrices"
},
v7 = {
  "kind": "Variable",
  "name": "keyword",
  "variableName": "keyword"
},
v8 = {
  "kind": "Variable",
  "name": "latestCreatedYear",
  "variableName": "createdBeforeYear"
},
v9 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v10 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v11 = {
  "kind": "Variable",
  "name": "saleEndYear",
  "variableName": "saleEndYear"
},
v12 = {
  "kind": "Variable",
  "name": "saleStartYear",
  "variableName": "saleStartYear"
},
v13 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v15 = [
  (v14/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "allowEmptyCreatedDates"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "allowUnspecifiedSaleDates"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "before"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "categories"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdAfterYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "createdBeforeYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "currency"
    },
    {
      "defaultValue": 50,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeEstimateRange"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "includeUnknownPrices"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "keyword"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "last"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "organizations"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "page"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "priceRange"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleEndYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "saleStartYear"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "size"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "sizes"
    },
    {
      "defaultValue": "DATE_DESC",
      "kind": "LocalArgument",
      "name": "sort"
    },
    {
      "defaultValue": "ALL",
      "kind": "LocalArgument",
      "name": "state"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAuctionResults_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "page",
          "value": "AUCTION_RESULTS"
        }
      ],
      "concreteType": "ArtistMeta",
      "kind": "LinkedField",
      "name": "meta",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": "meta(page:\"AUCTION_RESULTS\")"
    },
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
          "name": "auctionLots",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        },
        (v8/*: any*/),
        (v9/*: any*/),
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        {
          "kind": "Variable",
          "name": "size",
          "variableName": "size"
        },
        (v13/*: any*/),
        {
          "kind": "Variable",
          "name": "sort",
          "variableName": "sort"
        },
        {
          "kind": "Variable",
          "name": "state",
          "variableName": "state"
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors"
            }
          ],
          "storageKey": null
        },
        (v14/*: any*/),
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistAuctionResultItem_auctionResult"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isUpcoming",
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
      "alias": "pastAuctionResults",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        {
          "kind": "Literal",
          "name": "state",
          "value": "PAST"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "auctionResultsConnection",
      "plural": false,
      "selections": (v15/*: any*/),
      "storageKey": null
    },
    {
      "alias": "upcomingAuctionResults",
      "args": [
        (v0/*: any*/),
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
        (v7/*: any*/),
        (v8/*: any*/),
        (v9/*: any*/),
        (v10/*: any*/),
        (v11/*: any*/),
        (v12/*: any*/),
        (v13/*: any*/),
        {
          "kind": "Literal",
          "name": "state",
          "value": "UPCOMING"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "auctionResultsConnection",
      "plural": false,
      "selections": (v15/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "d67a990e35e7b52e0a04497b9b1a59f9";

export default node;
