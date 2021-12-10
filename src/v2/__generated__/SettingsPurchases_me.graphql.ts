/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchases_me = {
    readonly name: string | null;
    readonly orders: {
        readonly totalCount: number | null;
        readonly pageInfo: {
            readonly hasNextPage: boolean;
            readonly endCursor: string | null;
        };
        readonly pageCursors: {
            readonly " $fragmentRefs": FragmentRefs<"CommercePagination_pageCursors">;
        } | null;
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly code: string;
                readonly " $fragmentRefs": FragmentRefs<"SettingsPurchasesRow_order">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "SettingsPurchases_me";
};
export type SettingsPurchases_me$data = SettingsPurchases_me;
export type SettingsPurchases_me$key = {
    readonly " $data"?: SettingsPurchases_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsPurchases_me">;
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
    },
    {
      "defaultValue": [
        "APPROVED",
        "CANCELED",
        "FULFILLED",
        "REFUNDED",
        "SUBMITTED"
      ],
      "kind": "LocalArgument",
      "name": "states"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsPurchases_me",
  "selections": [
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
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "states",
          "variableName": "states"
        }
      ],
      "concreteType": "CommerceOrderConnectionWithTotalCount",
      "kind": "LinkedField",
      "name": "orders",
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
          "concreteType": "CommercePageInfo",
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
          "concreteType": "CommercePageCursors",
          "kind": "LinkedField",
          "name": "pageCursors",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CommercePagination_pageCursors"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOrderEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "code",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SettingsPurchasesRow_order"
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
(node as any).hash = '9468eff95ef41e986a57b3da6a720318';
export default node;
