/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Details_conversation = {
    readonly to: {
        readonly name: string;
        readonly initials: string | null;
    };
    readonly " $refType": "Details_conversation";
};
export type Details_conversation$data = Details_conversation;
export type Details_conversation$key = {
    readonly " $data"?: Details_conversation$data;
    readonly " $fragmentRefs": FragmentRefs<"Details_conversation">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "Details_conversation",
  "type": "Conversation",
  "metadata": null,
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 30
    },
    {
      "kind": "LocalArgument",
      "name": "after",
      "type": "String",
      "defaultValue": null
    }
  ],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "to",
      "storageKey": null,
      "args": null,
      "concreteType": "ConversationResponder",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "initials",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = '18db4b075127d6d1e0ad90937c5c31dd';
export default node;
