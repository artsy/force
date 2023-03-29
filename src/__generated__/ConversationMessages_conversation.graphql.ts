/**
 * @generated SignedSource<<8f763bb66b96c2ac7d991a7af4a7d738>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_conversation$data = {
  readonly id: string;
  readonly inquiryRequest: {
    readonly formattedFirstMessage: string | null;
  } | null;
  readonly messagesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly createdAt: string | null;
        readonly id: string;
        readonly isFromUser: boolean | null;
        readonly " $fragmentSpreads": FragmentRefs<"ConversationMessage_message">;
      } | null;
    } | null> | null;
  };
  readonly " $fragmentType": "ConversationMessages_conversation";
} | null;
export type ConversationMessages_conversation$key = {
  readonly " $data"?: ConversationMessages_conversation$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "messagesConnection"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
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
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ConversationMessagesPaginationQuery.graphql'),
      "identifierField": "id"
    }
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
                  (v1/*: any*/),
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
          },
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
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
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
    },
    (v1/*: any*/)
  ],
  "type": "Conversation",
  "abstractKey": null
};
})();

(node as any).hash = "6a0ac5931c4c59e2b8baf366eca98e99";

export default node;
