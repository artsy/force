/**
 * @generated SignedSource<<7732314a70adc653ae0d9a0d8b2f4467>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkMetadataQuery$variables = Record<PropertyKey, never>;
export type PrivateArtworkMetadataQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkMetadata_artwork">;
  } | null | undefined;
};
export type PrivateArtworkMetadataQuery = {
  response: PrivateArtworkMetadataQuery$data;
  variables: PrivateArtworkMetadataQuery$variables;
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
    "name": "PrivateArtworkMetadataQuery",
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
            "name": "PrivateArtworkMetadata_artwork"
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
    "name": "PrivateArtworkMetadataQuery",
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
            "alias": null,
            "args": null,
            "concreteType": "ArtworkInfoRow",
            "kind": "LinkedField",
            "name": "conditionDescription",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "details",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "exhibitionHistory",
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
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "0425c9a804a97ef7527bab6667b72550",
    "id": null,
    "metadata": {},
    "name": "PrivateArtworkMetadataQuery",
    "operationKind": "query",
    "text": "query PrivateArtworkMetadataQuery {\n  artwork(id: \"foo\") {\n    ...PrivateArtworkMetadata_artwork\n    id\n  }\n}\n\nfragment PrivateArtworkMetadata_artwork on Artwork {\n  conditionDescription {\n    details\n  }\n  provenance\n  exhibitionHistory\n}\n"
  }
};
})();

(node as any).hash = "abc40414095f0f3a259a9af13006c804";

export default node;
