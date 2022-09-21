/**
 * @generated SignedSource<<ff455b45a20767ec5cbd7fbc355798c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation_me$data = {
  readonly conversation: {
    readonly internalID: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"Conversation_conversation" | "ConversationCTA_conversation" | "DetailsSidebar_conversation">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationList_me">;
  readonly " $fragmentType": "Conversation_me";
};
export type Conversation_me$key = {
  readonly " $data"?: Conversation_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"Conversation_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "conversationID"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Conversation_me",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConversationList_me"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "conversationID"
        }
      ],
      "concreteType": "Conversation",
      "kind": "LinkedField",
      "name": "conversation",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "Conversation_conversation"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ConversationCTA_conversation"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DetailsSidebar_conversation"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "bc0d9d87bef35d4595f3ebcf50105543";

export default node;
