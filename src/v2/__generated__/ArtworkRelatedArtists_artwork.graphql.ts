/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkRelatedArtists_artwork = {
    readonly slug: string;
    readonly artist: {
        readonly href: string | null;
        readonly related: {
            readonly artistsConnection: {
                readonly pageInfo: {
                    readonly hasNextPage: boolean;
                };
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly " $fragmentRefs": FragmentRefs<"ArtistCard_artist">;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "ArtworkRelatedArtists_artwork";
};
export type ArtworkRelatedArtists_artwork$data = ArtworkRelatedArtists_artwork;
export type ArtworkRelatedArtists_artwork$key = {
    readonly " $data"?: ArtworkRelatedArtists_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkRelatedArtists_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkRelatedArtists_artwork",
  "type": "Artwork",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": [
          "artist",
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
      "defaultValue": 4
    },
    {
      "kind": "LocalArgument",
      "name": "cursor",
      "type": "String",
      "defaultValue": ""
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
      "name": "artist",
      "storageKey": null,
      "args": null,
      "concreteType": "Artist",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
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
              "name": "__ArtworkRelatedArtists_artistsConnection_connection",
              "storageKey": "__ArtworkRelatedArtists_artistsConnection_connection(kind:\"MAIN\")",
              "args": [
                {
                  "kind": "Literal",
                  "name": "kind",
                  "value": "MAIN"
                }
              ],
              "concreteType": "ArtistConnection",
              "plural": false,
              "selections": [
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
                      "name": "hasNextPage",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "endCursor",
                      "args": null,
                      "storageKey": null
                    }
                  ]
                },
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
                          "name": "__typename",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "FragmentSpread",
                          "name": "ArtistCard_artist",
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
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '4df1872cc84dffa4698fd299b4459457';
export default node;
