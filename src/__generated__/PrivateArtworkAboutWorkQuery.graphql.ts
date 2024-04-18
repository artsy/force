/**
 * @generated SignedSource<<211c05b4de0105413e850dd805fe58a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutWorkQuery$variables = Record<PropertyKey, never>;
export type PrivateArtworkAboutWorkQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutWork_artwork">;
  } | null | undefined;
};
export type PrivateArtworkAboutWorkQuery = {
  response: PrivateArtworkAboutWorkQuery$data;
  variables: PrivateArtworkAboutWorkQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrivateArtworkAboutWorkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PrivateArtworkAboutWork_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PrivateArtworkAboutWorkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": "additionalInformationHTML",
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "additionalInformation",
            "storageKey": "additionalInformation(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "33c4addf70176dba75996fbfc9f22b6d",
    "id": null,
    "metadata": {},
    "name": "PrivateArtworkAboutWorkQuery",
    "operationKind": "query",
    "text": "query PrivateArtworkAboutWorkQuery {\n  artwork(id: \"foo\") {\n    ...PrivateArtworkAboutWork_artwork\n    id\n  }\n}\n\nfragment PrivateArtworkAboutWork_artwork on Artwork {\n  additionalInformationHTML: additionalInformation(format: HTML)\n}\n"
  }
};
})();

(node as any).hash = "f8d3ca7f2798a3b7978a12c9efaf9259";

export default node;
