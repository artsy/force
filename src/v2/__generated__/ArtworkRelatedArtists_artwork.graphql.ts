/**
 * @generated SignedSource<<4fb827d73becdc6b2bd274d6e04b1eb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkRelatedArtists_artwork$data = {
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
            readonly " $fragmentSpreads": FragmentRefs<"ArtistCard_artist">;
          } | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
  readonly " $fragmentType": "ArtworkRelatedArtists_artwork";
};
export type ArtworkRelatedArtists_artwork$key = {
  readonly " $data"?: ArtworkRelatedArtists_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkRelatedArtists_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 4,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": "",
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
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
  "name": "ArtworkRelatedArtists_artwork",
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
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
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
                  "concreteType": "PageInfo",
                  "kind": "LinkedField",
                  "name": "pageInfo",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "hasNextPage",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "endCursor",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
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
                          "name": "ArtistCard_artist"
                        },
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

(node as any).hash = "4df1872cc84dffa4698fd299b4459457";

export default node;
