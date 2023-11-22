/**
 * @generated SignedSource<<3e39a8b8c14cbbf400f25dbd45b45763>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OrderState_state$data = {
  readonly lastOffer?: {
    readonly from: {
      readonly __typename: string;
    };
    readonly offerAmountChanged: boolean;
  } | null | undefined;
  readonly mode: CommerceOrderModeEnum;
  readonly state: CommerceOrderStateEnum;
  readonly stateReason: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"OrderStateStatusWithCounter_order">;
  readonly " $fragmentType": "OrderState_state";
} | null | undefined;
export type OrderState_state$key = {
  readonly " $data"?: OrderState_state$data;
  readonly " $fragmentSpreads": FragmentRefs<"OrderState_state">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OrderState_state",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "state",
        "storageKey": null
      },
      "action": "NONE",
      "path": "state"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mode",
        "storageKey": null
      },
      "action": "NONE",
      "path": "mode"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "stateReason",
      "storageKey": null
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
              "kind": "RequiredField",
              "field": {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "from",
                "plural": false,
                "selections": [
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
              "action": "NONE",
              "path": "lastOffer.from"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "offerAmountChanged",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderStateStatusWithCounter_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};

(node as any).hash = "95330a81e0e642b32375f1e595399f09";

export default node;
