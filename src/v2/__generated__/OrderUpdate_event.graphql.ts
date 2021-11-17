/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationOfferPartyType = "BUYER" | "SELLER" | "%future added value";
export type OrderUpdate_event = {
    readonly __typename: "ConversationOrderStateChanged";
    readonly createdAt: string | null;
    readonly stateReason: string | null;
    readonly state: string;
    readonly " $refType": "OrderUpdate_event";
} | {
    readonly __typename: "ConversationOfferSubmitted";
    readonly createdAt: string | null;
    readonly amount: string;
    readonly fromParticipant: ConversationOfferPartyType | null;
    readonly offerAmountChanged: boolean | null;
    readonly respondsTo: {
        readonly fromParticipant: ConversationOfferPartyType | null;
    } | null;
    readonly " $refType": "OrderUpdate_event";
} | {
    /*This will never be '%other', but we need some
    value in case none of the concrete values match.*/
    readonly __typename: "%other";
    readonly " $refType": "OrderUpdate_event";
};
export type OrderUpdate_event$data = OrderUpdate_event;
export type OrderUpdate_event$key = {
    readonly " $data"?: OrderUpdate_event$data;
    readonly " $fragmentRefs": FragmentRefs<"OrderUpdate_event">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v2 = {
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
  "name": "OrderUpdate_event",
  "selections": [
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "stateReason",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "state",
          "storageKey": null
        }
      ],
      "type": "ConversationOrderStateChanged"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v0/*: any*/),
        (v1/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        },
        (v2/*: any*/),
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
          "concreteType": "ConversationOfferSubmitted",
          "kind": "LinkedField",
          "name": "respondsTo",
          "plural": false,
          "selections": [
            (v2/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "ConversationOfferSubmitted"
    }
  ],
  "type": "ConversationEvent"
};
})();
(node as any).hash = '7b41da37f83185852b0f6151cc06a8a2';
export default node;
