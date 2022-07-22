/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesRail_artist = {
    readonly artistSeriesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesItem_artistSeries">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistSeriesRail_artist";
};
export type ArtistSeriesRail_artist$data = ArtistSeriesRail_artist;
export type ArtistSeriesRail_artist$key = {
    readonly " $data"?: ArtistSeriesRail_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesRail_artist">;
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistSeriesItem_artistSeries"
                }
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
(node as any).hash = 'f41faa52602d290ce693d20ece2885a7';
export default node;
