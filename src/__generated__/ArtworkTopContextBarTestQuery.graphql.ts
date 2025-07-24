/**
 * @generated SignedSource<<d8c3d3837dce93203a4a55a4c5bd8e93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarTestQuery$variables = Record<PropertyKey, never>;
export type ArtworkTopContextBarTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBar_artwork">;
  } | null | undefined;
};
export type ArtworkTopContextBarTestQuery = {
  response: ArtworkTopContextBarTestQuery$data;
  variables: ArtworkTopContextBarTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "richard-anuszkiewicz-lino-yellow-318"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
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
    "name": "ArtworkTopContextBarTestQuery",
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
            "name": "ArtworkTopContextBar_artwork"
          }
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkTopContextBarTestQuery",
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
            "name": "internalID",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
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
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "artwork(id:\"richard-anuszkiewicz-lino-yellow-318\")"
      }
    ]
  },
  "params": {
    "cacheID": "8c6c9fc88daad70ee96e59b3277e7464",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artwork.artist.href": (v3/*: any*/),
        "artwork.artist.id": (v4/*: any*/),
        "artwork.artist.name": (v3/*: any*/),
        "artwork.href": (v3/*: any*/),
        "artwork.id": (v4/*: any*/),
        "artwork.internalID": (v4/*: any*/),
        "artwork.title": (v3/*: any*/)
      }
    },
    "name": "ArtworkTopContextBarTestQuery",
    "operationKind": "query",
    "text": "query ArtworkTopContextBarTestQuery {\n  artwork(id: \"richard-anuszkiewicz-lino-yellow-318\") {\n    ...ArtworkTopContextBar_artwork\n    id\n  }\n}\n\nfragment ArtworkTopContextBarBreadcrumb_artwork on Artwork {\n  internalID\n  href\n  title\n  artist {\n    name\n    href\n    id\n  }\n}\n\nfragment ArtworkTopContextBar_artwork on Artwork {\n  ...ArtworkTopContextBarBreadcrumb_artwork\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "6090d0584d948aa348ebc1b8e630ad2d";

export default node;
