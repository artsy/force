/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkGrid_artworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly slug: string;
            readonly href: string | null;
            readonly image: {
                readonly aspect_ratio: number;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"GridItem_artwork">;
        } | null;
    } | null> | null;
    readonly " $refType": "ArtworkGrid_artworks";
};
export type ArtworkGrid_artworks$data = ArtworkGrid_artworks;
export type ArtworkGrid_artworks$key = {
    readonly " $data"?: ArtworkGrid_artworks$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkGrid_artworks">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtworkGrid_artworks",
  "type": "ArtworkConnectionInterface",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": null,
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
              "kind": "ScalarField",
              "alias": null,
              "name": "slug",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "href",
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
              "name": "GridItem_artwork",
              "args": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'c827490f6a3cea394d73810bccad5dbd';
export default node;
