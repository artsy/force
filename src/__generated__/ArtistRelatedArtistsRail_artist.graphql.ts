/**
 * @generated SignedSource<<8ed367681651a157d55beedbbd926dfd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistRelatedArtistsRail_artist$data = {
  readonly related: {
    readonly artistsConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly href: string | null | undefined;
          readonly internalID: string;
          readonly slug: string;
          readonly " $fragmentSpreads": FragmentRefs<"CellArtist_artist">;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "ArtistRelatedArtistsRail_artist";
};
export type ArtistRelatedArtistsRail_artist$key = {
  readonly " $data"?: ArtistRelatedArtistsRail_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistRelatedArtistsRail_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistRelatedArtistsRail_artist",
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
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 12
            },
            {
              "kind": "Literal",
              "name": "kind",
              "value": "MAIN"
            }
          ],
          "concreteType": "ArtistConnection",
          "kind": "LinkedField",
          "name": "artistsConnection",
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
                      "name": "CellArtist_artist"
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
                      "kind": "ScalarField",
                      "name": "href",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistsConnection(first:12,kind:\"MAIN\")"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "cee9c910b20208edbd1c2c1b8d1b5f75";

export default node;
