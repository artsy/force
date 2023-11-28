/**
 * @generated SignedSource<<a64f7a777f86af1dae7ca0b36fa410eb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MarketingTrendingArtistsRail_viewer$data = {
  readonly curatedTrendingArtists: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellArtist_artist">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MarketingTrendingArtistsRail_viewer";
};
export type MarketingTrendingArtistsRail_viewer$key = {
  readonly " $data"?: MarketingTrendingArtistsRail_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"MarketingTrendingArtistsRail_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MarketingTrendingArtistsRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ArtistConnection",
      "kind": "LinkedField",
      "name": "curatedTrendingArtists",
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
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "curatedTrendingArtists(first:20)"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "f0f3d63c11b6de26fa30bd37a90401ee";

export default node;
