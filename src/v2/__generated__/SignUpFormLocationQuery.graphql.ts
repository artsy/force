/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SignUpFormLocationQueryVariables = {
    ip: string;
};
export type SignUpFormLocationQueryResponse = {
    readonly requestLocation: {
        readonly " $fragmentRefs": FragmentRefs<"SignUpForm_requestLocation">;
    } | null;
};
export type SignUpFormLocationQuery = {
    readonly response: SignUpFormLocationQueryResponse;
    readonly variables: SignUpFormLocationQueryVariables;
};



/*
query SignUpFormLocationQuery(
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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "SignUpFormLocationQuery",
    "operationKind": "query",
    "text": "query SignUpFormLocationQuery(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...SignUpForm_requestLocation\n  }\n}\n\nfragment SignUpForm_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();
(node as any).hash = 'f9d14ff83281a0d051c035554d6ea348';
export default node;
