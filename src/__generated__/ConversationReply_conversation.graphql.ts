/**
 * @generated SignedSource<<d81ec8db8daedeeded4dfe0575f7c0a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationReply_conversation$data = {
  readonly from: {
    readonly email: string;
    readonly id: string;
  };
  readonly inquiryID: string;
  readonly internalID: string;
  readonly items: ReadonlyArray<{
    readonly item: {
      readonly id?: string;
    } | null;
  } | null> | null;
  readonly lastMessageID: string | null;
  readonly " $fragmentType": "ConversationReply_conversation";
} | null;
export type ConversationReply_conversation$key = {
  readonly " $data"?: ConversationReply_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationReply_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationReply_conversation",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "ConversationInitiator",
        "kind": "LinkedField",
        "name": "from",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "email",
              "storageKey": null
            },
            "action": "NONE",
            "path": "from.email"
          },
          {
            "kind": "RequiredField",
            "field": (v0/*: any*/),
            "action": "NONE",
            "path": "from.id"
          }
        ],
        "storageKey": null
      },
      "action": "NONE",
      "path": "from"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "internalID",
        "storageKey": null
      },
      "action": "NONE",
      "path": "internalID"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inquiryID",
        "storageKey": null
      },
      "action": "NONE",
      "path": "inquiryID"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ConversationItem",
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "item",
          "plural": false,
          "selections": [
            {
              "kind": "InlineFragment",
              "selections": [
                (v0/*: any*/)
              ],
              "type": "Artwork",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastMessageID",
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "b967a564d2efdf3f8b70e12f5197d16f";

export default node;
