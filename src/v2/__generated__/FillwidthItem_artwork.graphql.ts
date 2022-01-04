/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FillwidthItem_artwork = {
    readonly image: {
        readonly url: string | null;
        readonly aspectRatio: number;
    } | null;
    readonly imageTitle: string | null;
    readonly title: string | null;
    readonly href: string | null;
    readonly is_saved: boolean | null;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork" | "SaveButton_artwork" | "Badge_artwork">;
    readonly " $refType": "FillwidthItem_artwork";
};
export type FillwidthItem_artwork$data = FillwidthItem_artwork;
export type FillwidthItem_artwork$key = {
    readonly " $data"?: FillwidthItem_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
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
  "type": "Artwork"
};
(node as any).hash = '0e9fa6945304edc19779cd3c0654a318';
export default node;
