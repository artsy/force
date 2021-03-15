/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UpcomingAuctions_viewer = {
    readonly salesConnection: {
        readonly totalCount: number | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly name: string | null;
                readonly href: string | null;
                readonly status: string | null;
                readonly formattedStartDateTime: string | null;
                readonly eventStartAt: string | null;
                readonly " $fragmentRefs": FragmentRefs<"AuctionArtworksRail_sale">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "UpcomingAuctions_viewer";
};
export type UpcomingAuctions_viewer$data = UpcomingAuctions_viewer;
export type UpcomingAuctions_viewer$key = {
    readonly " $data"?: UpcomingAuctions_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"UpcomingAuctions_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 15,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
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
  "name": "UpcomingAuctions_viewer",
  "selections": [
    {
      "alias": "salesConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "live",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "published",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "END_AT_ASC"
        }
      ],
      "concreteType": "SaleConnection",
      "kind": "LinkedField",
      "name": "__UpcomingAuctions_salesConnection_connection",
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
                  "name": "status",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "formattedStartDateTime",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "eventStartAt",
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
      "storageKey": "__UpcomingAuctions_salesConnection_connection(live:true,published:false,sort:\"END_AT_ASC\")"
    }
  ],
  "type": "Viewer"
};
(node as any).hash = 'fd4828e32861f80fb4d3836c0d2dce22';
export default node;
