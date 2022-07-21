/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DeepZoom_image = {
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
    readonly " $refType": "DeepZoom_image";
};
export type DeepZoom_image$data = DeepZoom_image;
export type DeepZoom_image$key = {
    readonly " $data"?: DeepZoom_image$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"DeepZoom_image">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeepZoom_image",
  "selections": [
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
  "type": "Image",
  "abstractKey": null
};
(node as any).hash = '0eccff0d675d92867a7036cec2ea2240';
export default node;
