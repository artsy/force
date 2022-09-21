/**
 * @generated SignedSource<<bb9ffe564ce7c4de071eb0a0f235659c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkImageBrowser_artwork$data = {
  readonly internalID: string;
  readonly images: ReadonlyArray<{
    readonly width: number | null;
    readonly height: number | null;
  } | null> | null;
  readonly figures: ReadonlyArray<{
    readonly internalID?: string | null;
    readonly isDefault?: boolean | null;
    readonly type: "Video";
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActions_artwork" | "ArtworkImageBrowserSmall_artwork" | "ArtworkImageBrowserLarge_artwork">;
  readonly " $fragmentType": "ArtworkImageBrowser_artwork";
};
export type ArtworkImageBrowser_artwork$key = {
  readonly " $data"?: ArtworkImageBrowser_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkImageBrowser_artwork">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkImageBrowser_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActions_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowserSmall_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkImageBrowserLarge_artwork"
    },
    (v0/*: any*/),
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
              "name": "isDefault",
              "storageKey": null
            }
          ],
          "type": "Image",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": "type",
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
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

(node as any).hash = "541f4cb1252318c53c846581e242af3b";

export default node;
