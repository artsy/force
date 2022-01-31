/**
 * @generated SignedSource<<5967a794d74170762be207cfb7b199aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_events$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly orderHistory: ReadonlyArray<{
        readonly __typename: string;
        readonly state?: CommerceOrderStateEnum;
        readonly stateReason?: string | null;
        readonly createdAt?: string;
        readonly " $fragmentSpreads": FragmentRefs<"OrderUpdate_event">;
      }>;
    } | null;
  } | null> | null;
  readonly " $fragmentType": "ConversationMessages_events";
};
export type ConversationMessages_events$key = {
  readonly " $data"?: ConversationMessages_events$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_events">;
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "OrderUpdate_event"
                },
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

(node as any).hash = "f4d042dc020c7280f6945d95fdcccd7f";

export default node;
