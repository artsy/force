/**
 * @generated SignedSource<<6e39eca889c9a92fedc8ef09ac039990>>
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
  response: SignUpFormLocation_tests_Query$data;
  variables: SignUpFormLocation_tests_Query$variables;
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
    "cacheID": "5242390619aa9e2ae204c41409ea842c",
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
        },
        "requestLocation.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "SignUpFormLocation_tests_Query",
    "operationKind": "query",
    "text": "query SignUpFormLocation_tests_Query(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...SignUpForm_requestLocation\n    id\n  }\n}\n\nfragment SignUpForm_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();

(node as any).hash = "4902fe6fc6c22dcb9596a2d6b7ea89e2";

export default node;
