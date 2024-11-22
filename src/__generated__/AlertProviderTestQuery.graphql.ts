/**
 * @generated SignedSource<<1afd988156771cb0c8fbed0059393903>>
 * @relayHash be1d4b59692f4f959c251740265327bb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID be1d4b59692f4f959c251740265327bb

import { ConcreteRequest, Query } from 'relay-runtime';
export type AlertProviderTestQuery$variables = Record<PropertyKey, never>;
export type AlertProviderTestQuery$data = {
  readonly artist: {
    readonly internalID: string;
  } | null | undefined;
};
export type AlertProviderTestQuery$rawResponse = {
  readonly artist: {
    readonly id: string;
    readonly internalID: string;
  } | null | undefined;
};
export type AlertProviderTestQuery = {
  rawResponse: AlertProviderTestQuery$rawResponse;
  response: AlertProviderTestQuery$data;
  variables: AlertProviderTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artist-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
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
    "name": "AlertProviderTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
        "storageKey": "artist(id:\"artist-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AlertProviderTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"artist-id\")"
      }
    ]
  },
  "params": {
    "id": "be1d4b59692f4f959c251740265327bb",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.id": (v2/*: any*/),
        "artist.internalID": (v2/*: any*/)
      }
    },
    "name": "AlertProviderTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "96fb1830e04fb8b4f6ce54bf405404be";

export default node;
