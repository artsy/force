/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnreadMessagesToastQueryVariables = {
    conversationID: string;
};
export type UnreadMessagesToastQueryResponse = {
    readonly me: {
        readonly conversation: {
            readonly " $fragmentRefs": FragmentRefs<"UnreadMessagesToast_conversation">;
        } | null;
    } | null;
};
export type UnreadMessagesToastQuery = {
    readonly response: UnreadMessagesToastQueryResponse;
    readonly variables: UnreadMessagesToastQueryVariables;
};



/*
query UnreadMessagesToastQuery(
  $conversationID: String!
) {
  me {
    conversation(id: $conversationID) {
      ...UnreadMessagesToast_conversation
      id
    }
    id
  }
}

fragment UnreadMessagesToast_conversation on Conversation {
  id
  internalID
  lastMessageID
  fromLastViewedMessageID
  isLastMessageToUser
  activeOrders: orderConnection(last: 1, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED]) {
    edges {
      node {
        __typename
        internalID
        updatedAt
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "conversationID",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "conversationID"
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnreadMessagesToastQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "UnreadMessagesToast_conversation"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnreadMessagesToastQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
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
              },
              {
                "alias": "activeOrders",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "last",
                    "value": 1
                  },
                  {
                    "kind": "Literal",
                    "name": "states",
                    "value": [
                      "APPROVED",
                      "FULFILLED",
                      "SUBMITTED",
                      "REFUNDED"
                    ]
                  }
                ],
                "concreteType": "CommerceOrderConnectionWithTotalCount",
                "kind": "LinkedField",
                "name": "orderConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceOrderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "updatedAt",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(last:1,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UnreadMessagesToastQuery",
    "operationKind": "query",
    "text": "query UnreadMessagesToastQuery(\n  $conversationID: String!\n) {\n  me {\n    conversation(id: $conversationID) {\n      ...UnreadMessagesToast_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment UnreadMessagesToast_conversation on Conversation {\n  id\n  internalID\n  lastMessageID\n  fromLastViewedMessageID\n  isLastMessageToUser\n  activeOrders: orderConnection(last: 1, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        updatedAt\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '3eacbe47fa9afc7a06d55a3c506d753c';
export default node;
