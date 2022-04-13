/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserSmall_artwork = {
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly isZoomable: boolean | null;
        readonly type: string;
        readonly " $fragmentRefs": FragmentRefs<"DeepZoom_image">;
    } | null> | null;
    readonly video: {
        readonly type: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkLightbox_artwork" | "ArtworkVideoPlayer_artwork">;
    readonly " $refType": "ArtworkImageBrowserSmall_artwork";
};
export type ArtworkImageBrowserSmall_artwork$data = ArtworkImageBrowserSmall_artwork;
export type ArtworkImageBrowserSmall_artwork$key = {
    readonly " $data"?: ArtworkImageBrowserSmall_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkImageBrowserSmall_artwork">;
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
  "name": "ArtworkImageBrowserSmall_artwork",
  "selections": [
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
        (v0/*: any*/),
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkLightbox_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkVideoPlayer_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();
(node as any).hash = '44ceafd4883e3dd340d4d7e740517b58';
export default node;
