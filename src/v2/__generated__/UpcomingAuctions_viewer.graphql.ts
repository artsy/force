/**
 * @generated SignedSource<<2d807f01b6f915fe441e26e3e1062721>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpcomingAuctions_viewer$data = {
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
        readonly isLiveOpen: boolean | null;
        readonly " $fragmentSpreads": FragmentRefs<"AuctionArtworksRail_sale">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "UpcomingAuctions_viewer";
};
export type UpcomingAuctions_viewer$key = {
  readonly " $data"?: UpcomingAuctions_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpcomingAuctions_viewer">;
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
  "name": "UpcomingAuctions_viewer",
  "selections": [
    {
      "alias": "salesConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "auctionState",
          "value": "UPCOMING"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "START_AT_ASC"
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
                  "name": "isLiveOpen",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "AuctionArtworksRail_sale"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
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
      "storageKey": "__UpcomingAuctions_salesConnection_connection(auctionState:\"UPCOMING\",sort:\"START_AT_ASC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "2875ec4a03832fe0d075fa608daacfdc";

export default node;
