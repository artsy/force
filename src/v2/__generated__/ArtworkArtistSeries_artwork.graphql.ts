/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkArtistSeries_artwork = {
    readonly internalID: string;
    readonly slug: string;
    readonly seriesArtist: {
        readonly artistSeriesConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly internalID: string;
                } | null;
            } | null> | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesRail_artist">;
    } | null;
    readonly seriesForCounts: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly artworksCount: number;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesArtworkRail_artwork">;
    readonly " $refType": "ArtworkArtistSeries_artwork";
};
export type ArtworkArtistSeries_artwork$data = ArtworkArtistSeries_artwork;
export type ArtworkArtistSeries_artwork$key = {
    readonly " $data"?: ArtworkArtistSeries_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkArtistSeries_artwork">;
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
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "artistSeriesConnection(first:50)"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistSeriesArtworkRail_artwork"
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = 'abd79722eb234ba11e80abf08340f6ed';
export default node;
