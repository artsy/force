/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistRecommendations_artist = {
    readonly slug: string;
    readonly related: {
        readonly artistsConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"RecommendedArtist_artist">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistRecommendations_artist";
};
export type ArtistRecommendations_artist$data = ArtistRecommendations_artist;
export type ArtistRecommendations_artist$key = {
    readonly " $data"?: ArtistRecommendations_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistRecommendations_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistRecommendations_artist",
  "type": "Artist",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "related",
          "artistsConnection"
        ]
      }
    ]
  },
  "argumentDefinitions": [
    {
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int",
      "defaultValue": 3
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": ""
    },
    {
      "kind": "LocalArgument",
      "name": "minForsaleArtworks",
      "type": "Int",
      "defaultValue": 7
    }
  ],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "related",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": "artistsConnection",
          "name": "__ArtistRecommendations_artistsConnection_connection",
          "storageKey": null,
          "args": [
            {
              "kind": "Variable",
              "name": "minForsaleArtworks",
              "variableName": "minForsaleArtworks"
            }
          ],
          "concreteType": "ArtistConnection",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "edges",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistEdge",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "node",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Artist",
                  "plural": false,
                  "selections": [
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "id",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "__typename",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "RecommendedArtist_artist",
                      "args": null
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "cursor",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "pageInfo",
              "storageKey": null,
              "args": null,
              "concreteType": "PageInfo",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "endCursor",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "hasNextPage",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'd902cee33de1092626cb53f065896809';
export default node;
