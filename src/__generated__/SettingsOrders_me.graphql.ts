/**
 * @generated SignedSource<<9be5eb1ff96d279f76358c4cb17280d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsOrders_me$data = {
  readonly ordersConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"SettingsOrdersRow_order">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
    readonly pageCursors: {
      readonly " $fragmentSpreads": FragmentRefs<"Pagination_pageCursors">;
    };
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
    };
  } | null | undefined;
  readonly " $fragmentType": "SettingsOrders_me";
};
export type SettingsOrders_me$key = {
  readonly " $data"?: SettingsOrders_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsOrders_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": [
        "SUBMITTED",
        "OFFER_RECEIVED",
        "PAYMENT_FAILED",
        "PROCESSING_PAYMENT",
        "PROCESSING_OFFLINE_PAYMENT",
        "APPROVED",
        "SHIPPED",
        "COMPLETED",
        "CANCELED",
        "REFUNDED",
        "DECLINED_BY_SELLER",
        "DECLINED_BY_BUYER"
      ],
      "kind": "LocalArgument",
      "name": "buyerState"
    },
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsOrders_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "buyerState",
          "variableName": "buyerState"
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        }
      ],
      "concreteType": "MeOrdersConnection",
      "kind": "LinkedField",
      "name": "ordersConnection",
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
              "name": "hasPreviousPage",
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
        {
          "alias": null,
          "args": null,
          "concreteType": "MeOrdersEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Order",
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
                  "name": "SettingsOrdersRow_order"
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
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "41b80ea8a6c94e4e588c919122326866";

export default node;
