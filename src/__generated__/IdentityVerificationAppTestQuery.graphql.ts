/**
 * @generated SignedSource<<777ac6604361ad70c4cbbffa24ff0686>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IdentityVerificationAppTestQuery$variables = Record<PropertyKey, never>;
export type IdentityVerificationAppTestQuery$data = {
  readonly identityVerification: {
    readonly " $fragmentSpreads": FragmentRefs<"IdentityVerificationApp_identityVerification">;
  } | null | undefined;
};
export type IdentityVerificationAppTestQuery$rawResponse = {
  readonly identityVerification: {
    readonly id: string;
    readonly internalID: string;
    readonly state: string;
  } | null | undefined;
};
export type IdentityVerificationAppTestQuery = {
  rawResponse: IdentityVerificationAppTestQuery$rawResponse;
  response: IdentityVerificationAppTestQuery$data;
  variables: IdentityVerificationAppTestQuery$variables;
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
    "cacheID": "32a844b22ddc9a7eabd07320558d146a",
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
    "text": "query IdentityVerificationAppTestQuery {\n  identityVerification(id: \"identity-verification-id\") {\n    ...IdentityVerificationApp_identityVerification\n    id\n  }\n}\n\nfragment IdentityVerificationApp_identityVerification on IdentityVerification {\n  internalID\n  state\n}\n"
  }
};
})();

(node as any).hash = "b908eca38d82488d938f4d14159f7120";

export default node;
