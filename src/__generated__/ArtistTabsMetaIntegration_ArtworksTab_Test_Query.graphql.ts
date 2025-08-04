/**
 * @generated SignedSource<<f3eda1babd5f6831683962df59d80a58>>
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
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "version",
    "value": "large"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ArtistMeta"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
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
            "name": "birthday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "deathday",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "gender",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "nationality",
            "storageKey": null
          },
          (v1/*: any*/),
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": "meta(page:\"ABOUT\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artwork",
            "kind": "LinkedField",
            "name": "coverArtwork",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": (v4/*: any*/),
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"large\")"
                  },
                  {
                    "alias": "large",
                    "args": (v4/*: any*/),
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"large\")"
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              }
            ],
            "concreteType": "PartnerArtistConnection",
            "kind": "LinkedField",
            "name": "partnersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerArtistEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Partner",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnersConnection(first:10)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isInSeoExperiment",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "alternateNames",
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
            "alias": "artworksMeta",
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
              (v3/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": "meta(page:\"ARTWORKS\")"
          },
          (v5/*: any*/)
        ],
        "storageKey": "artist(id:\"andy-warhol\")"
      }
    ]
  },
  "params": {
    "cacheID": "d90d49bbc2e02549bac143c9c4e7e546",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.alternateNames": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artist.artworksMeta": (v6/*: any*/),
        "artist.artworksMeta.description": (v7/*: any*/),
        "artist.artworksMeta.title": (v7/*: any*/),
        "artist.birthday": (v8/*: any*/),
        "artist.coverArtwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artist.coverArtwork.id": (v9/*: any*/),
        "artist.coverArtwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "artist.coverArtwork.image.large": (v8/*: any*/),
        "artist.coverArtwork.image.url": (v8/*: any*/),
        "artist.deathday": (v8/*: any*/),
        "artist.gender": (v8/*: any*/),
        "artist.href": (v8/*: any*/),
        "artist.id": (v9/*: any*/),
        "artist.internalID": (v9/*: any*/),
        "artist.isInSeoExperiment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artist.meta": (v6/*: any*/),
        "artist.meta.description": (v7/*: any*/),
        "artist.meta.title": (v7/*: any*/),
        "artist.name": (v8/*: any*/),
        "artist.nationality": (v8/*: any*/),
        "artist.partnersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerArtistConnection"
        },
        "artist.partnersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerArtistEdge"
        },
        "artist.partnersConnection.edges.id": (v9/*: any*/),
        "artist.partnersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artist.partnersConnection.edges.node.href": (v8/*: any*/),
        "artist.partnersConnection.edges.node.id": (v9/*: any*/),
        "artist.slug": (v9/*: any*/)
      }
    },
    "name": "ArtistTabsMetaIntegration_ArtworksTab_Test_Query",
    "operationKind": "query",
    "text": "query ArtistTabsMetaIntegration_ArtworksTab_Test_Query {\n  artist(id: \"andy-warhol\") {\n    ...ArtistWorksForSaleRoute_artist\n    id\n  }\n}\n\nfragment ArtistMeta_artist on Artist {\n  ...ArtistStructuredData_artist\n  slug\n  name\n  nationality\n  birthday\n  deathday\n  href\n  isInSeoExperiment\n  meta(page: ABOUT) {\n    description\n    title\n  }\n  alternateNames\n  coverArtwork {\n    image {\n      large: url(version: \"large\")\n    }\n    id\n  }\n}\n\nfragment ArtistStructuredData_artist on Artist {\n  slug\n  name\n  birthday\n  deathday\n  gender\n  nationality\n  href\n  meta(page: ABOUT) {\n    title\n    description\n  }\n  coverArtwork {\n    image {\n      url(version: \"large\")\n    }\n    id\n  }\n  partnersConnection(first: 10) {\n    edges {\n      node {\n        href\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment ArtistWorksForSaleEmpty_artist on Artist {\n  internalID\n  name\n}\n\nfragment ArtistWorksForSaleRoute_artist on Artist {\n  ...ArtistMeta_artist\n  ...ArtistWorksForSaleEmpty_artist\n  slug\n  name\n  artworksMeta: meta(page: ARTWORKS) {\n    description\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "accdb3c1795dc40f90d353600aac9d55";

export default node;
