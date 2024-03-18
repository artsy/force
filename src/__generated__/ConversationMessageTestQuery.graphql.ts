/**
 * @generated SignedSource<<450f09b16de4859309f70d954a458224>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessageTestQuery$variables = Record<PropertyKey, never>;
export type ConversationMessageTestQuery$data = {
  readonly conversation: {
    readonly messagesConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"ConversationMessage_message">;
        } | null | undefined;
      } | null | undefined>;
    };
  };
} | null | undefined;
export type ConversationMessageTestQuery = {
  response: ConversationMessageTestQuery$data;
  variables: ConversationMessageTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationMessageTestQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": (v0/*: any*/),
          "concreteType": "Conversation",
          "kind": "LinkedField",
          "name": "conversation",
          "plural": false,
          "selections": [
            {
              "kind": "RequiredField",
              "field": {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "MessageConnection",
                "kind": "LinkedField",
                "name": "messagesConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "RequiredField",
                    "field": {
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
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "ConversationMessage_message"
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    "action": "NONE",
                    "path": "conversation.messagesConnection.edges"
                  }
                ],
                "storageKey": "messagesConnection(first:1)"
              },
              "action": "NONE",
              "path": "conversation.messagesConnection"
            }
          ],
          "storageKey": "conversation(id:\"123\")"
        },
        "action": "NONE",
        "path": "conversation"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationMessageTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Conversation",
        "kind": "LinkedField",
        "name": "conversation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "MessageConnection",
            "kind": "LinkedField",
            "name": "messagesConnection",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Attachment",
                        "kind": "LinkedField",
                        "name": "attachments",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
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
                          },
                          (v2/*: any*/)
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isMessageSentOnPlatform",
                        "storageKey": null
                      },
                      {
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
                      {
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
                          },
                          (v2/*: any*/)
                        ],
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
                        "name": "isFirstMessage",
                        "storageKey": null
                      },
                      {
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "to",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cc",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "messagesConnection(first:1)"
          },
          (v2/*: any*/)
        ],
        "storageKey": "conversation(id:\"123\")"
      }
    ]
  },
  "params": {
    "cacheID": "fab2f3ffc55f6b67ea106ea284ea0433",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.id": (v4/*: any*/),
        "conversation.messagesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageConnection"
        },
        "conversation.messagesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MessageEdge"
        },
        "conversation.messagesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "conversation.messagesConnection.edges.node.__typename": (v5/*: any*/),
        "conversation.messagesConnection.edges.node.attachments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Attachment"
        },
        "conversation.messagesConnection.edges.node.attachments.contentType": (v5/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.downloadURL": (v5/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.fileName": (v5/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.id": (v4/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.internalID": (v4/*: any*/),
        "conversation.messagesConnection.edges.node.body": (v6/*: any*/),
        "conversation.messagesConnection.edges.node.cc": (v7/*: any*/),
        "conversation.messagesConnection.edges.node.createdAt": (v6/*: any*/),
        "conversation.messagesConnection.edges.node.createdAtTime": (v6/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Delivery"
        },
        "conversation.messagesConnection.edges.node.deliveries.fullTransformedEmail": (v5/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries.id": (v4/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries.openedAt": (v6/*: any*/),
        "conversation.messagesConnection.edges.node.from": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageInitiator"
        },
        "conversation.messagesConnection.edges.node.from.name": (v6/*: any*/),
        "conversation.messagesConnection.edges.node.id": (v4/*: any*/),
        "conversation.messagesConnection.edges.node.internalID": (v4/*: any*/),
        "conversation.messagesConnection.edges.node.isFirstMessage": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.isFromUser": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.isMessageSentOnPlatform": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.to": (v7/*: any*/)
      }
    },
    "name": "ConversationMessageTestQuery",
    "operationKind": "query",
    "text": "query ConversationMessageTestQuery {\n  conversation(id: \"123\") {\n    messagesConnection(first: 1) {\n      edges {\n        node {\n          ...ConversationMessage_message\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ConversationMessage_message on Message {\n  __typename\n  id\n  internalID\n  attachments {\n    internalID\n    contentType\n    downloadURL\n    fileName\n    id\n  }\n  body\n  createdAt\n  isMessageSentOnPlatform\n  createdAtTime: createdAt(format: \"h:mmA\")\n  deliveries {\n    openedAt\n    fullTransformedEmail\n    id\n  }\n  isFromUser\n  isFirstMessage\n  from {\n    name\n  }\n  to\n  cc\n}\n"
  }
};
})();

(node as any).hash = "3e5c2bc301e35f8959fbf6b5d831ecec";

export default node;
