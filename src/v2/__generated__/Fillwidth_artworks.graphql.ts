/* tslint:disable */

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
  "kind": "Fragment",
  "name": "Fillwidth_artworks",
  "type": "ArtworkConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "Artwork",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "image",
              "storageKey": null,
              "args": null,
              "concreteType": "Image",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": "aspect_ratio",
                  "name": "aspectRatio",
                  "args": null,
                  "storageKey": null
                }
              ]
            },
            {
              "kind": "FragmentSpread",
              "name": "FillwidthItem_artwork",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '9b77dfaad4a1239bd6d4dd567c95d70e';
export default node;
