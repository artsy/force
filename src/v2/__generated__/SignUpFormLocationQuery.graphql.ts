/**
 * @generated SignedSource<<3c8e7030a15ef99f383bf7e145f884bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignUpFormLocationQuery$variables = {
  ip: string;
};
export type SignUpFormLocationQuery$data = {
  readonly requestLocation: {
    readonly " $fragmentSpreads": FragmentRefs<"SignUpForm_requestLocation">;
  } | null;
};
export type SignUpFormLocationQuery = {
  variables: SignUpFormLocationQuery$variables;
  response: SignUpFormLocationQuery$data;
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
    "name": "SignUpFormLocationQuery",
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
            "name": "SignUpForm_requestLocation"
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
    "name": "SignUpFormLocationQuery",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fbb557786c09f803e12be2cbc59ef132",
    "id": null,
    "metadata": {},
    "name": "SignUpFormLocationQuery",
    "operationKind": "query",
    "text": "query SignUpFormLocationQuery(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...SignUpForm_requestLocation\n  }\n}\n\nfragment SignUpForm_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();

(node as any).hash = "f9d14ff83281a0d051c035554d6ea348";

export default node;
