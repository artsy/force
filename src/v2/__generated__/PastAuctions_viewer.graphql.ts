/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PastAuctions_viewer = {
    readonly salesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly name: string | null;
                readonly href: string | null;
                readonly endAt: string | null;
                readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_sale">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PastAuctions_viewer";
};
export type PastAuctions_viewer$data = PastAuctions_viewer;
export type PastAuctions_viewer$key = {
    readonly " $data"?: PastAuctions_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PastAuctions_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "salesConnection"
        ]
      }
    ]
  },
  "name": "PastAuctions_viewer",
  "selections": [
    {
      "alias": "salesConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "auctionState",
          "value": "CLOSED"
        },
        {
          "kind": "Literal",
          "name": "live",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "TIMELY_AT_NAME_DESC"
        }
      ],
      "concreteType": "SaleConnection",
      "kind": "LinkedField",
      "name": "__PastAuctions_salesConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SaleEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Sale",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
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
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endAt",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "AuctionArtworksRail_sale"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
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
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__PastAuctions_salesConnection_connection(auctionState:\"CLOSED\",live:false,sort:\"TIMELY_AT_NAME_DESC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'e488ae430e93d48cda1a365fdd145a14';
export default node;
