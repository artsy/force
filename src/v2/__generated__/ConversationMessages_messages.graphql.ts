/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_messages = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly internalID: string;
            readonly createdAt: string | null;
            readonly isFromUser: boolean | null;
            readonly body: string | null;
            readonly " $fragmentRefs": FragmentRefs<"Message_message">;
        } | null;
    } | null> | null;
    readonly " $refType": "ConversationMessages_messages";
};
export type ConversationMessages_messages$data = ConversationMessages_messages;
export type ConversationMessages_messages$key = {
    readonly " $data"?: ConversationMessages_messages$data;
    readonly " $fragmentRefs": FragmentRefs<"ConversationMessages_messages">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationMessages_messages",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MessageEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Message",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "createdAt",
              "storageKey": null
            },
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MessageConnection"
};
(node as any).hash = '3d49d0677e850768abb8449024ba453a';
export default node;
