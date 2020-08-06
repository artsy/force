/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type InboxNotificationCountQueryVariables = {};
export type InboxNotificationCountQueryResponse = {
    readonly me: {
        readonly unreadConversationCount: number;
    } | null;
};
export type InboxNotificationCountQuery = {
    readonly response: InboxNotificationCountQueryResponse;
    readonly variables: InboxNotificationCountQueryVariables;
};



/*
query InboxNotificationCountQuery {
  me {
    unreadConversationCount
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadConversationCount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InboxNotificationCountQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InboxNotificationCountQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "InboxNotificationCountQuery",
    "operationKind": "query",
    "text": "query InboxNotificationCountQuery {\n  me {\n    unreadConversationCount\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '47953525d6cd04c944061509c5c1c2a6';
export default node;
