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
  identityVerification(id: $id) {
    ...IdentityVerificationApp_identityVerification_1Bmzm5
    id
  }
}

fragment IdentityVerificationApp_identityVerification_1Bmzm5 on IdentityVerification {
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
            "args": (v1/*: any*/),
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
    "cacheID": "0d5f079ecf38ee28a7dea78c6c849d7e",
    "id": null,
    "metadata": {},
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": "query identityVerificationRoutes_IdentityVerificationAppQuery(\n  $id: String!\n) {\n  identityVerification(id: $id) {\n    ...IdentityVerificationApp_identityVerification_1Bmzm5\n    id\n  }\n}\n\nfragment IdentityVerificationApp_identityVerification_1Bmzm5 on IdentityVerification {\n  internalID\n  state\n}\n"
  }
};
})();
(node as any).hash = '6ef541077c48b089d18267dbb499e6e4';
export default node;
