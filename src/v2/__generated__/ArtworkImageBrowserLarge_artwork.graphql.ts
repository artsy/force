/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserLarge_artwork = {
    readonly images: ReadonlyArray<{
        readonly type: string;
        readonly internalID: string | null;
        readonly isZoomable: boolean | null;
        readonly " $fragmentRefs": FragmentRefs<"DeepZoom_image">;
    } | null> | null;
    readonly video: {
        readonly type: string;
        readonly src: string | null;
        readonly height: number | null;
        readonly width: number | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkLightbox_artwork">;
    readonly " $refType": "ArtworkImageBrowserLarge_artwork";
};
export type ArtworkImageBrowserLarge_artwork$data = ArtworkImageBrowserLarge_artwork;
export type ArtworkImageBrowserLarge_artwork$key = {
    readonly " $data"?: ArtworkImageBrowserLarge_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowserLarge_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowserLarge_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        (v0/*: any*/),
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "DeepZoom_image"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Video",
      "kind": "LinkedField",
      "name": "video",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "src",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
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
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '5660fac63304c2732db1805ba0a559cc';
export default node;
