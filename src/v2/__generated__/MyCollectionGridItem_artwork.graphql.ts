/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionGridItem_artwork = {
    readonly internalID: string;
    readonly title: string | null;
    readonly image_title: string | null;
    readonly image: {
        readonly placeholder: string | null;
        readonly url: string | null;
        readonly aspect_ratio: number;
    } | null;
    readonly artistNames: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Details_artwork">;
    readonly " $refType": "MyCollectionGridItem_artwork";
};
export type MyCollectionGridItem_artwork$data = MyCollectionGridItem_artwork;
export type MyCollectionGridItem_artwork$key = {
    readonly " $data"?: MyCollectionGridItem_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionGridItem_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionGridItem_artwork",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": "image_title",
      "args": null,
      "kind": "ScalarField",
      "name": "imageTitle",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "placeholder",
          "storageKey": null
        },
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistNames",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Details_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '8c44cdef5dc192d2368eed6a09895200';
export default node;
