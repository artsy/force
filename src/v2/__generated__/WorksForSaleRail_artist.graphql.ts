/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForSaleRail_artist = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"FollowArtistButton_artist">;
    readonly " $refType": "WorksForSaleRail_artist";
};
export type WorksForSaleRail_artist$data = WorksForSaleRail_artist;
export type WorksForSaleRail_artist$key = {
    readonly " $data"?: WorksForSaleRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"WorksForSaleRail_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "WorksForSaleRail_artist",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "AVAILABILITY_ASC"
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FillwidthItem_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:20,sort:\"AVAILABILITY_ASC\")"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FollowArtistButton_artist"
    }
  ],
  "type": "Artist"
};
(node as any).hash = '12d04fad2d3da6a2b00bd5d9b4038f75';
export default node;
