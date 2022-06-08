/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type identityVerificationRoutes_IdentityVerificationAppQueryVariables = {
    id: string;
};
export type identityVerificationRoutes_IdentityVerificationAppQueryResponse = {
    readonly identityVerification: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_identityVerification">;
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
    ...IdentityVerificationApp_identityVerification
    id
  }
}

fragment IdentityVerificationApp_identityVerification on IdentityVerification {
  internalID
  state
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
];
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IdentityVerificationApp_identityVerification"
          }
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
            "name": "state",
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
    ]
  },
  "params": {
    "cacheID": "e28e6326276f3fd4eb66baec683ce340",
    "id": null,
    "metadata": {},
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": "query identityVerificationRoutes_IdentityVerificationAppQuery(\n  $id: String!\n) {\n  identityVerification(id: $id) @principalField {\n    ...IdentityVerificationApp_identityVerification\n    id\n  }\n}\n\nfragment IdentityVerificationApp_identityVerification on IdentityVerification {\n  internalID\n  state\n}\n"
  }
};
})();
(node as any).hash = '65eca2568c3109c8f2d6141671eec6e9';
export default node;
