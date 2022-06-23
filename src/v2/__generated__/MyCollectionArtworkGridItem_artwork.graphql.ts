/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkGridItem_artwork = {
    readonly internalID: string;
    readonly title: string | null;
    readonly imageTitle: string | null;
    readonly image: {
        readonly placeholder: string | null;
        readonly url: string | null;
        readonly aspectRatio: number;
    } | null;
    readonly artistNames: string | null;
    readonly " $fragmentRefs": FragmentRefs<"Details_artwork">;
    readonly " $refType": "MyCollectionArtworkGridItem_artwork";
};
export type MyCollectionArtworkGridItem_artwork$data = MyCollectionArtworkGridItem_artwork;
export type MyCollectionArtworkGridItem_artwork$key = {
    readonly " $data"?: MyCollectionArtworkGridItem_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkGridItem_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkGridItem_artwork",
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
      "alias": null,
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
(node as any).hash = 'b2379f482a24338550a494ba39f4f278';
export default node;
