/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkImageBrowser_artwork = {
    readonly internalID: string;
    readonly images: ReadonlyArray<{
        readonly width: number | null;
        readonly height: number | null;
    } | null> | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowser_artwork">;
    readonly " $refType": "MyCollectionArtworkImageBrowser_artwork";
};
export type MyCollectionArtworkImageBrowser_artwork$data = MyCollectionArtworkImageBrowser_artwork;
export type MyCollectionArtworkImageBrowser_artwork$key = {
    readonly " $data"?: MyCollectionArtworkImageBrowser_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MyCollectionArtworkImageBrowser_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkImageBrowser_artwork",
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
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowser_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = '613d09ea3408c3f56693ed749f86a719';
export default node;
