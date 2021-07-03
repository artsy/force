/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnreadMessagesToast_conversation = {
    readonly id: string;
    readonly internalID: string | null;
    readonly lastMessageID: string | null;
    readonly fromLastViewedMessageID: string | null;
    readonly isLastMessageToUser: boolean | null;
    readonly " $refType": "UnreadMessagesToast_conversation";
};
export type UnreadMessagesToast_conversation$data = UnreadMessagesToast_conversation;
export type UnreadMessagesToast_conversation$key = {
    readonly " $data"?: UnreadMessagesToast_conversation$data;
    readonly " $fragmentRefs": FragmentRefs<"UnreadMessagesToast_conversation">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnreadMessagesToast_conversation",
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
      "name": "lastMessageID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fromLastViewedMessageID",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isLastMessageToUser",
      "storageKey": null
    }
  ],
  "type": "Conversation"
};
(node as any).hash = '54cb8f721886cc6671b1f08f70cfe66f';
export default node;
