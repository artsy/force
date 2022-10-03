/**
 * @generated SignedSource<<895d74a11c4758d6d812862bb1ace6de>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeepZoom_image$data = {
  readonly deepZoom: {
    readonly Image: {
      readonly Format: string | null;
      readonly Overlap: number | null;
      readonly Size: {
        readonly Height: number | null;
        readonly Width: number | null;
      } | null;
      readonly TileSize: number | null;
      readonly Url: string | null;
      readonly xmlns: string | null;
    } | null;
  } | null;
  readonly " $fragmentType": "DeepZoom_image";
};
export type DeepZoom_image$key = {
  readonly " $data"?: DeepZoom_image$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeepZoom_image">;
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

(node as any).hash = "0eccff0d675d92867a7036cec2ea2240";

export default node;
