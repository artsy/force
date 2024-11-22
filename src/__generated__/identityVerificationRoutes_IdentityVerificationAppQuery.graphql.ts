/**
 * @generated SignedSource<<a55f5c994576986e88cf0b84c8cdc0a9>>
 * @relayHash 2e8e482360919e15dc7bfd5ae3b527e7
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2e8e482360919e15dc7bfd5ae3b527e7

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type identityVerificationRoutes_IdentityVerificationAppQuery$variables = {
  id: string;
};
export type identityVerificationRoutes_IdentityVerificationAppQuery$data = {
  readonly identityVerification: {
    readonly " $fragmentSpreads": FragmentRefs<"IdentityVerificationApp_identityVerification">;
  } | null | undefined;
};
export type identityVerificationRoutes_IdentityVerificationAppQuery$rawResponse = {
  readonly identityVerification: {
    readonly id: string;
    readonly internalID: string;
    readonly state: string;
  } | null | undefined;
};
export type identityVerificationRoutes_IdentityVerificationAppQuery = {
  rawResponse: identityVerificationRoutes_IdentityVerificationAppQuery$rawResponse;
  response: identityVerificationRoutes_IdentityVerificationAppQuery$data;
  variables: identityVerificationRoutes_IdentityVerificationAppQuery$variables;
};

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
    "id": "2e8e482360919e15dc7bfd5ae3b527e7",
    "metadata": {},
    "name": "identityVerificationRoutes_IdentityVerificationAppQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ff6f12ace577459f28dd08ab09fa5c9b";

export default node;
