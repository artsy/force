/**
 * @generated SignedSource<<b2c86f7e6f7b5212be27603c1e3cc8e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OrderInformation_order$data = {
  readonly code: string;
  readonly lastOffer?: {
    readonly amount: string | null | undefined;
  } | null | undefined;
  readonly state: CommerceOrderStateEnum;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
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

(node as any).hash = "13a40b6902c041d3f9c0be30ad60eeb3";

export default node;
