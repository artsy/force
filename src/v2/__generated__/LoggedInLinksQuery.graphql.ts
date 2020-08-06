/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type LoggedInLinksQueryVariables = {};
export type LoggedInLinksQueryResponse = {
    readonly me: {
        readonly unreadNotificationsCount: number;
        readonly unreadConversationCount: number;
    } | null;
};
export type LoggedInLinksQuery = {
    readonly response: LoggedInLinksQueryResponse;
    readonly variables: LoggedInLinksQueryVariables;
};



/*
query LoggedInLinksQuery {
  me {
    unreadNotificationsCount
    unreadConversationCount
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "unreadNotificationsCount",
  "args": null,
  "storageKey": null
},
v1 = {
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
    "name": "LoggedInLinksQuery",
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
          (v0/*: any*/),
          (v1/*: any*/)
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "LoggedInLinksQuery",
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
          (v1/*: any*/),
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
    "name": "LoggedInLinksQuery",
    "id": null,
    "text": "query LoggedInLinksQuery {\n  me {\n    unreadNotificationsCount\n    unreadConversationCount\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'b47ba933213c5d04decf91b81a4cb3a2';
export default node;
