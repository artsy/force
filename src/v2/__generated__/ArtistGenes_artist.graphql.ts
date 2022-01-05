/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistGenes_artist = {
    readonly related: {
        readonly genes: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly href: string | null;
                    readonly name: string | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistGenes_artist";
};
export type ArtistGenes_artist$data = ArtistGenes_artist;
export type ArtistGenes_artist$key = {
    readonly " $data"?: ArtistGenes_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistGenes_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistGenes_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistRelatedData",
      "kind": "LinkedField",
      "name": "related",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneConnection",
          "kind": "LinkedField",
          "name": "genes",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "GeneEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Gene",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "href",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "name",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'd189cc35fd05c837e26dd24421f73755';
export default node;
