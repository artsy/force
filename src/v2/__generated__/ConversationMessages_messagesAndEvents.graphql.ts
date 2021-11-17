/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_messagesAndEvents = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly __typename: string;
            readonly internalID?: string;
            readonly createdAt?: string | null;
            readonly isFromUser?: boolean | null;
            readonly body?: string | null;
            readonly state?: string;
            readonly stateReason?: string | null;
            readonly " $fragmentRefs": FragmentRefs<"OrderUpdate_event" | "Message_message">;
        } | null;
    } | null> | null;
    readonly " $refType": "ConversationMessages_messagesAndEvents";
};
export type ConversationMessages_messagesAndEvents$data = ConversationMessages_messagesAndEvents;
export type ConversationMessages_messagesAndEvents$key = {
    readonly " $data"?: ConversationMessages_messagesAndEvents$data;
    readonly " $fragmentRefs": FragmentRefs<"ConversationMessages_messagesAndEvents">;
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
  "name": "ConversationMessages_messagesAndEvents",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationEventEdge",
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
                  "name": "internalID",
                  "storageKey": null
                },
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isFromUser",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "body",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Message_message"
                }
              ],
              "type": "Message"
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
              "type": "ConversationOrderStateChanged"
            },
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/)
              ],
              "type": "ConversationOfferSubmitted"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ConversationEventConnection"
};
})();
(node as any).hash = '8ced926f1a1c378448634be827f975c8';
export default node;
