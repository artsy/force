/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UserSettingsPayments_me = {
    readonly id: string;
    readonly internalID: string;
    readonly creditCards: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly internalID: string;
                readonly brand: string;
                readonly lastDigits: string;
                readonly expirationYear: number;
                readonly expirationMonth: number;
                readonly __typename: string;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "UserSettingsPayments_me";
};
export type UserSettingsPayments_me$data = UserSettingsPayments_me;
export type UserSettingsPayments_me$key = {
    readonly " $data"?: UserSettingsPayments_me$data;
    readonly " $fragmentRefs": FragmentRefs<"UserSettingsPayments_me">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "creditCards"
        ]
      }
    ]
  },
  "name": "UserSettingsPayments_me",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": "creditCards",
      "args": null,
      "concreteType": "CreditCardConnection",
      "kind": "LinkedField",
      "name": "__UserSettingsPayments_creditCards_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CreditCardEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CreditCard",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "brand",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "lastDigits",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "expirationYear",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "expirationMonth",
                  "storageKey": null
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
  "type": "Me"
};
})();
(node as any).hash = 'fb1e0b6f4ace5339acfc650f9b020b42';
export default node;
