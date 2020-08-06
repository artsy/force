/* tslint:disable */

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
    readonly " $data"?: ArtistSeriesRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesRail_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistSeriesRail_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artistSeriesConnection",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistSeriesConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistSeriesEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistSeries",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "internalID",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ArtistSeriesItem_artistSeries",
                  "args": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'f2404c14f9b6592d9e308653647d8326';
export default node;
