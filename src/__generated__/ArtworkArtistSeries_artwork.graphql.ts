/**
 * @generated SignedSource<<00906541689708d6e61e076b24110a0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkArtistSeries_artwork$data = {
  readonly internalID: string;
  readonly seriesArtist: {
    readonly artistSeriesConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesRail_artist">;
  } | null | undefined;
  readonly seriesForCounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artworksCount: number;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistSeriesArtworkRail_artwork">;
  readonly " $fragmentType": "ArtworkArtistSeries_artwork";
};
export type ArtworkArtistSeries_artwork$key = {
  readonly " $data"?: ArtworkArtistSeries_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkArtistSeries_artwork">;
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
  "name": "ArtworkArtistSeries_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworkRail_artwork"
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
      "alias": "seriesArtist",
      "args": [
        {
          "kind": "Literal",
          "name": "shallow",
          "value": true
        }
      ],
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
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
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistSeriesConnection(first:12)"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistSeriesRail_artist"
        }
      ],
      "storageKey": "artist(shallow:true)"
    },
    {
      "alias": "seriesForCounts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "artworksCount",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artistSeriesConnection(first:1)"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "1ffbef351984054fa875cf3682420472";

export default node;
