/**
 * @generated SignedSource<<30eab97e11954e2e5b951fe9bc6738c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
    "cacheID": "be1d4b59692f4f959c251740265327bb",
    "id": null,
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
    "text": "query AlertProviderTestQuery {\n  artist(id: \"artist-id\") {\n    internalID\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "96fb1830e04fb8b4f6ce54bf405404be";

export default node;
