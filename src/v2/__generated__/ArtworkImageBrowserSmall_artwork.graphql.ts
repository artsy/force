/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserSmall_artwork = {
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly isZoomable: boolean | null;
        readonly deepZoom: {
            readonly Image: {
                readonly xmlns: string | null;
                readonly Url: string | null;
                readonly Format: string | null;
                readonly TileSize: number | null;
                readonly Overlap: number | null;
                readonly Size: {
                    readonly Width: number | null;
                    readonly Height: number | null;
                } | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkLightbox_artwork">;
    readonly " $refType": "ArtworkImageBrowserSmall_artwork";
};
export type ArtworkImageBrowserSmall_artwork$data = ArtworkImageBrowserSmall_artwork;
export type ArtworkImageBrowserSmall_artwork$key = {
    readonly " $data"?: ArtworkImageBrowserSmall_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowserSmall_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowserSmall_artwork",
  "selections": [
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
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isZoomable",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "DeepZoom",
          "kind": "LinkedField",
          "name": "deepZoom",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "DeepZoomImage",
              "kind": "LinkedField",
              "name": "Image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "xmlns",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "Url",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "Format",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "TileSize",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "Overlap",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "DeepZoomImageSize",
                  "kind": "LinkedField",
                  "name": "Size",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "Width",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "Height",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkLightbox_artwork"
    }
  ],
  "type": "Artwork"
};
(node as any).hash = '0ab5d6aca545fcc383fecfa885686185';
export default node;
