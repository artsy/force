/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomCarousel_artwork = {
    readonly title: string | null;
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly resized: {
            readonly url: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
    } | null> | null;
    readonly " $refType": "ViewingRoomCarousel_artwork";
};
export type ViewingRoomCarousel_artwork$data = ViewingRoomCarousel_artwork;
export type ViewingRoomCarousel_artwork$key = {
    readonly " $data"?: ViewingRoomCarousel_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomCarousel_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomCarousel_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "internalID",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "resized",
          "storageKey": "resized(height:1100,version:\"normalized\")",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1100
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "normalized"
            }
          ],
          "concreteType": "ResizedImageUrl",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "width",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "height",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '63242270c9bf9d6e2ba2bb9f55c3cf9b';
export default node;
