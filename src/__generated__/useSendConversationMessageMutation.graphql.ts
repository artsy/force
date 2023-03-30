/**
 * @generated SignedSource<<09e345928695b8aa7409a48c23792897>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SendConversationMessageMutationInput = {
  attachments?: ReadonlyArray<ConversationMessageAttachmentInput> | null;
  bodyHTML?: string | null;
  bodyText: string;
  clientMutationId?: string | null;
  from: string;
  fromId?: string | null;
  id: string;
  replyAll?: boolean | null;
  replyToMessageID: string;
  to?: ReadonlyArray<string | null> | null;
};
export type ConversationMessageAttachmentInput = {
  id?: string | null;
  name: string;
  size?: string | null;
  type: string;
  url: string;
};
export type useSendConversationMessageMutation$variables = {
  input: SendConversationMessageMutationInput;
};
export type useSendConversationMessageMutation$data = {
  readonly sendConversationMessage: {
    readonly conversation: {
      readonly lastMessageID: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
    } | null;
  } | null;
};
export type useSendConversationMessageMutation = {
  response: useSendConversationMessageMutation$data;
  variables: useSendConversationMessageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastMessageID",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "DESC"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSendConversationMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendConversationMessageMutationPayload",
        "kind": "LinkedField",
        "name": "sendConversationMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConversationMessages_conversation"
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSendConversationMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendConversationMessageMutationPayload",
        "kind": "LinkedField",
        "name": "sendConversationMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v3/*: any*/),
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
                          (v4/*: any*/),
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
                            "concreteType": "Attachment",
                            "kind": "LinkedField",
                            "name": "attachments",
                            "plural": true,
                            "selections": [
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
                              (v4/*: any*/)
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
                              (v4/*: any*/)
                            ],
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
                "storageKey": "messagesConnection(first:10,sort:\"DESC\")"
              },
              {
                "alias": null,
                "args": (v3/*: any*/),
                "filters": [
                  "sort"
                ],
                "handle": "connection",
                "key": "ConversationMessages_conversation_messagesConnection",
                "kind": "LinkedHandle",
                "name": "messagesConnection"
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
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b5ba9aeaf0c399b46170e2cbe6397f4",
    "id": null,
    "metadata": {},
    "name": "useSendConversationMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useSendConversationMessageMutation(\n  $input: SendConversationMessageMutationInput!\n) {\n  sendConversationMessage(input: $input) {\n    conversation {\n      ...ConversationMessages_conversation\n      lastMessageID\n      id\n    }\n  }\n}\n\nfragment ConversationMessage_message on Message {\n  attachments {\n    internalID\n    contentType\n    downloadURL\n    fileName\n    id\n  }\n  body\n  createdAtTime: createdAt(format: \"h:mmA\")\n  deliveries {\n    openedAt\n    fullTransformedEmail\n    id\n  }\n  isFromUser\n  isFirstMessage\n  from {\n    name\n  }\n  to\n  cc\n}\n\nfragment ConversationMessages_conversation on Conversation {\n  messagesConnection(first: 10, sort: DESC) {\n    edges {\n      node {\n        id\n        createdAt\n        isFromUser\n        ...ConversationMessage_message\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  inquiryRequest {\n    formattedFirstMessage\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b4c0c11d65e1d9f79abdf89196e24e9";

export default node;
