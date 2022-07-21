/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleArtworkRoute_artwork = {
    readonly title: string | null;
    readonly artistNames: string | null;
    readonly medium: string | null;
    readonly imageUrl: string | null;
    readonly date: string | null;
    readonly internalID: string;
    readonly slug: string;
    readonly artist: {
        readonly related: {
            readonly artistsConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly " $fragmentRefs": FragmentRefs<"EntityHeaderArtist_artist">;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "ExampleArtworkRoute_artwork";
};
export type ExampleArtworkRoute_artwork$data = ExampleArtworkRoute_artwork;
export type ExampleArtworkRoute_artwork$key = {
    readonly " $data"?: ExampleArtworkRoute_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ExampleArtworkRoute_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "artist",
          "related",
          "artistsConnection"
        ]
      }
    ]
  },
  "name": "ExampleArtworkRoute_artwork",
  "selections": [
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
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "medium",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
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
      "name": "slug",
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
          "concreteType": "ArtistRelatedData",
          "kind": "LinkedField",
          "name": "related",
          "plural": false,
          "selections": [
            {
              "alias": "artistsConnection",
              "args": [
                {
                  "kind": "Literal",
                  "name": "kind",
                  "value": "MAIN"
                }
              ],
              "concreteType": "ArtistConnection",
              "kind": "LinkedField",
              "name": "__ArtworkRelatedArtists_artistsConnection_connection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ArtistEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artist",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "__typename",
                          "storageKey": null
                        },
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "EntityHeaderArtist_artist"
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "cursor",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PageInfo",
                  "kind": "LinkedField",
                  "name": "pageInfo",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "endCursor",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "hasNextPage",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": "__ArtworkRelatedArtists_artistsConnection_connection(kind:\"MAIN\")"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '48e949f2d2071b986181176ba9fde9d6';
export default node;
