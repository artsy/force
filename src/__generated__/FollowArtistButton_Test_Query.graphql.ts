/**
 * @generated SignedSource<<8adb1ef74bae0244fd68ffc8f81c98c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowArtistButton_Test_Query$variables = {};
export type FollowArtistButton_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowArtistButton_artist">;
  } | null;
};
export type FollowArtistButton_Test_Query = {
  response: FollowArtistButton_Test_Query$data;
  variables: FollowArtistButton_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
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
    "name": "FollowArtistButton_Test_Query",
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
            "name": "FollowArtistButton_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FollowArtistButton_Test_Query",
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
            "name": "id",
            "storageKey": null
          },
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
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isFollowed",
            "storageKey": null
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
                "name": "follows",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "500b1b1e6b428f56e4cef27ef68634ed",
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
        "artist.counts.follows": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "artist.id": (v1/*: any*/),
        "artist.internalID": (v1/*: any*/),
        "artist.isFollowed": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artist.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "artist.slug": (v1/*: any*/)
      }
    },
    "name": "FollowArtistButton_Test_Query",
    "operationKind": "query",
    "text": "query FollowArtistButton_Test_Query {\n  artist(id: \"example\") {\n    ...FollowArtistButton_artist\n    id\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  slug\n  name\n  internalID\n  isFollowed\n  counts {\n    follows\n  }\n}\n"
  }
};
})();

(node as any).hash = "510862b85367ba5fc4dff0ac73e7cbd9";

export default node;
