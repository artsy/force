/**
 * @generated SignedSource<<b77c4a0ce38d55f90cf6e67eb4bccc07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrivateArtworkAboutArtistQuery$variables = Record<PropertyKey, never>;
export type PrivateArtworkAboutArtistQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"PrivateArtworkAboutArtist_artwork">;
  } | null | undefined;
};
export type PrivateArtworkAboutArtistQuery = {
  response: PrivateArtworkAboutArtistQuery$data;
  variables: PrivateArtworkAboutArtistQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PrivateArtworkAboutArtistQuery",
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
            "name": "PrivateArtworkAboutArtist_artwork"
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
    "name": "PrivateArtworkAboutArtistQuery",
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
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayArtistBio",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "HTML"
                  },
                  {
                    "kind": "Literal",
                    "name": "partnerBio",
                    "value": false
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
                    "name": "text",
                    "storageKey": null
                  }
                ],
                "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "8e027b7630cb4783f50185541f93a574",
    "id": null,
    "metadata": {},
    "name": "PrivateArtworkAboutArtistQuery",
    "operationKind": "query",
    "text": "query PrivateArtworkAboutArtistQuery {\n  artwork(id: \"foo\") {\n    ...PrivateArtworkAboutArtist_artwork\n    id\n  }\n}\n\nfragment PrivateArtworkAboutArtist_artwork on Artwork {\n  slug\n  displayArtistBio\n  artist {\n    name\n    biographyBlurb(format: HTML, partnerBio: false) {\n      text\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a225563bf8ce2240737c7e481a70c7d9";

export default node;
