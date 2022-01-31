/**
 * @generated SignedSource<<67ca4df9ae00ec558198448cdf9ccc65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SignUpFormLocation_tests_Query$variables = {
  ip: string;
};
export type SignUpFormLocation_tests_Query$data = {
  readonly requestLocation: {
    readonly " $fragmentSpreads": FragmentRefs<"SignUpForm_requestLocation">;
  } | null;
};
export type SignUpFormLocation_tests_Query = {
  variables: SignUpFormLocation_tests_Query$variables;
  response: SignUpFormLocation_tests_Query$data;
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
    "name": "SignUpFormLocation_tests_Query",
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
    "name": "SignUpFormLocation_tests_Query",
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
    "cacheID": "7ff510343d17f80cac21e75a084f7b80",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "requestLocation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "RequestLocation"
        },
        "requestLocation.countryCode": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "SignUpFormLocation_tests_Query",
    "operationKind": "query",
    "text": "query SignUpFormLocation_tests_Query(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...SignUpForm_requestLocation\n  }\n}\n\nfragment SignUpForm_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();

(node as any).hash = "4902fe6fc6c22dcb9596a2d6b7ea89e2";

export default node;
