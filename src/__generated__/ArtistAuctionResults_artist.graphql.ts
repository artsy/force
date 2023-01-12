/**
 * @generated SignedSource<<c3ed1b7fec711ebc60a4b5002f4c8047>>
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
    readonly createdYearRange: {
      readonly endAt: number | null;
      readonly startAt: number | null;
    } | null;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly isUpcoming: boolean | null;
        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
      } | null;
    } | null> | null;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
    };
    readonly pageInfo: {
      readonly endCursor: string | null;
      readonly hasNextPage: boolean;
    };
    readonly totalCount: number | null;
  } | null;
  readonly internalID: string;
  readonly name: string | null;
  readonly pastAuctionResults: {
    readonly totalCount: number | null;
  } | null;
  readonly slug: string;
  readonly upcomingAuctionResults: {
    readonly totalCount: number | null;
  } | null;
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
  "name": "categories",
  "variableName": "categories"
},
v2 = {
  "kind": "Variable",
  "name": "earliestCreatedYear",
  "variableName": "createdAfterYear"
},
v3 = {
  "kind": "Variable",
  "name": "keyword",
  "variableName": "keyword"
},
v4 = {
  "kind": "Variable",
  "name": "latestCreatedYear",
  "variableName": "createdBeforeYear"
},
v5 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v6 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v8 = [
  (v7/*: any*/)
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "allowEmptyCreatedDates"
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
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
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
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        (v0/*: any*/),
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        (v1/*: any*/),
        (v2/*: any*/),
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        (v3/*: any*/),
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        },
        (v4/*: any*/),
        (v5/*: any*/),
        (v6/*: any*/),
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
          "concreteType": "YearRange",
          "kind": "LinkedField",
          "name": "createdYearRange",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endAt",
              "storageKey": null
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "Pagination_pageCursors"
            }
          ],
          "storageKey": null
        },
        (v7/*: any*/),
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
      "selections": (v8/*: any*/),
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
      "selections": (v8/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "c800def08a7d26042d0b4e394d4856ac";

export default node;
