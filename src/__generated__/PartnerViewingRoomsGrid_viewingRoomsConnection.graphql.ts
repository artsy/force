/**
 * @generated SignedSource<<eb07fb52fe9eed2345587f42be026212>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerViewingRoomsGrid_viewingRoomsConnection$data = {
  readonly viewingRoomsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomCard_viewingRoom">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "PartnerViewingRoomsGrid_viewingRoomsConnection";
};
export type PartnerViewingRoomsGrid_viewingRoomsConnection$key = {
  readonly " $data"?: PartnerViewingRoomsGrid_viewingRoomsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerViewingRoomsGrid_viewingRoomsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "statuses"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "viewingRoomsConnection"
        ]
      }
    ]
  },
  "name": "PartnerViewingRoomsGrid_viewingRoomsConnection",
  "selections": [
    {
      "alias": "viewingRoomsConnection",
      "args": [
        {
          "kind": "Variable",
          "name": "statuses",
          "variableName": "statuses"
        }
      ],
      "concreteType": "ViewingRoomsConnection",
      "kind": "LinkedField",
      "name": "__PartnerViewingRoomsGrid_viewingRoomsConnection_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ViewingRoomsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ViewingRoom",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ViewingRoomCard_viewingRoom"
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
      "storageKey": null
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "ec5493ffd28df2ae9c2f4490f5b0f97a";

export default node;
