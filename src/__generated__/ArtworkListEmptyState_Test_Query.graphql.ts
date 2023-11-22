/**
 * @generated SignedSource<<0723697eff95eec3d3434abcfcf6a734>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkListEmptyState_Test_Query$variables = Record<PropertyKey, never>;
export type ArtworkListEmptyState_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkListEmptyState_me">;
  } | null | undefined;
};
export type ArtworkListEmptyState_Test_Query = {
  response: ArtworkListEmptyState_Test_Query$data;
  variables: ArtworkListEmptyState_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Collection"
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
    "name": "ArtworkListEmptyState_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Literal",
                "name": "listID",
                "value": "listID"
              }
            ],
            "kind": "FragmentSpread",
            "name": "ArtworkListEmptyState_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkListEmptyState_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": "artworkList",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "listID"
              }
            ],
            "concreteType": "Collection",
            "kind": "LinkedField",
            "name": "collection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "default",
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": "collection(id:\"listID\")"
          },
          {
            "alias": "savedArtworksArtworkList",
            "args": [
              {
                "kind": "Literal",
                "name": "id",
                "value": "saved-artwork"
              }
            ],
            "concreteType": "Collection",
            "kind": "LinkedField",
            "name": "collection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "onlyVisible",
                    "value": true
                  }
                ],
                "kind": "ScalarField",
                "name": "artworksCount",
                "storageKey": "artworksCount(onlyVisible:true)"
              },
              (v0/*: any*/)
            ],
            "storageKey": "collection(id:\"saved-artwork\")"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "51706a21faefe5cc17cd15569653c686",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.artworkList": (v1/*: any*/),
        "me.artworkList.default": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.artworkList.id": (v2/*: any*/),
        "me.id": (v2/*: any*/),
        "me.savedArtworksArtworkList": (v1/*: any*/),
        "me.savedArtworksArtworkList.artworksCount": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "me.savedArtworksArtworkList.id": (v2/*: any*/)
      }
    },
    "name": "ArtworkListEmptyState_Test_Query",
    "operationKind": "query",
    "text": "query ArtworkListEmptyState_Test_Query {\n  me {\n    ...ArtworkListEmptyState_me_3NGuxX\n    id\n  }\n}\n\nfragment ArtworkListEmptyState_me_3NGuxX on Me {\n  artworkList: collection(id: \"listID\") {\n    default\n    id\n  }\n  savedArtworksArtworkList: collection(id: \"saved-artwork\") {\n    artworksCount(onlyVisible: true)\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "088664b3cc6998886024064e57ac2c6f";

export default node;
