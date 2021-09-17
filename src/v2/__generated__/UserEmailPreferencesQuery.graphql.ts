/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type UserEmailPreferencesQueryVariables = {};
export type UserEmailPreferencesQueryResponse = {
    readonly me: {
        readonly emailFrequency: string | null;
        readonly id: string;
    } | null;
};
export type UserEmailPreferencesQuery = {
    readonly response: UserEmailPreferencesQueryResponse;
    readonly variables: UserEmailPreferencesQueryVariables;
};



/*
query UserEmailPreferencesQuery {
  me {
    emailFrequency
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "args": null,
        "kind": "ScalarField",
        "name": "emailFrequency",
        "storageKey": null
      },
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserEmailPreferencesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserEmailPreferencesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5317b5bc962e427c02db8ce4a50a5193",
    "id": null,
    "metadata": {},
    "name": "UserEmailPreferencesQuery",
    "operationKind": "query",
    "text": "query UserEmailPreferencesQuery {\n  me {\n    emailFrequency\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '40ba9b8060e5c7233e89cf00b348e15c';
export default node;
