/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SignUpFormLocation_tests_QueryVariables = {
    ip: string;
};
export type SignUpFormLocation_tests_QueryResponse = {
    readonly requestLocation: {
        readonly " $fragmentRefs": FragmentRefs<"SignUpForm_requestLocation">;
    } | null;
};
export type SignUpFormLocation_tests_Query = {
    readonly response: SignUpFormLocation_tests_QueryResponse;
    readonly variables: SignUpFormLocation_tests_QueryVariables;
};



/*
query SignUpFormLocation_tests_Query(
  $ip: String!
) {
  requestLocation(ip: $ip) {
    ...SignUpForm_requestLocation
  }
}

fragment SignUpForm_requestLocation on RequestLocation {
  countryCode
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ip",
    "type": "String!"
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
    "type": "Query"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "requestLocation": {
          "type": "RequestLocation",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "requestLocation.countryCode": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        }
      }
    },
    "name": "SignUpFormLocation_tests_Query",
    "operationKind": "query",
    "text": "query SignUpFormLocation_tests_Query(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...SignUpForm_requestLocation\n  }\n}\n\nfragment SignUpForm_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();
(node as any).hash = '4902fe6fc6c22dcb9596a2d6b7ea89e2';
export default node;
