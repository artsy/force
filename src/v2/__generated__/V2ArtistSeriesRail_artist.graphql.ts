/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type V2ArtistSeriesRail_artist = {
    readonly artistSeriesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"V2ArtistSeriesItem_artistSeries">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "V2ArtistSeriesRail_artist";
};
export type V2ArtistSeriesRail_artist$data = V2ArtistSeriesRail_artist;
export type V2ArtistSeriesRail_artist$key = {
    readonly " $data"?: V2ArtistSeriesRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"V2ArtistSeriesRail_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "V2ArtistSeriesRail_artist",
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
                  "name": "V2ArtistSeriesItem_artistSeries"
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
  "type": "Artist"
};
(node as any).hash = '02811a06d52f41d366fdfc0eaee17411';
export default node;
