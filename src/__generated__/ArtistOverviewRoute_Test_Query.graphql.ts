/**
 * @generated SignedSource<<7757173971dbad30443379da8a0772b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistOverviewRoute_Test_Query$variables = {};
export type ArtistOverviewRoute_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistOverviewRoute_artist">;
  } | null;
};
export type ArtistOverviewRoute_Test_Query = {
  response: ArtistOverviewRoute_Test_Query$data;
  variables: ArtistOverviewRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistOverviewRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistOverviewRoute_artist"
          }
        ],
        "storageKey": "artist(id:\"test\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistOverviewRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "page",
                "value": "ABOUT"
              }
            ],
            "concreteType": "ArtistMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              }
            ],
            "storageKey": "meta(page:\"ABOUT\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artworks",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
        "storageKey": "artist(id:\"test\")"
      }
    ]
  },
  "params": {
    "cacheID": "9e858c5a691758248177e5a94eeede20",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistCounts"
        },
        "artist.counts.artworks": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artist.id": (v1/*: any*/),
        "artist.internalID": (v1/*: any*/),
        "artist.meta": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistMeta"
        },
        "artist.meta.description": (v2/*: any*/),
        "artist.meta.title": (v2/*: any*/),
        "artist.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "artist.slug": (v1/*: any*/)
      }
    },
    "name": "ArtistOverviewRoute_Test_Query",
    "operationKind": "query",
    "text": "query ArtistOverviewRoute_Test_Query {\n  artist(id: \"test\") {\n    ...ArtistOverviewRoute_artist\n    id\n  }\n}\n\nfragment ArtistOverviewRoute_artist on Artist {\n  slug\n  name\n  meta(page: ABOUT) {\n    description\n    title\n  }\n  counts {\n    artworks\n  }\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "7946d8b3859ab901fa36998f89fe62bd";

export default node;
