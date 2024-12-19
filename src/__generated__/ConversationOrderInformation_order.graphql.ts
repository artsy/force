/**
 * @generated SignedSource<<c9a727abb97399fbc929c7cb184e7ae7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationOrderInformation_order$data = {
  readonly code: string;
  readonly lastOffer?: {
    readonly amount: string | null | undefined;
  } | null | undefined;
  readonly state: CommerceOrderStateEnum;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationOrderState_state" | "ReviewOrderButton_order">;
  readonly " $fragmentType": "ConversationOrderInformation_order";
};
export type ConversationOrderInformation_order$key = {
  readonly " $data"?: ConversationOrderInformation_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationOrderInformation_order">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationOrderInformation_order",
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
      "name": "ConversationOrderState_state"
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

(node as any).hash = "10459e845633763a63ac840e4cf651eb";

export default node;
