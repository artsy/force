/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type identityVerificationRoutes_IdentityVerificationAppQueryVariables = {
    id: string;
};
export type identityVerificationRoutes_IdentityVerificationAppQueryResponse = {
    readonly identityVerification: {
        readonly internalID: string;
        readonly state: string;
    } | null;
};
export type identityVerificationRoutes_IdentityVerificationAppQueryRawResponse = {
    readonly identityVerification: ({
        readonly internalID: string;
        readonly state: string;
        readonly id: string;
    }) | null;
};
export type identityVerificationRoutes_IdentityVerificationAppQuery = {
    readonly response: identityVerificationRoutes_IdentityVerificationAppQueryResponse;
    readonly variables: identityVerificationRoutes_IdentityVerificationAppQueryVariables;
    readonly rawResponse: identityVerificationRoutes_IdentityVerificationAppQueryRawResponse;
};



/*
query identityVerificationRoutes_IdentityVerificationAppQuery(
  $id: String!
) {
  identityVerification(id: $id) @principalField {
    internalID
    state
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IdentityVerification",
        "kind": "LinkedField",
        "name": "identityVerification",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IdentityVerification",
        "kind": "LinkedField",
        "name": "identityVerification",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    "cacheID": "e96d9c385025fc0eaa743ca3144fed4a",
    "id": null,
    "metadata": {},
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": "query identityVerificationRoutes_IdentityVerificationAppQuery(\n  $id: String!\n) {\n  identityVerification(id: $id) @principalField {\n    internalID\n    state\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '6ed74cc4b517ba7855d731381ff0cbfa';
export default node;
