/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserSmall_artwork = {
    readonly figures: ReadonlyArray<{
        readonly internalID: string | null;
        readonly isZoomable: boolean | null;
        readonly type: "Image";
        readonly " $fragmentRefs": FragmentRefs<"DeepZoom_image">;
    } | {
        readonly type: "Video";
    } | {
        /*This will never be '%other', but we need some
        value in case none of the concrete values match.*/
        readonly type: "%other";
    }>;
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "figures",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
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
          "type": "Image",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/)
          ],
          "type": "Video",
          "abstractKey": null
        }
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
(node as any).hash = '64fbb26e319b2397d63c4b301ab544bf';
export default node;
