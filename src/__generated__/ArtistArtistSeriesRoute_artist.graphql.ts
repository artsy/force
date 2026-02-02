/**
 * @generated SignedSource<<633808ad05d14c2d475fc2f52ebf66e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistArtistSeriesRoute_artist$data = {
  readonly artistSeriesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellArtistSeries_artistSeries">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly name: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtistArtistSeriesRoute_artist";
};
export type ArtistArtistSeriesRoute_artist$key = {
  readonly " $data"?: ArtistArtistSeriesRoute_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistArtistSeriesRoute_artist">;
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
  "metadata": null,
  "name": "ArtistArtistSeriesRoute_artist",
  "selections": [
    (v0/*: any*/),
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
          "name": "first",
          "value": 50
        }
      ],
      "concreteType": "ArtistSeriesConnection",
      "kind": "LinkedField",
      "name": "artistSeriesConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistSeriesEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ArtistSeries",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CellArtistSeries_artistSeries"
                },
                (v0/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistSeriesConnection(first:50)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "e37bf1ef8c3aaa0cddb341cdd5509ac9";

export default node;
