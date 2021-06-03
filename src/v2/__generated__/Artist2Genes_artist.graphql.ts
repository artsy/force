/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Artist2Genes_artist = {
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
    readonly " $refType": "Artist2Genes_artist";
};
export type Artist2Genes_artist$data = Artist2Genes_artist;
export type Artist2Genes_artist$key = {
    readonly " $data"?: Artist2Genes_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Artist2Genes_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Artist2Genes_artist",
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
(node as any).hash = '52a832fbd392baefb55b9d74304f4da7';
export default node;
