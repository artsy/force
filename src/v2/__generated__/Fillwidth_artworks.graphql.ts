/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Fillwidth_artworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly image: {
                readonly aspect_ratio: number;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
        } | null;
    } | null> | null;
    readonly " $refType": "Fillwidth_artworks";
};
export type Fillwidth_artworks$data = Fillwidth_artworks;
export type Fillwidth_artworks$key = {
    readonly " $data"?: Fillwidth_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"Fillwidth_artworks">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Fillwidth_artworks",
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
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": "aspect_ratio",
                  "args": null,
                  "kind": "ScalarField",
                  "name": "aspectRatio",
                  "storageKey": null
                }
              ],
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
  "type": "ArtworkConnection"
};
(node as any).hash = '9b77dfaad4a1239bd6d4dd567c95d70e';
export default node;
