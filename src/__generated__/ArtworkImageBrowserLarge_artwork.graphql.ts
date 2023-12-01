/**
 * @generated SignedSource<<8e72a848f30813e1fa31c609f5206dee>>
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
    readonly __typename: "Image";
    readonly internalID: string | null | undefined;
    readonly isZoomable: boolean | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"DeepZoom_image">;
  } | {
    readonly __typename: "Video";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly isSetVideoAsCover: boolean | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkLightbox_artwork" | "ArtworkVideoPlayer_artwork">;
  readonly " $fragmentType": "ArtworkImageBrowserLarge_artwork";
};
export type ArtworkImageBrowserLarge_artwork$key = {
  readonly " $data"?: ArtworkImageBrowserLarge_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowserLarge_artwork">;
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
  "alias": null,
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
  "name": "ArtworkImageBrowserLarge_artwork",
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
            (v1/*: any*/),
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
            }
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

(node as any).hash = "abb09f19f37896e2bca0399251cf2f54";

export default node;
