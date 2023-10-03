/**
 * @generated SignedSource<<264b0d43cdcc85d3616705cdcde020b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_conversation$data = {
  readonly inquiryRequest: {
    readonly formattedFirstMessage: string | null;
  } | null;
  readonly messagesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdAt: string | null;
        readonly id: string;
        readonly internalID: string;
        readonly isFromUser: boolean | null;
        readonly " $fragmentSpreads": FragmentRefs<"ConversationMessage_message">;
      } | null;
    } | null> | null;
    readonly pageInfo: {
      readonly hasNextPage: boolean;
      readonly hasPreviousPage: boolean;
      readonly startCursor: string | null;
    };
  };
  readonly " $fragmentType": "ConversationMessages_conversation";
} | null;
export type ConversationMessages_conversation$key = {
  readonly " $data"?: ConversationMessages_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "messagesConnection"
        ]
      }
    ]
  },
  "name": "ConversationMessages_conversation",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": "messagesConnection",
        "args": [
          {
            "kind": "Literal",
            "name": "sort",
            "value": "DESC"
          }
        ],
        "concreteType": "MessageConnection",
        "kind": "LinkedField",
        "name": "__ConversationMessages_conversation_messagesConnection_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasPreviousPage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "startCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ConversationMessage_message"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "__ConversationMessages_conversation_messagesConnection_connection(sort:\"DESC\")"
      },
      "action": "NONE",
      "path": "messagesConnection"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerInquiryRequest",
      "kind": "LinkedField",
      "name": "inquiryRequest",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "formattedFirstMessage",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Conversation",
  "abstractKey": null
};

(node as any).hash = "aebc6e389059be4455b62e7a3ba34c35";

export default node;
