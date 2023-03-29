/**
 * @generated SignedSource<<0e4045c5e15d559a6f3e882a55deda18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderInformation_order$data = {
  readonly code: string;
  readonly lastOffer?: {
    readonly amount: string | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"OrderState_state" | "ReviewOrderButton_order">;
  readonly " $fragmentType": "OrderInformation_order";
};
export type OrderInformation_order$key = {
  readonly " $data"?: OrderInformation_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderInformation_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderInformation_order",
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
      "name": "OrderState_state"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ReviewOrderButton_order"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "lastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "precision",
                  "value": 2
                }
              ],
              "kind": "ScalarField",
              "name": "amount",
              "storageKey": "amount(precision:2)"
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "65344b77abd3dd5c9a93c80d235465a7";

export default node;
