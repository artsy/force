/**
 * @generated SignedSource<<e5f90c1a8cb12a875be9945ac078b3c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessage_message$data = {
  readonly __typename: "Message";
  readonly attachments: ReadonlyArray<{
    readonly contentType: string;
    readonly downloadURL: string;
    readonly fileName: string;
    readonly internalID: string;
  } | null | undefined> | null | undefined;
  readonly body: string | null | undefined;
  readonly cc: ReadonlyArray<string>;
  readonly createdAt: string;
  readonly deliveries: ReadonlyArray<{
    readonly fullTransformedEmail: string;
    readonly openedAt: string | null | undefined;
  } | null | undefined>;
  readonly from: {
    readonly name: string | null | undefined;
  };
  readonly id: string;
  readonly internalID: string;
  readonly isFirstMessage: boolean | null | undefined;
  readonly isFromUser: boolean;
  readonly isMessageSentOnPlatform: boolean | null | undefined;
  readonly to: ReadonlyArray<string>;
  readonly " $fragmentType": "ConversationMessage_message";
} | null | undefined;
export type ConversationMessage_message$key = {
  readonly " $data"?: ConversationMessage_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessage_message">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConversationMessage_message",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Attachment",
      "kind": "LinkedField",
      "name": "attachments",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "contentType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "downloadURL",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "fileName",
          "storageKey": null
        }
      ],
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
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isMessageSentOnPlatform",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "Delivery",
        "kind": "LinkedField",
        "name": "deliveries",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "openedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "fullTransformedEmail",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isFromUser",
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFirstMessage",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "MessageInitiator",
        "kind": "LinkedField",
        "name": "from",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "to",
        "storageKey": null
      },
      "action": "NONE"
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cc",
        "storageKey": null
      },
      "action": "NONE"
    }
  ],
  "type": "Message",
  "abstractKey": null
};
})();

(node as any).hash = "ef142e13019aff13be722a729ce693e3";

export default node;
