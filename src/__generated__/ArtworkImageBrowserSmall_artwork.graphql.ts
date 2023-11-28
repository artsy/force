/**
 * @generated SignedSource<<0afab3832be39a91f4d1470cc2cbdfa8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowserSmall_artwork$data = {
  readonly figures: ReadonlyArray<{
    readonly internalID: string | null | undefined;
    readonly isZoomable: boolean | null | undefined;
    readonly type: "Image";
    readonly " $fragmentSpreads": FragmentRefs<"DeepZoom_image">;
  } | {
    readonly type: "Video";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly type: "%other";
  }>;
  readonly isSetVideoAsCover: boolean | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork" | "ArtworkVideoPlayer_artwork">;
  readonly " $fragmentType": "ArtworkImageBrowserSmall_artwork";
};
export type ArtworkImageBrowserSmall_artwork$key = {
  readonly " $data"?: ArtworkImageBrowserSmall_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowserSmall_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Variable",
    "name": "includeAllImages",
    "variableName": "includeAllImages"
  }
],
v1 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": false,
      "kind": "LocalArgument",
      "name": "includeAllImages"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowserSmall_artwork",
  "selections": [
    {
      "args": (v0/*: any*/),
      "kind": "FragmentSpread",
      "name": "ArtworkLightbox_artwork"
    },
    {
      "args": (v0/*: any*/),
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
      "args": [
        {
          "kind": "Variable",
          "name": "includeAll",
          "variableName": "includeAllImages"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "figures",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "DeepZoom_image"
            },
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
            (v1/*: any*/)
          ],
          "type": "Image",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/)
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

(node as any).hash = "0d41a4d1c2d807c3a273730a4f0dd0d6";

export default node;
