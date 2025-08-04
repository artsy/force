/**
 * @generated SignedSource<<edd8d69293784633447c63def088753d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistTabsMetaIntegration_ArtworksTab_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistTabsMetaIntegration_ArtworksTab_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistWorksForSaleRoute_artist">;
  } | null | undefined;
};
export type ArtistTabsMetaIntegration_ArtworksTab_Test_Query = {
  response: ArtistTabsMetaIntegration_ArtworksTab_Test_Query$data;
  variables: ArtistTabsMetaIntegration_ArtworksTab_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "andy-warhol"
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
    "name": "ArtistTabsMetaIntegration_ArtworksTab_Test_Query",
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
            "name": "ArtistWorksForSaleRoute_artist"
          }
        ],
        "storageKey": "artist(id:\"andy-warhol\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistTabsMetaIntegration_ArtworksTab_Test_Query",
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
            "name": "internalID",
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "page",
                "value": "ARTWORKS"
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
            "storageKey": "meta(page:\"ARTWORKS\")"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"andy-warhol\")"
      }
    ]
  },
  "params": {
    "cacheID": "0b0caf45adab29c18de2f1a6d5a5e3b2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
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
    "name": "ArtistTabsMetaIntegration_ArtworksTab_Test_Query",
    "operationKind": "query",
    "text": "query ArtistTabsMetaIntegration_ArtworksTab_Test_Query {\n  artist(id: \"andy-warhol\") {\n    ...ArtistWorksForSaleRoute_artist\n    id\n  }\n}\n\nfragment ArtistWorksForSaleEmpty_artist on Artist {\n  internalID\n  name\n}\n\nfragment ArtistWorksForSaleRoute_artist on Artist {\n  ...ArtistWorksForSaleEmpty_artist\n  slug\n  name\n  meta(page: ARTWORKS) {\n    description\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "accdb3c1795dc40f90d353600aac9d55";

export default node;
