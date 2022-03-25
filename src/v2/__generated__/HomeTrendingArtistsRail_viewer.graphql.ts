/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeTrendingArtistsRail_viewer = {
    readonly artistsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"CellArtist_artist">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "HomeTrendingArtistsRail_viewer";
};
export type HomeTrendingArtistsRail_viewer$data = HomeTrendingArtistsRail_viewer;
export type HomeTrendingArtistsRail_viewer$key = {
    readonly " $data"?: HomeTrendingArtistsRail_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"HomeTrendingArtistsRail_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomeTrendingArtistsRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 99
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "TRENDING_DESC"
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellArtist_artist"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistsConnection(first:99,sort:\"TRENDING_DESC\")"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = 'b7b7d2b5aa747dcbd490ee8e82545413';
export default node;
