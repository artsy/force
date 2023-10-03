/**
 * @generated SignedSource<<c19318f22a416dda00aaf21142378a34>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessage_message$data = {
  readonly attachments: ReadonlyArray<{
    readonly contentType: string;
    readonly downloadURL: string;
    readonly fileName: string;
    readonly internalID: string;
  } | null> | null;
  readonly body: string | null;
  readonly cc: ReadonlyArray<string>;
  readonly createdAt: string | null;
  readonly createdAtTime: string;
  readonly deliveries: ReadonlyArray<{
    readonly fullTransformedEmail: string;
    readonly openedAt: string | null;
  } | null>;
  readonly from: {
    readonly name: string | null;
  };
  readonly id: string;
  readonly internalID: string;
  readonly isFirstMessage: boolean | null;
  readonly isFromUser: boolean | null;
  readonly to: ReadonlyArray<string>;
  readonly " $fragmentType": "ConversationMessage_message";
} | null;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "kind": "RequiredField",
      "field": {
        "alias": "createdAtTime",
        "args": [
          {
            "kind": "Literal",
            "name": "format",
            "value": "h:mmA"
          }
        ],
        "kind": "ScalarField",
        "name": "createdAt",
        "storageKey": "createdAt(format:\"h:mmA\")"
      },
      "action": "NONE",
      "path": "createdAtTime"
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
      "action": "NONE",
      "path": "deliveries"
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
      "action": "NONE",
      "path": "from"
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
      "action": "NONE",
      "path": "to"
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
      "action": "NONE",
      "path": "cc"
    }
  ],
  "type": "Message",
  "abstractKey": null
};
})();

(node as any).hash = "8af28f2432bfb55dede921f1c02a89bb";

export default node;
