/**
 * @generated SignedSource<<1bc38ebdc862e2a3ad469e3014c80a9e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationOrderUpdate_event$data = {
  readonly __typename: "CommerceOfferSubmittedEvent";
  readonly createdAt: string;
  readonly offer: {
    readonly amount: string | null | undefined;
    readonly definesTotal: boolean;
    readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
    readonly offerAmountChanged: boolean;
    readonly respondsTo: {
      readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
    } | null | undefined;
  };
  readonly " $fragmentType": "ConversationOrderUpdate_event";
} | {
  readonly __typename: "CommerceOrderStateChangedEvent";
  readonly createdAt: string;
  readonly orderUpdateState: string | null | undefined;
  readonly state: CommerceOrderStateEnum;
  readonly stateReason: string | null | undefined;
  readonly " $fragmentType": "ConversationOrderUpdate_event";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "ConversationOrderUpdate_event";
};
export type ConversationOrderUpdate_event$key = {
  readonly " $data"?: ConversationOrderUpdate_event$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationOrderUpdate_event">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationOrderUpdate_event",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "orderUpdateState",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "stateReason",
          "storageKey": null
        }
      ],
      "type": "CommerceOrderStateChangedEvent",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "offer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "amount",
              "storageKey": null
            },
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "definesTotal",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "offerAmountChanged",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceOffer",
              "kind": "LinkedField",
              "name": "respondsTo",
              "plural": false,
              "selections": [
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferSubmittedEvent",
      "abstractKey": null
    }
  ],
  "type": "CommerceOrderEventUnion",
  "abstractKey": "__isCommerceOrderEventUnion"
};
})();

(node as any).hash = "933decb94f0800d2c168c96b51b45456";

export default node;
