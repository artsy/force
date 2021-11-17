/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type ConversationMessages_events = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly orderHistory: ReadonlyArray<{
                readonly __typename: "CommerceOrderStateChangedEvent";
                readonly state: CommerceOrderStateEnum;
                readonly stateReason: string | null;
                readonly createdAt: string;
            } | {
                readonly __typename: "CommerceOfferSubmittedEvent";
                readonly createdAt: string;
            } | {
                /*This will never be '%other', but we need some
                value in case none of the concrete values match.*/
                readonly __typename: "%other";
            }>;
        } | null;
    } | null> | null;
    readonly " $refType": "ConversationMessages_events";
};
export type ConversationMessages_events$data = ConversationMessages_events;
export type ConversationMessages_events$key = {
    readonly " $data"?: ConversationMessages_events$data;
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
                  "type": "CommerceOrderStateChangedEvent"
                },
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "type": "CommerceOfferSubmittedEvent"
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
  "type": "CommerceOrderConnectionWithTotalCount"
};
})();
(node as any).hash = '2748648b17cc3e36cd0ef77e4b63ef17';
export default node;
