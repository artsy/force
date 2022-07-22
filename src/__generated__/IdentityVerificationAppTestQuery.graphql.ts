/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationAppTestQueryVariables = {};
export type IdentityVerificationAppTestQueryResponse = {
    readonly identityVerification: {
        readonly " $fragmentRefs": FragmentRefs<"IdentityVerificationApp_identityVerification">;
    } | null;
};
export type IdentityVerificationAppTestQueryRawResponse = {
    readonly identityVerification: ({
        readonly internalID: string;
        readonly state: string;
        readonly id: string;
    }) | null;
};
export type IdentityVerificationAppTestQuery = {
    readonly response: IdentityVerificationAppTestQueryResponse;
    readonly variables: IdentityVerificationAppTestQueryVariables;
    readonly rawResponse: IdentityVerificationAppTestQueryRawResponse;
};



/*
query IdentityVerificationAppTestQuery {
  identityVerification(id: "identity-verification-id") {
    ...IdentityVerificationApp_identityVerification_23LfNj
    id
  }
}

fragment IdentityVerificationApp_identityVerification_23LfNj on IdentityVerification {
  internalID
  state
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "identity-verification-id"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "IdentityVerificationAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "IdentityVerification",
        "kind": "LinkedField",
        "name": "identityVerification",
        "plural": false,
        "selections": [
          {
            "args": (v0/*: any*/),
            "kind": "FragmentSpread",
            "name": "IdentityVerificationApp_identityVerification"
          }
        ],
        "storageKey": "identityVerification(id:\"identity-verification-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IdentityVerificationAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "identityVerification(id:\"identity-verification-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "ea8260e0c55e22ddc91992d33ff92c52",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "identityVerification": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "IdentityVerification"
        },
        "identityVerification.id": (v1/*: any*/),
        "identityVerification.internalID": (v1/*: any*/),
        "identityVerification.state": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "IdentityVerificationAppTestQuery",
    "operationKind": "query",
    "text": "query IdentityVerificationAppTestQuery {\n  identityVerification(id: \"identity-verification-id\") {\n    ...IdentityVerificationApp_identityVerification_23LfNj\n    id\n  }\n}\n\nfragment IdentityVerificationApp_identityVerification_23LfNj on IdentityVerification {\n  internalID\n  state\n}\n"
  }
};
})();
(node as any).hash = '9316ff0e3bc38252639859899937ecef';
export default node;
