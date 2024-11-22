/**
 * @generated SignedSource<<decda3f91d4ffcf2d110bd7d91d80c92>>
 * @relayHash 411bd56f402b617611a5fa5e9e1243e4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 411bd56f402b617611a5fa5e9e1243e4

import { ConcreteRequest, Query } from 'relay-runtime';
export type useCountryCodeQuery$variables = {
  ip: string;
};
export type useCountryCodeQuery$data = {
  readonly requestLocation: {
    readonly countryCode: string | null | undefined;
  } | null | undefined;
};
export type useCountryCodeQuery = {
  response: useCountryCodeQuery$data;
  variables: useCountryCodeQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "countryCode",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCountryCodeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestLocation",
        "kind": "LinkedField",
        "name": "requestLocation",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "useCountryCodeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RequestLocation",
        "kind": "LinkedField",
        "name": "requestLocation",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    "id": "411bd56f402b617611a5fa5e9e1243e4",
    "metadata": {},
    "name": "useCountryCodeQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "25e1eb80c141abebf9f783131c0e3562";

export default node;
