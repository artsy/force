/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2WorksForSaleRail_artist = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "Artist2WorksForSaleRail_artist";
};
export type Artist2WorksForSaleRail_artist$data = Artist2WorksForSaleRail_artist;
export type Artist2WorksForSaleRail_artist$key = {
    readonly " $data"?: Artist2WorksForSaleRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2WorksForSaleRail_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2WorksForSaleRail_artist",
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 200
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:20,sort:\"AVAILABILITY_ASC\")"
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'fc2ed8ead4ba1c85c085742747a2a4b3';
export default node;
