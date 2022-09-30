/**
 * @generated SignedSource<<9ff8b4d4daeef6a64f72306f2889947c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserLarge_artwork$data = {
  readonly figures: ReadonlyArray<{
    readonly internalID: string | null;
    readonly isZoomable: boolean | null;
    readonly type: "Image";
    readonly " $fragmentSpreads": FragmentRefs<"DeepZoom_image">;
  } | {
    readonly type: "Video";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly type: "%other";
  }>;
  readonly isSetVideoAsCover: boolean | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork" | "ArtworkVideoPlayer_artwork">;
  readonly " $fragmentType": "ArtworkImageBrowserLarge_artwork";
};
export type ArtworkImageBrowserLarge_artwork$key = {
  readonly " $data"?: ArtworkImageBrowserLarge_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowserLarge_artwork">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkLightbox_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkVideoPlayer_artwork"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSetVideoAsCover",
      "storageKey": null
    },
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
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
})();

(node as any).hash = "944454e1603b527be041c31ce582c3d8";

export default node;
