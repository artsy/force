/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    id
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
    "cacheID": "94ac45b24c2140ab724ed49987c97c5d",
    "id": null,
    "metadata": {},
    "name": "SignUpFormLocationQuery",
    "operationKind": "query",
    "text": "query SignUpFormLocationQuery(\n  $ip: String!\n) {\n  requestLocation(ip: $ip) {\n    ...SignUpForm_requestLocation\n    id\n  }\n}\n\nfragment SignUpForm_requestLocation on RequestLocation {\n  countryCode\n}\n"
  }
};
})();
(node as any).hash = 'f9d14ff83281a0d051c035554d6ea348';
export default node;
