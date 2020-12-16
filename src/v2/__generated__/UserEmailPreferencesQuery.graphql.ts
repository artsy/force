/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type UserEmailPreferencesQueryVariables = {};
export type UserEmailPreferencesQueryResponse = {
    readonly me: {
        readonly emailFrequency: string | null;
        readonly id: string;
    } | null;
};
export type UserEmailPreferencesQueryRawResponse = {
    readonly me: ({
        readonly emailFrequency: string | null;
        readonly id: string;
    }) | null;
};
export type UserEmailPreferencesQuery = {
    readonly response: UserEmailPreferencesQueryResponse;
    readonly variables: UserEmailPreferencesQueryVariables;
    readonly rawResponse: UserEmailPreferencesQueryRawResponse;
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserEmailPreferencesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "UserEmailPreferencesQuery",
    "operationKind": "query",
    "text": "query UserEmailPreferencesQuery {\n  me {\n    emailFrequency\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '8a6606cd3574b35cb6067e12d4f1eca2';
export default node;
