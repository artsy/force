/**
 * @generated SignedSource<<618c19dfbcb50276e84890deb72aa9ba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesRail_artist$data = {
  readonly artistSeriesConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly featured: boolean;
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"CellArtistSeries_artistSeries">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "ArtistSeriesRail_artist";
};
export type ArtistSeriesRail_artist$key = {
  readonly " $data"?: ArtistSeriesRail_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesRail_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistSeriesRail_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 12
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
                  "name": "featured",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistSeriesConnection(first:12)"
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "a453a8a4f93b9d52a4ae0474e3bc87fa";

export default node;
