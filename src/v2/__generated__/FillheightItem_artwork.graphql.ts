/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FillheightItem_artwork = {
    readonly image: {
        readonly url: string | null;
        readonly aspectRatio: number;
        readonly height: number | null;
    } | null;
    readonly imageTitle: string | null;
    readonly title: string | null;
    readonly href: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Metadata_artwork" | "SaveButton_artwork" | "Badge_artwork">;
    readonly " $refType": "FillheightItem_artwork";
};
export type FillheightItem_artwork$data = FillheightItem_artwork;
export type FillheightItem_artwork$key = {
    readonly " $data"?: FillheightItem_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"FillheightItem_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FillheightItem_artwork",
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
              "value": "large"
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:\"large\")"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "aspectRatio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
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
(node as any).hash = '446f228bdde47f7484dbbf0af975cb01';
export default node;
