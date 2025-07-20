/**
 * @generated SignedSource<<69ba7adc0da84f0132dd8bd34d9ed7bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistBioJestQuery$variables = Record<PropertyKey, never>;
export type ArtistBioJestQuery$data = {
  readonly bio: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistBio_bio">;
  } | null | undefined;
};
export type ArtistBioJestQuery$rawResponse = {
  readonly bio: {
    readonly biographyBlurb: {
      readonly credit: string | null | undefined;
      readonly text: string | null | undefined;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type ArtistBioJestQuery = {
  rawResponse: ArtistBioJestQuery$rawResponse;
  response: ArtistBioJestQuery$data;
  variables: ArtistBioJestQuery$variables;
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
    "name": "ArtistBioJestQuery",
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
    "name": "ArtistBioJestQuery",
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
    "cacheID": "82f699955bfea4c4da20341b323646dc",
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
    "name": "ArtistBioJestQuery",
    "operationKind": "query",
    "text": "query ArtistBioJestQuery {\n  bio: artist(id: \"unused\") {\n    ...ArtistBio_bio\n    id\n  }\n}\n\nfragment ArtistBio_bio on Artist {\n  biographyBlurb(format: HTML) {\n    credit\n    text\n  }\n}\n"
  }
};
})();

(node as any).hash = "68e87067d3fe1de5986e08e314247973";

export default node;
