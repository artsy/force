/**
 * @generated SignedSource<<581a9476ab7fd016b9f24518c0d9b24d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistBioTestQuery$variables = Record<PropertyKey, never>;
export type ArtistBioTestQuery$data = {
  readonly bio: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistBio_bio">;
  } | null | undefined;
};
export type ArtistBioTestQuery$rawResponse = {
  readonly bio: {
    readonly biographyBlurb: {
      readonly credit: string | null | undefined;
      readonly text: string | null | undefined;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type ArtistBioTestQuery = {
  rawResponse: ArtistBioTestQuery$rawResponse;
  response: ArtistBioTestQuery$data;
  variables: ArtistBioTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistBioTestQuery",
    "selections": [
      {
        "alias": "bio",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistBio_bio"
          }
        ],
        "storageKey": "artist(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistBioTestQuery",
    "selections": [
      {
        "alias": "bio",
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "concreteType": "ArtistBlurb",
            "kind": "LinkedField",
            "name": "biographyBlurb",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "credit",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              }
            ],
            "storageKey": "biographyBlurb(format:\"HTML\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "2c5040c3686825f3044089c983f0cc4a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "bio": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "bio.biographyBlurb": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistBlurb"
        },
        "bio.biographyBlurb.credit": (v1/*: any*/),
        "bio.biographyBlurb.text": (v1/*: any*/),
        "bio.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "ArtistBioTestQuery",
    "operationKind": "query",
    "text": "query ArtistBioTestQuery {\n  bio: artist(id: \"unused\") {\n    ...ArtistBio_bio\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML) {\n    credit\n    text\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f1ee721b84fbe1f4678f268c11573b3";

export default node;
