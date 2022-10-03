/**
 * @generated SignedSource<<8f3c1f64cdfdf14c00f0aad56f076583>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FillwidthItem_artwork$data = {
  readonly href: string | null;
  readonly image: {
    readonly aspectRatio: number;
    readonly url: string | null;
  } | null;
  readonly imageTitle: string | null;
  readonly is_saved: boolean | null;
  readonly title: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"Badge_artwork" | "Metadata_artwork" | "SaveButton_artwork">;
  readonly " $fragmentType": "FillwidthItem_artwork";
};
export type FillwidthItem_artwork$key = {
  readonly " $data"?: FillwidthItem_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"FillwidthItem_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FillwidthItem_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "larger"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"larger\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "imageTitle",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": "is_saved",
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Metadata_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SaveButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Badge_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "0e9fa6945304edc19779cd3c0654a318";

export default node;
