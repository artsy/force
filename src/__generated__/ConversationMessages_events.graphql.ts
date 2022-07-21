/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type ConversationMessages_events = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly orderHistory: ReadonlyArray<{
                readonly __typename: string;
                readonly state?: CommerceOrderStateEnum | undefined;
                readonly stateReason?: string | null | undefined;
                readonly createdAt?: string | undefined;
                readonly " $fragmentRefs": FragmentRefs<"OrderUpdate_event">;
            }>;
        } | null;
    } | null> | null;
    readonly " $refType": "ConversationMessages_events";
};
export type ConversationMessages_events$data = ConversationMessages_events;
export type ConversationMessages_events$key = {
    readonly " $data"?: ConversationMessages_events$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ConversationMessages_events">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationMessages_events",
  "selections": [
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
              "concreteType": null,
              "kind": "LinkedField",
              "name": "orderHistory",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "OrderUpdate_event"
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
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
                    },
                    (v0/*: any*/)
                  ],
                  "type": "CommerceOrderStateChangedEvent",
                  "abstractKey": null
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "type": "CommerceOfferSubmittedEvent",
                  "abstractKey": null
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
  "type": "CommerceOrderConnectionWithTotalCount",
  "abstractKey": null
};
})();
(node as any).hash = 'f4d042dc020c7280f6945d95fdcccd7f';
export default node;
