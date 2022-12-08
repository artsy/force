/**
 * @generated SignedSource<<285366d938b12302e86fd4c151f736ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthDialogSignUpQuery$variables = {
  ip: string;
};
export type AuthDialogSignUpQuery$data = {
  readonly requestLocation: {
    readonly " $fragmentSpreads": FragmentRefs<"AuthDialogSignUp_requestLocation">;
  } | null;
};
export type AuthDialogSignUpQuery = {
  response: AuthDialogSignUpQuery$data;
  variables: AuthDialogSignUpQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ip"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "ip",
    "variableName": "ip"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuthDialogSignUpQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestLocation",
        "kind": "LinkedField",
        "name": "requestLocation",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuthDialogSignUp_requestLocation"
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
    "name": "AuthDialogSignUpQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestLocation",
        "kind": "LinkedField",
        "name": "requestLocation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "countryCode",
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
    "cacheID": "406f55c4ab1ab8594a749b4314d9b84e",
    "id": null,
    "metadata": {},
    "name": "AuthDialogSignUpQuery",
    "operationKind": "query",
    "text": "query AuthDialogSignUpQuery(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...AuthDialogSignUp_requestLocation\n    id\n  }\n}\n\nfragment AuthDialogSignUp_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();

(node as any).hash = "5ef35817675f8dfa44892337b25dca4c";

export default node;
