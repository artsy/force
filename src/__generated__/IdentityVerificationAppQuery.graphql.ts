/**
 * @generated SignedSource<<cde7720597702f8fbd1301bdb0f5ad63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationAppQuery$variables = Record<PropertyKey, never>;
export type IdentityVerificationAppQuery$data = {
  readonly identityVerification: {
    readonly " $fragmentSpreads": FragmentRefs<"IdentityVerificationApp_identityVerification">;
  } | null | undefined;
};
export type IdentityVerificationAppQuery$rawResponse = {
  readonly identityVerification: {
    readonly id: string;
    readonly internalID: string;
    readonly state: string;
  } | null | undefined;
};
export type IdentityVerificationAppQuery = {
  rawResponse: IdentityVerificationAppQuery$rawResponse;
  response: IdentityVerificationAppQuery$data;
  variables: IdentityVerificationAppQuery$variables;
};

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
    "name": "IdentityVerificationAppQuery",
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
            "args": null,
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
    "name": "IdentityVerificationAppQuery",
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
    "cacheID": "4dc0aee55c8b57d7b932e2b5c838dae7",
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
    "name": "IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": "query IdentityVerificationAppQuery {\n  identityVerification(id: \"identity-verification-id\") {\n    ...IdentityVerificationApp_identityVerification\n    id\n  }\n}\n\nfragment IdentityVerificationApp_identityVerification on IdentityVerification {\n  internalID\n  state\n}\n"
  }
};
})();

(node as any).hash = "d65af6e31f0e9fe9d41b8b1b7cafe126";

export default node;
