/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "unreadConversationCount",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "InboxNotificationCountQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "InboxNotificationCountQuery",
    "argumentDefinitions": [],
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "InboxNotificationCountQuery",
    "id": null,
    "text": "query InboxNotificationCountQuery {\n  me {\n    unreadConversationCount\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '47953525d6cd04c944061509c5c1c2a6';
export default node;
