/**
 * @generated SignedSource<<bb03a1ace85d2c2acd44bf47a2aad296>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExampleArtworkRoute_artwork$data = {
  readonly artist: {
    readonly related: {
      readonly artistsConnection: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly internalID: string;
            readonly " $fragmentSpreads": FragmentRefs<"EntityHeaderArtist_artist">;
          } | null | undefined;
        } | null | undefined> | null | undefined;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly artistNames: string | null | undefined;
  readonly date: string | null | undefined;
  readonly imageUrl: string | null | undefined;
  readonly internalID: string;
  readonly medium: string | null | undefined;
  readonly slug: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ExampleArtworkRoute_artwork";
};
export type ExampleArtworkRoute_artwork$key = {
  readonly " $data"?: ExampleArtworkRoute_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExampleArtworkRoute_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
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
    (v0/*: any*/),
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
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "EntityHeaderArtist_artist"
                        },
                        (v0/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "__typename",
                          "storageKey": null
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
})();

(node as any).hash = "8b51a28c607092606cfb37e6a8700831";

export default node;
