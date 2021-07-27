/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkLightbox_artwork = {
    readonly formattedMetadata: string | null;
    readonly images: ReadonlyArray<{
        readonly isDefault: boolean | null;
        readonly width: number | null;
        readonly height: number | null;
        readonly sourceUrl: string | null;
    } | null> | null;
    readonly " $refType": "ArtworkLightbox_artwork";
};
export type ArtworkLightbox_artwork$data = ArtworkLightbox_artwork;
export type ArtworkLightbox_artwork$key = {
    readonly " $data"?: ArtworkLightbox_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkLightbox_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkLightbox_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedMetadata",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDefault",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": "sourceUrl",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "normalized",
                "larger",
                "large"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"normalized\",\"larger\",\"large\"])"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
(node as any).hash = 'b51cc76b00404605c54fa00e72a5211f';
export default node;
