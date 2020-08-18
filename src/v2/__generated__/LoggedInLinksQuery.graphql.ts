/* tslint:disable */
/* eslint-disable */

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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unreadNotificationsCount",
  "storageKey": null
},
v1 = {
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
    "name": "LoggedInLinksQuery",
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
          (v1/*: any*/)
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
    "name": "LoggedInLinksQuery",
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
          (v1/*: any*/),
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
    "name": "LoggedInLinksQuery",
    "operationKind": "query",
    "text": "query LoggedInLinksQuery {\n  me {\n    unreadNotificationsCount\n    unreadConversationCount\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b47ba933213c5d04decf91b81a4cb3a2';
export default node;
